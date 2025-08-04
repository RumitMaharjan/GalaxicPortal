const minecraftCardData = [
    {
        title: "Best Minecraft Settings (2025)",
        desc: "Boost FPS and reduce lag - even on low-end systems!",
        img: "minecraftCardImages/FPS.png",
        link: "posts/best-minecraft-settings.html"
    },
    {
        title: "Fabric vs Forge",
        desc: "Which mod loader is better for your style?",
        img: "minecraftCardImages/maxresdefault.jpg"
    }
];

const cardSection = document.querySelector("#card-section");

minecraftCardData.forEach(data=>{
    
const minecraftCard = document.createElement("a");

minecraftCard.href = data.link||"#";
minecraftCard.className = "card";
minecraftCard.setAttribute("data-title", data.title.toLowerCase());

minecraftCard.innerHTML = `
<img src="${data.img}" alt="${data.title}"> 
 <div class="card-details">
    <h3>${data.title}</h3>
    <p>${data.desc}</p>
  </div>
`;
cardSection.appendChild(minecraftCard);
});
