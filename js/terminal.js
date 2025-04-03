// Terminal functionality
document.addEventListener('DOMContentLoaded', function() {
  initTerminal();
});

// Fallback for if DOMContentLoaded already fired
(function() {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initTerminal, 500);
  }
})();

function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.querySelector('.terminal-output');
  const chatTerminal = document.getElementById('chat-terminal');
  const sendButton = document.getElementById('terminal-send');
  
  if (!terminalInput || !terminalOutput || !chatTerminal) {
    return;
  }
  
  // Process terminal input
  function processTerminalInput() {
    const query = terminalInput.value.trim();
    if (!query) return;
    
    // Add user input to terminal
    addTerminalLine(query, 'input');
    
    // Clear input field
    terminalInput.value = '';
    
    // Get response
    const response = getTerminalResponse(query);
    
    // Add response with delay
    setTimeout(() => {
      addTerminalLine(response, 'output');
      // Scroll to bottom
      chatTerminal.scrollTop = chatTerminal.scrollHeight;
    }, 300);
    
    // Scroll to bottom for user input
    chatTerminal.scrollTop = chatTerminal.scrollHeight;
  }
  
  // Add a line to the terminal
  function addTerminalLine(text, type = 'output') {
    const line = document.createElement('p');
    
    if (type === 'input') {
      line.innerHTML = `<span class="terminal-prompt">visitor@saksham:~$</span> <span class="terminal-text">${escapeHtml(text)}</span>`;
    } else {
      line.innerHTML = `<span class="terminal-prompt">saksham@terminal:~$</span> <span class="terminal-text">${text}</span>`;
    }
    
    terminalOutput.appendChild(line);
  }
  
  // Escape HTML to prevent XSS
  function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }
  
  // Get terminal response
  function getTerminalResponse(query) {
    query = query.toLowerCase();
    
    if (query.includes('skill') || query.includes('expertise') || query.includes('tech')) {
      return `<span class="output-accent">Skills & Expertise:</span><br>
- <span style="color: #4f46e5;">Languages:</span> C, C++, Java, Python, JavaScript, SQL, Bash, Lua<br>
- <span style="color: #ec4899;">Frameworks:</span> RESTful APIs, Flask, Angular, TensorFlow, Docker<br>
- <span style="color: #ea580c;">Cloud:</span> Azure, AWS, Google Cloud, Prometheus, Grafana<br>
- <span style="color: #16a34a;">Security:</span> Bot Detection, Cryptography, OAuth 2.0, JWT`;
    } else if (query.includes('experience') || query.includes('work') || query.includes('job')) {
      return `<span class="output-accent">Work Experience:</span><br>
- <span style="color: #4f46e5;">Software Engineer II at Akamai Technologies</span> (Nov 2022 – Aug 2024)<br>
  DDoS mitigation, Network Security<br>
- <span style="color: #ec4899;">Software Engineer at Akamai Technologies</span> (Aug 2020 – Oct 2022)<br>
  Anomaly detection, Big data Analysis<br>
- <span style="color: #16a34a;">Software Engineer Intern at CISCO</span> (Jul 2018 – May 2020)<br>
  Network and Data Analytics`;
    } else if (query.includes('project') || query.includes('portfolio')) {
      return `<span class="output-accent">Featured Projects:</span><br>
- <span style="color: #4f46e5;">Crypto Challenge Bot Protection:</span> A stateless bot detection system<br>
- <span style="color: #ec4899;">Adaptive Challenge System:</span> Patent-pending bot detection feature<br>
- <span style="color: #16a34a;">Hype Event Stabilizer:</span> System for peak load optimization`;
    } else if (query.includes('education') || query.includes('degree')) {
      return `<span class="output-accent">Education:</span><br>
- <span style="color: #4f46e5;">Bachelor of Engineering in Computer Science</span><br>
  R.V. College of Engineering, Bangalore<br>
  GPA: 9.1/10.0 (2016-2020)`;
    } else if (query.includes('about') || query.includes('who') || query.includes('intro')) {
      return `<span class="output-accent">About Saksham:</span><br>
I'm a software engineer specializing in security, distributed systems, and backend development.`;
    } else if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
      return `<span class="output-accent">Contact Information:</span><br>
- <span style="color: #4f46e5;">Email:</span> saksham@example.com<br>
- <span style="color: #ec4899;">LinkedIn:</span> linkedin.com/in/sakshamlakhera<br>
- <span style="color: #16a34a;">GitHub:</span> github.com/sakshamlakhera`;
    } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return `Hello there! I'm Saksham's interactive terminal. How can I help you today?`;
    } else if (query.includes('help') || query === '?') {
      return `<span class="output-accent">Available Commands:</span><br>
- <span style="color: #4f46e5;">about</span> - Learn about Saksham<br>
- <span style="color: #ec4899;">skills</span> - View technical skills and expertise<br>
- <span style="color: #ea580c;">experience</span> - See work experience<br>
- <span style="color: #16a34a;">projects</span> - Browse featured projects<br>
- <span style="color: #7c3aed;">education</span> - Educational background<br>
- <span style="color: #f97316;">contact</span> - Get contact information<br>
- <span style="color: #8b5cf6;">clear</span> - Clear the terminal screen`;
    } else if (query === 'clear' || query === 'cls') {
      terminalOutput.innerHTML = '';
      return 'Terminal cleared. Type "help" for available commands.';
    } else {
      return `Command not recognized: "${escapeHtml(query)}". Type "help" to see available commands.`;
    }
  }
  
  // Event Listeners
  
  // Keypress event for input
  terminalInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      processTerminalInput();
    }
  });
  
  // Click event for send button
  if (sendButton) {
    sendButton.addEventListener('click', function() {
      processTerminalInput();
    });
  }
  
  // Click on terminal focuses input
  chatTerminal.addEventListener('click', function() {
    terminalInput.focus();
  });
  
  // Initial focus
  setTimeout(() => {
    terminalInput.focus();
  }, 500);
} 