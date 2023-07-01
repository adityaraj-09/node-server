window.addEventListener('scroll',()=>{
    document.querySelector('nav').classList.toggle
    ('window-scroll',window.screenY>0)
})

const menu=document.querySelector('.nav_menu');
const menuBtn=document.querySelector('#open-menu-btn');
const closeBtn=document.querySelector('#close-menu-btn');
menuBtn.addEventListener('click',()=>{
    menu.style.display="flex";
    closeBtn.style.display="inline-block"
    menuBtn.style.display="none"

})
closeBtn.addEventListener('click',()=>{
    menu.style.display="none";
    closeBtn.style.display="none"
    menuBtn.style.display="inline-block"

})