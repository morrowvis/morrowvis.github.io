(function () {
    'use strict';

    const form = document.getElementById('downloadLock');
    const input = document.getElementById('downloadPassword');
    const button = document.getElementById('downloadUnlock');
    const status = document.getElementById('downloadStatus');
    const ready = document.getElementById('downloadReady');
    const fallback = document.getElementById('downloadFallback');
    const lock = window.DOWNLOAD_LOCK;

    if (!form || !lock) return;

    if (!window.crypto || !window.crypto.subtle) {
        fallback.textContent = 'Download requires a secure (https) connection';
        return;
    }

    const SESSION_KEY = 'morrowvis:download-url';

    const fromBase64 = function (s) {
        return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); });
    };

    function deriveKey(password, salt, iterations) {
        return crypto.subtle.importKey(
            'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
        ).then(function (base) {
            return crypto.subtle.deriveKey(
                { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' },
                base,
                { name: 'AES-GCM', length: 256 },
                false,
                ['decrypt']
            );
        });
    }

    function unlock(url) {
        let parsed;
        try {
            parsed = new URL(url);
        } catch (e) {
            setStatus('That password worked, but the stored link is malformed.', true);
            return;
        }
        if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
            setStatus('That password worked, but the stored link is malformed.', true);
            return;
        }

        try { sessionStorage.setItem(SESSION_KEY, url); } catch (e) {}

        ready.href = url;
        ready.hidden = false;
        form.hidden = true;
    }

    function setStatus(message, isError) {
        status.textContent = message;
        status.classList.toggle('is-error', !!isError);
    }

    function setBusy(busy) {
        input.disabled = busy;
        button.disabled = busy;
        button.textContent = busy ? 'Checking…' : 'Unlock';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const password = input.value;
        if (!password) return;

        setBusy(true);
        setStatus('Deriving key…', false);

        const salt = fromBase64(lock.salt);
        const iv = fromBase64(lock.iv);
        const ciphertext = fromBase64(lock.ct);

        deriveKey(password, salt, lock.iterations).then(function (key) {
            return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ciphertext);
        }).then(function (plain) {
            setBusy(false);
            setStatus('', false);
            unlock(new TextDecoder().decode(plain).replace(/\0+$/, ''));
        }).catch(function () {
            setBusy(false);
            setStatus('Incorrect password.', true);
            input.select();
        });
    });

    let remembered = null;
    try { remembered = sessionStorage.getItem(SESSION_KEY); } catch (e) {}

    fallback.hidden = true;
    if (remembered) {
        unlock(remembered);
    } else {
        form.hidden = false;
    }
})();
