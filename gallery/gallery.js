// Reusable thumbnail grid + full-screen lightbox.
// initGallery({ mount, images, base }) - images is the { file, w, h } list from
// build_gallery.bat. Call it once per grid; all grids share one lightbox.

(function () {
    'use strict';

    const SPINNER_DELAY = 180;   // ms before a slow load shows the spinner
    const EDGE_ZONE = 200;       // px from a screen edge that reveals an arrow
    const SWIPE_MIN = 50;        // px of travel before a drag counts as a swipe

    let lb = null, lbImg = null;
    let items = [], paths = { thumbs: '', full: '' };
    let index = -1, lastFocus = null, spinTimer = null;
    let touchX = 0, touchY = 0, swiped = false, multiTouch = false;

    function hideNav() {
        lb.classList.remove('show-prev', 'show-next');
    }

    // opening: dropped the stale image on open, kept it while navigating.
    function show(i, opening) {
        index = (i + items.length) % items.length;
        const item = items[index];
        const wanted = index;

        clearTimeout(spinTimer);
        lb.classList.remove('is-loading');

        const full = new Image();

        function reveal() {
            if (index !== wanted) return;   // moved on before it finished
            clearTimeout(spinTimer);
            lbImg.src = full.src;
            lb.classList.remove('is-loading');
        }

        full.onload = reveal;
        full.onerror = function () {
            clearTimeout(spinTimer);
            lb.classList.remove('is-loading');
        };
        full.src = paths.full + item.file;

        if (full.complete) {
            reveal();   // cached: onload still fires async, so reveal now
        } else {
            if (opening) lbImg.removeAttribute('src');
            spinTimer = setTimeout(function () {
                if (index === wanted) lb.classList.add('is-loading');
            }, SPINNER_DELAY);
        }
    }

    function openAt(i) {
        lastFocus = document.activeElement;

        // Hold page + lightbox at pre-lock width so hiding the scrollbar can't jump the image.
        const sbw = window.innerWidth - document.documentElement.clientWidth;
        if (sbw > 0) {
            document.body.style.paddingRight = sbw + 'px';
            lb.style.right = sbw + 'px';
        }
        document.body.classList.add('lightbox-open');

        show(i, true);   // set the image before .open so a cached one is there on the first frame

        lb.classList.add('open');
        lb.querySelector('.lightbox-close').focus();

        // Add a history entry so the phone's Back button closes the image (via
        // popstate below) instead of navigating away from the gallery.
        history.pushState({ lbOpen: true }, '');
    }

    function close(fromPopstate) {
        clearTimeout(spinTimer);
        hideNav();
        lb.classList.remove('open', 'is-loading');
        document.body.classList.remove('lightbox-open');
        document.body.style.paddingRight = '';
        lb.style.right = '';
        index = -1;   // leave the last image in the element so reopening doesn't flash black
        if (lastFocus) lastFocus.focus();

        // Balance the entry pushed on open. When Back closed the lightbox the
        // browser already popped it (fromPopstate), so don't pop again.
        if (fromPopstate !== true && history.state && history.state.lbOpen) {
            history.back();
        }
    }

    // Built once, shared by every gallery on the page.
    function ensureLightbox() {
        if (lb) return;

        lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.innerHTML =
            '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
            '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">&#10094;</button>' +
            '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">&#10095;</button>' +
            '<div class="lightbox-stage"><img class="lightbox-img" alt=""></div>' +
            '<div class="lightbox-spinner" role="status" aria-label="Loading image"></div>';
        document.body.appendChild(lb);

        lbImg = lb.querySelector('.lightbox-img');

        const prevBtn = lb.querySelector('.lightbox-prev');
        const nextBtn = lb.querySelector('.lightbox-next');

        lb.querySelector('.lightbox-close').addEventListener('click', function () { close(); });
        prevBtn.addEventListener('click', function () { show(index - 1); });
        nextBtn.addEventListener('click', function () { show(index + 1); });

        // Don't let a click focus an arrow, or a later key press pins it visible via :focus-visible.
        [prevBtn, nextBtn].forEach(function (b) {
            b.addEventListener('mousedown', function (e) { e.preventDefault(); });
        });

        lb.addEventListener('click', function (e) {
            if (swiped) { swiped = false; return; }   // the click that follows a swipe
            if (e.target === lb || e.target.classList.contains('lightbox-stage')) close();
        });

        // Reveal an arrow only when the pointer nears that edge.
        lb.addEventListener('mousemove', function (e) {
            lb.classList.toggle('show-prev', e.clientX < EDGE_ZONE);
            lb.classList.toggle('show-next', e.clientX > window.innerWidth - EDGE_ZONE);
        });
        lb.addEventListener('mouseleave', hideNav);

        lb.addEventListener('touchstart', function (e) {
            if (e.touches.length > 1) { multiTouch = true; return; }   // pinch-zoom, not a swipe
            multiTouch = false;
            swiped = false;
            touchX = e.touches[0].clientX;
            touchY = e.touches[0].clientY;
        }, { passive: true });

        lb.addEventListener('touchend', function (e) {
            if (e.touches.length > 0) return;              // wait for the last finger up
            if (multiTouch) { multiTouch = false; return; }   // the gesture was a pinch-zoom
            if (!e.changedTouches.length) return;
            const dx = e.changedTouches[0].clientX - touchX;
            const dy = e.changedTouches[0].clientY - touchY;
            if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {   // mostly horizontal
                swiped = true;
                show(index + (dx < 0 ? 1 : -1));
            }
        }, { passive: true });

        document.addEventListener('keydown', function (e) {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') show(index - 1);
            else if (e.key === 'ArrowRight') show(index + 1);
        });

        // Phone Back button (or browser Back) while the image is open: close it
        // instead of leaving the page. The pushed entry has already been popped.
        window.addEventListener('popstate', function () {
            if (lb.classList.contains('open')) close(true);
        });
    }

    window.initGallery = function (options) {
        const opts = options || {};
        const grid = typeof opts.mount === 'string'
            ? document.querySelector(opts.mount)
            : opts.mount;
        const images = opts.images || [];

        if (!grid || !images.length) return;

        // Explicit undefined check: base may legitimately be ''.
        const base = opts.base === undefined ? 'gallery/' : opts.base;
        const galleryPaths = {
            thumbs: opts.thumbs || (base + 'thumbs/'),
            full:   opts.full   || (base + 'full/')
        };

        ensureLightbox();

        images.forEach(function (item, i) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gallery-item';
            btn.setAttribute('aria-label', 'Open image ' + (i + 1) + ' of ' + images.length);

            const img = document.createElement('img');
            img.src = galleryPaths.thumbs + item.file;
            img.width = item.w;     // manifest dimensions reserve the slot, so the grid doesn't jump
            img.height = item.h;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.alt = '';

            btn.appendChild(img);
            btn.addEventListener('click', function () {
                items = images;   // point the shared lightbox at this grid
                paths = galleryPaths;
                openAt(i);
            });
            grid.appendChild(btn);
        });
    };
})();
