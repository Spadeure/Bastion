// MEKANIK WAR: TITANS — the game sounds (real recordings, assets/sfx/*.mp3, about 300 KB in all).
// Sounds: "Oculus Audio Pack 01" by Oculus VR, LLC, CC BY 4.0 (credit in js/legal.js), cut and mixed for the game.
// SFX.play('build') ... ; SFX.on (true/false) and SFX.vol (0..1) are kept on the device.
// The files are loaded only after the first touch (browsers forbid sound before it), then kept in memory.
(function(){
  const S = {};
  const NAMES = ['build','buildDone','research','researchDone','train','attack','victory','defeat','reward','chest','speed','chat','levelUp'];
  const V = 1;   // add ?v=N here when a sound file is replaced
  const ls = (k,d)=>{ try{ const v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } };
  S.on = ls('bastion_sfx','1')!=='0';
  S.vol = Math.max(0, Math.min(1, parseFloat(ls('bastion_sfxvol','0.65'))||0.65));
  S.set = (on, vol)=>{ if(on!=null) S.on=!!on; if(vol!=null) S.vol=Math.max(0,Math.min(1,vol));
    try{ localStorage.setItem('bastion_sfx',S.on?'1':'0'); localStorage.setItem('bastion_sfxvol',String(S.vol)); }catch(e){} if(S.on) load(); };
  let ctx=null, out=null, loading=false; const buf={}, last={};
  // the game gives its audio context after the first touch
  S.ctx = c=>{ if(c && c!==ctx){ ctx=c; out=null; } if(S.on) load(); return ctx; };
  function load(){ if(loading || !ctx) return; loading=true;
    for(const n of NAMES) fetch('assets/sfx/'+n+'.mp3?v='+V).then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(a=>new Promise((ok,ko)=>ctx.decodeAudioData(a,ok,ko))).then(b=>{ buf[n]=b; }).catch(()=>{}); }
  // plays a sound (the same sound never twice in 250 ms, so that many events at once do not make a din)
  S.play = name=>{
    if(!S.on || !S.vol || !ctx) return;
    const b=buf[name]; if(!b) return;
    const now=performance.now(); if(last[name] && now-last[name]<250) return; last[name]=now;
    try{ if(ctx.state==='suspended') ctx.resume();
      if(!out){ out=ctx.createGain(); out.connect(ctx.destination); }
      out.gain.value=S.vol;
      const s=ctx.createBufferSource(); s.buffer=b; s.connect(out); s.start(); }catch(e){} };
  S.ready = () => Object.keys(buf).length;   // how many sounds are loaded (for the tests)
  globalThis.SFX = S;
})();
