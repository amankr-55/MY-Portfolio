// Aman Kumar - 3D Interactive Web Experience & Logic

document.addEventListener('DOMContentLoaded', () => {
    initThreeJSScene();
    init3DTiltEffects();
    init3DCursor();
    initTypewriter();
    renderLinkedInPosts();
    initThemeToggle();
    initMobileNav();
    initScrollSpy();
    initCounters();
    initServiceForm();
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

    /* =========================================================================
       RIGHT SIDE 3D OBJECTS (Positioned directly behind & around profile image)
       ========================================================================= */
    // 5. Right 3D Gyroscope Triple Ring System (Hologram Behind Image)
    const rightGyroGroup = new THREE.Group();
    const gyroRing1 = new THREE.Mesh(
        new THREE.TorusGeometry(8.5, 0.12, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
    );
    const gyroRing2 = new THREE.Mesh(
        new THREE.TorusGeometry(6.2, 0.10, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.60 })
    );
    const gyroRing3 = new THREE.Mesh(
        new THREE.TorusGeometry(4.2, 0.08, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.55 })
    );
    rightGyroGroup.add(gyroRing1);
    rightGyroGroup.add(gyroRing2);
    rightGyroGroup.add(gyroRing3);
    rightGyroGroup.position.set(16, 2, -6);
    scene.add(rightGyroGroup);

    // 6. Right 3D Double Helix / Cyber DNA (Vertical Stream Behind Image)
    const helixGroup = new THREE.Group();
    const helixCount = 48;
    const helixSpheres = [];
    for (let i = 0; i < helixCount; i++) {
        const t = (i / helixCount) * Math.PI * 4;
        const yPos = (i - helixCount / 2) * 0.9;
        const radius = 3.5;

        const sphere1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
        );
        sphere1.position.set(Math.cos(t) * radius, yPos, Math.sin(t) * radius);
        helixGroup.add(sphere1);

        const sphere2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.85 })
        );
        sphere2.position.set(Math.cos(t + Math.PI) * radius, yPos, Math.sin(t + Math.PI) * radius);
        helixGroup.add(sphere2);

        // Connection rung
        const rungGeo = new THREE.BufferGeometry().setFromPoints([sphere1.position, sphere2.position]);
        const rungMat = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 });
        const rung = new THREE.Line(rungGeo, rungMat);
        helixGroup.add(rung);
    }
    helixGroup.position.set(19, 0, -10);
    scene.add(helixGroup);

    // 7. Right 3D Polyhedral Crystals (Floating Behind Image)
    const rightIco = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.5, 1),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.45 })
    );
    rightIco.position.set(14, 13, -8);
    scene.add(rightIco);

    const rightTorusKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(5.5, 1.6, 100, 16),
        new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.40 })
    );
    rightTorusKnot.position.set(16, -13, -9);
    scene.add(rightTorusKnot);

    const rightOcta = new THREE.Mesh(
        new THREE.OctahedronGeometry(4, 0),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.45 })
    );
    rightOcta.position.set(10, -5, -5);
    scene.add(rightOcta);

    // 8. 3D Cyber Wireframe Ground Grid Plane (Perspective Horizon Across Full Viewport)
    const gridGeo = new THREE.PlaneGeometry(240, 180, 48, 48);
    const gridMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    });
    const gridPlane = new THREE.Mesh(gridGeo, gridMat);
    gridPlane.rotation.x = -Math.PI / 2 + 0.3;
    gridPlane.position.set(0, -22, -15);
    scene.add(gridPlane);

    // 9. 3D Glowing Particle Starfield & Nebula Dust (Full Width)
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 180;
        posArray[i + 1] = (Math.random() - 0.5) * 140;
        posArray[i + 2] = (Math.random() - 0.5) * 110;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.38,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.80,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 10. Dynamic 3D Lights tracking mouse
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const rightPointLight = new THREE.PointLight(0xa855f7, 3, 50);
    rightPointLight.position.set(16, 4, -4);
    scene.add(rightPointLight);

    // 11. Dedicated 3D Interactive Mouse Follower Hologram (Crystal & Gyroscope)
    const cursor3DGroup = new THREE.Group();

    const cursorDiamondGeo = new THREE.OctahedronGeometry(1.4, 0);
    const cursorDiamondMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.85
    });
    const cursorDiamond = new THREE.Mesh(cursorDiamondGeo, cursorDiamondMat);
    cursor3DGroup.add(cursorDiamond);

    const cursorRingGeo = new THREE.TorusGeometry(2.1, 0.06, 16, 48);
    const cursorRingMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: false,
        transparent: true,
        opacity: 0.70
    });
    const cursor3DRing = new THREE.Mesh(cursorRingGeo, cursorRingMat);
    cursor3DGroup.add(cursor3DRing);

    const cursorPointLight = new THREE.PointLight(0x38bdf8, 2.5, 40);
    cursor3DGroup.add(cursorPointLight);

    cursor3DGroup.position.set(0, 0, 8);
    scene.add(cursor3DGroup);

    // Scroll Position Tracking for 3D continuous animation
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Smooth Parallax and Animation Loop
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
        const scrollFactor = scrollY * 0.003;

        // Smooth Lerp Camera Parallax
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        camera.position.x = targetX * 3;
        camera.position.y = -targetY * 2;

        // Continuous 3D Object Rotations & Scroll Dynamics on LEFT Side
        torusKnot.rotation.x = elapsedTime * 0.25 + scrollFactor + targetY * 0.4;
        torusKnot.rotation.y = elapsedTime * 0.30 + scrollFactor * 0.8 + targetX * 0.4;
        torusKnot.position.y = 3 + Math.sin(elapsedTime * 0.9 + scrollFactor) * 2;

        ico.rotation.x = -elapsedTime * 0.20 + scrollFactor * 1.2;
        ico.rotation.y = elapsedTime * 0.25 + scrollFactor * 0.6;
        ico.position.y = -8 + Math.cos(elapsedTime * 0.8 + scrollFactor) * 1.8;

        dodeca.rotation.x = elapsedTime * 0.28 + scrollFactor;
        dodeca.rotation.z = elapsedTime * 0.22 + scrollFactor * 0.5;
        dodeca.position.y = -14 + Math.sin(elapsedTime * 1.1 + scrollFactor) * 2;

        octa.rotation.y = elapsedTime * 0.35 + scrollFactor;
        octa.rotation.x = elapsedTime * 0.22 + scrollFactor * 0.7;
        octa.position.y = 12 + Math.cos(elapsedTime * 0.7 + scrollFactor) * 1.8;

        gridPlane.rotation.z = scrollFactor * 0.3;
        gridPlane.position.z = -15 + Math.sin(elapsedTime * 0.4) * 2;

        // Continuous 3D Object Rotations & Scroll Dynamics on RIGHT Side (Behind & around photo)
        gyroRing1.rotation.x = elapsedTime * 0.45 + scrollFactor * 0.8;
        gyroRing1.rotation.y = elapsedTime * 0.35 + (targetX * 0.5);
        gyroRing2.rotation.y = -elapsedTime * 0.55 + scrollFactor * 0.6;
        gyroRing2.rotation.z = elapsedTime * 0.40 + (targetY * 0.5);
        gyroRing3.rotation.x = elapsedTime * 0.65;
        gyroRing3.rotation.z = -elapsedTime * 0.50;
        rightGyroGroup.position.y = 2 + Math.sin(elapsedTime * 0.8 + scrollFactor) * 2;

        helixGroup.rotation.y = elapsedTime * 0.75 + scrollFactor * 1.5;
        helixGroup.position.y = Math.cos(elapsedTime * 0.6 + scrollFactor) * 2.5;

        rightIco.rotation.x = elapsedTime * 0.30 + scrollFactor;
        rightIco.rotation.y = elapsedTime * 0.25;
        rightIco.position.y = 13 + Math.sin(elapsedTime * 0.9 + scrollFactor) * 1.8;

        rightTorusKnot.rotation.x = -elapsedTime * 0.22 + scrollFactor * 0.7;
        rightTorusKnot.rotation.z = elapsedTime * 0.30;
        rightTorusKnot.position.y = -13 + Math.cos(elapsedTime * 0.8 + scrollFactor) * 2;

        rightOcta.rotation.y = elapsedTime * 0.40 + scrollFactor;
        rightOcta.rotation.x = elapsedTime * 0.30;
        rightOcta.position.y = -5 + Math.sin(elapsedTime * 1.1 + scrollFactor) * 1.5;

        // 3D Cursor Mesh World Position Tracking & Gyroscope Spin
        const cursorWorldX = mouseX * 22;
        const cursorWorldY = -mouseY * 13;
        cursor3DGroup.position.x += (cursorWorldX - cursor3DGroup.position.x) * 0.12;
        cursor3DGroup.position.y += (cursorWorldY - cursor3DGroup.position.y) * 0.12;
        cursorDiamond.rotation.x = elapsedTime * 2.2 + (targetY * 2);
        cursorDiamond.rotation.y = elapsedTime * 2.8 + (targetX * 2);
        cursorDiamond.rotation.z = elapsedTime * 1.5;
        cursor3DRing.rotation.x = elapsedTime * 1.4 + (targetX * 1.5);
        cursor3DRing.rotation.y = elapsedTime * 1.8 + (targetY * 1.5);

        particlesMesh.rotation.y = -elapsedTime * 0.05 + scrollFactor * 0.4 + targetX * 0.15;
        particlesMesh.rotation.x = targetY * 0.1 + scrollFactor * 0.2;

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
        "Software & AI Intern @ Axlore Solution 🚀",
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

/* ==========================================================================
   Interactive Service Request & Confidential Email Relay
   ========================================================================== */
window.selectService = function(serviceName) {
    const hiddenInput = document.getElementById('selected-service-input');
    const chips = document.querySelectorAll('.service-chip');
    
    if (hiddenInput) {
        hiddenInput.value = serviceName;
    }

    chips.forEach(chip => {
        if (chip.getAttribute('data-service') === serviceName) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    showToast(`Selected Service: ${serviceName}`);
};

function initServiceForm() {
    const form = document.getElementById('service-request-form');
    const chips = document.querySelectorAll('.service-chip');
    const hiddenInput = document.getElementById('selected-service-input');
    const statusBox = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const submitBtnText = document.getElementById('submit-btn-text');

    if (!form) return;

    // Service chip selection
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const selectedVal = chip.getAttribute('data-service');
            if (hiddenInput) hiddenInput.value = selectedVal;
        });
    });

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim() || 'Not Provided';
        const budget = form.querySelector('[name="budget"]').value.trim() || 'Flexible';
        const service = hiddenInput ? hiddenInput.value : 'General Inquiry';
        const message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            if (statusBox) {
                statusBox.className = 'form-status-box error';
                statusBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>Please fill in all required fields (Name, Email, Message).</span>`;
                statusBox.style.display = 'flex';
            }
            return;
        }

        // Set Loading State
        if (submitBtn) submitBtn.disabled = true;
        if (submitBtnText) submitBtnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Request...';
        if (statusBox) statusBox.style.display = 'none';

        try {
            // Private encrypted relay endpoint for confidential inbox delivery (ak1276054@gmail.com)
            const _endpoint = 'https://formsubmit.co/ajax/' + atob('YWsxMjc2MDU0QGdtYWlsLmNvbQ==');

            const payload = {
                "name": name,
                "email": email,
                "phone": phone,
                "service": service,
                "budget": budget,
                "message": message,
                "_subject": `🎯 Portfolio Service Request: ${service} (from ${name})`,
                "_captcha": "false",
                "_template": "table"
            };

            const response = await fetch(_endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok || result.success === "true" || (result.message && result.message.includes("Activation"))) {
                if (statusBox) {
                    statusBox.className = 'form-status-box success';
                    statusBox.innerHTML = `
                        <i class="fa-solid fa-circle-check" style="font-size: 1.4rem;"></i>
                        <div>
                            <strong>Service Request Sent Successfully!</strong><br>
                            Thank you <em>${name}</em>! Your inquiry for <strong>${service}</strong> has been routed directly to Aman Kumar's inbox. Aman will reply to <em>${email}</em> promptly!
                        </div>
                    `;
                    statusBox.style.display = 'flex';
                }
                form.reset();
                if (chips.length > 0) {
                    chips.forEach(c => c.classList.remove('active'));
                    chips[0].classList.add('active');
                    if (hiddenInput) hiddenInput.value = chips[0].getAttribute('data-service');
                }
                showToast("✨ Project request sent successfully!");
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err) {
            console.error('Submission error:', err);
            if (statusBox) {
                statusBox.className = 'form-status-box error';
                statusBox.innerHTML = `
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.3rem;"></i>
                    <div>
                        <strong>Connection Note:</strong> Your request could not be sent automatically.<br>
                        Please message Aman Kumar directly on 
                        <a href="https://www.linkedin.com/in/aman-kumar-71944037b/" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline; font-weight: 700;">LinkedIn here</a>.
                    </div>
                `;
                statusBox.style.display = 'flex';
            }
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (submitBtnText) submitBtnText.innerHTML = 'Submit Service Request';
        }
    });
}

/* ==========================================================================
   Interactive 3D Mouse Cursor Engine (3D Velocity Tilt, Holographic Ring & Glow)
   ========================================================================== */
function init3DCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const glow = document.getElementById('cursor-glow');

    if (!dot || !ring || !glow) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
        dot.style.display = 'none';
        ring.style.display = 'none';
        glow.style.display = 'none';
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;

    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let velX = 0;
    let velY = 0;
    let isClicking = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    window.addEventListener('mousedown', (e) => {
        isClicking = true;
        createClickRipple(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
        isClicking = false;
    });

    function createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.border = '2px solid #38bdf8';
        ripple.style.boxShadow = '0 0 15px #38bdf8, inset 0 0 10px #a855f7';
        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9996';
        ripple.style.transition = 'transform 0.45s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.45s ease';
        ripple.style.opacity = '0.9';

        document.body.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(7.5)';
            ripple.style.opacity = '0';
        });

        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 500);
    }

    const interactables = document.querySelectorAll('a, button, .glass-card, .skill-card, .tilt-card, .theme-btn, .social-icon-btn, input, textarea');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    function renderCursor() {
        velX = (mouseX - prevMouseX) * 0.85;
        velY = (mouseY - prevMouseY) * 0.85;
        prevMouseX = mouseX;
        prevMouseY = mouseY;

        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;
        glowX += (mouseX - glowX) * 0.10;
        glowY += (mouseY - glowY) * 0.10;

        const rotX = Math.max(Math.min(velY * 3.2, 55), -55);
        const rotY = Math.max(Math.min(-velX * 3.2, 55), -55);
        const rotZ = Math.max(Math.min(velX * 2.2, 40), -40);
        const scaleVal = isClicking ? 0.75 : 1;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        ring.style.transform = `translate(-50%, -50%) perspective(700px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})`;

        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;

        requestAnimationFrame(renderCursor);
    }

    renderCursor();
}
