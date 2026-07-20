// Reusable image gallery: a grid of thumbnails plus a full-screen lightbox.
//
// Usage:
//   <div class="gallery-grid" id="galleryGrid"></div>
//   <script src="gallery/gallery-data.js"></script>   <!-- defines GALLERY -->
//   <script src="gallery.js"></script>
//   <script>initGallery({ mount: '#galleryGrid', images: GALLERY, base: 'gallery/' });</script>
//
// Options:
//   mount   grid container, element or selector          (required)
//   images  array of { file, w, h } - as built by build_gallery.bat (required)
//   base    folder containing thumbs/ and full/          (default 'gallery/')
//   thumbs  override the thumbnails folder
//   full    override the full-size folder
//
// initGallery can be called more than once on a page; every grid shares a
// single lightbox, which adopts whichever gallery was clicked.

(function () {
    'use strict';

    // Loads faster than this never show a spinner - below roughly this long it
    // reads as a glitch rather than as progress.
    const SPINNER_DELAY = 180;
    // Distance from either edge of the screen that reveals a nav arrow.
    const EDGE_ZONE = 200;
    // Travel before a touch drag counts as a swipe.
    const SWIPE_MIN = 50;

    let lb = null, lbImg = null;
    let items = [], paths = { thumbs: '', full: '' };
    let index = -1, lastFocus = null, spinTimer = null;
    let touchX = 0, touchY = 0, swiped = false;

    function hideNav() {
        lb.classList.remove('show-prev', 'show-next');
    }

    // opening: true when the lightbox is being opened, false when navigating
    // between images. The two want different behaviour for the image already
    // sitting in the element - see below.
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
            // Already in cache (revisit, or a local/fast disk): onload still
            // fires async, so without this the spinner would flash for a frame
            // on an image that was ready instantly.
            reveal();
        } else {
            // Whatever is in the element is the previously viewed image. When
            // navigating that is what we want - it holds the frame rather than
            // flashing black. When opening it is a different picture entirely,
            // so drop it instead of showing the wrong one.
            if (opening) lbImg.removeAttribute('src');
            // Only once it's clearly slow: fades the previous image out and
            // brings the spinner up together.
            spinTimer = setTimeout(function () {
                if (index === wanted) lb.classList.add('is-loading');
            }, SPINNER_DELAY);
        }
    }

    function openAt(i) {
        lastFocus = document.activeElement;

        // Locking the body hides the page's scrollbar, which widens the viewport
        // by its width - and since the lightbox is sized to the viewport, the
        // image would visibly jump as it opened. Measure the scrollbar first and
        // hold both the page and the lightbox at their pre-lock width.
        const sbw = window.innerWidth - document.documentElement.clientWidth;
        if (sbw > 0) {
            document.body.style.paddingRight = sbw + 'px';
            lb.style.right = sbw + 'px';
        }
        document.body.classList.add('lightbox-open');

        // Set the image before the lightbox becomes visible. A cached image is
        // then already in place for the first painted frame; assigning it after
        // .open would show the previously viewed image for a frame while the new
        // one decoded.
        show(i, true);

        lb.classList.add('open');
        lb.querySelector('.lightbox-close').focus();
    }

    function close() {
        clearTimeout(spinTimer);   // else a pending spinner appears after closing
        hideNav();                 // don't reappear pre-revealed next time
        lb.classList.remove('open', 'is-loading');
        document.body.classList.remove('lightbox-open');
        document.body.style.paddingRight = '';
        lb.style.right = '';
        // The last image is deliberately left in place. Assigning src never
        // paints synchronously - even from cache the browser needs a frame to
        // decode - and it holds the previous frame while that happens. Clearing
        // it here left nothing to hold, so reopening flashed black. (This is
        // exactly why arrow navigation never flashed.)
        index = -1;
        if (lastFocus) lastFocus.focus();
    }

    // Built once and shared by every gallery on the page.
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

        lb.querySelector('.lightbox-close').addEventListener('click', close);
        prevBtn.addEventListener('click', function () { show(index - 1); });
        nextBtn.addEventListener('click', function () { show(index + 1); });

        // Clicking an arrow must not leave it focused. It would stay focused
        // silently, then the first arrow-key press makes the browser treat that
        // focus as keyboard-driven - :focus-visible starts matching and pins the
        // arrow visible and highlighted. Preventing the default on mousedown
        // stops the button taking focus at all; Tab still focuses it normally.
        [prevBtn, nextBtn].forEach(function (b) {
            b.addEventListener('mousedown', function (e) { e.preventDefault(); });
        });

        // Backdrop click closes; clicks on the image or controls must not.
        lb.addEventListener('click', function (e) {
            // A swipe is followed by a click, which would otherwise close the
            // lightbox the moment you tried to change image.
            if (swiped) { swiped = false; return; }
            if (e.target === lb || e.target.classList.contains('lightbox-stage')) close();
        });

        // Arrows stay hidden until the pointer nears that edge of the screen, so
        // they don't sit over the image while you're looking at it.
        lb.addEventListener('mousemove', function (e) {
            lb.classList.toggle('show-prev', e.clientX < EDGE_ZONE);
            lb.classList.toggle('show-next', e.clientX > window.innerWidth - EDGE_ZONE);
        });
        lb.addEventListener('mouseleave', hideNav);

        // Swipe left/right to move between images on touch.
        lb.addEventListener('touchstart', function (e) {
            if (e.touches.length !== 1) return;   // ignore pinch/zoom
            swiped = false;
            touchX = e.touches[0].clientX;
            touchY = e.touches[0].clientY;
        }, { passive: true });

        lb.addEventListener('touchend', function (e) {
            if (!e.changedTouches.length) return;
            const dx = e.changedTouches[0].clientX - touchX;
            const dy = e.changedTouches[0].clientY - touchY;
            // Must be mostly horizontal, so a scroll-ish drag doesn't navigate.
            if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
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
    }

    window.initGallery = function (options) {
        const opts = options || {};
        const grid = typeof opts.mount === 'string'
            ? document.querySelector(opts.mount)
            : opts.mount;
        const images = opts.images || [];

        if (!grid || !images.length) return;

        // Not `opts.base || ...`: a page sitting inside its own gallery folder
        // passes '' for base, which would fall through to the default.
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
            // Intrinsic size from the manifest: lets the browser reserve the slot
            // before the image arrives, so the grid doesn't jump.
            img.width = item.w;
            img.height = item.h;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.alt = '';

            btn.appendChild(img);
            btn.addEventListener('click', function () {
                // Point the shared lightbox at this grid's images.
                items = images;
                paths = galleryPaths;
                openAt(i);
            });
            grid.appendChild(btn);
        });
    };
})();
