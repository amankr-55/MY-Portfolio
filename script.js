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
   Interactive 3D Background with Three.js (Rich 3D WebGL World)
   ========================================================================== */
function initThreeJSScene() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, fallback to CSS 3D');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 1. Floating 3D Geometric Torus Knot (Cyan Cyber Wireframe on Left Side)
    const torusGeo = new THREE.TorusKnotGeometry(8, 2.2, 140, 20);
    const torusMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.45
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.position.set(-16, 3, -6);
    scene.add(torusKnot);

    // 2. Floating 3D Icosahedron Core (Purple Neon on Left Bottom)
    const icoGeo = new THREE.IcosahedronGeometry(6.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.42
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-14, -8, -10);
    scene.add(ico);

    // 3. Floating 3D Dodecahedron (Golden Amber on Left-Center)
    const dodecaGeo = new THREE.DodecahedronGeometry(4.5, 0);
    const dodecaMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.38
    });
    const dodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
    dodeca.position.set(-8, -14, -8);
    scene.add(dodeca);

    // 4. Floating 3D Octahedron (Pink Cyber Star on Left Top)
    const octaGeo = new THREE.OctahedronGeometry(4, 0);
    const octaMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.40
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    octa.position.set(-18, 12, -10);
    scene.add(octa);

    // 5. 3D Cyber Wireframe Ground Grid Plane (Perspective Horizon on Left-Center)
    const gridGeo = new THREE.PlaneGeometry(130, 130, 32, 32);
    const gridMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const gridPlane = new THREE.Mesh(gridGeo, gridMat);
    gridPlane.rotation.x = -Math.PI / 2 + 0.3;
    gridPlane.position.set(-10, -22, -15);
    scene.add(gridPlane);

    // 6. 3D Glowing Particle Starfield & Nebula Dust
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 110;
        posArray[i + 1] = (Math.random() - 0.5) * 110;
        posArray[i + 2] = (Math.random() - 0.5) * 90;
        scaleArray[i / 3] = Math.random();
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.35,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 7. Dynamic 3D Lights tracking mouse
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Smooth Mouse Parallax Physics
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

        // Smooth Lerp Camera Parallax
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        camera.position.x = targetX * 4;
        camera.position.y = -targetY * 3;
        camera.lookAt(0, 0, 0);

        // 3D Object Rotations & Floating Motion
        torusKnot.rotation.x = elapsedTime * 0.18 + targetY * 0.4;
        torusKnot.rotation.y = elapsedTime * 0.22 + targetX * 0.4;
        torusKnot.position.y = 2 + Math.sin(elapsedTime * 0.8) * 1.5;

        ico.rotation.x = -elapsedTime * 0.15;
        ico.rotation.y = elapsedTime * 0.2 + targetX * 0.2;
        ico.position.y = -6 + Math.cos(elapsedTime * 0.7) * 1.2;

        dodeca.rotation.x = elapsedTime * 0.2;
        dodeca.rotation.z = elapsedTime * 0.15;
        dodeca.position.y = -14 + Math.sin(elapsedTime * 0.9) * 1.4;

        octa.rotation.y = elapsedTime * 0.25;
        octa.rotation.x = elapsedTime * 0.15;
        octa.position.y = 14 + Math.cos(elapsedTime * 0.6) * 1.3;

        gridPlane.position.z = -15 + Math.sin(elapsedTime * 0.3) * 2;

        particlesMesh.rotation.y = -elapsedTime * 0.03 + targetX * 0.15;
        particlesMesh.rotation.x = targetY * 0.1;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   3D Tilt & Interactive Depth Tracker (High-Performance 3D Effect)
   ========================================================================== */
function init3DTiltEffects() {
    const cards = document.querySelectorAll('.glass-card, .avatar-card, .skill-card, .highlight-box, .stat-item, .project-card, .achievement-card, .cgtrader-card, .contact-card');

    cards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)';
        });
    });
}

/* ==========================================================================
   Typewriter Effect (Including 3D Blender Artist & CGTrader)
   ========================================================================== */
function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;

    const phrases = [
        "3D Blender Artist & CGTrader Designer 🎨",
        "B.Tech AI & ML Student @ NIAT 🎓",
        "Full-Stack Web Developer (React + Django) 💻",
        "Incoming Data Science Intern @ SkillCraft 📊",
        "3D WebGL & Creative Media Designer ✨"
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
                    <img src="${post.postImage}" alt="Post Attachment" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
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
                        View Details <i class="fa-solid fa-arrow-up-right-from-square"></i>
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
    toast.innerHTML = `<i class="fa-solid fa-cube" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;
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
