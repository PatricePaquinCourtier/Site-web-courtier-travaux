
document.getElementById('yr').textContent = new Date().getFullYear();

const burger = document.getElementById('burger'), menu = document.getElementById('menu');
burger.addEventListener('click', ()=>{burger.classList.toggle('open');menu.classList.toggle('open');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');menu.classList.remove('open');}));

const links=[...menu.querySelectorAll('a')], sections=links.map(a=>document.querySelector(a.getAttribute('href')));
const spy=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const id='#'+e.target.id;links.forEach(l=>l.classList.toggle('is-active',l.getAttribute('href')===id));}});},{rootMargin:'-45% 0px -50% 0px'});
sections.forEach(s=>s&&spy.observe(s));

const rev=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rev.unobserve(e.target);}});},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>rev.observe(el));

const filters=document.getElementById('filters'), cards=[...document.querySelectorAll('#gallery .card')];
filters.addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;filters.querySelectorAll('.filter').forEach(f=>f.classList.remove('is-on'));b.classList.add('is-on');const cat=b.dataset.cat;cards.forEach(c=>c.classList.toggle('hide',cat!=='all'&&c.dataset.cat!==cat));});

function initBA(el){let drag=false;const set=x=>{const r=el.getBoundingClientRect();let p=((x-r.left)/r.width)*100;p=Math.max(0,Math.min(100,p));el.style.setProperty('--pos',p+'%');};const start=e=>{drag=true;set((e.touches?e.touches[0]:e).clientX);};const move=e=>{if(drag)set((e.touches?e.touches[0]:e).clientX);};const end=()=>drag=false;el.addEventListener('pointerdown',start);window.addEventListener('pointermove',move);window.addEventListener('pointerup',end);el.style.setProperty('--pos','50%');}
document.querySelectorAll('.ba').forEach(initBA);

const cbBtn=document.getElementById('callbackBtn');
if(cbBtn){cbBtn.addEventListener('click',()=>{
  const to=document.getElementById('contactForm').dataset.email;
  const subject='Demande de rappel — échange téléphonique';
  const body='Bonjour,\n\nJe souhaite être rappelé(e) pour échanger quelques minutes au sujet de mon projet.\n\nNom :\nTéléphone :\nCréneau préféré :\n\nMerci !';
  window.location.href=`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});}
const form=document.getElementById('contactForm');
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const to=form.dataset.email;const d=Object.fromEntries(new FormData(form).entries());const subject=`Demande de projet — ${d.nom} (${d.type})`;const body=`Nom : ${d.nom}\nTéléphone : ${d.tel||'—'}\nEmail : ${d.email}\nType de projet : ${d.type}\n\nMessage :\n${d.message}`;window.location.href=`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;document.getElementById('formOk').style.display='block';});
