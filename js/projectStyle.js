
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menuBtn");
  btn.addEventListener("click", toggleMenu);


  const yearElement = document.querySelector(".year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});


function closeMenu() {
  document.querySelector("nav").classList.remove("active");
}


function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}


document.querySelectorAll(".menu-body a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});


document.querySelector(".menu-btn button").addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.preventDefault();
});


const projectItems = document.querySelectorAll(".project-item");

const observerOptions = {
  threshold: 0.2, // 20% elementa mora biti vidljivo da bi se triggerala animacija
  rootMargin: "0px",
};

// Callback funkcija koja se poziva kada element uđe/izađe iz viewporta
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }else {
      
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// Pokreni observer na svim projektnim karticama
projectItems.forEach((item) => {
  projectObserver.observe(item);
});

// ======== GALERIJA - PODATCI O PROJEKTIMA ========
// Objekt koji sadrži sve slike za svaki projekt
// Ključ je ID projekta, vrijednost je objekt s naslovom i arrajem slika
const galleryData = {
  1: {
    title: "KVIZAPP - Multiplayer Quiz Game",
    images: [
      "../data/images/p11.png",
      "../data/images/p12.png",
      "../data/images/p13.png",
      "../data/images/p14.png",
      "../data/images/p15.png",
      "../data/images/p16.png",
    ],
  },
  2: {
    title: "Spendly - Personal Finance Manager",
    images: [
      "../data/images/p21.png",
      "../data/images/p22.png",
      "../data/images/p23.png",
      "../data/images/p24.png",
      "../data/images/p25.png",
      "../data/images/p2m.png",
    ],
  },
  3: {
    title: "Java Mini Projects Collection",
    images: [
      "../data/images/p31.png",
      "../data/images/p32.png",
      "../data/images/p33.png",
      "../data/images/p34.png",
      "../data/images/p35.png",
      "../data/images/p3m.png",
    ],
  },
};

// ======== OTVARANJE GALERIJE ========
// Funkcija koja otvara modal galeriju za određeni projekt
function openGallery(projectId) {
  const modal = document.getElementById("galleryModal");
  const titleEl = document.getElementById("galleryTitle");
  const gridEl = document.getElementById("galleryGrid");

  // Dohvati podatke za taj projekt iz galleryData objekta
  const project = galleryData[projectId];

  // Postavi naslov
  titleEl.textContent = project.title;

  // Očisti prethodni sadržaj grida
  gridEl.innerHTML = "";

  // Dinamički generiraj img elemente za svaku sliku
  project.images.forEach((imgSrc) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = project.title;
    img.className = "gallery-image";
    gridEl.appendChild(img);
  });

  // Prikaži modal dodavanjem .active klase
  modal.classList.add("active");
  // Spriječi scrollanje bodya dok je modal otvoren
  document.body.style.overflow = "hidden";
}

// ======== ZATVARANJE GALERIJE ========
function closeGallery() {
  const modal = document.getElementById("galleryModal");
  modal.classList.remove("active");
  // Vrati scrollanje nazad
  document.body.style.overflow = "auto";
}

// ======== EVENT LISTENERI ZA GALERIJU ========
// Dinamički dodaj click event na sve slike projekata
document.querySelectorAll(".project-image-wrapper").forEach((el) => {
  el.addEventListener("click", () => {
    const projectId = el.dataset.galleryId; // data-gallery-id atribut iz HTML-a
    openGallery(projectId);
  });
});

// Gumb X za zatvaranje
const closeBtn = document.querySelector(".gallery-close");
if (closeBtn) {
  closeBtn.addEventListener("click", closeGallery);
}

// Zatvori galeriju pritiskom na ESC tipku
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeGallery();
  }
});

// Zatvori galeriju klikom na pozadinu (ne na sadržaj)
document.getElementById("galleryModal").addEventListener("click", (e) => {
  // Provjeri je li kliknut sam modal (pozadina), ne sadržaj
  if (e.target.id === "galleryModal") {
    closeGallery();
  }
});

// ======== READ MORE FUNKCIONALNOST ========
// Omogućava proširivanje/skupljanje opisa projekta
document.querySelectorAll(".read-more-btn").forEach((btn) => {
  btn.addEventListener("click", function() {
    // this.closest() traži najbliži parent element sa .project-info klasom
    const projectInfo = this.closest(".project-info");
    const description = projectInfo.querySelector(".project-description");

    // Toggle .expanded klasu
    description.classList.toggle("expanded");

    // Promijeni tekst gumba ovisno o stanju
    if (description.classList.contains("expanded")) {
      this.textContent = "Read Less";
    } else {
      this.textContent = "Read More";
    }
  });
});
