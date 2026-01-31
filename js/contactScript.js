
let currentStep = 1;
const totalSteps = 4; 
let selectedReason = null; 


document.addEventListener("DOMContentLoaded", () => {
 
  const btn = document.getElementById("menuBtn");
  btn.addEventListener("click", toggleMenu);

 
  const yearElement = document.querySelector(".year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

 
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  prevBtn.addEventListener("click", prevStep);
  nextBtn.addEventListener("click", nextStep);
  submitBtn.addEventListener("click", submitForm);


  setupCharCounter("firstName", "firstNameCount");
  setupCharCounter("lastName", "lastNameCount");
  setupCharCounter("message", "messageCount");


  updateProgress();
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


function setupCharCounter(inputId, counterId) {
  const input = document.getElementById(inputId);
  const counter = document.getElementById(counterId);


  input.addEventListener("input", () => {
    counter.textContent = input.value.length;
  });
}


document.querySelectorAll(".reason-card").forEach((card) => {
  card.addEventListener("click", () => {
  
    document.querySelectorAll(".reason-card").forEach((c) => c.classList.remove("selected"));

  
    card.classList.add("selected");

    
    selectedReason = card.dataset.reason;
  });
});


function updateProgress() {
  const progress = (currentStep / totalSteps) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
}


function nextStep() {
 
  if (currentStep === 1 && !document.getElementById("firstName").value.trim()) {
    alert("Please type your name! ");
    return; 
  }
  if (currentStep === 2 && !document.getElementById("lastName").value.trim()) {
    alert("Please type your last name! ");
    return;
  }
  if (currentStep === 3 && !selectedReason) {
    alert("Please select a reason for contacting me! ");
    return;
  }


  const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  currentStepEl.classList.remove("active");
  currentStepEl.classList.add("prev"); 


  currentStep++;


  const nextStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  nextStepEl.classList.add("active");
  nextStepEl.classList.remove("prev");


  updateButtons();
  updateProgress();
}


function prevStep() {
 
  const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  currentStepEl.classList.remove("active");

 
  currentStep--;


  const prevStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  prevStepEl.classList.add("active");
  prevStepEl.classList.remove("prev");


  updateButtons();
  updateProgress();
}


function updateButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");


  prevBtn.disabled = currentStep === 1;


  if (currentStep === totalSteps) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
}


function submitForm() {
  const message = document.getElementById("message").value.trim();


  if (!message) {
    alert("Please write a message! ");
    return;
  }


  document.querySelectorAll(".form-step").forEach((step) => {
    step.style.display = "none";
  });
  document.getElementById("formNav").style.display = "none";

  const intromsg = document.getElementById("introMessage");
  const successMsg = document.getElementById("successMessage");
  setTimeout(() => {
    successMsg.classList.add("show");
    intromsg.style.display = "none";
  }, 300);


  
}

