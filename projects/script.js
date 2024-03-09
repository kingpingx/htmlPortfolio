 // Get the canvas element and its context
 const canvas = document.getElementById('myCanvas');
 const ctx = canvas.getContext('2d');

 // Calculate the center position of the canvas
 const centerX = canvas.width / 2;
 const centerY = canvas.height / 2;

 // Set the initial position and direction to the center
 let x = centerX;
 let y = centerY;
 let dx = 2;
 let dy = -2;

 // Define the walls
 const wall1 = { x: canvas.width, y: getRandomInt(-canvas.height, canvas.height) };
 const wall2 = { x: getRandomInt(-canvas.width, canvas.width), y: -canvas.height };
 const wall3 = { x: -canvas.width, y: getRandomInt(-canvas.height, canvas.height) };
 const wall4 = { x: getRandomInt(-canvas.width, canvas.width), y: canvas.height };

 // List of walls
 const walls = [wall1, wall2, wall3, wall4];

 // Get a random wall
 function getRandomWall() {
   return walls[Math.floor(Math.random() * walls.length)];
 }

 // Calculate the angle between two points
 function calculateAngle(x2, y2, x1, y1) {
   const angle = Math.abs(Math.atan((y2 - y1) / (x2 - x1))) * (180 / Math.PI);
   return 2 * angle;
 }

 // Define the particle system
 const particles = [];
 const particleCount = 50;

 // Particle constructor
 function Particle(x, y, dx, dy) {
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.opacity = 1;
   this.radius = getRandomInt(1, 5);

   this.draw = function() {
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
     ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
     ctx.fill();
     ctx.closePath();
   };

   this.update = function() {
     this.x += this.dx;
     this.y += this.dy;
     this.opacity -= 0.02;
     this.radius -= 0.02;
   };
 }

 // Create particles at collision point
 function createParticles(x, y) {
   for (let i = 0; i < particleCount; i++) {
     const particle = new Particle(x, y, getRandomInt(-2, 2), getRandomInt(-2, 2));
     particles.push(particle);
   }
 }

 // Draw the ball on the canvas
 function drawBall() {
   ctx.beginPath();
   ctx.arc(x, y, 10, 0, Math.PI * 2);
   ctx.fillStyle = 'red';
   ctx.fill();
   ctx.closePath();
 }

 // Draw the particles
 function drawParticles() {
   particles.forEach(particle => {
     particle.draw();
   });
 }

 // Update the particles
 function updateParticles() {
   particles.forEach((particle, index) => {
     particle.update();
     if (particle.opacity <= 0 || particle.radius <= 0) {
       particles.splice(index, 1);
     }
   });
 }

 // Update the ball's position and handle collisions
 function update() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Draw the ball
   drawBall();

   // Update the ball's position
   x += dx;
   y += dy;

   // Check for collisions with walls
   if (x + dx > canvas.width || x + dx < 0) {
     dx = -dx;
     createParticles(x, y);
   }
   if (y + dy > canvas.height || y + dy < 0) {
     dy = -dy;
     createParticles(x, y);
   }

   // Check if the ball is close to a wall
   const wall = getRandomWall();
   const angle = calculateAngle(wall.x, wall.y, x, y);
   const radius = 10; // Radius of the ball

   const distanceX = Math.abs(x - wall.x);
   const distanceY = Math.abs(y - wall.y);

   if (distanceX <= radius && distanceY <= radius) {
     const signDX = Math.sign(dx);
     const signDY = Math.sign(dy);
     dx = signDX * Math.abs(Math.cos(angle * (Math.PI / 180)));
     dy = signDY * Math.abs(Math.sin(angle * (Math.PI / 180)));
     createParticles(x, y);
   }

   // Update and draw the particles
   updateParticles();
   drawParticles();

   requestAnimationFrame(update);
 }

 // Utility function to get a random integer
 function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 // Start the animation
 update();