const menuBarToggle = document.getElementById("bar");
const barSettings = document.getElementById("bar-settings");

//Menu/Settings Bar Toggle 
menuBarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    barSettings.classList.toggle('show');
    menuBarToggle.classList.toggle('activated')
});

document.addEventListener('click', function (e) {
    const isClickInside = barSettings.contains(e.target) || menuBarToggle.contains(e.target);
    
    if (!isClickInside) {
        barSettings.classList.remove('show');
        menuBarToggle.classList.remove('activated');
    }
});


//Tooltip Minecraft Hover

 const tooltip = document.getElementById("minecraft-tooltip");

 document.querySelectorAll(".minecraftUI-top>div").forEach(el=>{
    el.addEventListener("mousemove",e=>{
        const text = el.getAttribute("data-tooltip");
        tooltip.textContent = text;
        tooltip.style.top = (e.clientY - 30)+"px";
        tooltip.style.left = (e.clientX + 20) +"px";
        tooltip.style.opacity = 1;
    });
    el.addEventListener("mouseleave", ()=>{
        tooltip.style.opacity=0;
    });
 });

//Content show when clicked

const contents = document.querySelectorAll(".minecraftUI-content > div");
const tabs = document.querySelectorAll(".minecraftUI-top > div");
 tabs.forEach(tab=>{

    tab.addEventListener("click", ()=>{
        minecraftButtonClick();
        tabs.forEach(t=> t.classList.remove("active"));
        tab.classList.add("active");
        const id = tab.id.replace("ui-","");

        contents.forEach(c=> c.classList.remove("active"));

        document.querySelector(`.${id}-MUI`).classList.add("active");
    });
 });

 //Play minecraft button sound

 function minecraftButtonClick(){ 
    const minecraftButtonSound = new Audio('assets/minecraft_click.mp3');
    minecraftButtonSound.currentTime = 0.5;
    minecraftButtonSound.play();
 }

 