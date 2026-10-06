// 1. S_TRUKTURA MENYU (U cada pünkta svoya unikalnaya sılka)
const menus = [
  { 
    title: "Maktab", 
    items: [
      { name: "Maktab direktori", url: "https://9-maktab.uz" },
      { name: "Maktab jamoasi", url: "https://9-maktab.uz" },
      { name: "Lavozim majburiyatlari", url: "https://9-maktab.uz" },
      { name: "Tarkibiy tuzilma", url: "https://9-maktab.uz" },
      { name: "Maktab nizomi", url: "https://9-maktab.uz" },
      { name: "Qabul kunlari", url: "https://9-maktab.uz" },
      { name: "Bo'sh ish o'rinlari", url: "https://9-maktab.uz" }
    ] 
  },
  { 
    title: "O'qituvchilarga", 
    items: [
      { name: "Maktab faxri", url: "maktab-faxri.html" },
      { name: "Ochiq darslar ishlanmalari", url: "https://9-maktab.uz" },
      { name: "Fanlar bo'yicha testlar", url: "https://9-maktab.uz" },
      { name: "Kasaba uyishmasi", url: "https://9-maktab.uz" }
    ] 
  },
  { 
    title: "O'quvchilarga", 
    items: [
      { name: "Dars jadvali", url: "https://9-maktab.uz" },
      { name: "Qo'ng'iroqlar jadvali", url: "https://9-maktab.uz" },
      { name: "Imtihon materiallari", url: "https://9-maktab.uz" },
      { name: "To'garaklar jadvali", url: "https://9-maktab.uz" }
    ] 
  },
  { 
    title: "Ota-onalarga", 
    items: [
      { name: "Huquq va majburiyatlar", url: "https://9-maktab.uz" },
      { name: "Maktabga o'quvchilarni qabul qilish", url: "https://9-maktab.uz-qilish" }
    ] 
  },
  { 
    title: "Matbuot xizmati", 
    items: [
      { name: "Yangiliklar", url: "https://9-maktab.uz" },
      { name: "E'lonlar", url: "https://9-maktab.uz" },
      { name: "Fotogalereya", url: "https://9-maktab.uz" },
      { name: "Videogalereya", url: "https://9-maktab.uz" },
      { name: "Davlat dasturlari", url: "https://9-maktab.uz" }
    ] 
  },
  { 
    title: "Normativ hujjatlar", 
    items: [
      { name: "Prezident Farmonlari va Qarorlari", url: "https://9-maktab.uz" },
      { name: "Xalq ta'limi vazirligi me'yoriy hujjatlari", url: "https://9-maktab.uz" },
      { name: "Yunusobod tumani XTB hujjatlari", url: "https://9-maktab.uz" }
    ] 
  },
  { 
    title: "Davlat ramzlari", 
    items: [
      { name: "O'zbekiston Respublikasi Davlat gerbi", url: "https://9-maktab.uz" },
      { name: "O'zbekiston Respublikasi Davlat bayrog'i", url: "https://9-maktab.uz" },
      { name: "O'zbekiston Respublikasi Davlat madhiyasi", url: "https://9-maktab.uz" }
    ] 
  }
];

// Yangiliklar ro'yxati
const news = [
  { date: "12.03.2026", image: "assets/4.jpg", title: "Maktabimiz o'quvchilari fan olimpiadasida faol ishtirok etdi" },
  { date: "04.03.2026", image: "assets/3.jpg", title: "Robototexnika to'garagida yangi amaliy loyihalar boshlandi" },
  { date: "27.02.2026", image: "assets/1.jpg", title: "Pedagogik mahoratni oshirish bo'yicha seminar o'tkazildi" },
  { date: "18.02.2026", image: "assets/2.jpg", title: "Maktabimizda ma'naviyat va ma'rifat tadbiri bo'lib o'tdi" }
];

const PER_PAGE = 2;

// Menyuni shakllantirish funksiyasi
const link = (itemObj) => `<a href="${itemObj.url}">${itemObj.name}</a>`;

// 🧠 INJENERLIK YONDASHUVI: Hamma elementlar yuklanishini kutuvchi bosh rejim
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // 1. Menyularni ekranga chiqarish (Xavfsiz blok ichida)
  const desktopNavEl = document.getElementById("desktopNav");
  const mobileNavEl = document.getElementById("mobileNav");

  if (desktopNavEl) {
    desktopNavEl.innerHTML = menus.map((m) =>
      `<div class="nav-group"><button class="nav-trigger">${m.title} ⌄</button><div class="dropdown">${m.items.map(link).join("")}</div></div>`
    ).join("");
  }

  if (mobileNavEl) {
    mobileNavEl.innerHTML = menus.map((m) =>
      `<details><summary>${m.title}</summary>${m.items.map(link).join("")}</details>`
    ).join("");
  }

  // 2. Yangiliklarni ekranga chiqarish (Faqat Bosh sahifada bo'lsa ishlaydi)
  if (document.getElementById("newsList")) {
    renderNews();
  }

  // 3. Mobil burger menyu tugmasi
  const menuButton = document.getElementById("menuButton");
  if (menuButton && mobileNavEl) {
    menuButton.addEventListener("click", () => {
      const open = mobileNavEl.classList.toggle("open");
      menuButton.textContent = open ? "×" : "☰";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Menyuni yopish" : "Menyuni ochish");
    });
  }

  // 4. Ko'zi ojizlar uchun sozlamalarni tekshirish va yoqish (A+ va ◐)
  ["large-text", "high-contrast"].forEach((c) => { 
    if (localStorage.getItem(c) === "1") root.classList.add(c); 
  });

  function toggleMode(c) { 
    localStorage.setItem(c, root.classList.toggle(c) ? "1" : "0"); 
  }

  const fontBtn = document.getElementById("fontButton");
  if (fontBtn) {
    fontBtn.addEventListener("click", () => toggleMode("large-text"));
  }

  const contrastBtn = document.getElementById("contrastButton");
  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => toggleMode("high-contrast"));
  }

  // 5. Murojaat formasi (Faqat Bosh sahifada bo'lsa ishlaydi)
  const appealFormEl = document.getElementById("appealForm");
  if (appealFormEl) {
    appealFormEl.addEventListener("submit", function(e) {
      e.preventDefault(); 
      
      const form = e.currentTarget;
      const statusElement = document.getElementById("formStatus");
      const formData = new FormData(form);
      
      statusElement.textContent = "Yuborilmoqda...";
      statusElement.style.color = "var(--primary)"; 

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          statusElement.textContent = "Murojaatingiz qabul qilindi. Tez orada javob beramiz!";
          statusElement.style.color = "green"; 
          form.reset(); 
        } else {
          statusElement.textContent = json.message || "Xatolik yuz berdi. Qayta urinib ko'ring.";
          statusElement.style.color = "red";
        }
      })
      .catch((error) => {
        console.log(error);
        statusElement.textContent = "Tarmoqda xatolik yuz berdi.";
        statusElement.style.color = "red";
      });
    });
  }

  // 6. Scroll Reveal (Akkuratniy animatsiya kuzatuvchisi)
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const blocksToAnimate = document.querySelectorAll(".reveal");
  blocksToAnimate.forEach(block => revealObserver.observe(block));
});

// Yangiliklar sahifalash funksiyasi (Tashqarida qoladi, lekin DOMContentLoaded ichidan chaqiriladi)
let currentPage = 1;
function renderNews() {
  const pages = Math.ceil(news.length / PER_PAGE);
  const newsListEl = document.getElementById("newsList");
  if (!newsListEl) return;

  newsListEl.innerHTML = news
    .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
    .map((n) => `<article class="news-item"><img src="${n.image}" alt="" loading="lazy"><div><time>${n.date} · Matbuot xizmati</time><h3>${n.title}</h3><a href="https://9-maktab.uz">Batafsil →</a></div></article>`)
    .join("");
  
  const pagination = document.getElementById("pagination");
  if (!pagination) return;
  pagination.innerHTML = "";
  for (let i = 1; i <= pages; i++) {
    const b = document.createElement("button");
    b.textContent = i;
    b.setAttribute("aria-label", `${i}-sahifa`);
    if (i === currentPage) { b.className = "active"; b.setAttribute("aria-current", "page"); }
    b.addEventListener("click", () => { currentPage = i; renderNews(); });
    pagination.appendChild(b);
  }
}
