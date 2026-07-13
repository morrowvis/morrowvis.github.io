// Shared navbar + footer for every page.
//
// Usage: put an empty <div id="navbarMount"></div> as the first thing in <body>,
// and an empty <div id="footerMount"></div> where the footer should go, then:
//
//   <script>window.SITE_BASE = '../../';</script>   <!-- path back to site root -->
//   <script src="../../nav.js"></script>
//
// Set data-page on <body> (e.g. data-page="credits") to highlight the matching
// nav link. Documentation subpages (goals/roadmap/credits) also light up the
// "Documentation" parent link.

(function () {
    const BASE = window.SITE_BASE || '';
    const PAGE = document.body.dataset.page || '';
    const DOC_PAGES = ['documentation', 'goals', 'roadmap', 'credits'];

    const navHTML =
        '<nav class="navbar">' +
            '<div class="container">' +
                '<div class="logo"><h1><a href="' + (BASE || './') + 'index.html">MVP</a></h1></div>' +
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
                            '<li><a href="https://ms-arch.gitbook.io/morrowind-visualisation-project/pipeline/nif-to-ue5">NIF to UE5</a></li>' +
                            '<li><a href="https://ms-arch.gitbook.io/morrowind-visualisation-project/pipeline/json-to-ue5">JSON to UE5</a></li>' +
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
                '<a href="' + BASE + 'documentation/">Documentation</a> <span class="footer-sep">|</span> ' +
                '<a href="https://github.com/ms-arch-mvp">GitHub</a></p>' +
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

    // Dropdown: first tap/click opens the menu instead of navigating,
    // a second tap on the same toggle (or any click outside) proceeds/closes.
    document.querySelectorAll('.dropdown-toggle').forEach(function (toggleLink) {
        toggleLink.addEventListener('click', function (e) {
            const parent = toggleLink.closest('.has-dropdown');
            if (!parent) return;
            if (!parent.classList.contains('open')) {
                e.preventDefault();
                document.querySelectorAll('.has-dropdown.open').forEach(function (p) {
                    p.classList.remove('open');
                });
                parent.classList.add('open');
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
