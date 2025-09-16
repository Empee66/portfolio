const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

 const denElement = document.getElementById('den');
 const words = denElement ? denElement.textContent.trim().split(/\s+/) : [];
 let wordIndex = 0;
 let charIndex = 0;
 let isDeleting = false;
 const typewriterElement = document.getElementById('typewriter');
 const typingSpeed = 100; 
 const erasingSpeed = 50; 
 const pauseBetween = 1000; 

 function typeEffect() {
    
     if (!words || words.length === 0) {
         console.error('No words found in the h1 element');
         if (typewriterElement) {
             typewriterElement.textContent = 'Error: No words to display';
         }
         return;
     }

     wordIndex = wordIndex % words.length;
     const currentWord = words[wordIndex];

     if (!isDeleting && charIndex <= currentWord.length) {
        
         typewriterElement.textContent = currentWord.substring(0, charIndex);
         charIndex++;
         setTimeout(typeEffect, typingSpeed);
     } else if (isDeleting && charIndex >= 0) {
        
         typewriterElement.textContent = currentWord.substring(0, charIndex);
         charIndex--;
         setTimeout(typeEffect, erasingSpeed);
     } else {
         
        
         isDeleting = !isDeleting;
         if (!isDeleting) {
             wordIndex = (wordIndex + 1) % words.length; 
             
         }
         setTimeout(typeEffect, pauseBetween);
     }
 }


 
 if (denElement && typewriterElement) {
     typeEffect();
 } else {
     console.error('Required elements (den or typewriter) not found');
 }
 // server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from your frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit-contact', async (req, res) => {
  const { name, email, message, 'g-recaptcha-response': recaptchaToken } = req.body;
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: 'YOUR_RECAPTCHA_SECRET_KEY', // Replace with your Secret Key
        response: recaptchaToken
      }
    });
    if (response.data.success) {
      // Process form data (e.g., log, save to database, send to Telegram)
      console.log('Form data:', { name, email, message });
      res.json({ success: true, message: 'Form submitted successfully!' });
    } else {
      res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));