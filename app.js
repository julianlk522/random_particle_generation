const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');

c.canvas.width = window.innerWidth;
c.canvas.height = window.innerHeight;



const baseSpeed = 0.5;
// const baseForce = 0.1;
// const maxDistance = 1000;
// const gravitation = 3;
// const friction = 0.9;



// mouse position
let mouse = {
    x: null,
    y: null,
    radius: 100
};



window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)



// Particle constructor
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    // this.directionX = directionX;
    // this.directionY = directionY;
    // this.size = size;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
}



// Draw particles
Particle.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath()
}



// Update particles
Particle.prototype.update = function() {
    
    // wall collision
    // if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
    //     this.directionX *= -(1-friction);
    // }

    // if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
    //     this.directionY *= -(1-friction);
    // }



    // circular motion
    this.radians += this.velocity
    this.x = this.x + Math.cos(this.radians) * 10
    this.y = this.y + Math.sin(this.radians) * 10
   


    // attraction to mouse
    // let dx = mouse.x - this.x;  
    // let dy = mouse.y - this.y;
    // let distance = Math.sqrt(dx * dx + dy * dy);
    // let forceDirectionX = dx / distance;
    // let forceDirectionY = dy / distance;
    
    // let force = (maxDistance - distance) / maxDistance;
    // if (force < 0) force = 0;
    
    // // this.directionX = force * forceDirectionX * gravitation;
    // // this.directionY = force * forceDirectionY * gravitation;




    // this.x += this.directionX;
    // this.y += this.directionY;

    this.draw();
    // console.log(this.radians, this.x, this.y)
}



// Initializing a new particle array
function init() {
    particleArray = [];
    
    for (let i = 0; i < 100; i++) {
        let colors = {
            red: Math.random() * 255,
            green: Math.random() * 255,
            blue: Math.random() * 255,
        }

        // let size = Math.random() * 20;
        // let x = Math.random() * (innerWidth - (size * 2)) + size;
        // let y = Math.random() * (innerHeight - (size * 2)) + size;
        // let directionX = (Math.random() * baseSpeed * 2) - baseSpeed;
        // let directionY = (Math.random() * baseSpeed * 2) - baseSpeed;
        let color = `rgb(${colors.red}, ${colors.green}, ${colors.blue})`;

        particleArray.push(new Particle(canvas.width / 2, (canvas.height / 2), 10, color));
    }
}



// Animation
function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'rgba(255,255,255,0.05';
    c.fillRect(0,0,canvas.width,canvas.height);

    particleArray.forEach(particle => {
        particle.update()
    })
}



init();
animate();



// Resize effect to prevent distortion
window.addEventListener('resize',
    function() {
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
        init();
    }
)