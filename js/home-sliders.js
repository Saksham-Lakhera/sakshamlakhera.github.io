/**
 * Home Page Sliders Implementation
 * Handles automatic slider for Skills & Expertise section
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Home sliders script loaded");
  
  // Ensure we're on the home page
  const isHomePage = window.location.pathname.endsWith('index.html') || 
                     window.location.pathname.endsWith('/') || 
                     window.location.pathname === '';
  
  console.log(`Current path: ${window.location.pathname}`);
  console.log(`Is home page: ${isHomePage}`);
  
  if (!isHomePage) {
    console.log("Not on home page, skipping slider initialization");
    return;
  }
  
  // Wait a bit for other scripts to initialize
  setTimeout(() => {
    console.log("Initializing home page sliders");
    initializeSkillsSlider();
  }, 200);
});

/**
 * Initialize the skills slider 
 */
function initializeSkillsSlider() {
  console.log("Setting up skills slider");
  
  // Find the skills grid
  const skillsSection = document.querySelector('.skills-section');
  if (!skillsSection) {
    console.error("Skills section not found");
    return;
  }
  
  const container = skillsSection.querySelector('.container');
  if (!container) {
    console.error("Container in skills section not found");
    return;
  }
  
  const skillsGrid = container.querySelector('.skills-grid');
  if (!skillsGrid) {
    console.error("Skills grid not found");
    return;
  }
  
  // Create a copy of all skill cards
  const skillCards = Array.from(skillsGrid.children);
  if (skillCards.length === 0) {
    console.error("No skill cards found");
    return;
  }
  
  console.log(`Found ${skillCards.length} skill cards`);
  
  // Create the slider structure
  const slider = `
    <div class="slider-container skills-slider">
      <div class="slider-track">
        <!-- Slides will be added here -->
      </div>
      <button class="slider-control prev" aria-label="Previous slide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="slider-control next" aria-label="Next slide">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div class="slider-indicators">
        <!-- Indicators will be added here -->
      </div>
    </div>
  `;
  
  // Replace the skills grid with our new slider
  skillsGrid.insertAdjacentHTML('beforebegin', slider);
  const sliderContainer = skillsGrid.previousElementSibling;
  const sliderTrack = sliderContainer.querySelector('.slider-track');
  const indicators = sliderContainer.querySelector('.slider-indicators');
  
  // Create individual slide for each card
  skillCards.forEach((card, index) => {
    // Create a new slide
    const slide = document.createElement('div');
    slide.className = 'slider-slide';
    slide.style.flex = '0 0 calc(33.333% - 1rem)'; // Make each slide take up 1/3 of the container
    
    // Clone the card and append to the slide
    const clone = card.cloneNode(true);
    slide.appendChild(clone);
    
    // Add the slide to the track
    sliderTrack.appendChild(slide);
  });
  
  // Create exactly 2 indicators for 2 rounds
  for (let i = 0; i < 2; i++) {
    const indicator = document.createElement('button');
    indicator.className = 'slider-indicator' + (i === 0 ? ' active' : '');
    indicator.dataset.slide = i;
    indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
    indicators.appendChild(indicator);
  }
  
  // Style the slider track to show 3 slides at once
  sliderTrack.style.display = 'flex';
  
  // Remove the original skills grid
  skillsGrid.remove();
  
  // Setup slider controls for two round sliding
  setupTwoRoundsSlider(sliderContainer);
}

/**
 * Set up controls for a slider with exactly 2 rounds
 */
function setupTwoRoundsSlider(sliderContainer) {
  const sliderTrack = sliderContainer.querySelector('.slider-track');
  const prevButton = sliderContainer.querySelector('.slider-control.prev');
  const nextButton = sliderContainer.querySelector('.slider-control.next');
  const indicators = sliderContainer.querySelectorAll('.slider-indicator');
  const slides = sliderContainer.querySelectorAll('.slider-slide');
  
  const totalSlides = slides.length;
  const cardsPerView = 3; // We show 3 cards at once
  
  // Set up 2 rounds of sliding
  const slidesPerRound = Math.ceil(totalSlides / 2);
  console.log(`Total slides: ${totalSlides}, Slides per round: ${slidesPerRound}`);
  
  // Set starting round
  let currentRound = 0;
  let currentPosition = 0;
  
  console.log(`Setting up controls for slider with ${totalSlides} cards, 2 rounds`);
  
  // Function to navigate to a round
  function goToRound(round) {
    // Ensure round is within bounds (0 or 1)
    if (round < 0) round = 0;
    if (round > 1) round = 1;
    
    // Calculate the position based on the round
    currentRound = round;
    currentPosition = round * slidesPerRound;
    
    // Ensure we don't go beyond available slides
    if (currentPosition >= totalSlides - cardsPerView) {
      currentPosition = totalSlides - cardsPerView;
    }
    if (currentPosition < 0) {
      currentPosition = 0;
    }
    
    // Move the slider
    const slideWidth = 33.333; // Each slide takes 1/3 of the container
    sliderTrack.style.transform = `translateX(-${currentPosition * slideWidth}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentRound);
    });
  }
  
  // Setup click events for controls
  prevButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Previous button clicked');
    goToRound(0); // Always go to first round
  });
  
  nextButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Next button clicked');
    goToRound(1); // Always go to second round
  });
  
  // Setup indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToRound(index);
    });
  });
  
  // Auto-advancing every 5 seconds
  let interval;
  
  function startAutoAdvance() {
    interval = setInterval(() => {
      // Toggle between the two rounds
      goToRound(currentRound === 0 ? 1 : 0);
    }, 5000);
  }
  
  function stopAutoAdvance() {
    clearInterval(interval);
  }
  
  // Start auto-advancing
  startAutoAdvance();
  
  // Pause on hover
  sliderContainer.addEventListener('mouseenter', stopAutoAdvance);
  sliderContainer.addEventListener('mouseleave', startAutoAdvance);
} 