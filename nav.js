(function () {
    var navbar = document.querySelector('.navbar');
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

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
            var parent = toggleLink.closest('.has-dropdown');
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
