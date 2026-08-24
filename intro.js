(function(){
  const splash=document.getElementById('introSplash');
  const lockup=document.getElementById('introLockup');
  const movingBrand=lockup?.querySelector('.intro-brand');
  const sub=lockup?.querySelector('.intro-sub');
  const target=document.getElementById('homeBrand');
  if(!splash||!lockup||!movingBrand||!target){document.body.classList.remove('intro-active');return}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let done=false;
  function finish(){if(done)return;done=true;document.body.classList.remove('intro-active');document.body.style.overflow='';splash.remove()}
  if(reduced||!movingBrand.animate){finish();return}
  document.body.style.overflow='hidden';
  lockup.animate([
    {opacity:0,transform:'translateY(12px) scale(.975)'},
    {opacity:1,transform:'translateY(0) scale(1)'}
  ],{duration:1000,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'}).onfinish=()=>setTimeout(move,1450);

  function move(){
    if(done)return;
    const from=movingBrand.getBoundingClientRect();
    const to=target.getBoundingClientRect();
    const fromCx=from.left+from.width/2, fromCy=from.top+from.height/2;
    const toCx=to.left+to.width/2, toCy=to.top+to.height/2;
    const scale=Math.min(to.width/from.width,to.height/from.height);
    splash.classList.add('leaving');
    if(sub) sub.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}],{duration:450,easing:'ease',fill:'forwards'});
    movingBrand.animate([
      {transform:'translate3d(0,0,0) scale(1)',opacity:1},
      {transform:`translate3d(${toCx-fromCx}px,${toCy-fromCy}px,0) scale(${scale})`,opacity:1}
    ],{duration:1850,easing:'cubic-bezier(.3,0,.16,1)',fill:'forwards'});
    splash.animate([
      {backgroundColor:'rgba(251,250,247,1)',opacity:1},
      {backgroundColor:'rgba(251,250,247,1)',opacity:1,offset:.56},
      {backgroundColor:'rgba(251,250,247,0)',opacity:0}
    ],{duration:1850,easing:'cubic-bezier(.3,0,.16,1)',fill:'forwards'}).onfinish=finish;
  }
  splash.addEventListener('click',finish,{once:true});
  setTimeout(finish,6500);
})();
