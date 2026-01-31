
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menuBtn");

  btn.addEventListener("click", toggleMenu);


  const yearElement = document.querySelector(".year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});


function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

const sections = document.querySelectorAll(".timeline-section");
const timelineYears = document.querySelectorAll(".timeline-year");

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px",
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
   
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

     
      const year = entry.target.dataset.year;
      timelineYears.forEach((yearEl) => {
        if (yearEl.dataset.year === year) {
          yearEl.classList.add("active");
        } else {
          yearEl.classList.remove("active");
        }
      });
    } else {
      
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


timelineYears.forEach((yearEl) => {
  yearEl.addEventListener("click", () => {
    const year = yearEl.dataset.year;
    const targetSection = document.querySelector(
      `[data-year="${year}"].timeline-section`
    );

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });
});


