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

 const serviceSlot = document.querySelectorAll(".service-slot");

serviceSlot.forEach(e=>{
    e.addEventListener("click",()=>{
        minecraftButtonClick();    })
});



 //Play minecraft button sound
 const minecraftButtonSound = new Audio('assets/minecraft_click.mp3');
minecraftButtonSound.muted = true;
 function minecraftButtonClick(){ 
    minecraftButtonSound.volume = 1;
    minecraftButtonSound.currentTime = 0.5;
    minecraftButtonSound.play();
 }

const loginTab = document.getElementById("login-tab");
const loginClass = document.querySelector(".login-form");
const registerTab = document.getElementById("register-tab");
const registerClass = document.querySelector(".register-form");
const tabButton = document.querySelector(".tab-button");

loginTab.addEventListener("click",()=>{
    minecraftButtonClick();
    loginClass.classList.add("active");
    registerClass.classList.remove("active")
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
})
registerTab.addEventListener("click",()=>{
    minecraftButtonClick();
    loginClass.classList.remove("active");
    registerClass.classList.add("active")
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
})


// Turn on the Lever in Settings 

const levers = document.querySelectorAll(".lever");
const settingsButton = document.querySelectorAll(".anchor-settings");

document.addEventListener("DOMContentLoaded",()=>{
    const knownSettings = ["button-sound","dark-mode","minecraft-music","pause-background"];
    if (localStorage.getItem("button-sound") === null) {
    localStorage.setItem("button-sound", "true");
    }
    knownSettings.forEach(setting=>{
        const savedState = localStorage.getItem(setting);
        if(savedState=="true"){
            const lever = document.querySelector(`.anchor-settings.${setting}`)?.closest("li")?.querySelector(".lever");
            if(lever) toggleLever(lever);
        }
    });
});

settingsButton.forEach(link=>{
    link.addEventListener("click", ()=>{
        const listItem = link.closest("li");
        if(!listItem) return;
        const lever = listItem.querySelector(".lever");
        if(lever){
            toggleLever(lever, link);
        }
    });
});

levers.forEach(img =>{
    img.addEventListener("click", ()=>{
            toggleLever(img);
    });
});
 
function toggleLever(img, link){
    minecraftButtonClick();
        const isOff = img.getAttribute("data-state")==="off";
        img.src = isOff? 'assets/LeverOn.png' : 'assets/LeverOff.png';
        img.setAttribute('data-state',isOff?'on':'off');
        img.classList.toggle('active');
        const listItem = img.closest("li");
        const lamp = listItem.querySelector(".redstone-lantern");

        if(lamp){
            lamp.src = isOff? "assets/LanternOn.png": "assets/LanternOff.webp";
            lamp.classList.toggle("glow-lamp", isOff);
        }
        const knownSettings = ["button-sound","dark-mode","minecraft-music","pause-background"];
        
       let classList;
        if(link){
              classList = link.classList;
        }
        else{
            link = lamp.closest("div").classList;
            classList= link;
        }
        knownSettings.forEach(settings=>{
            if(classList.contains(settings)){
                applySettingFunctionality(settings, isOff);
            }
        });
}

function applySettingFunctionality(settingClass, isOn){
    switch(settingClass){
        case "button-sound":
            minecraftButtonSound.volume = 0;
            minecraftButtonSound.muted = !isOn;
            break;

        case "dark-mode":
            console.log("Dark Mode toggled: ", isOn);
            break;
        case "minecraft-music":
             if (isOn) {
                musicPlayer.currentTime = savedTime;
                musicPlayer.play();
            } else {
                musicPlayer.pause();
            }
            break;
        case "pause-background":
                if (isOn) {
                    backgroundHero.pause();
                } else {
                    backgroundHero.play();
                }
                localStorage.setItem("videoPaused", isOn);
            break;
    }
    localStorage.setItem(settingClass, isOn);  
}

// Music Player

let musicPlayer = new Audio();
musicPlayer.volume = 0.5;
let currentTrackIndex = 0;

const musics = [
  "musics/Exploring The Crystal Caves - Asher Fulero.mp3",
  "musics/Moonlight Magic - Asher Fulero.mp3",
  "musics/Sleep Music No. 1 - Chris Haugen.mp3",
  "musics/Tiburtina - Schwartzy.mp3"
];

const savedIndex = localStorage.getItem("musicIndex")|| 0;
const savedTime = localStorage.getItem("musicTime")|| 0;
const backgroundHero = document.querySelector(".background-hero");

if(savedIndex!== null){
    currentTrackIndex = parseInt(savedIndex);
    musicPlayer.src = musics[currentTrackIndex];
}
                
musicPlayer.onended = () => {
    currentTrackIndex = (currentTrackIndex + 1) % musics.length;
    musicPlayer.src = musics[currentTrackIndex];
    musicPlayer.play();
};

window.addEventListener("load", () => {
  const isMusicEnabled = localStorage.getItem("minecraft-music") === "true";
  if (isMusicEnabled && musicPlayer.paused) {
    musicPlayer.currentTime = savedTime;
    musicPlayer.play();
  }
});
window.addEventListener("click", () => {
  const isMusicEnabled = localStorage.getItem("minecraft-music") === "true";
  if (isMusicEnabled && musicPlayer.paused) {
    musicPlayer.currentTime = savedTime;
    musicPlayer.play();
  }
});

window.addEventListener("load",()=>{
    const savedTime = parseInt(localStorage.getItem("videoTime"))||0;
    const wasPaused = localStorage.getItem("videoPaused")==="true";

    backgroundHero.currentTime = savedTime;

    if(!wasPaused){
        backgroundHero.play().catch(()=>{
            console.log("Autoplay blocked; user interaction needed.");
        });
    }
})


window.addEventListener("beforeunload", () => {
  localStorage.setItem("musicIndex", currentTrackIndex);
  localStorage.setItem("musicTime", musicPlayer.currentTime);
  localStorage.setItem("videoTime", backgroundHero.currentTime);
});

let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slides");
    const dots = document.querySelectorAll(".dot");

    slides.forEach(slide => slide.style.display = "none");

    dots.forEach(dot => dot.classList.remove("dot-active"));

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    const currentSlide = slides[slideIndex - 1];
    const currentDot = dots[slideIndex - 1];

    if (currentSlide) currentSlide.style.display = "flex";
    if (currentDot) currentDot.classList.add("dot-active");

    setTimeout(showSlides, 4000);
}

document.addEventListener("DOMContentLoaded", showSlides);

function startRightBannerSlideshow() {
  let index = 0;
  const slides = document.querySelectorAll(".r-slides");
  const dots = document.querySelectorAll(".r-dot");

  function show() {
    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.classList.remove("dot-active"));

    index++;
    if (index > slides.length) index = 1;

    slides[index - 1].style.display = "flex";
    dots[index - 1].classList.add("dot-active");

    setTimeout(show, 4000);
  }

  show();
}

document.addEventListener("DOMContentLoaded", () => { 
  startRightBannerSlideshow(); 
});
