
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
  threshold: 0.2, 
  rootMargin: "0px",
};


const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }else {
      
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);


projectItems.forEach((item) => {
  projectObserver.observe(item);
});


const galleryData = {
  1: {
    title: "KVIZAPP - Multiplayer Quiz Game",
    images: [
      "data/images/p11.png",
      "data/images/p12.png",
      "data/images/p13.png",
      "data/images/p14.png",
      "data/images/p15.png",
      "data/images/p16.png",
    ],
  },
  2: {
    title: "Spendly - Personal Finance Manager",
    images: [
      "data/images/p21.png",
      "data/images/p22.png",
      "data/images/p23.png",
      "data/images/p24.png",
      "data/images/p25.png",
      "data/images/p2m.png",
    ],
  },
  3: {
    title: "Java Mini Projects Collection",
    images: [
      "data/images/p31.png",
      "data/images/p32.png",
      "data/images/p33.png",
      "data/images/p34.png",
      "data/images/p35.png",
      "data/images/p3m.png",
    ],
  },
};


function openGallery(projectId) {
  const modal = document.getElementById("galleryModal");
  const titleEl = document.getElementById("galleryTitle");
  const gridEl = document.getElementById("galleryGrid");


  const project = galleryData[projectId];


  titleEl.textContent = project.title;


  gridEl.innerHTML = "";

 
  project.images.forEach((imgSrc) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = project.title;
    img.className = "gallery-image";
    gridEl.appendChild(img);
  });


  modal.classList.add("active");
  
  document.body.style.overflow = "hidden";
}


function closeGallery() {
  const modal = document.getElementById("galleryModal");
  modal.classList.remove("active");
  
  document.body.style.overflow = "auto";
}


document.querySelectorAll(".project-image-wrapper").forEach((el) => {
  el.addEventListener("click", () => {
    const projectId = el.dataset.galleryId;
    openGallery(projectId);
  });
});


const closeBtn = document.querySelector(".gallery-close");
if (closeBtn) {
  closeBtn.addEventListener("click", closeGallery);
}


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeGallery();
  }
});




document.querySelectorAll(".read-more-btn").forEach((btn) => {
  btn.addEventListener("click", function() {
    
    const projectInfo = this.closest(".project-info");
    const description = projectInfo.querySelector(".project-description");

   
    description.classList.toggle("expanded");

    
    if (description.classList.contains("expanded")) {
      this.textContent = "Read Less";
    } else {
      this.textContent = "Read More";
    }
  });
});
