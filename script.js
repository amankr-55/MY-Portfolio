// Aman Kumar - 3D Interactive Web Experience & Logic

document.addEventListener('DOMContentLoaded', () => {
    initThreeJSScene();
    init3DTiltEffects();
    initTypewriter();
    renderLinkedInPosts();
    initThemeToggle();
    initMobileNav();
    initScrollSpy();
    initCounters();
});

/* ==========================================================================
   Interactive 3D Background with Three.js
   ========================================================================== */
function initThreeJSScene() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, fallback to canvas');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Floating 3D Geometric Torus Knot Wireframe
    const geometry = new THREE.TorusKnotGeometry(8, 2.2, 120, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.position.set(15, 0, -10);
    scene.add(torusKnot);

    // 2. Floating 3D Icosahedron Core
    const icoGeo = new THREE.IcosahedronGeometry(6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.22
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-18, -8, -15);
    scene.add(ico);

    // 3. 3D Particle Starfield
    const particlesCount = 350;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 80;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.25,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        torusKnot.rotation.x = elapsedTime * 0.15 + targetY * 0.3;
        torusKnot.rotation.y = elapsedTime * 0.2 + targetX * 0.3;

        ico.rotation.x = -elapsedTime * 0.12;
        ico.rotation.y = elapsedTime * 0.18;

        particlesMesh.rotation.y = -elapsedTime * 0.04 + targetX * 0.1;
        particlesMesh.rotation.x = targetY * 0.1;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   3D Tilt Card Effects (Perspective Cursor Tracker)
   ========================================================================== */
function init3DTiltEffects() {
    const cards = document.querySelectorAll('.glass-card, .avatar-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/* ==========================================================================
   Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;

    const phrases = [
        "B.Tech AI & ML Student @ NIAT Jaipur 🎓",
        "Aspiring Software Developer & AI Builder 🚀",
        "Full-Stack Web Developer (React + Django) 💻",
        "Incoming Data Science Intern @ SkillCraft 📊",
        "Creative Video & Photo Editor ✨"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   LinkedIn Posts Renderer with Real Image Post Support
   ========================================================================== */
function renderLinkedInPosts() {
    const container = document.getElementById('linkedin-posts-container');
    if (!container || typeof linkedinPosts === 'undefined') return;

    container.innerHTML = linkedinPosts.map(post => {
        let mediaHtml = '';
        if (post.postImage) {
            mediaHtml = `
                <div style="margin-bottom: 1.25rem; border-radius: var(--radius-md); overflow: hidden; max-height: 200px; border: 1px solid var(--border-color);">
                    <img src="${post.postImage}" alt="LinkedIn Post Attachment" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                </div>
            `;
        }

        const hashtagsHtml = post.hashtags.map(tag => `<span class="linkedin-tag-item">${tag}</span>`).join(' ');

        return `
            <div class="glass-card linkedin-card">
                <div class="linkedin-header">
                    <div class="linkedin-user">
                        <img src="${post.avatar}" onerror="this.src='${post.fallbackAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}'" alt="${post.author}" class="linkedin-avatar">
                        <div class="linkedin-meta">
                            <h4>${post.author}</h4>
                            <p>${post.role}</p>
                            <p style="font-size: 0.72rem; color: var(--accent-cyan);">${post.date}</p>
                        </div>
                    </div>
                    <i class="fa-brands fa-linkedin linkedin-brand-icon"></i>
                </div>

                <div class="linkedin-body">
                    <p>${post.content}</p>
                </div>

                ${mediaHtml}

                <div class="linkedin-tags">
                    ${hashtagsHtml}
                </div>

                <div class="linkedin-footer">
                    <div class="linkedin-reactions">
                        <span>👍💡🚀</span>
                        <span>${post.likes} reactions &bull; ${post.comments} comments</span>
                    </div>
                    <a href="${post.postUrl}" target="_blank" rel="noopener noreferrer" class="linkedin-link-btn">
                        View Post <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================================================
   Theme Switcher
   ========================================================================== */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('aman_portfolio_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('aman_portfolio_theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    if (theme === 'light') {
        icon.className = 'fa-solid fa-moon';
    } else {
        icon.className = 'fa-solid fa-sun';
    }
}

/* ==========================================================================
   Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = toggleBtn.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
}

/* ==========================================================================
   Scroll Spy & Active Nav Indicator
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Counters on Scroll
   ========================================================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1500;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + (counter.getAttribute('data-plus') ? '+' : '');
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (counter.getAttribute('data-plus') ? '+' : '');
                        }
                    }, stepTime);
                });
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) observer.observe(statsBar);
}

/* ==========================================================================
   Toast Notification & LinkedIn Quick Connect
   ========================================================================== */
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast-msg';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-brands fa-linkedin" style="color: #0a66c2;"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

window.copyLinkedIn = function() {
    navigator.clipboard.writeText("https://www.linkedin.com/in/aman-kumar-71944037b").then(() => {
        showToast("LinkedIn Profile Link copied to clipboard!");
    });
};
