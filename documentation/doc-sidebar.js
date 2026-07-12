// Shared sidebar + heading-anchor helpers for the Documentation pages
// (Goals, Roadmap, Credits). Each page builds its own tree from its own
// data file and calls renderDocSidebar() once the content is in the DOM.

window.docSlugify = function (s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// Adds an id to a heading element and a "#" link that appears on hover,
// so any heading can be linked to directly.
window.addHeadingAnchor = function (headingEl, id) {
    headingEl.id = id;
    const a = document.createElement('a');
    a.href = '#' + id;
    a.className = 'heading-anchor';
    a.textContent = '#';
    a.setAttribute('aria-label', 'Link to this section');
    headingEl.appendChild(a);
};

// tree: array of { label, id, children?: [{ label, id }] }
window.renderDocSidebar = function (mountEl, tree) {
    const nav = document.createElement('nav');
    nav.className = 'doc-sidebar-nav';
    const ul = document.createElement('ul');
    ul.className = 'doc-sidebar-list';

    function goTo(id) {
        const el = document.getElementById(id);
        if (!el) return;
        history.pushState(null, '', '#' + id);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function makeLink(label, id) {
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = label;
        a.dataset.target = id;
        a.addEventListener('click', function (e) {
            e.preventDefault();
            goTo(id);
        });
        return a;
    }

    const parentItems = [];

    tree.forEach(function (node) {
        const li = document.createElement('li');
        li.className = 'doc-sidebar-item';

        if (node.children && node.children.length) {
            const row = document.createElement('div');
            row.className = 'doc-sidebar-parent-row';

            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'doc-sidebar-toggle';
            toggleBtn.innerHTML = '<i class="fa fa-angle-right"></i>';
            toggleBtn.setAttribute('aria-label', 'Expand ' + node.label);

            const link = makeLink(node.label, node.id);
            link.className = 'doc-sidebar-parent-link';

            row.appendChild(toggleBtn);
            row.appendChild(link);
            li.appendChild(row);

            const childUl = document.createElement('ul');
            childUl.className = 'doc-sidebar-children';
            node.children.forEach(function (child) {
                const childLi = document.createElement('li');
                childLi.appendChild(makeLink(child.label, child.id));
                childUl.appendChild(childLi);
            });
            li.appendChild(childUl);

            function setOpen(open) {
                li.classList.toggle('open', open);
            }
            toggleBtn.addEventListener('click', function () {
                setOpen(!li.classList.contains('open'));
            });

            li._setOpen = setOpen;
            li._childIds = node.children.map(function (c) { return c.id; });
            parentItems.push(li);
        } else {
            li.appendChild(makeLink(node.label, node.id));
        }

        ul.appendChild(li);
    });

    nav.appendChild(ul);
    mountEl.appendChild(nav);

    function openForHash() {
        const hash = location.hash.replace('#', '');
        if (!hash) return;
        parentItems.forEach(function (li) {
            if (li._childIds.indexOf(hash) !== -1) {
                li._setOpen(true);
            }
        });
    }
    openForHash();
    window.addEventListener('hashchange', openForHash);

    // Highlight the link matching whichever section is currently in view.
    const allLinks = nav.querySelectorAll('a[data-target]');
    const targets = [];
    allLinks.forEach(function (a) {
        const el = document.getElementById(a.dataset.target);
        if (el) targets.push({ el: el, link: a });
    });

    if (targets.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                allLinks.forEach(function (a) { a.classList.remove('active'); });
                const match = targets.find(function (t) { return t.el === entry.target; });
                if (match) {
                    match.link.classList.add('active');
                    const parentLi = match.link.closest('.doc-sidebar-item');
                    if (parentLi && parentLi._setOpen) parentLi._setOpen(true);
                }
            });
        }, { rootMargin: '-10% 0px -75% 0px' });

        targets.forEach(function (t) { observer.observe(t.el); });
    }

    // Content is built dynamically, so the browser's native "scroll to hash
    // on load" can't run before this point - do it manually.
    if (location.hash) {
        const el = document.getElementById(location.hash.slice(1));
        if (el) {
            requestAnimationFrame(function () {
                el.scrollIntoView({ block: 'start' });
            });
        }
    }
};
