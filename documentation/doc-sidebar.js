// Shared sidebar + heading-anchor helpers for the Documentation pages
// (Goals, Roadmap, Credits). Each page builds its own tree from its own
// data file and calls renderDocSidebar() once the content is in the DOM.

window.docSlugify = function (s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// Gives a heading a real id, and turns its own text into a link to itself
// (rather than a separate decorative symbol), so hovering it shows it's
// linkable and right-click > copy link works normally.
window.addHeadingAnchor = function (headingEl, id) {
    headingEl.id = id;
    const text = headingEl.textContent;
    headingEl.textContent = '';
    const a = document.createElement('a');
    a.href = '#' + id;
    a.className = 'heading-link';
    a.textContent = text;
    headingEl.appendChild(a);
};

// Set by renderDocSidebar() once the mobile drawer exists on this page.
let closeMobileDrawer = function () {};

function goToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    history.pushState(null, '', '#' + id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileDrawer();
}

// Single shared modal, reused for every expandable group.
let modalEl = null;
function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'doc-sidebar-modal-backdrop';
    modalEl.innerHTML =
        '<div class="doc-sidebar-modal">' +
            '<button type="button" class="doc-sidebar-modal-close" aria-label="Close">&times;</button>' +
            '<h4 class="doc-sidebar-modal-title"></h4>' +
            '<ul class="doc-sidebar-modal-list"></ul>' +
        '</div>';
    document.body.appendChild(modalEl);
    modalEl.addEventListener('click', function (e) {
        if (e.target === modalEl) closeModal();
    });
    modalEl.querySelector('.doc-sidebar-modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
    return modalEl;
}
function closeModal() {
    if (modalEl) modalEl.classList.remove('open');
}
function openModal(node) {
    const el = ensureModal();
    el.querySelector('.doc-sidebar-modal-title').textContent = node.label;
    const list = el.querySelector('.doc-sidebar-modal-list');
    list.innerHTML = '';
    node.children.forEach(function (child) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + child.id;
        a.textContent = child.label;
        a.addEventListener('click', function (e) {
            e.preventDefault();
            goToSection(child.id);
            closeModal();
        });
        li.appendChild(a);
        list.appendChild(li);
    });
    el.classList.add('open');
}

// tree: array of { label, id, children?: [{ label, id }] }
window.renderDocSidebar = function (mountEl, tree) {
    const nav = document.createElement('nav');
    nav.className = 'doc-sidebar-nav';
    const ul = document.createElement('ul');
    ul.className = 'doc-sidebar-list';

    const parentRows = [];
    const allLinks = [];
    const targets = [];

    tree.forEach(function (node) {
        const li = document.createElement('li');
        li.className = 'doc-sidebar-item';

        if (node.children && node.children.length) {
            const row = document.createElement('div');
            row.className = 'doc-sidebar-parent-row';
            row.tabIndex = 0;
            row.setAttribute('role', 'button');

            const label = document.createElement('span');
            label.textContent = node.label;
            const icon = document.createElement('i');
            icon.className = 'fa fa-angle-right';

            row.appendChild(label);
            row.appendChild(icon);
            row.addEventListener('click', function () { openModal(node); });
            row.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(node);
                }
            });

            li.appendChild(row);
            parentRows.push({ row: row, childIds: node.children.map(function (c) { return c.id; }) });

            node.children.forEach(function (child) {
                const el = document.getElementById(child.id);
                if (el) targets.push({ el: el, row: row });
            });
        } else {
            const a = document.createElement('a');
            a.href = '#' + node.id;
            a.textContent = node.label;
            a.dataset.target = node.id;
            a.addEventListener('click', function (e) {
                e.preventDefault();
                goToSection(node.id);
            });
            li.appendChild(a);
            allLinks.push(a);

            const el = document.getElementById(node.id);
            if (el) targets.push({ el: el, link: a });
        }

        ul.appendChild(li);
    });

    nav.appendChild(ul);
    mountEl.appendChild(nav);

    // Mobile: turn the sidebar into a slide-in drawer with a floating toggle
    // button and a backdrop, GitBook-style.
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'doc-sidebar-mobile-toggle';
    toggleBtn.innerHTML = '<i class="fa fa-list"></i> Contents';
    document.body.appendChild(toggleBtn);

    const backdrop = document.createElement('div');
    backdrop.className = 'doc-sidebar-backdrop';
    document.body.appendChild(backdrop);

    function openDrawer() {
        mountEl.classList.add('mobile-open');
        backdrop.classList.add('open');
    }
    function closeDrawer() {
        mountEl.classList.remove('mobile-open');
        backdrop.classList.remove('open');
    }
    closeMobileDrawer = closeDrawer;

    toggleBtn.addEventListener('click', function () {
        if (mountEl.classList.contains('mobile-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });
    backdrop.addEventListener('click', closeDrawer);

    // Highlight (but never auto-open) whichever entry matches the section
    // currently in view.
    function clearActive() {
        allLinks.forEach(function (a) { a.classList.remove('active'); });
        parentRows.forEach(function (p) { p.row.classList.remove('active'); });
    }

    if (targets.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                const match = targets.find(function (t) { return t.el === entry.target; });
                if (!match) return;
                clearActive();
                if (match.link) match.link.classList.add('active');
                if (match.row) match.row.classList.add('active');
            });
        }, { rootMargin: '-10% 0px -75% 0px' });

        targets.forEach(function (t) { observer.observe(t.el); });
    }

    // On direct load with a hash, just highlight the relevant entry - do not open anything.
    if (location.hash) {
        const hash = location.hash.slice(1);
        const directLink = allLinks.find(function (a) { return a.dataset.target === hash; });
        if (directLink) directLink.classList.add('active');
        parentRows.forEach(function (p) {
            if (p.childIds.indexOf(hash) !== -1) p.row.classList.add('active');
        });

        const el = document.getElementById(hash);
        if (el) {
            requestAnimationFrame(function () {
                el.scrollIntoView({ block: 'start' });
            });
        }
    }
};
