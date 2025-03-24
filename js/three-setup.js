// Three.js setup for 3D project views
function initProjectView(containerId, project) {
  // Check if Three.js is available
  if (typeof THREE === 'undefined') {
    console.warn('Three.js is not loaded. 3D view will not be rendered.');
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
          <p>3D view requires Three.js library</p>
          <button class="btn" id="load-three-js">Load Three.js</button>
        </div>
      `;
      
      // Add a button to dynamically load Three.js
      const loadButton = document.getElementById('load-three-js');
      if (loadButton) {
        loadButton.addEventListener('click', function() {
          loadThreeJs().then(() => {
            initProjectView(containerId, project);
          });
        });
      }
      return;
    }
  }
  
  // Get the container
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);
  
  // Responsive adjustments
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create different 3D objects based on project.id or project.model3d property
  const modelType = project.model3d || project.id;
  
  let object;
  switch (modelType) {
    case 'cryptochallenge':
      object = createCryptoChallengeModel();
      break;
    case 'adaptivechallenge':
      object = createAdaptiveChallengeModel();
      break;
    case 'hypeevent':
      object = createHypeEventModel();
      break;
    case 'releasemonitor':
      object = createReleaseMonitorModel();
      break;
    case 'distributeddatabase':
      object = createDatabaseModel();
      break;
    case 'neuralnetwork':
      object = createNeuralNetworkModel();
      break;
    case 'transformer':
      object = createTransformerModel();
      break;
    case 'reinforcementlearning':
      object = createReinforcementLearningModel();
      break;
    case 'gan':
      object = createGANModel();
      break;
    case 'computervision':
      object = createComputerVisionModel();
      break;
    default:
      // Default case - create a spinning cube
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00, 
        specular: 0x050505,
        shininess: 100
      });
      object = new THREE.Mesh(geometry, material);
      break;
  }
  
  scene.add(object);
  
  // Animation
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the object
    object.rotation.y += 0.01;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Project-specific models
  function createRobotModel() {
    const group = new THREE.Group();
    
    // Robot body
    const bodyGeometry = new THREE.BoxGeometry(2, 1, 3);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2196f3 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel1.position.set(1.1, -0.5, 1);
    wheel1.rotation.z = Math.PI / 2;
    group.add(wheel1);
    
    const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel2.position.set(-1.1, -0.5, 1);
    wheel2.rotation.z = Math.PI / 2;
    group.add(wheel2);
    
    const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel3.position.set(1.1, -0.5, -1);
    wheel3.rotation.z = Math.PI / 2;
    group.add(wheel3);
    
    const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel4.position.set(-1.1, -0.5, -1);
    wheel4.rotation.z = Math.PI / 2;
    group.add(wheel4);
    
    // Sensor
    const sensorGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sensorMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
    sensor.position.set(0, 0.5, 1.6);
    group.add(sensor);
    
    return group;
  }
  
  function createWeatherAppModel() {
    const group = new THREE.Group();
    
    // Phone frame
    const phoneGeometry = new THREE.BoxGeometry(2, 4, 0.2);
    const phoneMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
    group.add(phone);
    
    // Screen
    const screenGeometry = new THREE.BoxGeometry(1.8, 3.6, 0.05);
    const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEEB }); // Sky blue color
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.12;
    group.add(screen);
    
    // Sun icon
    const sunGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Gold color
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0.8, 0.2);
    group.add(sun);
    
    // Cloud
    const cloudGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    
    const cloud1 = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud1.position.set(0.5, 0, 0.2);
    group.add(cloud1);
    
    const cloud2 = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud2.position.set(0.3, 0.2, 0.2);
    group.add(cloud2);
    
    const cloud3 = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud3.position.set(0.7, 0.2, 0.2);
    group.add(cloud3);
    
    // Temperature text (represented as a line)
    const tempGeometry = new THREE.BoxGeometry(1, 0.1, 0.05);
    const tempMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const temp = new THREE.Mesh(tempGeometry, tempMaterial);
    temp.position.set(0, -0.5, 0.2);
    group.add(temp);
    
    const temp2 = new THREE.Mesh(tempGeometry, tempMaterial);
    temp2.position.set(0, -0.8, 0.2);
    temp2.scale.set(0.8, 1, 1);
    group.add(temp2);
    
    const temp3 = new THREE.Mesh(tempGeometry, tempMaterial);
    temp3.position.set(0, -1.1, 0.2);
    temp3.scale.set(0.6, 1, 1);
    group.add(temp3);
    
    return group;
  }
  
  function createDashboardModel() {
    const group = new THREE.Group();
    
    // Monitor
    const monitorFrameGeometry = new THREE.BoxGeometry(4, 3, 0.2);
    const monitorFrameMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const monitorFrame = new THREE.Mesh(monitorFrameGeometry, monitorFrameMaterial);
    group.add(monitorFrame);
    
    // Screen
    const screenGeometry = new THREE.BoxGeometry(3.8, 2.8, 0.05);
    const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x1E1E1E });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.12;
    group.add(screen);
    
    // Stand
    const standGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    const standMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.y = -2;
    group.add(stand);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(2, 0.2, 1);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -2.6;
    group.add(base);
    
    // Dashboard elements
    const taskBoardGeometry = new THREE.BoxGeometry(1, 2, 0.05);
    const taskBoardMaterial = new THREE.MeshPhongMaterial({ color: 0x4A5568 });
    const taskBoard = new THREE.Mesh(taskBoardGeometry, taskBoardMaterial);
    taskBoard.position.set(-1.3, 0, 0.15);
    group.add(taskBoard);
    
    // Task items
    const taskGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.05);
    const todoMaterial = new THREE.MeshPhongMaterial({ color: 0xE53E3E });
    const inProgressMaterial = new THREE.MeshPhongMaterial({ color: 0xECC94B });
    const doneMaterial = new THREE.MeshPhongMaterial({ color: 0x38A169 });
    
    const task1 = new THREE.Mesh(taskGeometry, todoMaterial);
    task1.position.set(-1.3, 0.8, 0.2);
    group.add(task1);
    
    const task2 = new THREE.Mesh(taskGeometry, todoMaterial);
    task2.position.set(-1.3, 0.4, 0.2);
    group.add(task2);
    
    const task3 = new THREE.Mesh(taskGeometry, inProgressMaterial);
    task3.position.set(-1.3, 0, 0.2);
    group.add(task3);
    
    const task4 = new THREE.Mesh(taskGeometry, doneMaterial);
    task4.position.set(-1.3, -0.4, 0.2);
    group.add(task4);
    
    const task5 = new THREE.Mesh(taskGeometry, doneMaterial);
    task5.position.set(-1.3, -0.8, 0.2);
    group.add(task5);
    
    // Chart
    const chartGeometry = new THREE.BoxGeometry(1.8, 1.6, 0.05);
    const chartMaterial = new THREE.MeshPhongMaterial({ color: 0x2D3748 });
    const chart = new THREE.Mesh(chartGeometry, chartMaterial);
    chart.position.set(0.8, 0.4, 0.15);
    group.add(chart);
    
    // Chart bars
    const barGeometry = new THREE.BoxGeometry(0.1, 0.6, 0.05);
    const barMaterial = new THREE.MeshPhongMaterial({ color: 0x4299E1 });
    
    const bar1 = new THREE.Mesh(barGeometry, barMaterial);
    bar1.position.set(0.2, 0.2, 0.2);
    bar1.scale.set(1, 0.5, 1);
    group.add(bar1);
    
    const bar2 = new THREE.Mesh(barGeometry, barMaterial);
    bar2.position.set(0.5, 0.2, 0.2);
    bar2.scale.set(1, 0.8, 1);
    group.add(bar2);
    
    const bar3 = new THREE.Mesh(barGeometry, barMaterial);
    bar3.position.set(0.8, 0.2, 0.2);
    bar3.scale.set(1, 1.4, 1);
    group.add(bar3);
    
    const bar4 = new THREE.Mesh(barGeometry, barMaterial);
    bar4.position.set(1.1, 0.2, 0.2);
    bar4.scale.set(1, 1, 1);
    group.add(bar4);
    
    const bar5 = new THREE.Mesh(barGeometry, barMaterial);
    bar5.position.set(1.4, 0.2, 0.2);
    bar5.scale.set(1, 1.2, 1);
    group.add(bar5);
    
    // Status section
    const statusGeometry = new THREE.BoxGeometry(1.8, 0.8, 0.05);
    const statusMaterial = new THREE.MeshPhongMaterial({ color: 0x2D3748 });
    const status = new THREE.Mesh(statusGeometry, statusMaterial);
    status.position.set(0.8, -0.8, 0.15);
    group.add(status);
    
    return group;
  }
  
  function createDefaultModel() {
    const group = new THREE.Group();
    
    // Create a simple spinning cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.7
    });
    const cube = new THREE.Mesh(geometry, material);
    group.add(cube);
    
    // Add wireframe
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    group.add(wireframe);
    
    return group;
  }
  
  function createNeuralNetworkModel() {
    const group = new THREE.Group();
    
    // Create neural network layers
    const layers = [4, 8, 6, 4, 2]; // Neuron counts per layer
    const layerSpacing = 1.5;
    const neuronSize = 0.15;
    const neuronMaterial = new THREE.MeshPhongMaterial({ color: 0x00aaff });
    const activeMaterial = new THREE.MeshPhongMaterial({ color: 0xff6600, emissive: 0xff2200, emissiveIntensity: 0.5 });
    
    // Create neurons for each layer
    const neurons = [];
    for (let l = 0; l < layers.length; l++) {
      const layer = [];
      const neuronCount = layers[l];
      
      for (let n = 0; n < neuronCount; n++) {
        const neuronGeometry = new THREE.SphereGeometry(neuronSize, 16, 16);
        const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial.clone());
        
        // Position neuron in layer
        const ySpacing = 0.5;
        const yOffset = (neuronCount - 1) * ySpacing / 2;
        neuron.position.x = l * layerSpacing - (layers.length * layerSpacing / 2) + 1.5;
        neuron.position.y = n * ySpacing - yOffset;
        
        group.add(neuron);
        layer.push(neuron);
      }
      
      neurons.push(layer);
    }
    
    // Create connections between neurons
    for (let l = 0; l < neurons.length - 1; l++) {
      const currentLayer = neurons[l];
      const nextLayer = neurons[l + 1];
      
      for (let i = 0; i < currentLayer.length; i++) {
        for (let j = 0; j < nextLayer.length; j++) {
          const start = currentLayer[i].position;
          const end = nextLayer[j].position;
          
          const connectionGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
          const connection = new THREE.Line(
            connectionGeometry, 
            new THREE.LineBasicMaterial({ 
              color: 0x4488ff,
              transparent: true,
              opacity: 0.5 
            })
          );
          
          group.add(connection);
        }
      }
    }
    
    // Animate some neurons randomly
    setInterval(() => {
      const randomLayer = Math.floor(Math.random() * neurons.length);
      const randomNeuron = Math.floor(Math.random() * neurons[randomLayer].length);
      
      const neuron = neurons[randomLayer][randomNeuron];
      neuron.material = activeMaterial.clone();
      
      setTimeout(() => {
        neuron.material = neuronMaterial.clone();
      }, 300);
    }, 500);
    
    return group;
  }
  
  function createTransformerModel() {
    const group = new THREE.Group();
    
    // Create attention heads
    const headCount = 8;
    const headSize = 0.2;
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x9900ff });
    const headGeometry = new THREE.SphereGeometry(headSize, 16, 16);
    
    // Create input and output tokens
    const tokenCount = 6;
    const tokenSize = 0.25;
    const tokenGeometry = new THREE.BoxGeometry(tokenSize, tokenSize, tokenSize);
    const inputTokenMaterial = new THREE.MeshPhongMaterial({ color: 0x00cc88 });
    const outputTokenMaterial = new THREE.MeshPhongMaterial({ color: 0xff8800 });
    
    // Add input tokens
    const inputTokens = [];
    for (let i = 0; i < tokenCount; i++) {
      const token = new THREE.Mesh(tokenGeometry, inputTokenMaterial.clone());
      token.position.set(-2, i * 0.5 - (tokenCount * 0.5) / 2 + 0.25, 0);
      group.add(token);
      inputTokens.push(token);
    }
    
    // Add attention heads in middle
    const attentionHeads = [];
    for (let i = 0; i < headCount; i++) {
      const head = new THREE.Mesh(headGeometry, headMaterial.clone());
      head.position.set(0, i * 0.5 - (headCount * 0.5) / 2 + 0.25, 0.5);
      group.add(head);
      attentionHeads.push(head);
    }
    
    // Add output tokens
    const outputTokens = [];
    for (let i = 0; i < tokenCount; i++) {
      const token = new THREE.Mesh(tokenGeometry, outputTokenMaterial.clone());
      token.position.set(2, i * 0.5 - (tokenCount * 0.5) / 2 + 0.25, 0);
      group.add(token);
      outputTokens.push(token);
    }
    
    // Create attention lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xaaaaff, 
      transparent: true,
      opacity: 0.3
    });
    
    // Create attention connections
    function createAttentionConnections() {
      // Remove old connections
      group.children.forEach(child => {
        if (child.isLine) {
          group.remove(child);
        }
      });
      
      // Create new random connections
      const sourceToken = inputTokens[Math.floor(Math.random() * inputTokens.length)];
      
      // Connect to each attention head
      attentionHeads.forEach(head => {
        const points = [sourceToken.position, head.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial.clone());
        line.isLine = true;
        group.add(line);
        
        // Connect head to a random output token
        const targetToken = outputTokens[Math.floor(Math.random() * outputTokens.length)];
        const outPoints = [head.position, targetToken.position];
        const outGeometry = new THREE.BufferGeometry().setFromPoints(outPoints);
        const outLine = new THREE.Line(outGeometry, lineMaterial.clone());
        outLine.isLine = true;
        group.add(outLine);
      });
    }
    
    // Initial connection
    createAttentionConnections();
    
    // Update connections periodically
    setInterval(createAttentionConnections, 1500);
    
    return group;
  }
  
  function createGANModel() {
    const group = new THREE.Group();
    
    // Create the Generator
    const generatorGeometry = new THREE.ConeGeometry(0.5, 1.2, 8);
    const generatorMaterial = new THREE.MeshPhongMaterial({ color: 0x3399ff });
    const generator = new THREE.Mesh(generatorGeometry, generatorMaterial);
    generator.position.set(-1.2, 0, 0);
    generator.rotation.z = Math.PI / 2;
    group.add(generator);
    
    // Create the Discriminator
    const discriminatorGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 8);
    const discriminatorMaterial = new THREE.MeshPhongMaterial({ color: 0xff5533 });
    const discriminator = new THREE.Mesh(discriminatorGeometry, discriminatorMaterial);
    discriminator.position.set(1.2, 0, 0);
    discriminator.rotation.z = Math.PI / 2;
    group.add(discriminator);
    
    // Create the latent space (random noise input)
    const noiseGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const noiseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcccccc,
      transparent: true,
      opacity: 0.7
    });
    
    for (let i = 0; i < 5; i++) {
      const noiseSphere = new THREE.Mesh(noiseGeometry, noiseMaterial.clone());
      noiseSphere.position.set(-2.5, i * 0.4 - 0.8, 0);
      group.add(noiseSphere);
    }
    
    // Create generated data
    const generatedGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const generatedMaterial = new THREE.MeshPhongMaterial({ color: 0x66aaff });
    
    // Real data
    const realGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const realMaterial = new THREE.MeshPhongMaterial({ color: 0xff6633 });
    
    // Add data particles
    function addDataParticles() {
      group.children.forEach(child => {
        if (child.isDataParticle) {
          group.remove(child);
        }
      });
      
      // Add generated data
      for (let i = 0; i < 8; i++) {
        const generated = new THREE.Mesh(generatedGeometry, generatedMaterial.clone());
        generated.position.set(
          -0.5 + Math.random() * 0.5, 
          Math.random() * 1.6 - 0.8,
          Math.random() * 0.5
        );
        generated.isDataParticle = true;
        group.add(generated);
      }
      
      // Add real data 
      for (let i = 0; i < 8; i++) {
        const real = new THREE.Mesh(realGeometry, realMaterial.clone());
        real.position.set(
          0.5 + Math.random() * 0.5, 
          Math.random() * 1.6 - 0.8,
          Math.random() * 0.5
        );
        real.isDataParticle = true;
        group.add(real);
      }
    }
    
    // Initialize data
    addDataParticles();
    
    // Update particles periodically
    setInterval(addDataParticles, 2000);
    
    // Create connecting arrows
    const arrowHelper1 = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-2, 0, 0),
      0.8,
      0x888888,
      0.2,
      0.1
    );
    group.add(arrowHelper1);
    
    const arrowHelper2 = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-0.7, 0, 0),
      0.7,
      0x888888,
      0.2,
      0.1
    );
    group.add(arrowHelper2);
    
    const arrowHelper3 = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      0.7,
      0x888888,
      0.2,
      0.1
    );
    group.add(arrowHelper3);
    
    return group;
  }
  
  function createComputerVisionModel() {
    const group = new THREE.Group();
    
    // Create a camera-like object
    const cameraBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.8),
      new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    group.add(cameraBody);
    
    // Create lens
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 0.4, 16),
      new THREE.MeshPhongMaterial({ 
        color: 0x111111,
        shininess: 100,
        specular: 0x555555
      })
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0, 0.6);
    group.add(lens);
    
    // Create image plane
    const imagePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1.5),
      new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      })
    );
    imagePlane.position.set(0, 0, -1.5);
    group.add(imagePlane);
    
    // Create grid on image plane to represent pixels
    const gridSize = 10;
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.5
    });
    
    // Horizontal grid lines
    for (let i = 0; i <= gridSize; i++) {
      const y = (i / gridSize) * 1.5 - 0.75;
      const points = [
        new THREE.Vector3(-1, y, -1.49),
        new THREE.Vector3(1, y, -1.49)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, gridMaterial);
      group.add(line);
    }
    
    // Vertical grid lines
    for (let i = 0; i <= gridSize; i++) {
      const x = (i / gridSize) * 2 - 1;
      const points = [
        new THREE.Vector3(x, -0.75, -1.49),
        new THREE.Vector3(x, 0.75, -1.49)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, gridMaterial);
      group.add(line);
    }
    
    // Create detection boxes
    function createDetectionBoxes() {
      // Remove old boxes
      group.children.forEach(child => {
        if (child.isDetectionBox) {
          group.remove(child);
        }
      });
      
      // Add 1-3 random detection boxes
      const boxCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < boxCount; i++) {
        const width = 0.3 + Math.random() * 0.7;
        const height = 0.3 + Math.random() * 0.5;
        const x = Math.random() * 1.4 - 0.7;
        const y = Math.random() * 1.0 - 0.5;
        
        const boxGeometry = new THREE.BufferGeometry();
        const points = [
          // Bottom rectangle
          new THREE.Vector3(x - width/2, y - height/2, -1.48),
          new THREE.Vector3(x + width/2, y - height/2, -1.48),
          new THREE.Vector3(x + width/2, y - height/2, -1.48),
          new THREE.Vector3(x + width/2, y + height/2, -1.48),
          new THREE.Vector3(x + width/2, y + height/2, -1.48),
          new THREE.Vector3(x - width/2, y + height/2, -1.48),
          new THREE.Vector3(x - width/2, y + height/2, -1.48),
          new THREE.Vector3(x - width/2, y - height/2, -1.48)
        ];
        
        boxGeometry.setFromPoints(points);
        
        // Random colors for different object types
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffaa00];
        const boxLine = new THREE.LineSegments(
          boxGeometry,
          new THREE.LineBasicMaterial({ 
            color: colors[Math.floor(Math.random() * colors.length)],
            linewidth: 2
          })
        );
        boxLine.isDetectionBox = true;
        group.add(boxLine);
      }
    }
    
    // Create initial boxes
    createDetectionBoxes();
    
    // Update boxes periodically
    setInterval(createDetectionBoxes, 2000);
    
    // Create light beams from camera to image
    const beamMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffaa,
      transparent: true,
      opacity: 0.3
    });
    
    const beamPoints = [
      // Top left corner
      new THREE.Vector3(0, 0, 0.4),
      new THREE.Vector3(-1, 0.75, -1.5),
      
      // Top right corner
      new THREE.Vector3(0, 0, 0.4),
      new THREE.Vector3(1, 0.75, -1.5),
      
      // Bottom left corner
      new THREE.Vector3(0, 0, 0.4),
      new THREE.Vector3(-1, -0.75, -1.5),
      
      // Bottom right corner
      new THREE.Vector3(0, 0, 0.4),
      new THREE.Vector3(1, -0.75, -1.5)
    ];
    
    const beamGeometry = new THREE.BufferGeometry().setFromPoints(beamPoints);
    const lightBeams = new THREE.LineSegments(beamGeometry, beamMaterial);
    group.add(lightBeams);
    
    return group;
  }
  
  function createReinforcementLearningModel() {
    const group = new THREE.Group();
    
    // Create an environment grid
    const gridSize = 5;
    const cellSize = 0.4;
    const gridOffset = (gridSize * cellSize) / 2 - cellSize/2;
    
    // Create grid cells
    const cellGeometry = new THREE.BoxGeometry(cellSize, 0.05, cellSize);
    const cellMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x88ccff }), // Normal cell
      new THREE.MeshPhongMaterial({ color: 0xff8888 }), // Negative reward
      new THREE.MeshPhongMaterial({ color: 0x88ff88 })  // Positive reward
    ];
    
    // Add grid cells
    const grid = [];
    for (let x = 0; x < gridSize; x++) {
      grid[x] = [];
      for (let z = 0; z < gridSize; z++) {
        // Determine cell type (mostly normal, some reward cells)
        let materialIndex = 0;
        
        // Add some reward cells
        if ((x === gridSize-1 && z === gridSize-1) || 
            (Math.random() < 0.1 && !(x === 0 && z === 0))) {
          materialIndex = Math.random() < 0.7 ? 2 : 1; // More positive than negative rewards
        }
        
        const cell = new THREE.Mesh(cellGeometry, cellMaterials[materialIndex]);
        const posX = x * cellSize - gridOffset;
        const posZ = z * cellSize - gridOffset;
        
        cell.position.set(posX, -0.5, posZ);
        cell.userData = {
          type: materialIndex,
          gridX: x,
          gridZ: z
        };
        
        group.add(cell);
        grid[x][z] = cell;
      }
    }
    
    // Create an agent (the learning entity)
    const agentGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const agentMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffcc00,
      emissive: 0x996600,
      emissiveIntensity: 0.3
    });
    const agent = new THREE.Mesh(agentGeometry, agentMaterial);
    
    // Start at position 0,0
    agent.position.set(
      -gridOffset, 
      -0.35, 
      -gridOffset
    );
    agent.userData = {
      gridX: 0,
      gridZ: 0,
      moving: false,
      targetX: -gridOffset,
      targetZ: -gridOffset
    };
    group.add(agent);
    
    // Create path visualization
    const pathMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffaa00,
      transparent: true,
      opacity: 0.7
    });
    
    // Path history
    const pathPoints = [
      new THREE.Vector3(-gridOffset, -0.35, -gridOffset)
    ];
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const path = new THREE.Line(pathGeometry, pathMaterial);
    path.userData = { points: pathPoints };
    group.add(path);
    
    // Move the agent following Q-learning principles
    function moveAgent() {
      if (agent.userData.moving) return;
      
      // Get current position
      const { gridX, gridZ } = agent.userData;
      
      // Decision on where to move next (simplified Q-learning behavior)
      // Prefer moving to unvisited cells and toward reward cells
      const possibleMoves = [];
      
      // Check all 4 directions
      const directions = [
        { dx: 1, dz: 0 },  // right
        { dx: -1, dz: 0 }, // left
        { dx: 0, dz: 1 },  // down
        { dx: 0, dz: -1 }  // up
      ];
      
      directions.forEach(dir => {
        const newX = gridX + dir.dx;
        const newZ = gridZ + dir.dz;
        
        // Check if within grid bounds
        if (newX >= 0 && newX < gridSize && newZ >= 0 && newZ < gridSize) {
          const cell = grid[newX][newZ];
          
          // Calculate move value based on cell type
          let moveValue = 1;
          
          // Prefer moves to reward cells
          if (cell.userData.type === 2) { // Positive reward
            moveValue = 5;
          } else if (cell.userData.type === 1) { // Negative reward
            moveValue = 0.5;
          }
          
          possibleMoves.push({ 
            x: newX, 
            z: newZ, 
            value: moveValue
          });
        }
      });
      
      if (possibleMoves.length > 0) {
        // Choose move with some randomness (exploration)
        const randomFactor = Math.random() < 0.3;
        let nextMove;
        
        if (randomFactor) {
          // Random exploration
          nextMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        } else {
          // Exploit best move
          nextMove = possibleMoves.reduce((best, move) => 
            move.value > best.value ? move : best, possibleMoves[0]);
        }
        
        // Update agent's grid position
        agent.userData.gridX = nextMove.x;
        agent.userData.gridZ = nextMove.z;
        
        // Calculate 3D position
        const targetX = nextMove.x * cellSize - gridOffset;
        const targetZ = nextMove.z * cellSize - gridOffset;
        
        // Set up animation
        agent.userData.moving = true;
        agent.userData.targetX = targetX;
        agent.userData.targetZ = targetZ;
        
        // Update path
        pathPoints.push(new THREE.Vector3(targetX, -0.35, targetZ));
        pathGeometry.setFromPoints(pathPoints);
        
        // If path too long, remove oldest point
        if (pathPoints.length > 15) {
          pathPoints.shift();
          pathGeometry.setFromPoints(pathPoints);
        }
      }
    }
    
    // Animate agent movement
    function updateAgentPosition() {
      if (!agent.userData.moving) return;
      
      const speed = 0.05;
      const targetX = agent.userData.targetX;
      const targetZ = agent.userData.targetZ;
      
      // Move toward target
      const dx = targetX - agent.position.x;
      const dz = targetZ - agent.position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      
      if (distance < 0.01) {
        // Reached target
        agent.position.x = targetX;
        agent.position.z = targetZ;
        agent.userData.moving = false;
      } else {
        // Move toward target
        agent.position.x += (dx / distance) * speed;
        agent.position.z += (dz / distance) * speed;
      }
    }
    
    // Add some visual elements to indicate Q-values
    // Setup animation loop
    setInterval(() => {
      if (!agent.userData.moving) {
        moveAgent();
      }
      updateAgentPosition();
    }, 800);
    
    return group;
  }
}

// Function to dynamically load Three.js if needed
function loadThreeJs() {
  return new Promise((resolve, reject) => {
    if (typeof THREE !== 'undefined') {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Three.js'));
    document.head.appendChild(script);
  });
}
