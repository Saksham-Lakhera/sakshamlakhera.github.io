document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchClear = document.getElementById('search-clear');
  const selectedSkillsContainer = document.getElementById('selected-skills');
  const skillRecommendations = document.getElementById('skill-recommendations');
  const searchInputWrapper = document.getElementById('search-input-wrapper');
  const suggestionSkillTags = document.querySelectorAll('.skill-tag');
  const projectsGrid = document.getElementById('projects-grid');
  
  // Array to store selected skills
  let selectedSkills = [];
  // Array to store all available skills (will be populated dynamically)
  let allSkills = [];
  
  // Initialize search functionality
  function initSearch() {
    if (!searchInput || !searchButton || !selectedSkillsContainer || !skillRecommendations) {
      console.error("One or more search elements not found");
      return;
    }
    
    // Extract skills from projects when they're loaded
    loadAllSkills();
    
    // Event listeners
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keydown', handleSearchKeydown);
    searchButton.addEventListener('click', performSearch);
    searchClear.addEventListener('click', clearSearch);
    
    // Set up suggestions from skill tags
    suggestionSkillTags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Extract text without the icon
        const skillWithIcon = tag.textContent.trim();
        const skill = skillWithIcon.replace(/^\s*\S+\s*/, '').trim();
        
        addSkill(skill);
        performSearch();
      });
    });
    
    // Close recommendations when clicking outside
    document.addEventListener('click', function(e) {
      if (!skillRecommendations.contains(e.target) && e.target !== searchInput) {
        hideRecommendations();
      }
    });
  }
  
  // Handle search input events
  function handleSearchInput() {
    const value = searchInput.value.trim();
    
    // Show/hide clear button
    if (value) {
      searchClear.style.display = 'block';
      showRecommendations(value);
    } else {
      searchClear.style.display = 'none';
      hideRecommendations();
    }
  }
  
  // Handle keydown events on search input
  function handleSearchKeydown(e) {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      addSkill(searchInput.value.trim());
      searchInput.value = '';
      performSearch();
    }
  }
  
  // Add a skill to the selected skills
  function addSkill(skill) {
    if (!skill || selectedSkills.includes(skill)) return;
    
    selectedSkills.push(skill);
    
    // Create and add skill tag to the UI
    const skillTag = document.createElement('div');
    skillTag.className = 'selected-skill-tag';
    skillTag.innerHTML = `
      ${skill}
      <span class="selected-skill-remove" data-skill="${skill}">×</span>
    `;
    
    selectedSkillsContainer.appendChild(skillTag);
    
    // Add event listener for remove button
    const removeBtn = skillTag.querySelector('.selected-skill-remove');
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
      removeSkill(skill);
    });
    
    // Update the input wrapper style
    searchInputWrapper.classList.add('has-selected-skills');
    
    // Clear the input field
    searchInput.value = '';
    searchClear.style.display = 'none';
    
    // Hide recommendations
    hideRecommendations();
  }
  
  // Remove a skill from the selected skills
  function removeSkill(skill) {
    // Remove from array
    selectedSkills = selectedSkills.filter(s => s !== skill);
    
    // Remove from UI
    const skillTags = selectedSkillsContainer.querySelectorAll('.selected-skill-tag');
    skillTags.forEach(tag => {
      const removeBtn = tag.querySelector('.selected-skill-remove');
      if (removeBtn && removeBtn.getAttribute('data-skill') === skill) {
        tag.remove();
      }
    });
    
    // Update input wrapper style if no skills left
    if (selectedSkills.length === 0) {
      searchInputWrapper.classList.remove('has-selected-skills');
    }
    
    // Perform search again with updated skills
    performSearch();
  }
  
  // Show skill recommendations based on input
  function showRecommendations(query) {
    if (!query) {
      hideRecommendations();
      return;
    }
    
    const normalizedQuery = query.toLowerCase();
    
    // Filter matching skills
    const matchingSkills = allSkills.filter(skill => {
      return skill.toLowerCase().includes(normalizedQuery) && !selectedSkills.includes(skill);
    }).slice(0, 5); // Limit to 5 recommendations
    
    if (matchingSkills.length === 0) {
      hideRecommendations();
      return;
    }
    
    // Build recommendations HTML
    skillRecommendations.innerHTML = '';
    matchingSkills.forEach(skill => {
      const recommendation = document.createElement('div');
      recommendation.className = 'skill-recommendation-item';
      recommendation.textContent = skill;
      recommendation.addEventListener('click', () => {
        addSkill(skill);
        performSearch();
      });
      skillRecommendations.appendChild(recommendation);
    });
    
    // Show recommendations
    skillRecommendations.style.display = 'block';
  }
  
  // Hide skill recommendations
  function hideRecommendations() {
    skillRecommendations.style.display = 'none';
  }
  
  // Clear search input and hide recommendations
  function clearSearch() {
    searchInput.value = '';
    searchClear.style.display = 'none';
    hideRecommendations();
    searchInput.focus();
  }
  
  // Perform search with selected skills
  function performSearch() {
    // Need to wait for the projects to load if they're not already available
    waitForProjects(() => {
      const projectCards = document.querySelectorAll('.project-card');
      
      if (selectedSkills.length === 0) {
        // If no skills selected, show all projects
        projectCards.forEach(card => {
          card.style.display = '';
          
          // Remove any match indicators
          const indicator = card.querySelector('.skill-match-indicator');
          if (indicator) indicator.remove();
        });
        
        removeNoResultsMessage();
        return;
      }
      
      let foundMatch = false;
      
      // Go through each project card
      projectCards.forEach(card => {
        const projectTags = card.querySelectorAll('.project-tag');
        const projectText = card.textContent.toLowerCase();
        
        // Extract all technologies from the project
        const projectTechs = [];
        projectTags.forEach(tag => {
          const tech = tag.textContent.trim();
          if (tech && !tech.startsWith('+')) { // Ignore the "+X more" tag
            projectTechs.push(tech);
          }
        });
        
        // Count how many selected skills match this project
        let matchCount = 0;
        selectedSkills.forEach(skill => {
          const skillLower = skill.toLowerCase();
          if (projectTechs.includes(skill) || projectText.includes(skillLower)) {
            matchCount++;
          }
        });
        
        if (matchCount > 0) {
          card.style.display = '';
          foundMatch = true;
          
          // Remove existing indicators
          const existingIndicator = card.querySelector('.skill-match-indicator');
          if (existingIndicator) {
            existingIndicator.remove();
          }
          
          // Add new indicator - show for all matches for consistent UI
          const matchIndicator = document.createElement('div');
          matchIndicator.className = 'skill-match-indicator';
          
          // Show different text based on number of selected skills
          if (selectedSkills.length > 1) {
            matchIndicator.textContent = `Matches ${matchCount}/${selectedSkills.length} skills`;
          } else {
            matchIndicator.textContent = 'Match';
          }
          
          // Insert at the top of the card before the image
          card.insertBefore(matchIndicator, card.firstChild);
        } else {
          card.style.display = 'none';
          
          // Remove any existing indicators
          const existingIndicator = card.querySelector('.skill-match-indicator');
          if (existingIndicator) {
            existingIndicator.remove();
          }
        }
      });
      
      // Show "no results" message if needed
      if (!foundMatch && selectedSkills.length > 0) {
        showNoResultsMessage();
      } else {
        removeNoResultsMessage();
      }
    });
  }
  
  // Wait for projects to be loaded before performing a search
  function waitForProjects(callback) {
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length === 0) {
      setTimeout(() => waitForProjects(callback), 300);
    } else {
      callback();
    }
  }
  
  // Show message when no projects match the search
  function showNoResultsMessage() {
    removeNoResultsMessage();
    
    const noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.className = 'no-results';
    noResults.innerHTML = `
      <p>No projects match your selected skills</p>
      <button class="btn" id="clear-all-skills">Clear All Skills</button>
    `;
    
    projectsGrid.appendChild(noResults);
    
    // Add event listener to clear button
    document.getElementById('clear-all-skills').addEventListener('click', clearAllSkills);
  }
  
  // Remove the no results message
  function removeNoResultsMessage() {
    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.remove();
    }
  }
  
  // Clear all selected skills
  function clearAllSkills() {
    selectedSkills = [];
    selectedSkillsContainer.innerHTML = '';
    searchInputWrapper.classList.remove('has-selected-skills');
    performSearch();
  }
  
  // Load all available skills from projects
  function loadAllSkills() {
    // Wait for projects to load
    const checkForProjects = () => {
      const projectCards = document.querySelectorAll('.project-card');
      if (projectCards.length === 0) {
        // Projects not loaded yet, check again soon
        setTimeout(checkForProjects, 300);
        return;
      }
      
      // Projects loaded, extract skills
      const skillsSet = new Set();
      
      // Add skills from suggested skill tags
      suggestionSkillTags.forEach(tag => {
        const skillWithIcon = tag.textContent.trim();
        const skill = skillWithIcon.replace(/^\s*\S+\s*/, '').trim();
        if (skill) {
          skillsSet.add(skill);
        }
      });
      
      // Add skills from project tags
      projectCards.forEach(card => {
        const tagElements = card.querySelectorAll('.project-tag');
        tagElements.forEach(tag => {
          const skill = tag.textContent.trim();
          if (skill && !skill.startsWith('+')) { // Ignore "+X more" tags
            skillsSet.add(skill);
          }
        });
      });
      
      // If we don't find any skills, use some defaults
      if (skillsSet.size === 0) {
        const defaultSkills = [
          'Python', 'JavaScript', 'Java', 'C', 'React', 
          'TensorFlow', 'Kubernetes', 'Cryptography', 'Azure'
        ];
        defaultSkills.forEach(skill => skillsSet.add(skill));
      }
      
      // Convert to array and sort
      allSkills = Array.from(skillsSet).sort();
      console.log("Loaded skills:", allSkills);
    };
    
    checkForProjects();
  }
  
  // Initialize search
  initSearch();
}); 