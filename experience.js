// Get the carousel elements
const carouselSlides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

// Set the initial slide index
let currentSlide = 0;

// Add event listeners to the buttons
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Function to show the previous slide
function prevSlide() {
  // carouselSlides.children[currentSlide].classList.remove('visible');
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = carouselSlides.children.length - 1;
  }
  // carouselSlides.children[currentSlide].classList.add('visible');
  updateSlide();
}

// Function to show the next slide
function nextSlide() {
  // carouselSlides.children[currentSlide].classList.remove('visible');
  currentSlide++;
  if (currentSlide >= carouselSlides.children.length) {
    currentSlide = 0;
  }
  // carouselSlides.children[currentSlide].classList.add('visible');
  updateSlide();
}

// Function to update the displayed slide
function updateSlide() {

  for (let index = 0; index < carouselSlides.children.length; index++) {
    carouselSlides.children[index].style.transform = `translateY(-${currentSlide * 100}%)`;
    
  }
 }
