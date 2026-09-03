const bar=document.getElementById('bar');
  addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';},{passive:true});

  // parallax on hero (smooth)
  const mtn=document.getElementById('mtn'),hn=document.getElementById('hname');
  let ty=0,cur=0;
  addEventListener('scroll',()=>{ty=scrollY;},{passive:true});
  (function pl(){cur+=(ty-cur)*.12;if(mtn){mtn.style.transform='translateY('+(cur*0.12)+'px)';hn.style.transform='translateY('+(cur*-0.06)+'px)';}requestAnimationFrame(pl);})();

  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(sndOn&&e.target.classList.contains('pc'))tone(760,.06,'sine',.04);io.unobserve(e.target);}}),{threshold:.2,rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.rv,.nfs').forEach(el=>io.observe(el));

  let AC=null,sndOn=true;const sbtn=document.getElementById('snd');
  function ensureAC(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}}if(AC.state==='suspended')AC.resume();}
  function tone(f,d,t,v){if(!sndOn)return;ensureAC();if(!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.type=t||'sine';o.frequency.value=f;g.gain.setValueAtTime(0,AC.currentTime);g.gain.linearRampToValueAtTime(v||.05,AC.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d);}
  function clickSnd(){if(!sndOn)return;tone(520,.05,'triangle',.055);setTimeout(()=>tone(880,.08,'sine',.035),16);}
  sbtn.classList.add('on');sbtn.childNodes[1].textContent=' Sound on';
  sbtn.addEventListener('click',()=>{sndOn=!sndOn;sbtn.classList.toggle('on',sndOn);sbtn.childNodes[1].textContent=sndOn?' Sound on':' Sound off';if(sndOn){ensureAC();tone(660,.12,'sine',.06);}});
  document.querySelectorAll('a,.pc').forEach(el=>el.addEventListener('mouseenter',()=>tone(900,.05,'sine',.025)));
  document.querySelectorAll('a,button').forEach(el=>{if(el.id==='snd')return;el.addEventListener('click',clickSnd);});
  // magnetic pull on interactive elements
  (function(){
    if(matchMedia('(pointer:coarse)').matches)return;
    document.querySelectorAll('nav a,.cta,.pacts a,.clinks a,#contact a,#snd,.pc').forEach(el=>{
      const soft=el.classList.contains('pc');const str=soft?0.12:0.4;
      el.style.transition='transform .28s cubic-bezier(.2,.8,.2,1)';el.style.willChange='transform';
      el.addEventListener('mouseenter',()=>tone(soft?440:620,.06,'sine',.035));
      el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);el.style.transform='translate('+(dx*str)+'px,'+(dy*str)+'px)'+(soft?'':' scale(1.04)');});
      el.addEventListener('mouseleave',()=>{el.style.transform='';});
    });
  })();
  // hover tones over What I do / Toolkit / Recognition & certs
  document.querySelectorAll('.svc>div').forEach(col=>{
    const notes=[523,587,659,740,830];
    col.querySelectorAll('li').forEach((li,i)=>li.addEventListener('mouseenter',()=>tone(notes[i%notes.length],.06,'sine',.035)));
    const h=col.querySelector('h4');if(h)h.addEventListener('mouseenter',()=>tone(392,.09,'triangle',.04));
  });

  if(matchMedia('(pointer:fine)').matches){
    document.body.classList.add('dcur');
    const d=document.createElement('div'),r=document.createElement('div');d.className='cd';r.className='cr';document.body.append(d,r);
    const NS='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(NS,'svg');svg.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:95;pointer-events:none;mix-blend-mode:difference';
    svg.innerHTML='<defs><filter id="goof"><feGaussianBlur in="SourceGraphic" stdDeviation="16" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -9"/></filter></defs>';
    const g=document.createElementNS(NS,'g');g.setAttribute('filter','url(#goof)');g.setAttribute('fill','#fff');svg.appendChild(g);document.body.appendChild(svg);
    let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    const N=18,blobs=[],circ=[];
    for(let i=0;i<N;i++){const c=document.createElementNS(NS,'circle');c.setAttribute('r',Math.max(18,56-i*2.1));g.appendChild(c);circ.push(c);blobs.push({x:mx,y:my});}
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;d.style.left=mx+'px';d.style.top=my+'px';});
    (function lp(){
      rx+=(mx-rx)*.2;ry+=(my-ry)*.2;r.style.left=rx+'px';r.style.top=ry+'px';
      blobs[0].x+=(mx-blobs[0].x)*0.085;blobs[0].y+=(my-blobs[0].y)*0.085;circ[0].setAttribute('cx',blobs[0].x);circ[0].setAttribute('cy',blobs[0].y);
      for(let i=1;i<N;i++){const b=blobs[i],p=blobs[i-1];b.x+=(p.x-b.x)*0.45;b.y+=(p.y-b.y)*0.45;circ[i].setAttribute('cx',b.x);circ[i].setAttribute('cy',b.y);}
      requestAnimationFrame(lp);
    })();
    document.querySelectorAll('a,.pc,button').forEach(el=>{el.addEventListener('mouseenter',()=>r.classList.add('big'));el.addEventListener('mouseleave',()=>r.classList.remove('big'));});
  }
