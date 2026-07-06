#!/usr/bin/env node
/*
 * protect.mjs — regenerate the password-encrypted case studies.
 *
 * Reads the plaintext sources in ./protected-src/ (gitignored, never committed),
 * encrypts each with AES-256-GCM using a key derived from a password you type at
 * runtime, and overwrites the served ./case-*.html files with a small shell that
 * decrypts the content in the browser.
 *
 * The password is NEVER stored on disk or in the repo. Anyone who fetches the
 * served HTML, the raw GitHub file, or disables JavaScript sees only ciphertext.
 *
 * Usage:
 *   node protect.mjs            (type the password twice when prompted)
 *
 * After it finishes:
 *   git add case-ai-pipeline.html case-ai-skill.html case-ds-code-truth.html protect.mjs .gitignore
 *   git commit -m "feat: encrypt protected case studies at rest"
 *   git push
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';
import { createInterface } from 'node:readline';

const FILES = ['case-ai-pipeline', 'case-ai-skill', 'case-ds-code-truth'];
const ITER = 250000;   // PBKDF2 iterations (must match the shell decryptor)
const KEYLEN = 32;     // AES-256
const SALT_LEN = 16;
const IV_LEN = 12;

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: !!process.stdin.isTTY,
    });
    let muted = false;
    // Mask keystrokes with '*'. The resolved value is still the full typed
    // line — masking is cosmetic. On non-TTY input, nothing is masked.
    rl._writeToOutput = (str) => {
      if (!muted || str.includes(question)) rl.output.write(str);
      else if (str.replace(/[\r\n]/g, '').length) rl.output.write('*');
    };
    rl.question(question, (value) => {
      rl.close();
      process.stdout.write('\n');
      resolve(value.trim());
    });
    muted = true;
  });
}

const SHELL = (payloadB64, iter) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F4F0E8">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>Protected &middot; Lin Zhao</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;height:100%}
  body{background:#F4F0E8;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',system-ui,sans-serif}
  .gate{max-width:340px;width:90%;text-align:center}
  .brand{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.8rem;color:#252520;margin-bottom:8px}
  .kicker{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#787668;margin-bottom:36px}
  #pw{width:100%;padding:14px 18px;border:1.5px solid #C4B094;border-radius:12px;background:rgba(253,250,246,.8);font-family:inherit;font-size:1rem;color:#252520;outline:none;text-align:center;transition:border-color .2s;box-sizing:border-box}
  #pw:focus{border-color:#5C6E4D}
  #err{font-size:.8rem;color:#B87D5A;margin-top:12px;min-height:1em;opacity:0;transition:opacity .3s}
  .hint{font-size:.7rem;color:#B4B0A6;margin-top:20px}
</style>
</head>
<body>
<div class="gate">
  <div class="brand">Lin Zhao</div>
  <div class="kicker">Portfolio</div>
  <input id="pw" type="password" placeholder="Enter password" autocomplete="off" autofocus>
  <div id="err"></div>
  <div class="hint">This case study is password-protected.</div>
</div>
<script>
(function(){
  var PAYLOAD="${payloadB64}", ITER=${iter}, KEY="kv_portfolio_pw";
  var pw=document.getElementById('pw'), err=document.getElementById('err');
  var b=atob(PAYLOAD), raw=new Uint8Array(b.length);
  for(var i=0;i<b.length;i++)raw[i]=b.charCodeAt(i);
  var salt=raw.slice(0,16), iv=raw.slice(16,28), data=raw.slice(28);
  async function tryUnlock(password){
    var enc=new TextEncoder();
    var base=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);
    var key=await crypto.subtle.deriveKey(
      {name:'PBKDF2',salt:salt,iterations:ITER,hash:'SHA-256'},
      base,{name:'AES-GCM',length:256},false,['decrypt']);
    var buf=await crypto.subtle.decrypt({name:'AES-GCM',iv:iv},key,data);
    return new TextDecoder().decode(buf);
  }
  async function attempt(password,fromStore){
    try{
      var html=await tryUnlock(password);
      sessionStorage.setItem(KEY,password);
      document.open();document.write(html);document.close();
    }catch(e){
      if(fromStore){sessionStorage.removeItem(KEY);return;}
      err.textContent='Incorrect password';err.style.opacity='1';
      pw.value='';pw.style.borderColor='#B87D5A';
      setTimeout(function(){err.style.opacity='0';pw.style.borderColor='#C4B094';},2000);
    }
  }
  pw.addEventListener('keydown',function(e){if(e.key==='Enter'&&pw.value)attempt(pw.value,false);});
  var saved=sessionStorage.getItem(KEY);
  if(saved)attempt(saved,true);
})();
</script>
</body>
</html>
`;

async function getPassword() {
  if (process.env.PROTECT_PW) return process.env.PROTECT_PW.trim();
  if (!process.stdin.isTTY) {
    // Non-interactive (piped) — read the first line as the password.
    return readFileSync(0, 'utf8').split(/\r?\n/)[0].trim();
  }
  const password = await promptHidden('Password: ');
  if (!password) { console.error('No password entered. Aborting.'); process.exit(1); }
  const confirm = await promptHidden('Confirm : ');
  if (password !== confirm) { console.error('Passwords do not match. Aborting.'); process.exit(1); }
  return password;
}

async function main() {
  const password = await getPassword();
  if (!password) { console.error('No password. Aborting.'); process.exit(1); }

  for (const name of FILES) {
    let src;
    try {
      src = readFileSync(`protected-src/${name}.html`, 'utf8');
    } catch {
      console.error(`Missing protected-src/${name}.html — skipping.`);
      continue;
    }
    const salt = randomBytes(SALT_LEN);
    const iv = randomBytes(IV_LEN);
    const key = pbkdf2Sync(password, salt, ITER, KEYLEN, 'sha256');
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const ct = Buffer.concat([cipher.update(src, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    // layout: salt | iv | ciphertext | tag  (WebCrypto expects the tag appended)
    const payload = Buffer.concat([salt, iv, ct, tag]).toString('base64');
    writeFileSync(`${name}.html`, SHELL(payload, ITER));
    console.log(`  encrypted  ${name}.html  (${src.length} chars -> ${payload.length} b64)`);
  }
  console.log('\nDone. Review, then:');
  console.log('  git add case-ai-pipeline.html case-ai-skill.html case-ds-code-truth.html protect.mjs .gitignore');
  console.log('  git commit -m "feat: encrypt protected case studies at rest"');
  console.log('  git push');
}

main();
