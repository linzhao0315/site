(function() {
  var HASH = '9aaf689fbcdfe9f64a071f9cbe28ae44193fa218e72af24456f44bed64583b4d';
  var KEY = 'portfolio_auth';

  if (sessionStorage.getItem(KEY) === HASH) return;

  document.documentElement.style.overflow = 'hidden';

  var overlay = document.createElement('div');
  overlay.id = 'auth-gate';
  overlay.innerHTML =
    '<div style="max-width:340px;width:90%;text-align:center">' +
      '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:1.8rem;font-weight:400;color:#252520;margin-bottom:8px">Lin Zhao</div>' +
      '<div style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;color:#787668;margin-bottom:36px">Portfolio</div>' +
      '<input id="auth-input" type="password" placeholder="Enter password" autocomplete="off" style="' +
        'width:100%;padding:14px 18px;border:1.5px solid #C4B094;border-radius:12px;' +
        'background:rgba(253,250,246,0.8);font-family:\'DM Sans\',system-ui,sans-serif;font-size:1rem;' +
        'color:#252520;outline:none;text-align:center;transition:border-color 0.2s' +
      '">' +
      '<div id="auth-error" style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:0.8rem;color:#B87D5A;margin-top:12px;opacity:0;transition:opacity 0.3s"></div>' +
    '</div>';

  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;' +
    'display:flex;align-items:center;justify-content:center;' +
    'background:#F4F0E8;';

  document.body.insertBefore(overlay, document.body.firstChild);

  var input = document.getElementById('auth-input');
  var error = document.getElementById('auth-error');
  input.focus();

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') verify();
  });

  async function verify() {
    var val = input.value;
    var enc = new TextEncoder();
    var buf = await crypto.subtle.digest('SHA-256', enc.encode(val));
    var arr = Array.from(new Uint8Array(buf));
    var hex = arr.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');

    if (hex === HASH) {
      sessionStorage.setItem(KEY, HASH);
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.4s ease';
      document.documentElement.style.overflow = '';
      setTimeout(function() { overlay.remove(); }, 400);
    } else {
      error.textContent = 'Incorrect password';
      error.style.opacity = '1';
      input.style.borderColor = '#B87D5A';
      input.value = '';
      setTimeout(function() {
        error.style.opacity = '0';
        input.style.borderColor = '#C4B094';
      }, 2000);
    }
  }
})();
