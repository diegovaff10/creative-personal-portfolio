document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // --- ANIMACIONES DE ENTRADA (IntersectionObserver) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    document.querySelectorAll('.fade-in-element').forEach(el => {
        observer.observe(el);
    });

    // --- LÓGICA DE SCROLL (Header y Botón "Volver Arriba") ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { header.classList.add('scrolled'); }
        else { header.classList.remove('scrolled'); }
        if (window.scrollY > 300) { backToTopBtn.classList.add('visible'); }
        else { backToTopBtn.classList.remove('visible'); }
    });
    backToTopBtn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // --- NAVEGACIÓN RESPONSIVE ---
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');
    if (menuBtn && navbar) { menuBtn.addEventListener('click', () => { menuBtn.classList.toggle('bx-x'); navbar.classList.toggle('active') }); navbar.querySelectorAll('.nav-link').forEach(link => { link.addEventListener('click', () => { menuBtn.classList.remove('bx-x'); navbar.classList.remove('active') }) }) }

    // --- CURSOR PERSONALIZADO ---
    const cursor = document.getElementById('custom-cursor');
    if (cursor) { window.addEventListener('mousemove', e => { cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)` }); document.querySelectorAll('a, button, input, .toggle-label, .project-card, .skill-item, .photo-card').forEach(el => { el.addEventListener('mouseenter', () => body.classList.add('cursor-hover')); el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover')) }) }

    // --- SINCRONIZACIÓN DE TOGGLES ---
    const allToggles = document.querySelectorAll('.theme-toggle-input');
    const handleThemeChange = (e) => {
        const isArtistMode = e.target.checked;
        body.classList.toggle('artist-mode', isArtistMode);
        allToggles.forEach(toggle => {
            if (toggle && toggle !== e.target) {
                toggle.checked = isArtistMode;
            }
        });
        const devColor = document.getElementById('theme-color-meta-dev').content;
        const artistColor = document.getElementById('theme-color-meta-artist').content;
        document.querySelector('meta[name="theme-color"]').content = isArtistMode ? artistColor : devColor;
    };
    allToggles.forEach(toggle => { if (toggle) toggle.addEventListener('change', handleThemeChange); });

    // --- GESTIÓN DE IDIOMA ---
    const langBtn = document.getElementById('lang-btn');
    const translations = {
        es: {
            docTitle: "Diego Väff - Artista y Programador", navProjects: "Proyectos", navSkills: "Skills", navGallery: "Galería", navFusion: "Fusión", navContact: "Contacto",
            heroArtist1: "Un caos", heroArtist2: "de ideas,", heroArtist3: "en orden.",
            aboutArtist: `<span class="highlight-artist">Diego Väff.</span> Mi universo es un choque constante entre el color y la forma, un viaje que comenzó en Santa Cruz, Argentina, y hoy pulsa desde Mendoza. No creo en las cajas; traduzco energía en experiencias que celebran la curiosidad.`,
            aboutDevTitle: "Manifiesto", aboutDev: "Como Diego Adrián Videla, creo que el mejor código es el que desaparece. Mi trayectoria, desde la Patagonia en Santa Cruz hasta mi base actual en Mendoza, me enseñó a construir soluciones elegantes para problemas complejos, combinando lógica y diseño para crear productos que se sienten bien al usar.",
            projectsTitle: "Proyectos",
            devPhilosophyTitle: "Mi Filosofía de Desarrollo", devPhilosophy1Title: "Rendimiento Primero", devPhilosophy1Desc: "Obsesionado con la velocidad. Construyo sitios que cargan rápido y se sienten fluidos, optimizando assets y usando las mejores prácticas de renderizado.", devPhilosophy2Title: "Accesibilidad Web (a11y)", devPhilosophy2Desc: "Creo que la web es para todos. Implemento estándares de accesibilidad para asegurar que mis proyectos sean usables por el mayor número de personas posible.", devPhilosophy3Title: "Responsive por Defecto", devPhilosophy3Desc: "Diseño y desarrollo con un enfoque 'mobile-first', garantizando una experiencia impecable en cualquier dispositivo, desde un móvil hasta un monitor 4K.", devPhilosophy4Title: "Código Limpio y Escalable", devPhilosophy4Desc: "Escribo código semántico, mantenible y bien documentado. Esto no solo me ayuda a mí, sino a cualquier equipo que trabaje en el proyecto a futuro.",
            uxTitle: "Diseño UX/UI & Prototipado", uxDesc: "Diseño experiencias digitales que son intuitivas, eficientes y estéticamente atractivas. Mi proceso se centra en la empatía con el usuario final, validando cada decisión de diseño para crear productos que no solo funcionen, sino que deleiten. Combino la investigación de usuario con la velocidad de la IA para prototipar y testear ideas rápidamente.", uxToolkitTitle: "Mi Toolkit de Diseño",
            brandingTitle: "Branding & Identidad Visual", brandingDesc: "Ofrezco servicios completos de branding para crear universos visuales que cuentan una historia. Si buscas una marca que resuene y conecte, mi enfoque combina estrategia y estética para construir una identidad sólida y memorable, desde el logo hasta la aplicación en el mundo real.", caseStudyBtn: "Ver Caso de Estudio (PDF)", brandProject1: "Marca para 'Aura'", brandProject1Desc: "Identidad visual para una startup de bienestar y meditación.", brandProject2: "Café 'Origen'", brandProject2Desc: "Branding para una marca de café de especialidad con empaque sostenible.", brandProject3: "'Nexus' Tech", brandProject3Desc: "Identidad corporativa para una empresa de desarrollo de software.", brandProject4: "Moda 'Urbana'", brandProject4Desc: "Branding para una línea de ropa urbana y accesorios.",
            hobbiesTitle: "Expresiones Personales",
            photoDesc: "Capturo momentos que se sienten como el fragmento de un sueño o el estribillo de una canción. Mi lente busca la textura en lo cotidiano y la narrativa en la quietud.",
            fashionTitle: "Diseño de Indumentaria: TRASH À PORTER", fashionConceptTitle: "Concepto", fashionConceptDesc: "TRASH À PORTER es mi laboratorio de experimentación textil y una declaración contra el fast-fashion. El proyecto explora la sostenibilidad y el upcycling, transformando prendas olvidadas en piezas únicas con una nueva historia que contar. Cada colección es un manifiesto sobre la creatividad sin límites y el potencial de lo descartado.", fashionPaletteTitle: "Identidad Visual",
            djTitle: "DJ / Música", djDesc: "Bajo el alias VÄFF, exploro los paisajes sonoros del Techno. Mis sesiones son un viaje hipnótico, construido sobre ritmos contundentes y texturas profundas. Aunque mi corazón está en el Techno, no tengo miedo de experimentar, fusionando elementos de IDM y Ambient para crear una experiencia sonora única en cada presentación.", djLink: "Escuchar en Resident Advisor",
            artLabTitle: "Art Lab: Generador Visual", artLabDesc: "Un lienzo digital interactivo. Ajusta los parámetros para crear patrones únicos inspirados en la Bauhaus y observa cómo tu composición cambia en tiempo real.", artLabGrid: "Tamaño de Grilla:", artLabDensity: "Densidad de Formas:", artLabPalette: "Paleta de Colores:", artLabPaletteClassic: "Clásica", artLabRegenerate: "Regenerar", artLabDownload: "Descargar PNG",
            fusionTitleDev: "Fusión", fusionTitleArtist: "El Punto de Encuentro", fusionTogglePrompt: "¿Ves cómo ambos mundos coexisten?",
            fusionDesc: `Soy un creador multidisciplinario que combina la precisión técnica del desarrollo de software con la sensibilidad y creatividad del arte. Mi experiencia abarca la construcción de interfaces intuitivas y funcionales, junto con la exploración artística a través de ilustración, música y diseño visual. <br><br> Trabajo en la <strong>intersección entre lógica y emoción</strong>, desarrollando proyectos que no solo cumplen con altos estándares técnicos, sino que también transmiten una narrativa estética única. Mi enfoque está en crear experiencias digitales que fusionen tecnología y arte para conectar con las personas de manera auténtica.`,
            aiTitle: "Mi Próxima Frontera: IA", aiDesc: "Actualmente, estoy inmerso en el ecosistema de la Inteligencia Artificial. Esta nueva frontera representa el campo de juego definitivo donde la lógica de la programación y la intuición artística convergen para crear resultados sin precedentes.", aiTool1: "Modelos Generativos (Midjourney, Runway)", aiTool2: "Integración de LLMs (API de OpenAI)", aiTool3: "Asistentes de Código (Copilot, Cody)",
            contactLine1: "¿Tienes una idea?", contactLine2: "Hablemos.", footerText: "© 2024 Diego Väff. Creado en la intersección del código y el arte.",
            ctaButtonUX: "Cotizar un Proyecto de UX", ctaButtonBranding: "Cotizar un Proyecto de Branding"
        },
        en: {
            // ENGLISH TRANSLATIONS
            docTitle: "Diego Väff - Artist & Programmer", navProjects: "Projects", navSkills: "Skills", navGallery: "Gallery", navFusion: "Fusion", navContact: "Contact",
            heroArtist1: "A chaos", heroArtist2: "of ideas,", heroArtist3: "in order.",
            aboutArtist: `<span class="highlight-artist">Diego Väff.</span> My universe is a constant clash between color and form, a journey that began in Santa Cruz, Argentina, and now pulses from Mendoza. I don't believe in boxes; I translate energy into experiences that celebrate curiosity.`,
            aboutDevTitle: "Manifesto", aboutDev: "As Diego Adrián Videla, I believe the best code is the one that disappears. My journey, from Patagonia in Santa Cruz to my current base in Mendoza, taught me to build elegant solutions for complex problems, combining logic and design to create products that feel good to use.",
            projectsTitle: "Projects", devPhilosophyTitle: "My Development Philosophy", devPhilosophy1Title: "Performance First", devPhilosophy1Desc: "Obsessed with speed. I build sites that load fast and feel fluid, optimizing assets and using best rendering practices.", devPhilosophy2Title: "Web Accessibility (a11y)", devPhilosophy2Desc: "I believe the web is for everyone. I implement accessibility standards to ensure my projects are usable by as many people as possible.", devPhilosophy3Title: "Responsive by Default", devPhilosophy3Desc: "I design and develop with a 'mobile-first' approach, ensuring a flawless experience on any device, from a phone to a 4K monitor.", devPhilosophy4Title: "Clean & Scalable Code", devPhilosophy4Desc: "I write semantic, maintainable, and well-documented code. This not only helps me but also any team that works on the project in the future.",
            uxTitle: "UX/UI Design & Prototyping", uxDesc: "I design digital experiences that are intuitive, efficient, and aesthetically pleasing. My process focuses on empathy for the end-user, validating each design decision to create products that not only work but delight. I combine user research with the speed of AI to prototype and test ideas quickly.", uxToolkitTitle: "My Design Toolkit",
            brandingTitle: "Branding & Visual Identity", brandingDesc: "I offer complete branding services to create visual universes that tell a story. If you're looking for a brand that resonates and connects, my approach combines strategy and aesthetics to build a solid and memorable identity, from the logo to real-world application.", caseStudyBtn: "View Case Study (PDF)",
            hobbiesTitle: "Personal Expressions", photoDesc: "I capture moments that feel like a fragment of a dream or the chorus of a song. My lens seeks the texture in the everyday and the narrative in stillness.",
            fashionTitle: "Fashion Design: TRASH À PORTER", fashionConceptTitle: "Concept", fashionConceptDesc: "TRASH À PORTER is my textile experimentation lab and a statement against fast-fashion. The project explores sustainability and upcycling, transforming forgotten garments into unique pieces with a new story. Each collection is a manifesto on boundless creativity and the potential of the discarded.", fashionPaletteTitle: "Visual Identity",
            djTitle: "DJ / Music", djDesc: "Under the alias VÄFF, I explore the soundscapes of Techno. My sets are a hypnotic journey, built on driving rhythms and deep textures. Although my heart is in Techno, I'm not afraid to experiment, blending elements of IDM and Ambient to create a unique sound experience in every performance.", djLink: "Listen on Resident Advisor",
            artLabTitle: "Art Lab: Visual Generator", artLabDesc: "An interactive digital canvas. Adjust the parameters to create unique patterns inspired by the Bauhaus and watch your composition change in real time.", artLabGrid: "Grid Size:", artLabDensity: "Shape Density:", artLabPalette: "Color Palette:", artLabPaletteClassic: "Classic", artLabRegenerate: "Regenerate", artLabDownload: "Download PNG",
            fusionTitleDev: "Fusion", fusionTitleArtist: "The Meeting Point", fusionTogglePrompt: "See how both worlds coexist?", fusionDesc: `I am a multidisciplinary creator who combines the technical precision of software development with the sensitivity and creativity of art. My experience covers building intuitive and functional interfaces, along with artistic exploration through illustration, music, and visual design. <br><br> I work at the <strong>intersection of logic and emotion</strong>, developing projects that not only meet high technical standards but also convey a unique aesthetic narrative. My focus is on creating digital experiences that merge technology and art to connect with people authentically.`,
            aiTitle: "My Next Frontier: AI", aiDesc: "Currently, I am immersed in the Artificial Intelligence ecosystem. This new frontier represents the ultimate playground where the logic of programming and artistic intuition converge to create unprecedented results.", aiTool1: "Generative Models (Midjourney, Runway)", aiTool2: "LLM Integration (OpenAI API)", aiTool3: "Code Assistants (Copilot, Cody)",
            contactLine1: "Have an idea?", contactLine2: "Let's talk.", footerText: "© 2024 Diego Väff. Crafted at the intersection of code and art.",
            ctaButtonUX: "Quote a UX Project", ctaButtonBranding: "Quote a Branding Project"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'es';
    const setLanguage = (lang) => { currentLang = lang; localStorage.setItem('lang', lang); langBtn.textContent = lang.toUpperCase(); document.documentElement.lang = lang; document.querySelectorAll('[data-translate]').forEach(el => { const key = el.dataset.translate; if (translations[lang] && translations[lang][key]) { el.textContent = translations[lang][key]; } }); document.querySelectorAll('[data-translate-html]').forEach(el => { const key = el.dataset.translateHtml; if (translations[lang] && translations[lang][key]) { el.innerHTML = translations[lang][key]; } }); };
    langBtn.addEventListener('click', () => { const newLang = currentLang === 'es' ? 'en' : 'es'; setLanguage(newLang); });

    const fluidCanvas = document.getElementById('fluid-canvas'); if (fluidCanvas) {
        const ctx = fluidCanvas.getContext('2d'); let blobs = []; class Blob { constructor(c) { this.x = Math.random() * window.innerWidth; this.y = Math.random() * window.innerHeight; this.r = Math.random() * 80 + 150; this.vx = (Math.random() - .5) * 1; this.vy = (Math.random() - .5) * 1; this.color = c } update() { this.x += this.vx; this.y += this.vy; if (this.x > window.innerWidth + this.r || this.x < -this.r) this.vx *= -1; if (this.y > window.innerHeight + this.r || this.y < -this.r) this.vy *= -1 } draw() { ctx.beginPath(); ctx.fillStyle = this.color; ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill() } }
        function initBlobs() { const colors = ['#708D81', '#D95D39', '#F5C154', '#A9CBB7']; blobs = colors.map(c => new Blob(c)) } function animateFluid() { if (body.classList.contains('artist-mode')) { ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); blobs.forEach(blob => { blob.update(); blob.draw() }) } requestAnimationFrame(animateFluid) } const setupCanvas = () => { fluidCanvas.width = window.innerWidth; fluidCanvas.height = window.innerHeight; ctx.filter = 'blur(100px) contrast(20)' }; window.addEventListener('resize', setupCanvas); setupCanvas(); initBlobs(); animateFluid()
    }

    const devPlayground = document.getElementById('playground-dev'); if (devPlayground) { const box = document.getElementById('playground-box'), brSlider = document.getElementById('br-slider'), scaleSlider = document.getElementById('scale-slider'), rotSlider = document.getElementById('rot-slider'), colorDots = devPlayground.querySelectorAll('.color-dot'); function updatePlayground() { if (!box) return; const br = brSlider.value, scale = scaleSlider.value, rot = rotSlider.value, color = devPlayground.querySelector('.color-dot.active').dataset.color; box.style.borderRadius = `${br}px`; box.style.transform = `scale(${scale}) rotate(${rot}deg)`; box.style.background = color; document.getElementById('br-value').textContent = br; document.getElementById('scale-value').textContent = scale; document.getElementById('rot-value').textContent = rot } brSlider.addEventListener('input', updatePlayground); scaleSlider.addEventListener('input', updatePlayground); rotSlider.addEventListener('input', updatePlayground); colorDots.forEach(dot => { dot.addEventListener('click', () => { colorDots.forEach(d => d.classList.remove('active')); dot.classList.add('active'); updatePlayground() }) }); updatePlayground() }

    const artistPlayground = document.getElementById('playground-artist');
    if (artistPlayground) {
        const canvas = document.getElementById('patternCanvas');
        const ctx = canvas.getContext('2d');
        const gridSizeSlider = document.getElementById('grid-size-slider');
        const densitySlider = document.getElementById('density-slider');
        const palettePicker = document.querySelector('.palette-picker');
        const regenerateBtn = document.getElementById('regenerate-pattern-btn');
        const downloadBtn = document.getElementById('download-art-btn');
        const gridSizeValue = document.getElementById('grid-size-value');
        const densityValue = document.getElementById('density-value');
        let state = { gridSize: 80, density: 0.9, palette: 'classic', seed: Math.random() };
        const palettes = { classic: ['#db4d0f', '#2c6e49', '#f4f0e8'], portfolio: [] };
        function updatePortfolioPalette() { const style = getComputedStyle(body); palettes.portfolio = [style.getPropertyValue('--accent-color').trim(), style.getPropertyValue('--heading-color').trim(), style.getPropertyValue('--accent-secondary').trim(), style.getPropertyValue('--accent-tertiary').trim(),]; }
        function drawShape(type, x, y, size, rotation, color) { ctx.save(); ctx.translate(x + size / 2, y + size / 2); ctx.rotate(rotation); ctx.translate(-size / 2, -size / 2); ctx.fillStyle = color; if (type === 'circle') { ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); ctx.fill(); } else if (type === 'half-circle') { ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI); ctx.lineTo(size / 2, size / 2); ctx.closePath(); ctx.fill(); } else if (type === 'quarter-circle') { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, size, 0, Math.PI / 2); ctx.lineTo(0, 0); ctx.fill(); } else if (type === 'triangle') { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(size, 0); ctx.lineTo(size, size); ctx.closePath(); ctx.fill(); } ctx.restore(); }
        function generatePattern() { const colors = palettes[state.palette]; const shapes = ['circle', 'half-circle', 'quarter-circle', 'triangle']; const size = parseInt(state.gridSize); const density = state.density; const bgColor = (state.palette === 'classic') ? '#f4f0e8' : getComputedStyle(body).getPropertyValue('--bg-color').trim(); ctx.fillStyle = bgColor; ctx.fillRect(0, 0, canvas.width, canvas.height); function seededRandom(s) { let x = Math.sin(s) * 10000; return x - Math.floor(x); } let currentSeed = state.seed; for (let y = 0; y < canvas.height; y += size) { for (let x = 0; x < canvas.width; x += size) { currentSeed += 0.1; if (seededRandom(currentSeed) < density) { const shape = shapes[Math.floor(seededRandom(currentSeed * 2) * shapes.length)]; const availableColors = colors.filter(c => c !== bgColor); const color = availableColors[Math.floor(seededRandom(currentSeed * 3) * availableColors.length)]; const angle = Math.floor(seededRandom(currentSeed * 4) * 4) * Math.PI / 2; drawShape(shape, x, y, size, angle, color); } } } }
        function updateAndRedraw(regenerate = false) { if (regenerate) { state.seed = Math.random(); } state.gridSize = gridSizeSlider.value; state.density = densitySlider.value / 100; gridSizeValue.textContent = state.gridSize; densityValue.textContent = densitySlider.value; generatePattern(); }
        gridSizeSlider.addEventListener('input', () => updateAndRedraw(false));
        densitySlider.addEventListener('input', () => updateAndRedraw(false));
        regenerateBtn.addEventListener('click', () => updateAndRedraw(true));
        palettePicker.addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') { palettePicker.querySelector('.active').classList.remove('active'); e.target.classList.add('active'); state.palette = e.target.dataset.palette; updateAndRedraw(true); } });
        downloadBtn.addEventListener('click', () => { const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'bauhaus-pattern-diegovaff.png'; a.click(); });
        function initializeArtLab() { updatePortfolioPalette(); updateAndRedraw(true); }
        let artLabInitialized = false;
        allToggles[0].addEventListener('change', () => { if (body.classList.contains('artist-mode')) { if (!artLabInitialized) { initializeArtLab(); artLabInitialized = true; } else { updatePortfolioPalette(); updateAndRedraw(true); } } });
        if (body.classList.contains('artist-mode')) { initializeArtLab(); artLabInitialized = true; }
    }

    setLanguage(currentLang);
});