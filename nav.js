// Shared navbar + footer. Needs <div id="navbarMount"></div> and
// <div id="footerMount"></div>, window.SITE_BASE = path to root, and
// data-page on <body> to highlight the matching nav link.

(function () {
    const BASE = window.SITE_BASE || '';
    const PAGE = document.body.dataset.page || '';
    const DOC_PAGES = ['documentation', 'documentation-tools', 'goals', 'roadmap', 'credits', 'modlists', 'disclosures',
        'io-scene-mw-mwv', 'export-cells-mwse', 'thumbnail-generator-mwse', 'morrowind-modding-history'];

    const HOME_HREF = BASE === '' ? './' : BASE;

    const navHTML =
        '<nav class="navbar">' +
            '<div class="container">' +
                '<div class="logo"><h1><a href="' + HOME_HREF + '">MWV</a></h1></div>' +
                '<ul class="nav-links" id="navLinks">' +
                    '<li><a href="' + BASE + 'download" data-page="download">Download</a></li>' +
                    '<li><a href="' + BASE + 'tools" data-page="tools">Tools</a></li>' +
                    '<li class="has-dropdown">' +
                        '<a href="' + BASE + 'documentation/" class="dropdown-toggle" data-page="documentation">Documentation <i class="fa fa-caret-down"></i></a>' +
                        '<ul class="dropdown-menu">' +
                            '<li><a href="' + BASE + 'documentation/goals/" data-page="goals">Goals</a></li>' +
                            '<li><a href="' + BASE + 'documentation/roadmap/" data-page="roadmap">Roadmap</a></li>' +
                            '<li><a href="' + BASE + 'documentation/credits/" data-page="credits">Credits</a></li>' +
                            '<li><a href="' + BASE + 'documentation/modlists/" data-page="modlists">Modlists</a></li>' +
                            '<li><a href="' + BASE + 'documentation/tools/" data-page="documentation-tools">Tools</a></li>' +
                            '<li><a href="' + BASE + 'documentation/disclosures/" data-page="disclosures">Disclosures</a></li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
                '<a href="javascript:void(0);" class="nav-toggle" id="navToggle" aria-label="Menu"><svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" focusable="false"><line x1="5" y1="6" x2="27" y2="6"/><line x1="5" y1="16" x2="27" y2="16"/><line x1="5" y1="26" x2="27" y2="26"/></svg></a>' +
            '</div>' +
        '</nav>';

    const footerHTML =
        '<footer>' +
            '<div class="container">' +
                '<p>The Elder Scrolls III: Morrowind <span class="footer-bethesda">&copy; Bethesda Softworks.</span>' +
                    '<br>morrowvis is an unofficial, fan-made project.</br>' +
                '</p>' +
                '<p><a href="https://www.youtube.com/@morrowvis" target="_blank" rel="noopener noreferrer">YouTube</a> <span class="footer-sep">|</span> ' +
                '<a href="https://github.com/morrowvis" target="_blank" rel="noopener noreferrer">GitHub</a> <span class="footer-sep">|</span> ' +
                '<button type="button" class="btn-link footer-contact-trigger" aria-haspopup="dialog" aria-controls="contactModal">Contact</button></p>' +
            '</div>' +
        '</footer>' +
        '<div class="contact-modal-backdrop" id="contactModal" role="dialog" aria-modal="true" aria-label="Contact">' +
            '<div class="contact-modal">' +
                '<button type="button" class="contact-modal-close" aria-label="Close contact popup">&times;</button>' +
                '<img class="contact-modal-profile" src="' + BASE + 'images/profile.jpg" alt="MS profile">' +
                '<div class="contact-info-box">' +
                    '<p class="contact-info-intro">MS can be contacted via Discord at</p>' +
                    '<p class="contact-info-username">Username: ' +
                        '<button type="button" class="btn btn-secondary contact-copy-button" aria-label="Copy Discord username morrowvis">morrowvis</button>' +
                    '</p>' +
                '</div>' +
                '<p class="contact-copy-status" aria-live="polite"></p>' +
            '</div>' +
        '</div>';

    const navMount = document.getElementById('navbarMount');
    const footerMount = document.getElementById('footerMount');
    if (navMount) navMount.outerHTML = navHTML;
    if (footerMount) footerMount.outerHTML = footerHTML;

    const contactTrigger = document.querySelector('.footer-contact-trigger');
    const contactModal = document.getElementById('contactModal');
    const contactClose = contactModal && contactModal.querySelector('.contact-modal-close');
    const contactCopy = contactModal && contactModal.querySelector('.contact-copy-button');
    const contactCopyStatus = contactModal && contactModal.querySelector('.contact-copy-status');

    function closeContactModal() {
        if (!contactModal || !contactModal.classList.contains('open')) return;
        contactModal.classList.remove('open');
        resetCopyResult();
        if (contactTrigger) contactTrigger.focus();
    }

    function resetCopyResult() {
        if (!contactCopyStatus) return;
        contactCopyStatus.textContent = '';
        contactCopyStatus.classList.remove('is-error');
    }

    function fallbackCopyUsername() {
        const input = document.createElement('textarea');
        input.value = 'morrowvis';
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        let copied = false;
        try {
            copied = document.execCommand('copy');
        } catch (error) {
            copied = false;
        }
        input.remove();
        return copied;
    }

    function showCopyResult(copied) {
        if (contactCopyStatus && contactModal.classList.contains('open')) {
            contactCopyStatus.textContent = copied ? 'Copied!' : 'Copy failed';
            contactCopyStatus.classList.toggle('is-error', !copied);
        }
    }

    if (contactTrigger && contactModal && contactClose && contactCopy) {
        contactTrigger.addEventListener('click', function () {
            resetCopyResult();
            contactModal.classList.add('open');
            contactClose.focus();
        });
        contactCopy.addEventListener('click', function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText('morrowvis').then(function () {
                    showCopyResult(true);
                }, function () {
                    showCopyResult(fallbackCopyUsername());
                });
            } else {
                showCopyResult(fallbackCopyUsername());
            }
        });
        contactClose.addEventListener('click', closeContactModal);
        contactModal.addEventListener('click', function (event) {
            if (event.target === contactModal) closeContactModal();
        });
        contactModal.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeContactModal();
            } else if (event.key === 'Tab') {
                event.preventDefault();
                if (event.shiftKey && document.activeElement === contactClose) {
                    contactCopy.focus();
                } else if (!event.shiftKey && document.activeElement === contactCopy) {
                    contactClose.focus();
                } else if (document.activeElement !== contactClose && document.activeElement !== contactCopy) {
                    contactClose.focus();
                }
            }
        });
    }

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