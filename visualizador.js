let planets = [];
let sunRadius = 90;
let orbitScale = 2.5;
let speedScale = 0.01;
let rotationSpeedScale = 0.05;
let cameraZ = 1269;
let texturaestrella, texturasol, texturavenus, texturamercurio, texturatierra, texturamarte, texturajupiter, texturasaturno, texturaurano, texturaneptuno;
let planetHovered = null;
let planetLabels = [];
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let cameraRotationX = 0;
let cameraRotationY = 0;
let zoomFactor = 1;
let showOrbits = true;
let showLabels = true;
let infoPanelVisible = false;

function preload() {
  // Manteniendo exactamente las mismas texturas originales
  texturaestrella = loadImage("https://i.ibb.co/NNTFKmL/nocheHD.jpg");
  texturasol = loadImage("https://1.bp.blogspot.com/-ysB6ECK8cg0/XwXfSyZ0aFI/AAAAAAAAAHE/irVQWGUMi80XJPXqRizrBfhiZ2uPVuzWACK4BGAsYHg/s2048/sol-textura.jpg");
  texturavenus = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Solarsystemscope_texture_8k_venus_surface.jpg/2560px-Solarsystemscope_texture_8k_venus_surface.jpg");
  texturamercurio = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReJCVg15xWPfl2E2SCMtrxgdvumWTM5IQX7Q&s");
  texturatierra = loadImage("https://i.ibb.co/PD4LyP5/planeta.jpg");
  texturamarte = loadImage("https://st2.depositphotos.com/2800301/6995/i/450/depositphotos_69955429-stock-photo-mars-surface.jpg");
  texturajupiter = loadImage("https://i.ibb.co/WPvVybx/luna.jpg");
  texturasaturno = loadImage("https://www.shutterstock.com/image-illustration/saturn-ring-background-texture-3d-260nw-1856278243.jpg");
  texturaurano = loadImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2115d5b9-b53e-4f1d-81e4-1d21461eeb45/dc6sa37-667ade72-07a3-48ca-9087-d4280ae7ff68.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIxMTVkNWI5LWI1M2UtNGYxZC04MWU0LTFkMjE0NjFlZWI0NVwvZGM2c2EzNy02NjdhZGU3Mi0wN2EzLTQ4Y2EtOTA4Ny1kNDI4MGFlN2ZmNjguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.B3HxUIVy2jM00rSvTScriT5H4v8ZcImRbXHP-e9fQh4");
  texturaneptuno = loadImage("https://static.vecteezy.com/system/resources/previews/002/097/266/large_2x/abstract-background-of-neptune-surface-free-vector.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(RADIANS);
  smooth();
  
  // Configuración de planetas mejorada
  planets = [
    { 
      name: 'Mercurio', 
      radius: 25, 
      distance: 60, 
      speed: 4.74, 
      texture: texturamercurio, 
      rotationAngle: 0, 
      rotationSpeed: 0.1,
      info: 'Mercurio es el planeta más pequeño y cercano al Sol.',
      orbitColor: color(180, 180, 180, 150)
    },
    { 
      name: 'Venus', 
      radius: 30, 
      distance: 100, 
      speed: 3.50, 
      texture: texturavenus, 
      rotationAngle: 0, 
      rotationSpeed: 0.08,
      info: 'Venus es el segundo planeta del sistema solar y el más caliente.',
      orbitColor: color(230, 180, 100, 150)
    },
    { 
      name: 'Tierra', 
      radius: 45, 
      distance: 150, 
      speed: 1.98, 
      texture: texturatierra, 
      rotationAngle: 0, 
      rotationSpeed: 0.06,
      info: 'La Tierra es nuestro hogar y el único planeta conocido con vida.',
      orbitColor: color(100, 150, 255, 150)
    },
    { 
      name: 'Marte', 
      radius: 27, 
      distance: 200, 
      speed: 2.41, 
      texture: texturamarte, 
      rotationAngle: 0, 
      rotationSpeed: 0.07,
      info: 'Marte es conocido como el planeta rojo y es el objetivo de exploración humana.',
      orbitColor: color(200, 100, 80, 150)
    },
    { 
      name: 'Júpiter', 
      radius: 60, 
      distance: 300, 
      speed: 1.31, 
      texture: texturajupiter, 
      rotationAngle: 0, 
      rotationSpeed: 0.04,
      info: 'Júpiter es el planeta más grande del sistema solar, un gigante gaseoso.',
      orbitColor: color(220, 160, 100, 150)
    },
    { 
      name: 'Saturno', 
      radius: 55, 
      distance: 400, 
      speed: 0.97, 
      texture: texturasaturno, 
      rotationAngle: 0, 
      rotationSpeed: 0.05,
      info: 'Saturno es famoso por sus impresionantes anillos de hielo y roca.',
      orbitColor: color(220, 200, 120, 150)
    },
    { 
      name: 'Urano', 
      radius: 40, 
      distance: 500, 
      speed: 0.68, 
      texture: texturaurano, 
      rotationAngle: 0, 
      rotationSpeed: 0.03,
      info: 'Urano es un gigante de hielo con una inclinación axial extrema.',
      orbitColor: color(150, 220, 220, 150)
    },
    { 
      name: 'Neptuno', 
      radius: 28, 
      distance: 600, 
      speed: 0.54, 
      texture: texturaneptuno, 
      rotationAngle: 0, 
      rotationSpeed: 0.035,
      info: 'Neptuno es el planeta más alejado del Sol y el más ventoso.',
      orbitColor: color(80, 120, 220, 150)
    }
  ];

  // Inicializar ángulos aleatorios
  for (let planet of planets) {
    planet.angle = random(TWO_PI);
  }

  // Configurar controles de interfaz
  setupControls();
  
  // Configuración inicial de cámara
  camera(0, 0, cameraZ * zoomFactor, 0, 0, 0, 0, 1, 0);
}

function setupControls() {
  // Crear controles de interfaz
  const controls = createDiv('');
  controls.id('controls');
  controls.style('position', 'absolute');
  controls.style('top', '20px');
  controls.style('left', '20px');
  controls.style('z-index', '100');
  controls.style('background', 'rgba(0,0,0,0.7)');
  controls.style('padding', '10px');
  controls.style('border-radius', '5px');
  controls.style('color', 'white');
  controls.style('font-family', 'Arial, sans-serif');
  
  // Título
  const title = createElement('h2', 'Sistema Solar 3D');
  title.style('margin', '0 0 10px 0');
  title.style('color', '#4a90e2');
  title.parent(controls);
  
  // Instrucciones
  const instructions = createP('Arrastra para rotar · Rueda para zoom · Haz clic en planetas');
  instructions.style('margin', '0 0 10px 0');
  instructions.style('font-size', '0.9em');
  instructions.parent(controls);
  
  // Botones de control
  const buttonContainer = createDiv('');
  buttonContainer.style('display', 'flex');
  buttonContainer.style('gap', '10px');
  buttonContainer.parent(controls);
  
  // Botón para alternar órbitas
  const orbitBtn = createButton(showOrbits ? 'Ocultar órbitas' : 'Mostrar órbitas');
  orbitBtn.mousePressed(() => {
    showOrbits = !showOrbits;
    orbitBtn.html(showOrbits ? 'Ocultar órbitas' : 'Mostrar órbitas');
  });
  orbitBtn.parent(buttonContainer);
  
  // Botón para alternar etiquetas
  const labelBtn = createButton(showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas');
  labelBtn.mousePressed(() => {
    showLabels = !showLabels;
    labelBtn.html(showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas');
  });
  labelBtn.parent(buttonContainer);
}

function draw() {
  background(0);
  
  // Fondo estrellado
  drawStarfield();
  
  // Control de cámara con arrastre
  handleCameraRotation();
  
  // Dibujar Sol con efecto de brillo
  drawSun();
  
  // Dibujar planetas y órbitas
  drawPlanetsAndOrbits();
}

function drawStarfield() {
  push();
  noStroke();
  texture(texturaestrella);
  rotateY(frameCount * 0.001);
  sphere(3900);
  pop();
}

function handleCameraRotation() {
  if (isDragging) {
    cameraRotationY += (mouseX - lastMouseX) * 0.01;
    cameraRotationX += (mouseY - lastMouseY) * 0.01;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
  rotateX(cameraRotationX);
  rotateY(cameraRotationY);
}

function drawSun() {
  push();
  noStroke();
  rotateY(frameCount * 0.009);
  texture(texturasol);
  
  // Efecto de brillo pulsante
  let pulse = sin(frameCount * 0.05) * 0.2 + 0.8;
  emissiveMaterial(255 * pulse, 200 * pulse, 100 * pulse, 50);
  
  // Efecto de corona
  if (frameCount % 60 < 30) {
    ambientLight(255, 200, 100, 50);
  } else {
    ambientLight(255, 150, 50, 30);
  }
  
  sphere(sunRadius);
  pop();
}

function drawPlanetsAndOrbits() {
  planetHovered = null;
  
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    const x = planet.distance * orbitScale * cos(planet.angle);
    const z = planet.distance * orbitScale * sin(planet.angle);
    
    // Dibujar órbita si está activado
    if (showOrbits) {
      drawOrbit(planet);
    }
    
    // Dibujar planeta
    push();
    translate(x, 0, z);
    noStroke();
    
    // Resaltar planeta al hacer hover
    if (isPlanetHovered(planet)) {
      planetHovered = planet;
      emissiveMaterial(255, 255, 255, 100);
      drawPlanetLabel(planet, i);
    }
    
    rotateY(planet.rotationAngle);
    texture(planet.texture);
    
    // Efecto especial para Saturno (anillos)
    if (planet.name === 'Saturno') {
      drawSaturnWithRings(planet);
    } else {
      sphere(planet.radius);
    }
    
    pop();
    
    // Actualizar posición del planeta
    updatePlanetPosition(planet);
  }
}

function drawOrbit(planet) {
  push();
  rotateX(HALF_PI);
  noFill();
  stroke(planet.orbitColor);
  strokeWeight(1);
  ellipse(0, 0, planet.distance * orbitScale * 2, planet.distance * orbitScale * 2);
  pop();
}

function drawSaturnWithRings(planet) {
  // Dibujar planeta
  sphere(planet.radius);
  
  // Dibujar anillos
  push();
  rotateX(PI/2);
  noFill();
  stroke(200, 200, 150, 150);
  strokeWeight(3);
  ellipse(0, 0, planet.radius * 2.5, planet.radius * 1.2);
  pop();
}

function drawPlanetLabel(planet, index) {
  if (!showLabels) return;
  
  const screenPos = worldToScreen(createVector(
    planet.distance * orbitScale * cos(planet.angle),
    0,
    planet.distance * orbitScale * sin(planet.angle)
  ));
  
  // Crear etiqueta si no existe
  if (!planetLabels[index]) {
    planetLabels[index] = createDiv(planet.name);
    planetLabels[index].class('planet-label');
    planetLabels[index].style('position', 'absolute');
    planetLabels[index].style('color', 'white');
    planetLabels[index].style('background', 'rgba(0,0,0,0.7)');
    planetLabels[index].style('padding', '5px 10px');
    planetLabels[index].style('border-radius', '3px');
    planetLabels[index].style('font-family', 'Arial, sans-serif');
    planetLabels[index].style('pointer-events', 'none');
  }
  
  // Posicionar etiqueta
  planetLabels[index].position(screenPos.x - planetLabels[index].width / 2, screenPos.y - planet.radius - 30);
  planetLabels[index].style('display', 'block');
}

function updatePlanetPosition(planet) {
  planet.angle += planet.speed * speedScale;
  planet.rotationAngle += planet.rotationSpeed * rotationSpeedScale;
}

function mousePressed() {
  if (mouseButton === LEFT) {
    isDragging = true;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
  
  // Verificar clic en el Sol
  const sunScreenPos = worldToScreen(createVector(0, 0, 0));
  if (dist(mouseX, mouseY, sunScreenPos.x, sunScreenPos.y) < sunRadius) {
    showPlanetInfo('Sol', 'El Sol es una estrella de tipo espectral G2 que contiene aproximadamente el 99.86% de la masa del Sistema Solar.');
    return;
  }
  
  // Verificar clic en planetas
  for (const planet of planets) {
    if (isPlanetHovered(planet)) {
      showPlanetInfo(planet.name, planet.info);
      return;
    }
  }
  
  // Cerrar panel de información si se hace clic fuera
  if (infoPanelVisible) {
    select('#planet-info').remove();
    infoPanelVisible = false;
  }
}

function mouseReleased() {
  isDragging = false;
}

function mouseWheel(event) {
  zoomFactor += event.delta * -0.001;
  zoomFactor = constrain(zoomFactor, 0.5, 3);
  camera(0, 0, cameraZ * zoomFactor, 0, 0, 0, 0, 1, 0);
  return false;
}

function showPlanetInfo(name, info) {
  // Eliminar panel existente si lo hay
  if (infoPanelVisible) {
    select('#planet-info').remove();
  }
  
  // Crear nuevo panel de información
  const infoBox = createDiv('');
  infoBox.id('planet-info');
  infoBox.style('position', 'absolute');
  infoBox.style('top', '50%');
  infoBox.style('left', '50%');
  infoBox.style('transform', 'translate(-50%, -50%)');
  infoBox.style('background', 'rgba(0,0,30,0.95)');
  infoBox.style('padding', '20px');
  infoBox.style('border-radius', '10px');
  infoBox.style('max-width', '500px');
  infoBox.style('color', 'white');
  infoBox.style('z-index', '1000');
  infoBox.style('border', '1px solid #4a90e2');
  infoBox.style('box-shadow', '0 0 20px rgba(74, 144, 226, 0.5)');
  
  // Título
  const title = createElement('h2', name);
  title.style('margin-top', '0');
  title.style('color', '#4a90e2');
  title.parent(infoBox);
  
  // Información
  const infoText = createP(info);
  infoText.parent(infoBox);
  
  // Botón de cerrar
  const closeBtn = createButton('×');
  closeBtn.style('position', 'absolute');
  closeBtn.style('top', '5px');
  closeBtn.style('right', '5px');
  closeBtn.style('background', 'none');
  closeBtn.style('border', 'none');
  closeBtn.style('color', 'white');
  closeBtn.style('font-size', '20px');
  closeBtn.style('cursor', 'pointer');
  closeBtn.mousePressed(() => {
    infoBox.remove();
    infoPanelVisible = false;
  });
  closeBtn.parent(infoBox);
  
  infoPanelVisible = true;
}

function isPlanetHovered(planet) {
  const mouse = createVector(mouseX - width/2, mouseY - height/2, 0);
  const planetScreenPos = worldToScreen(createVector(
    planet.distance * orbitScale * cos(planet.angle),
    0,
    planet.distance * orbitScale * sin(planet.angle)
  ));
  return dist(mouseX, mouseY, planetScreenPos.x, planetScreenPos.y) < planet.radius * 2;
}

function worldToScreen(position) {
  const screenX = (position.x / (position.z + cameraZ * zoomFactor)) * width/2 + width/2;
  const screenY = (position.y / (position.z + cameraZ * zoomFactor)) * height/2 + height/2;
  return createVector(screenX, screenY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}