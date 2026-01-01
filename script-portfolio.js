// Three.js Background
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Create particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = window.innerWidth < 768 ? 800 : 1500; // Reduce particles on mobile
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00fff5,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create geometric shapes
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00fff5,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torus = new THREE.Mesh(geometry, material);
torus.position.z = -3;
scene.add(torus);

// Create secondary shape
const geometry2 = new THREE.OctahedronGeometry(0.8);
const material2 = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
});
const octahedron = new THREE.Mesh(geometry2, material2);
octahedron.position.set(3, -2, -5);
scene.add(octahedron);

// Animation
let mouseX = 0;
let mouseY = 0;

if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;

    // Rotate shapes
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    
    octahedron.rotation.x -= 0.005;
    octahedron.rotation.y -= 0.01;

    // Camera movement based on mouse
    if (window.matchMedia('(hover: hover)').matches) {
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    }

    // Parallax effect based on scroll
    const scrollY = window.scrollY;
    particlesMesh.rotation.z = scrollY * 0.0001;
    torus.position.y = Math.sin(scrollY * 0.001) * 0.5;
    octahedron.position.y = -2 + Math.cos(scrollY * 0.0015) * 0.5;

    renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and timeline items
const cards = document.querySelectorAll('.tech-card, .content-card, .timeline-item');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.8s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Performance optimization for low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    // Reduce particle count
    particlesMaterial.opacity = 0.5;
    torus.material.opacity = 0.2;
    octahedron.material.opacity = 0.1;
}

// Reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    particlesMesh.rotation.set(0, 0, 0);
    torus.rotation.set(0, 0, 0);
    octahedron.rotation.set(0, 0, 0);
}

console.log('%c🌌 Portfolio 3D Mode Activated', 'color: #00fff5; font-size: 16px; font-weight: bold;');
console.log('%c✨ Three.js Background Running', 'color: #ff00ff; font-size: 14px;');
