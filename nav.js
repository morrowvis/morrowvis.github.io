// Shared navbar + footer. Needs <div id="navbarMount"></div> and
// <div id="footerMount"></div>, window.SITE_BASE = path to root, and
// data-page on <body> to highlight the matching nav link.

(function () {
    const BASE = window.SITE_BASE || '';
    const PAGE = document.body.dataset.page || '';
    const DOC_PAGES = ['documentation', 'goals', 'roadmap', 'credits', 'nif-to-ue5', 'json-to-ue5'];

    const HOME_HREF = BASE === '' ? './' : BASE;

    const navHTML =
        '<nav class="navbar">' +
            '<div class="container">' +
                '<div class="logo"><h1><a href="' + HOME_HREF + '">MVP</a></h1></div>' +
                '<ul class="nav-links" id="navLinks">' +
                    '<li><a href="' + BASE + 'download" data-page="download">Download</a></li>' +
                    '<li><a href="' + BASE + 'orthographics" data-page="orthographics">Orthographics</a></li>' +
                    '<li><a href="' + BASE + 'tools" data-page="tools">Tools</a></li>' +
                    '<li class="has-dropdown">' +
                        '<a href="' + BASE + 'documentation/" class="dropdown-toggle" data-page="documentation">Documentation <i class="fa fa-caret-down"></i></a>' +
                        '<ul class="dropdown-menu">' +
                            '<li><a href="' + BASE + 'documentation/goals/" data-page="goals">Goals</a></li>' +
                            '<li><a href="' + BASE + 'documentation/roadmap/" data-page="roadmap">Roadmap</a></li>' +
                            '<li><a href="' + BASE + 'documentation/credits/" data-page="credits">Credits</a></li>' +
                            '<li class="dropdown-divider"></li>' +
                            '<li><span class="dropdown-label">Pipeline</span></li>' +
                            '<li><a href="' + BASE + 'documentation/nif-to-ue5/" data-page="nif-to-ue5">NIF to UE5</a></li>' +
                            '<li><a href="' + BASE + 'documentation/json-to-ue5/" data-page="json-to-ue5">JSON to UE5</a></li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
                '<a href="javascript:void(0);" class="nav-toggle" id="navToggle"><i class="fa fa-bars"></i></a>' +
            '</div>' +
        '</nav>';

    const footerHTML =
        '<footer>' +
            '<div class="container">' +
                '<p>The Elder Scrolls III: Morrowind &copy; Bethesda Softworks.' +
                    '<br>Morrowind Visualisation Project is an unofficial, fan-made project.</br>' +
                '</p>' +
                '<p><a href="https://www.youtube.com/@ms-arch">YouTube</a> <span class="footer-sep">|</span> ' +
                '<a href="https://github.com/morrowvis">GitHub</a> <span class="footer-sep">|</span> ' +
                '<a href="https://ms-arch.gitbook.io/morrowvis/">GitBook</a></p>' +
            '</div>' +
        '</footer>';

    const navMount = document.getElementById('navbarMount');
    const footerMount = document.getElementById('footerMount');
    if (navMount) navMount.outerHTML = navHTML;
    if (footerMount) footerMount.outerHTML = footerHTML;

    document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
        if (a.dataset.page === PAGE) {
            a.classList.add('active');
        }
        if (a.dataset.page === 'documentation' && DOC_PAGES.indexOf(PAGE) !== -1) {
            a.classList.add('active');
        }
    });

    const navbar = document.querySelector('.navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    window.addEventListener('load', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    });

    if (toggle) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('open');
            navbar.classList.toggle('menu-open');
        });
    }

    // Reset menu state when crossing the breakpoint - kept in step with style.css.
    const mobileNav = window.matchMedia('(max-width: 1024px), (orientation: landscape) and (max-height: 500px)');

    function closeAllMenus() {
        // no-transition + reflow so the panel snaps shut instead of animating on resize.
        links.classList.add('no-transition');

        links.classList.remove('open');
        navbar.classList.remove('menu-open');
        document.querySelectorAll('.has-dropdown.open').forEach(function (p) {
            p.classList.remove('open');
        });

        void links.offsetWidth;   // force the reflow
        links.classList.remove('no-transition');
    }

    if (mobileNav.addEventListener) {
        mobileNav.addEventListener('change', closeAllMenus);
    } else if (mobileNav.addListener) {
        mobileNav.addListener(closeAllMenus); // Safari < 14
    }

    // JS-driven dropdown (not CSS :hover) so the close can be delayed.
    let closeTimer = null;

    function openDropdown(parent) {
        clearTimeout(closeTimer);
        document.querySelectorAll('.has-dropdown.open').forEach(function (p) {
            if (p !== parent) p.classList.remove('open');
        });
        parent.classList.add('open');
    }

    function scheduleClose(parent) {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
            parent.classList.remove('open');
        }, 400);
    }

    // Hover-to-open only where hovering exists; on touch it would open-then-navigate.
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (canHover) {
        document.querySelectorAll('.has-dropdown').forEach(function (parent) {
            parent.addEventListener('mouseenter', function () {
                openDropdown(parent);
            });
            parent.addEventListener('mouseleave', function () {
                scheduleClose(parent);
            });
        });
    }

    document.querySelectorAll('.dropdown-toggle').forEach(function (toggleLink) {
        toggleLink.addEventListener('click', function (e) {
            const parent = toggleLink.closest('.has-dropdown');
            if (!parent) return;

            // The caret toggles the submenu; the label text still navigates.
            if (e.target.closest('.fa-caret-down')) {
                e.preventDefault();
                e.stopPropagation();
                if (parent.classList.contains('open')) {
                    parent.classList.remove('open');
                } else {
                    openDropdown(parent);
                }
                return;
            }

            // Hover already opened it; open (not navigate) if somehow still closed.
            if (canHover && !parent.classList.contains('open')) {
                e.preventDefault();
                openDropdown(parent);
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown.open').forEach(function (p) {
                p.classList.remove('open');
            });
        }
    });
})();