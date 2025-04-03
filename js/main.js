// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Experience card collapsible functionality
  const experienceCardHeaders = document.querySelectorAll('.experience-card-header');
  
  experienceCardHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const body = document.getElementById(targetId);
      const toggle = this.querySelector('.card-toggle i');
      
      // Toggle active class on body
      body.classList.toggle('active');
      
      // Toggle rotation for chevron icon
      toggle.parentElement.classList.toggle('card-toggle-active');
      
      // Close other cards
      document.querySelectorAll('.experience-card-body').forEach(otherBody => {
        if (otherBody.id !== targetId && otherBody.classList.contains('active')) {
          otherBody.classList.remove('active');
          const otherHeader = document.querySelector(`[data-target="${otherBody.id}"]`);
          otherHeader.querySelector('.card-toggle').classList.remove('card-toggle-active');
        }
      });
    });
  });
  
  // Expand the first experience card by default
  if (experienceCardHeaders.length > 0) {
    const firstCard = experienceCardHeaders[0];
    const firstCardTargetId = firstCard.getAttribute('data-target');
    const firstCardBody = document.getElementById(firstCardTargetId);
    const firstCardToggle = firstCard.querySelector('.card-toggle i');
    
    firstCardBody.classList.add('active');
    firstCardToggle.parentElement.classList.add('card-toggle-active');
  }
  
  // Modal functionality - initialize variables first
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  
  // Load Projects
  const projectsContainer = document.getElementById('projects-grid');
  if (projectsContainer) {
    console.log("Found projects container, loading projects...");
    loadProjects();
  }
  
  async function loadProjects() {
    try {
      console.log("Attempting to load projects from ./data/projects.json");
      
      // Try to load projects from JSON file first
      let projects = [];
      let allProjects = [];
      
      try {
        const response = await fetch('./data/projects.json');
        if (response.ok) {
          allProjects = await response.json();
          console.log(`Successfully loaded ${allProjects.length} projects from file`);
          projects = allProjects;
        }
      } catch (err) {
        console.error("Error loading projects from file:", err);
        // Fallback to hardcoded projects if loading fails
        projects = [
          {
            "id": "project-1",
            "name": "Crypto Challenge Bot Protection",
            "description": "A stateless bot detection and prevention system using cryptographic challenges.",
            "shortDescription": "Bot protection system using cryptographic challenges.",
            "techStack": ["C", "JavaScript", "Java", "Distributed Systems", "Cryptography"],
            "github": "#",
            "image": "assets/images/project1.png"
          },
          {
            "id": "project-2",
            "name": "Adaptive Challenge System",
            "description": "A patent-pending stateless bot detection feature (Patent filed).",
            "shortDescription": "Advanced adaptive bot detection system (Patent filed).",
            "techStack": ["JavaScript", "Java", "AngularJS", "Metadata Processing"],
            "github": "#",
            "image": "assets/images/project2.png"
          },
          {
            "id": "project-3",
            "name": "Hype Event Stabilizer",
            "description": "System for peak load event optimization with cookie-based state management.",
            "shortDescription": "Traffic stabilization system for peak load events.",
            "techStack": ["AngularJS", "Java", "Python", "Cookie Management"],
            "github": "#",
            "image": "assets/images/project3.png"
          }
        ];
      }
      
      // Check if we're on the home page or projects page
      const isHomePage = window.location.pathname.endsWith('index.html') || 
                         window.location.pathname.endsWith('/') || 
                         window.location.pathname === '';
      
      if (isHomePage) {
        // On homepage, initially show only 3 projects
        displayProjects(projects.slice(0, 3));
        
        // Add "View All Projects" button if there are more than 3 projects
        if (projects.length > 3) {
          const loadMoreContainer = document.createElement('div');
          loadMoreContainer.className = 'load-more-container';
          
          const loadMoreBtn = document.createElement('button');
          loadMoreBtn.className = 'btn btn-primary load-more-btn';
          loadMoreBtn.textContent = 'View All Projects';
          loadMoreBtn.addEventListener('click', function() {
            // Redirect to projects page
            window.location.href = 'projects.html';
          });
          
          loadMoreContainer.appendChild(loadMoreBtn);
          projectsContainer.parentNode.appendChild(loadMoreContainer);
        }
      } else {
        // On projects page, show all projects
        displayProjects(projects);
      }
      
      setupModalListeners();
      
    } catch (error) {
      console.error('Error in loadProjects function:', error);
      if (projectsContainer) {
        projectsContainer.innerHTML = `<p>Failed to load projects. Error: ${error.message}</p>`;
      }
    }
  }
  
  function displayProjects(projects) {
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('project-card', 'animate-fade-in');
      
      // Limit tags to a maximum of 4 with a "+X more" indicator if needed
      const techStackLength = project.techStack.length;
      const displayedTechs = project.techStack.slice(0, 4);
      
      const techStackHtml = displayedTechs.map(tech => 
        `<span class="project-tag">${tech}</span>`
      ).join('');
      
      // Add "+X more" tag if there are more than 4 tech items
      const moreTechsHtml = techStackLength > 4 
        ? `<span class="project-tag project-tag-more">+${techStackLength - 4} more</span>` 
        : '';
      
      projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.name}" class="project-image">
        <div class="project-content">
          <h3 class="project-title">${project.name}</h3>
          <p class="project-description">${project.shortDescription}</p>
          <div class="project-tags">
            ${techStackHtml}
            ${moreTechsHtml}
          </div>
          <div class="project-links">
            <button class="btn btn-primary view-project" data-project-id="${project.id}">View Details</button>
            ${project.github ? `<a href="${project.github}" target="_blank" class="btn">GitHub</a>` : ''}
          </div>
        </div>
      `;
      
      projectsContainer.appendChild(projectCard);
    });
  }
  
  // Function to setup modal event listeners
  function setupModalListeners() {
    const viewButtons = document.querySelectorAll('.view-project');
    
    viewButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const projectId = button.getAttribute('data-project-id');
        await openProjectModal(projectId);
      });
    });
    
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
      // Close modal when clicking outside content
      modal.addEventListener('click', event => {
        if (event.target === modal) {
          closeModal();
        }
      });
      
      // Close modal on escape key
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
          closeModal();
        }
      });
    }
  }
  
  async function openProjectModal(projectId) {
    if (!modal || !modalContent) return;
    
    try {
      console.log(`Opening modal for project ${projectId}`);
      
      // First try to fetch from file
      let project = null;
      
      try {
        const response = await fetch('./data/projects.json');
        if (response.ok) {
          const projects = await response.json();
          project = projects.find(p => p.id === projectId);
          console.log(`Loaded project from file: ${project ? project.name : 'not found'}`);
        }
      } catch (err) {
        console.error("Error loading project from file:", err);
      }
      
      // If loading from file failed, use hardcoded projects
      if (!project) {
        console.log("Using hardcoded project data");
        const hardcodedProjects = [
          {
            "id": "project-1",
            "name": "Crypto Challenge Bot Protection",
            "description": "A stateless bot detection and prevention system that uses cryptographic challenges to distinguish between legitimate clients and bots. The system was migrated from a centralized Django server to edge servers in C to improve performance.",
            "shortDescription": "Bot protection system using cryptographic challenges.",
            "techStack": ["C", "JavaScript", "Java", "Distributed Systems", "Cryptography"],
            "installation": "# Enterprise deployment\n# Not publicly available",
            "features": [
              "Distributed processing across 365,000+ edge servers",
              "Reduced server hops for verification, doubling speed",
              "Increased customer adoption from 107 to 243",
              "Stateless challenge-response mechanism",
              "Advanced bot fingerprinting techniques"
            ],
            "github": "#",
            "live": null,
            "image": "assets/images/project1.png",
            "gallery": ["assets/images/p1-1.png", "assets/images/p1-2.png", "assets/images/p1-3.png"]
          },
          {
            "id": "project-2",
            "name": "Adaptive Challenge System",
            "description": "A patent-pending stateless bot detection feature using JavaScript, Java, and Akamai Metadata. This system adapts to different client environments to provide the most effective challenge while maintaining a seamless user experience.",
            "shortDescription": "Advanced adaptive bot detection system (Patent filed).",
            "techStack": ["JavaScript", "Java", "AngularJS", "Metadata Processing"],
            "installation": "# Enterprise deployment\n# Patent pending technology",
            "features": [
              "Integrated into 27 customer solutions",
              "Serving millions of users daily",
              "Patent filed for version 2.0",
              "Adaptive challenge selection based on client capabilities",
              "Minimal performance impact on legitimate users"
            ],
            "github": "#",
            "live": null,
            "image": "assets/images/project2.png",
            "gallery": ["assets/images/p2-1.png", "assets/images/p2-2.png", "assets/images/p2-3.png"]
          },
          {
            "id": "project-3",
            "name": "Hype Event Stabilizer",
            "description": "A system designed to optimize stability during peak load events with cookie-based state management for bot detection. This feature reduces server load by 70 million requests per day during high-traffic events.",
            "shortDescription": "Traffic stabilization system for peak load events.",
            "techStack": ["AngularJS", "Java", "Python", "Cookie Management"],
            "installation": "# Enterprise deployment\n# For high-traffic sites",
            "features": [
              "Cookie-based state management",
              "Reduced server load by 70 million requests/day",
              "Enhanced stability during traffic spikes",
              "Optimized resource allocation",
              "Real-time traffic pattern analysis"
            ],
            "github": "#",
            "live": null,
            "image": "assets/images/project3.png",
            "gallery": ["assets/images/p3-1.png", "assets/images/p3-2.png", "assets/images/p3-3.png"]
          }
        ];
        
        project = hardcodedProjects.find(p => p.id === projectId);
      }
      
      if (!project) throw new Error(`Project with ID ${projectId} not found`);
      
      const techStackHtml = project.techStack.map(tech => 
        `<span class="project-tag">${tech}</span>`
      ).join('');
      
      const featuresHtml = project.features.map(feature => 
        `<li>${feature}</li>`
      ).join('');
      
      const galleryHtml = project.gallery ? project.gallery.map(img => 
        `<img src="${img}" alt="${project.name}" class="gallery-image">`
      ).join('') : '';
      
      modalContent.innerHTML = `
        <div class="project-details">
          <div class="project-details-header">
            <h2 class="project-details-title">${project.name}</h2>
            <p class="project-details-description">${project.description}</p>
            <div class="project-tags">
              ${techStackHtml}
            </div>
          </div>
          
          ${project.video ? 
            `<div class="project-video">
              <video controls width="100%">
                <source src="${project.video}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>` : ''}
          
          <!-- <div class="project-3d-view" id="project-3d-${projectId}"></div> -->
          
          <div class="project-gallery">
            ${galleryHtml}
          </div>
          
          <h3>Features</h3>
          <ul class="features-list">
            ${featuresHtml}
          </ul>
          
          <h3>Installation</h3>
          <div class="terminal">
            <pre>${project.installation}</pre>
            <button class="copy-btn" data-installation="${project.installation}">Copy</button>
          </div>
          
          <div class="project-links">
            <a href="${project.github}" target="_blank" class="btn btn-primary">View on GitHub</a>
            ${project.live ? `<a href="${project.live}" target="_blank" class="btn">Live Demo</a>` : ''}
          </div>
        </div>
      `;
      
      // Add copy functionality
      const copyBtn = modalContent.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function() {
          const installationCode = this.getAttribute('data-installation');
          navigator.clipboard.writeText(installationCode)
            .then(() => {
              this.textContent = 'Copied!';
              setTimeout(() => {
                this.textContent = 'Copy';
              }, 2000);
            })
            .catch(err => {
              console.error('Could not copy text: ', err);
            });
        });
      }
      
      // Initialize 3D view if Three.js is available
      if (window.initProjectView) {
        setTimeout(() => {
          initProjectView(`project-3d-${projectId}`, project);
        }, 100);
      }
      
      // Open modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
      
    } catch (error) {
      console.error('Error opening project modal:', error);
    }
  }
  
  function closeModal() {
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Handle active nav links
  document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  });
  
  // Scroll animations for fade-in elements
  document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    if (fadeElements.length === 0) return;
    
    // Make sure elements are visible by default (this is the fix)
    fadeElements.forEach(el => {
      el.style.opacity = '1'; 
    });
    
    // Skip animation functionality for now to ensure content is always visible
  });
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const icon = this.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
  
  // Load Experience
  const experienceContainer = document.getElementById('experience-cards');
  if (experienceContainer) {
    console.log("Found experience container, loading experience...");
    loadExperience();
  }
  
  async function loadExperience() {
    try {
      console.log("Attempting to load experience from ./data/experience.json");
      
      const response = await fetch('./data/experience.json');
      if (!response.ok) throw new Error('Failed to load experience data');
      
      const experience = await response.json();
      console.log(`Successfully loaded ${experience.length} experience entries`);
      
      displayExperience(experience);
      
    } catch (error) {
      console.error('Error in loadExperience function:', error);
      if (experienceContainer) {
        experienceContainer.innerHTML = `<p>Failed to load experience. Error: ${error.message}</p>`;
      }
    }
  }
  
  function displayExperience(experience) {
    if (!experienceContainer) return;
    
    experienceContainer.innerHTML = '';
    
    experience.forEach(exp => {
      const experienceCard = document.createElement('div');
      experienceCard.classList.add('experience-card', 'animate-fade-in');
      
      const skillsHtml = exp.skills.map(skill => 
        `<span class="experience-tag">${skill}</span>`
      ).join('');
      
      const detailsHtml = exp.details.map(detail => 
        `<li>${detail}</li>`
      ).join('');
      
      experienceCard.innerHTML = `
        <div class="experience-card-header" data-target="exp-${exp.id}">
          <div class="experience-header-content">
            <img src="${exp.image}" alt="${exp.company} logo" class="company-logo">
            <div class="experience-info">
              <div class="experience-period">${exp.period}</div>
              <h3 class="experience-position">${exp.position}</h3>
              <h4 class="experience-company">${exp.company}</h4>
              <div class="experience-location">${exp.location}</div>
            </div>
          </div>
          <div class="card-toggle">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
        <div class="experience-card-body" id="exp-${exp.id}">
          <p class="experience-description">${exp.description}</p>
          <div class="experience-details">
            <ul>
              ${detailsHtml}
            </ul>
          </div>
          <div class="experience-tags">
            ${skillsHtml}
          </div>
        </div>
      `;
      
      experienceContainer.appendChild(experienceCard);
    });
    
    // Initialize experience card functionality
    const experienceCardHeaders = document.querySelectorAll('.experience-card-header');
    
    experienceCardHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const body = document.getElementById(targetId);
        const toggle = this.querySelector('.card-toggle i');
        
        body.classList.toggle('active');
        toggle.parentElement.classList.toggle('card-toggle-active');
        
        // Close other cards
        document.querySelectorAll('.experience-card-body').forEach(otherBody => {
          if (otherBody.id !== targetId && otherBody.classList.contains('active')) {
            otherBody.classList.remove('active');
            const otherHeader = document.querySelector(`[data-target="${otherBody.id}"]`);
            otherHeader.querySelector('.card-toggle').classList.remove('card-toggle-active');
          }
        });
      });
    });
    
    // Expand the first experience card by default
    if (experienceCardHeaders.length > 0) {
      const firstCard = experienceCardHeaders[0];
      const firstCardTargetId = firstCard.getAttribute('data-target');
      const firstCardBody = document.getElementById(firstCardTargetId);
      const firstCardToggle = firstCard.querySelector('.card-toggle i');
      
      firstCardBody.classList.add('active');
      firstCardToggle.parentElement.classList.add('card-toggle-active');
    }
  }
});
