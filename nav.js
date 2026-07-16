// Shared navbar + footer for every page.
//
// Usage: put an empty <div id="navbarMount"></div> as the first thing in <body>,
// and an empty <div id="footerMount"></div> where the footer should go, then:
//
//   <script>window.SITE_BASE = '../../';</script>   <!-- path back to site root -->
//   <script src="../../nav.js"></script>
//
// Set data-page on <body> (e.g. data-page="credits") to highlight the matching
// nav link. Documentation subpages (goals/roadmap/credits/pipeline) also light
// up the "Documentation" parent link.

(function () {
    const BASE = window.SITE_BASE || '';
    const PAGE = document.body.dataset.page || '';
    const DOC_PAGES = ['documentation', 'goals', 'roadmap', 'credits', 'nif-to-ue5', 'json-to-ue5'];

    // Same extension-less convention as the rest of the nav (download,
    // orthographics, tools) - relies on the host serving directory indexes,
    // same as every other link here.
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
                '<a href="https://github.com/ms-arch-mvp">GitHub</a> <span class="footer-sep">|</span> ' +
                '<a href="https://ms-arch.gitbook.io/morrowind-visualisation-project/">GitBook</a></p>' +
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

    // Menu state is only CSS classes, and nothing cleared them when the layout
    // flipped between the desktop bar and the burger menu - so a class set in one
    // mode lingered into the other, where it means something different. '.open'
    // on the links list is the obvious one: inert on desktop, but exactly what
    // reveals the burger panel. Reset everything when the breakpoint is crossed.
    // Query must stay in step with the navbar breakpoint in style.css.
    const mobileNav = window.matchMedia('(max-width: 1024px), (orientation: landscape) and (max-height: 500px)');

    function closeAllMenus() {
        // Crossing into mobile applies opacity:0 *and* its transition in the same
        // style change, so the panel would animate down from the desktop bar's
        // opacity:1 - i.e. flash open and fade out. Suppress the transition,
        // force a reflow so the hidden state lands un-animated, then restore it
        // so real toggles still fade.
        links.classList.add('no-transition');

        links.classList.remove('open');
        navbar.classList.remove('menu-open');
        document.querySelectorAll('.has-dropdown.open').forEach(function (p) {
            p.classList.remove('open');
        });

        void links.offsetWidth; // reflow: commit the above with transitions off
        links.classList.remove('no-transition');
    }

    if (mobileNav.addEventListener) {
        mobileNav.addEventListener('change', closeAllMenus);
    } else if (mobileNav.addListener) {
        mobileNav.addListener(closeAllMenus); // Safari < 14
    }

    // Dropdown open/close is driven entirely by JS (not CSS :hover) so it can
    // be forgiving: closing is delayed briefly so a quick mouse movement
    // across the small gap between the toggle and the menu doesn't slam it
    // shut. Click still works for touch (first tap opens, click outside or
    // on the toggle again closes/navigates).
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

    // Only wire hover-to-open on devices that actually hover. On touch, a tap
    // fires a synthetic mouseenter which would open (then the same tap's click
    // sees it as already-open and navigates) - which is exactly why tapping
    // "Documentation" jumped straight to the page instead of showing sub-items.
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

            // Tapping the caret toggles the submenu open/closed and never
            // navigates, so touch users can reveal the sub-items. The label
            // text still follows the link to the Documentation page.
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

            // On hover devices the menu is already open by the time the label
            // is clicked, so this just lets the link through; if somehow it's
            // closed, open it rather than navigate on the first click.
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