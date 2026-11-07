// Shared tool page renderer.
// Each tool page calls renderToolPage(config) once its data is loaded.
//
// config = {
//   tabs:      [{id, label}]       — tab definitions; single-tab pages omit the switcher
//   data:      {[tabId]: tabData}  — content keyed by tab id
//   rootEl:    HTMLElement         — where to render the main content
//   sidebarEl: HTMLElement         — the doc-sidebar aside
// }
//
// tabData = {
//   hint:     string|null
//   sections: [{ heading, id, items }]
// }
//
// item = {
//   heading:  string|null   (may contain HTML — kbd, code, etc.)
//   id:       string
//   subhead:  bool          plain separator heading (file path, sub-group)
//   content:  string[]      paragraph HTML strings
//   list:     string[]      bullet list HTML strings
//   table:    string[][]    [headerRow, ...dataRows]
// }

window.renderToolPage = function (config) {
    var tabs      = config.tabs;
    var data      = config.data;
    var rootEl    = config.rootEl;
    var sidebarEl = config.sidebarEl;

    var hasTabs = tabs && tabs.length > 1;

    // ── 1. Tab switcher ───────────────────────────────────────────────────────
    // Inserted into sidebarEl FIRST so it always sits above the section nav.
    // It is NEVER removed — only the nav.doc-sidebar-nav below it is replaced.

    var switcherList = null;

    if (hasTabs) {
        var switcherWrap = document.createElement('div');
        switcherWrap.className = 'tool-tab-switcher';

        var switcherLabel = document.createElement('div');
        switcherLabel.className = 'tool-tab-switcher-label';
        switcherLabel.textContent = 'Pages';
        switcherWrap.appendChild(switcherLabel);

        switcherList = document.createElement('ul');
        switcherList.className = 'tool-tab-switcher-list';
        switcherWrap.appendChild(switcherList);

        sidebarEl.appendChild(switcherWrap);   // ← pinned to top of sidebar
    }

    // ── 2. Content area ───────────────────────────────────────────────────────

    var contentWrap = document.createElement('div');
    contentWrap.className = 'tool-content-wrap';
    rootEl.appendChild(contentWrap);

    // ── 3. Helpers ────────────────────────────────────────────────────────────

    function makeUl(items) {
        var ul = document.createElement('ul');
        ul.className = 'doc-tool-list';
        items.forEach(function (html) {
            var li = document.createElement('li');
            li.innerHTML = html;
            ul.appendChild(li);
        });
        return ul;
    }

    function makeTable(rows) {
        var table = document.createElement('table');
        table.className = 'doc-tool-table';
        var thead = document.createElement('thead');
        var trHead = document.createElement('tr');
        rows[0].forEach(function (cell) {
            var th = document.createElement('th');
            th.innerHTML = cell;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        table.appendChild(thead);
        var tbody = document.createElement('tbody');
        rows.slice(1).forEach(function (row) {
            var tr = document.createElement('tr');
            row.forEach(function (cell) {
                var td = document.createElement('td');
                td.innerHTML = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        return table;
    }

    function renderItemContent(target, item) {
        var bullets = (item.content || []).concat(item.list || []);
        if (bullets.length) target.appendChild(makeUl(bullets));
        if (item.table) target.appendChild(makeTable(item.table));
    }

    // Build a lightweight sidebar nav (used when switching tabs after the
    // first render — renderDocSidebar is called only once to set up mobile).
    function buildSimpleNav(tree) {
        var nav = document.createElement('nav');
        nav.className = 'doc-sidebar-nav';
        var ul = document.createElement('ul');
        ul.className = 'doc-sidebar-list';

        tree.forEach(function (node) {
            var li = document.createElement('li');
            li.className = 'doc-sidebar-item';
            var a = document.createElement('a');
            a.href = '#' + node.id;
            a.textContent = node.label;
            a.dataset.target = node.id;
            a.addEventListener('click', function (e) {
                e.preventDefault();
                var el = document.getElementById(node.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', '#' + node.id);
                nav.querySelectorAll('a').forEach(function (link) {
                    link.classList.remove('active');
                });
                a.classList.add('active');
            });
            li.appendChild(a);

            ul.appendChild(li);
        });

        nav.appendChild(ul);
        return nav;
    }

    // Replace the section nav inside sidebarEl without touching the switcher.
    function setSidebarNav(navEl) {
        var old = sidebarEl.querySelector('nav.doc-sidebar-nav');
        if (old) old.parentNode.removeChild(old);
        sidebarEl.appendChild(navEl);
    }

    // ── 4. Tab content renderer ───────────────────────────────────────────────

    var firstRender = true;

    function renderTab(tabId) {
        contentWrap.innerHTML = '';

        var tabData = data[tabId];
        if (!tabData) return;

        var sidebarTree = [];

        // Hint box
        if (tabData.hint) {
            var hint = document.createElement('div');
            hint.className = 'doc-hint';
            var hintP = document.createElement('p');
            hintP.innerHTML = tabData.hint;
            hint.appendChild(hintP);
            contentWrap.appendChild(hint);
        }

        tabData.sections.forEach(function (section) {
            var hasSectionHeading = Boolean(section.heading);

            // Optional h3 section heading
            if (section.heading) {
                var h3 = document.createElement('h3');
                addHeadingAnchor(h3, section.id);
                h3.querySelector('a').textContent = section.heading;
                contentWrap.appendChild(h3);
                sidebarTree.push({ label: section.heading, id: section.id });
            }

            section.items.forEach(function (item) {

                // No heading — dump content/list/table as bare nodes
                if (!item.heading) {
                    renderItemContent(contentWrap, item);
                    return;
                }

                // Subhead — small separator label (file path, sub-group name)
                if (item.subhead) {
                    var h4s = document.createElement('h4');
                    h4s.className = 'doc-tool-subhead';
                    addHeadingAnchor(h4s, item.id);
                    h4s.querySelector('a').innerHTML = item.heading;
                    contentWrap.appendChild(h4s);
                    renderItemContent(contentWrap, item);
                    if (!hasSectionHeading) {
                        sidebarTree.push({ label: h4s.textContent.trim(), id: item.id });
                    }
                    return;
                }

                // Normal item — coloured heading + content block
                var block = document.createElement('div');
                block.className = 'doc-tool-item';
                block.id = item.id;
                block.style.scrollMarginTop = '110px';

                var h4 = document.createElement('h4');
                h4.className = 'doc-tool-item-heading';
                h4.innerHTML =
                    '<a href="#' + item.id + '" class="heading-link">' + item.heading + '</a>';
                block.appendChild(h4);

                renderItemContent(block, item);

                contentWrap.appendChild(block);

                if (!hasSectionHeading) {
                    sidebarTree.push({
                        label: h4.textContent.replace(/\s+/g, ' ').trim(),
                        id: item.id
                    });
                }
            });
        });

        // Sidebar nav — first render uses renderDocSidebar (sets up mobile drawer,
        // scroll-spy, etc.); subsequent tab switches swap the nav element only.
        if (firstRender) {
            firstRender = false;
            renderDocSidebar(sidebarEl, sidebarTree);
        } else {
            setSidebarNav(buildSimpleNav(sidebarTree));
        }

        // Handle direct hash on page load
        if (location.hash) {
            var el = document.getElementById(location.hash.slice(1));
            if (el) {
                requestAnimationFrame(function () { el.scrollIntoView({ block: 'start' }); });
            }
        }
    }

    // ── 5. Build switcher buttons ─────────────────────────────────────────────

    var activeTabId = tabs[0].id;

    if (hasTabs) {
        tabs.forEach(function (tab) {
            var li  = document.createElement('li');
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'tool-tab-btn';
            btn.textContent = tab.label;
            btn.dataset.tabId = tab.id;

            if (tab.id === activeTabId) btn.classList.add('active');

            (function (t, b) {
                b.addEventListener('click', function () {
                    if (b.classList.contains('active')) return;
                    switcherList.querySelectorAll('.tool-tab-btn').forEach(function (x) {
                        x.classList.remove('active');
                    });
                    b.classList.add('active');
                    activeTabId = t.id;
                    renderTab(t.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }(tab, btn));

            li.appendChild(btn);
            switcherList.appendChild(li);
        });
    }

    // Initial render
    renderTab(activeTabId);
};
