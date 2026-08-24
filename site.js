(function(){
  const toggle=document.getElementById('navToggle');
  const menu=document.getElementById('mobileMenu');
  if(toggle&&menu){
    const close=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''};
    toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
    menu.addEventListener('click',e=>{if(e.target===menu)close()});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    addEventListener('resize',()=>{if(innerWidth>760)close()});
  }
  const els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
    els.forEach(el=>io.observe(el));
  }else els.forEach(el=>el.classList.add('visible'));
})();
