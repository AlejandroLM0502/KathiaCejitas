// ========== GLOBAL STATE ==========
const state = {
    isPlaying: false,
    currentTrack: 0,
    // Aquí inicializamos el objeto de audio real del navegador
    audioPlayer: new Audio(), 
    letterText: `Kathia…

A veces me pregunto cómo se agradece la existencia de alguien
que llega sin hacer ruido
y aun así cambia el pulso de los días.

No sabía cómo explicarte lo que provocas,
porque no es solo cariño,
ni solo admiración,
es una mezcla extraña y hermosa
de calma,
curiosidad,
y una luz que se queda incluso cuando no estás.

Hay algo en tu forma de mirar el mundo
que lo vuelve más suave.
Tu risa aligera,
tu voz ordena,
tu presencia acompaña sin invadir.
Contigo, incluso el silencio tiene significado.

Admiro tu inteligencia serena,
esa manera tuya de entender sin juzgar,
de escuchar con atención real,
de sentir sin miedo.
Tienes una fortaleza tranquila,
de esas que no necesitan anunciarse
porque se perciben.

No eres solo alguien importante en mi vida,
eres un punto de equilibrio.
Un recordatorio de que la sensibilidad y la firmeza
pueden habitar en la misma persona.
De que la belleza no siempre se ve,
a veces se siente.

Si algún día dudas de ti,
ojalá puedas verte como yo te veo:
como una presencia que ilumina sin proponérselo,
como alguien que deja huella
sin necesidad de ruido.

Gracias, Kathia…
por tu forma de ser,
por tu esencia,
por existir tal como eres.`,
    letterIndex: 0,
    letterSpeed: 30,
    // NOTA: Asegúrate de que los archivos existan en estas rutas
    playlist: [
      {
    title: "Tu mirar",
    artist: "Solitario Mondragon & Samantha Barrón",
    src: "assets/audio/1.mp3",
    duration: "4:23",
    dedication: "Porque en tus ojos encuentro calma, como si todo encajara justo cuando me miras."
},
{
    title: "Desastre Emocional",
    artist: "Los Galaviz",
    src: "assets/audio/2.mp3",
    duration: "2:51",
    dedication: "Porque contigo incluso el caos se siente bonito, como un desorden que no quiero arreglar."
},
{
    title: "Amor sin Cláusulas",
    artist: "Kase.O",
    src: "assets/audio/3.mp3",
    duration: "4:31",
    dedication: "Porque lo nuestro no tiene condiciones ni letras pequeñas, solo ganas sinceras de quedarnos."
},
{
    title: "La Buena",
    artist: "faruz Feet",
    src: "assets/audio/4.mp3",
    duration: "3:03",
    dedication: "Porque llegaste sin aviso, pero justo como si siempre hubieras sido tú."
},
{
    title: "Eres",
    artist: "Kalimba",
    src: "assets/audio/5.mp3",
    duration: "4:02",
    dedication: "Porque hay personas que no se buscan dos veces… se reconocen, y tú eres eso para mí."
}

    ]
};

// ========== NAVBAR FUNCTIONALITY ==========
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== HERO PARTICLES ==========
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: radial-gradient(circle, #ffc7d8, transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add float animation logic via CSS injection if not present
    if (!document.getElementById('dynamic-particles-style')) {
        const style = document.createElement('style');
        style.id = 'dynamic-particles-style';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); }
                50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); }
                75% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== ENVELOPE INTERACTION ==========
const envelope = document.getElementById('envelope');
const letterSection = document.querySelector('.letter-section');

if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        
        setTimeout(() => {
            letterSection.classList.add('visible');
            letterSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(typeWriter, 500);
        }, 1200);
    });
}

// ========== TYPEWRITER EFFECT ==========
function typeWriter() {
    const letterTextElement = document.getElementById('letterText');
    if (!letterTextElement) return;
    
    if (state.letterIndex < state.letterText.length) {
        const char = state.letterText.charAt(state.letterIndex);
        
        // Add highlight to key words
        const keyWords = ['hermoso', 'regalo', 'canción favorita', 'sentido', 'Te amo'];
        let currentWord = state.letterText.substring(0, state.letterIndex + 1);
        
        keyWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            currentWord = currentWord.replace(regex, '<span class="highlight">$1</span>');
        });
        
        letterTextElement.innerHTML = currentWord;
        state.letterIndex++;
        
        // Variable speed for punctuation
        const speed = ['.', '…', '!', '?'].includes(char) ? state.letterSpeed * 15 : state.letterSpeed;
        setTimeout(typeWriter, speed);
    }
}

// ========== INTERSECTION OBSERVER ==========
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all relevant items
const itemsToObserve = [
    '.timeline-item',
    '.literary-subsection',
    '.reason-card',
    '.promise-card',
    '.hanging-item' // Agregado para el tendedero
];

itemsToObserve.forEach(selector => {
    document.querySelectorAll(selector).forEach(item => observer.observe(item));
});

// ========== MEMORIES CAROUSEL ==========
let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDotsContainer = document.getElementById('carouselDots');

function initCarousel() {
    if (!carouselTrack) return;
    
    const slides = carouselTrack.querySelectorAll('.memory-slide');
    const totalSlides = slides.length;
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        carouselDotsContainer.appendChild(dot);
    }
    
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    carouselNext?.addEventListener('click', nextSlide);
    carouselPrev?.addEventListener('click', prevSlide);
    
    // Auto-advance carousel
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    const carouselContainer = document.querySelector('.memories-carousel');
    carouselContainer?.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carouselContainer?.addEventListener('mouseleave', () => autoPlayInterval = setInterval(nextSlide, 5000));
    
    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack?.addEventListener('touchstart', (e) => touchStartX = e.changedTouches[0].screenX);
    carouselTrack?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    });
}

// ========== INTERACTIVE MESSAGE BOXES ==========
document.querySelectorAll('.message-box').forEach(box => {
    box.addEventListener('click', () => {
        const isActive = box.classList.contains('active');
        document.querySelectorAll('.message-box').forEach(b => b.classList.remove('active'));
        if (!isActive) box.classList.add('active');
    });
});

// ========== TIMELINE PARTICLES ANIMATION ==========
function animateTimelineParticles() {
    const particles = document.querySelectorAll('.timeline-particles');
    particles.forEach((particle, index) => {
        const colors = ['#ffc7d8', '#ff9eb7', '#f4d4a6'];
        setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
            particle.style.boxShadow = `0 0 20px ${randomColor}`;
        }, 2000 + index * 500);
    });
}

// ========== REAL AUDIO PLAYER LOGIC ==========
// Elementos del DOM
const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const vinyl = document.getElementById('vinyl');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const progressBar = document.querySelector('.progress-bar');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const trackDedication = document.getElementById('trackDedication');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');
const playlistItemsContainer = document.getElementById('playlistItems');

// Configuración de Volumen Inicial
state.audioPlayer.volume = 0.5;

// -- HELPER: Formatear tiempo --
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${String(sec).padStart(2, '0')}`;
}

// -- Inicializar Playlist en el DOM --
function initPlaylist() {
    if (!playlistItemsContainer) return;
    playlistItemsContainer.innerHTML = '';
    
    state.playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === state.currentTrack ? 'active' : ''}`;
        item.innerHTML = `
            <div class="playlist-number">${String(index + 1).padStart(2, '0')}</div>
            <div class="playlist-info">
                <div class="playlist-song-title">${track.title}</div>
                <div class="playlist-song-artist">${track.artist}</div>
            </div>
            <div class="playlist-duration">${track.duration}</div>
        `;
        item.addEventListener('click', () => {
            state.currentTrack = index;
            loadTrack(true); // Cargar y reproducir
        });
        playlistItemsContainer.appendChild(item);
    });
}

// -- Cargar Canción --
// playImmediately: true si clicamos en la lista, false para carga inicial
function loadTrack(playImmediately = false) {
    const track = state.playlist[state.currentTrack];
    
    // Actualizar Textos UI
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackDedication.textContent = track.dedication;
    
    // Resaltar en lista
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.classList.toggle('active', index === state.currentTrack);
    });

    // Asignar fuente de audio real
    state.audioPlayer.src = track.src;
    
    // Resetear barra visual
    progressFill.style.width = '0%';
    progressHandle.style.left = '0%';
    timeCurrent.textContent = '0:00';
    // Usamos la duración del array temporalmente hasta que carguen los metadatos reales
    timeTotal.textContent = track.duration; 

    if (playImmediately || state.isPlaying) {
        state.isPlaying = true;
        playAudio();
    }
}

// -- Funciones de Control --
function playAudio() {
    state.audioPlayer.play()
        .then(() => {
            playButton.classList.add('playing');
            vinyl.classList.add('spinning');
        })
        .catch(error => {
            console.log("Reproducción automática bloqueada por el navegador:", error);
            state.isPlaying = false;
            playButton.classList.remove('playing');
            vinyl.classList.remove('spinning');
        });
}

function pauseAudio() {
    state.audioPlayer.pause();
    playButton.classList.remove('playing');
    vinyl.classList.remove('spinning');
}

function togglePlay() {
    if (state.isPlaying) {
        state.isPlaying = false;
        pauseAudio();
    } else {
        state.isPlaying = true;
        // Si no hay src cargado (primera vez), cargamos
        if (!state.audioPlayer.src) {
            loadTrack(true);
        } else {
            playAudio();
        }
    }
}

function nextTrack() {
    state.currentTrack = (state.currentTrack + 1) % state.playlist.length;
    loadTrack(true);
}

function prevTrack() {
    state.currentTrack = state.currentTrack > 0 ? state.currentTrack - 1 : state.playlist.length - 1;
    loadTrack(true);
}

// -- Event Listeners del DOM --
playButton?.addEventListener('click', togglePlay);
nextButton?.addEventListener('click', nextTrack);
prevButton?.addEventListener('click', prevTrack);

// Click en barra de progreso
progressBar?.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = x / width;
    
    if (state.audioPlayer.duration) {
        state.audioPlayer.currentTime = clickPercentage * state.audioPlayer.duration;
    }
});

// -- Event Listeners del Audio Object (Lógica Real) --

// Actualizar barra de progreso mientras suena
state.audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = state.audioPlayer;
    if (duration) {
        const percentage = (currentTime / duration) * 100;
        progressFill.style.width = `${percentage}%`;
        progressHandle.style.left = `${percentage}%`;
        timeCurrent.textContent = formatTime(currentTime);
    }
});

// Cuando termina una canción
state.audioPlayer.addEventListener('ended', () => {
    nextTrack();
});

// Cuando cargan los metadatos (duración real exacta)
state.audioPlayer.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(state.audioPlayer.duration);
});


// ========== FINAL SECTION PARTICLE CANVAS ==========
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const finalButton = document.getElementById('finalButton');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    let animationId;
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(255, ${Math.random() * 50 + 158}, ${Math.random() * 50 + 183}, ${Math.random() * 0.5 + 0.5})`;
            this.life = 100;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.5;
            this.size *= 0.99;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }
    }
    
    function createExplosion(x, y) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y));
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(particle => particle.life > 0);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        if (particles.length > 0) {
            animationId = requestAnimationFrame(animateParticles);
        }
    }
    
    function createNameAnimation() {
        const text = 'KATHIA';
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const fontSize = window.innerWidth < 768 ? 60 : 100;
        
        ctx.font = `bold ${fontSize}px 'Playfair Display', serif`; // Use loaded font
        ctx.fillStyle = 'rgba(255, 199, 216, 0.1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = fontSize;
        const particleDensity = window.innerWidth < 768 ? 3 : 2;
        
        for (let x = -textWidth / 2; x < textWidth / 2; x += particleDensity) {
            for (let y = -textHeight / 2; y < textHeight / 2; y += particleDensity) {
                ctx.fillText(text, centerX, centerY);
                const pixel = ctx.getImageData(centerX + x, centerY + y, 1, 1).data;
                if (pixel[3] > 128) {
                    setTimeout(() => {
                        particles.push(new Particle(centerX + x, centerY + y));
                    }, Math.random() * 1000);
                }
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            animationId = requestAnimationFrame(animateParticles);
        }, 100);
    }
    
    finalButton?.addEventListener('click', () => {
        particles = [];
        const heartPositions = [
            { x: canvas.width / 2, y: canvas.height / 2 },
            { x: canvas.width / 2 - 100, y: canvas.height / 2 - 50 },
            { x: canvas.width / 2 + 100, y: canvas.height / 2 - 50 },
            { x: canvas.width / 2 - 50, y: canvas.height / 2 + 80 },
            { x: canvas.width / 2 + 50, y: canvas.height / 2 + 80 }
        ];
        
        heartPositions.forEach((pos, index) => {
            setTimeout(() => {
                createExplosion(pos.x, pos.y);
                if (particles.length > 0 && !animationId) {
                    animationId = requestAnimationFrame(animateParticles);
                }
            }, index * 200);
        });
        setTimeout(createNameAnimation, 1500);
    });
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== GALLERY PARALLAX EFFECT ==========
function initGalleryParallax() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        galleryItems.forEach((item, index) => {
            const speed = (index % 2 === 0) ? 0.5 : -0.5;
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.style.transform = `
                    translateY(${scrolled * speed * 0.1}px) 
                    rotate(${item.style.getPropertyValue('--rotation') || '0deg'})
                `;
            }
        });
    });
}

// ========== INITIALIZE ALL ==========
function init() {
    createParticles();
    animateTimelineParticles();
    initParticleCanvas();
    initGalleryParallax();
    initPlaylist();
    // Cargamos visualmente la primera canción sin reproducir
    loadTrack(false); 
    initCarousel();
    
    // Add smooth entrance animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Preload fonts
    document.fonts.ready.then(() => {
        document.body.style.opacity = '1';
    });
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}