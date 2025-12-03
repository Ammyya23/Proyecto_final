// Menú responsive
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});


const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Contadores animados
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}


// Selector de color
const colorButtons = document.querySelectorAll('.color-btn');
const colorBox = document.getElementById('colorBox');
const root = document.documentElement;

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.getAttribute('data-color');
        
        // Cambiar color de la caja
        colorBox.style.backgroundColor = color;
        
        // Cambiar variable CSS
        root.style.setProperty('--primary-color', color);
        
        // Efecto visual en el botón
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
        
        // Guardar preferencia en localStorage
        localStorage.setItem('theme-color', color);
    });
});


const savedColor = localStorage.getItem('theme-color');
if (savedColor) {
    root.style.setProperty('--primary-color', savedColor);
    colorBox.style.backgroundColor = savedColor;
}

// Animación para las tarjetas al hacer scroll
const cards = document.querySelectorAll('.feature-card, .blog-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Juego de colores
const gameGrid = document.getElementById('gameGrid');
const targetColorElement = document.getElementById('targetColor');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startGameButton = document.getElementById('startGame');

let score = 0;
let timeLeft = 30;
let gameActive = false;
let gameTimer;
let targetColor = '';
const colors = ['ROJO', 'VERDE', 'AZUL', 'AMARILLO', 'NARANJA', 'PÚRPURA'];
const colorValues = {
    'ROJO': '#e74c3c',
    'VERDE': '#2ecc71',
    'AZUL': '#3498db',
    'AMARILLO': '#f1c40f',
    'NARANJA': '#e67e22',
    'PÚRPURA': '#9b59b6'
};

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function createGameGrid() {
    gameGrid.innerHTML = '';
    
    // Crear celdas(9)
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('color-cell');
        
        // Asignar un color aleatorio a cada celda
        const randomColorName = colors[Math.floor(Math.random() * colors.length)];
        cell.style.backgroundColor = colorValues[randomColorName];
        cell.dataset.color = randomColorName;
        
        cell.addEventListener('click', () => handleCellClick(cell));
        gameGrid.appendChild(cell);
    }
    
    // Seleccionar un color objetivo
    targetColor = getRandomColor();
    targetColorElement.textContent = targetColor;
    targetColorElement.style.color = colorValues[targetColor];
}

function handleCellClick(cell) {
    if (!gameActive) return;
    
    if (cell.dataset.color === targetColor) {
        // Acierto
        score++;
        scoreElement.textContent = score;
        
        // Efecto visual de acierto
        cell.style.transform = 'scale(1.1)';
        cell.style.boxShadow = '0 0 20px rgba(46, 204, 113, 0.8)';
        
        setTimeout(() => {
            cell.style.transform = '';
            cell.style.boxShadow = '';
            
            // Crear nuevo grid y nuevo color objetivo
            createGameGrid();
        }, 300);
    } else {
        // Error
        cell.style.transform = 'scale(0.9)';
        cell.style.boxShadow = '0 0 20px rgba(231, 76, 60, 0.8)';
        
        setTimeout(() => {
            cell.style.transform = '';
            cell.style.boxShadow = '';
        }, 300);
    }
}

function startGame() {
    if (gameActive) return;
    
    // Reiniciar valores
    score = 0;
    timeLeft = 30;
    gameActive = true;
    
    // Actualizar UI
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    startGameButton.disabled = true;
    startGameButton.textContent = 'Juego en curso...';
    
    // Crear grid inicial
    createGameGrid();
    
    // Iniciar temporizador
    gameTimer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    
    startGameButton.disabled = false;
    startGameButton.textContent = 'Comenzar Juego';
    
    // Mostrar resultado
    alert(`¡Juego terminado! Puntuación: ${score}`);
    
    // Opcional: reiniciar el grid
    createGameGrid();
}

// Inicializar juego
createGameGrid();
startGameButton.addEventListener('click', startGame);

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validación 
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        // Simulación de envío
        alert(`Gracias ${name}, tu mensaje ha sido enviado. Te contactaremos en ${email} pronto.`);
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// Suscripción al newsletter
const subscribeBtn = document.getElementById('subscribeBtn');
const newsletterEmail = document.getElementById('newsletterEmail');

if (subscribeBtn && newsletterEmail) {
    subscribeBtn.addEventListener('click', function() {
        const email = newsletterEmail.value;
        
        if (!email || !email.includes('@')) {
            alert('Por favor, introduce un email válido.');
            return;
        }
        
        alert(`¡Gracias por suscribirte con el email: ${email}!`);
        newsletterEmail.value = '';
    });
}

// Efecto de scroll suave para el logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Actualizar año en el copyright
const currentYear = new Date().getFullYear();
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = currentYear;
}

// cargando(efecto)
window.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Datos de los artículos del blog
const articlesData = {
    1: {
        id: 1,
        title: "Diseño Responsivo",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Diseno-web-responsive-design.jpg",
        excerpt: "Crea sitios que se adapten a cualquier dispositivo.",
        content: `
            <h1>Diseño Responsivo: Lo Básico</h1>
            
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> 12 Diciembre, 2025</span>
                <span><i class="far fa-user"></i> Por Ana López</span>
                <span><i class="far fa-clock"></i> 5 min de lectura</span>
            </div>
            
            <div class="article-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Diseno-web-responsive-design.jpg" alt="Diseño Responsivo">
            </div>
            
            <div class="article-body">
                <p>El diseño responsivo es esencial en el desarrollo web moderno. Permite que tu sitio web se vea bien en todos los dispositivos.</p>
                
                <h2>Conceptos Clave</h2>
                
                <h3>Media Queries</h3>
                <p>Las media queries son la base del diseño responsivo:</p>
                
                <pre><code>@media (max-width: 768px) {
    .container {
        padding: 0 20px;
    }
}</code></pre>
                
                <h3>Unidades Flexibles</h3>
                <p>Usa unidades relativas como porcentajes, em y rem.</p>
                
                <h3>Imágenes Responsivas</h3>
                <p>Haz que las imágenes se adapten al contenedor:</p>
                
                <pre><code>img {
    max-width: 100%;
    height: auto;
}</code></pre>
                
                <h2>Consejos Rápidos</h2>
                <ul>
                    <li>Empieza con el diseño móvil primero</li>
                    <li>Usa breakpoints lógicos</li>
                    <li>Prueba en dispositivos reales</li>
                    <li>Optimiza las imágenes</li>
                </ul>
            </div>
        `
    },
    2: {
        id: 2,
        title: "JavaScript Moderno",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        excerpt: "Aprende las nuevas características de ES6+.",
        content: `
            <h1>JavaScript Moderno: ES6+</h1>
            
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> 22 Febrero, 2023</span>
                <span><i class="far fa-user"></i> Por Carlos Martínez</span>
                <span><i class="far fa-clock"></i> 8 min de lectura</span>
            </div>
            
            <div class="article-image">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="JavaScript">
            </div>
            
            <div class="article-body">
                <p>ES6 introdujo muchas características que hacen que JavaScript sea más poderoso y fácil de usar.</p>
                
                <h2>Nuevas Características</h2>
                
                <h3>Arrow Functions</h3>
                <p>Sintaxis más concisa para funciones:</p>
                
                <pre><code>// ES5
function sum(a, b) {
    return a + b;
}

// ES6
const sum = (a, b) => a + b;</code></pre>
                
                <h3>Template Literals</h3>
                <p>Strings más poderosos:</p>
                
                <pre><code>const name = "Juan";
console.log(\`Hola \${name}\`);</code></pre>
                
                <h3>Destructuring</h3>
                <p>Extraer valores de objetos y arrays:</p>
                
                <pre><code>const user = { name: "Ana", age: 25 };
const { name, age } = user;</code></pre>
                
                <h2>Características Útiles</h2>
                <ul>
                    <li>Let y Const para declaración de variables</li>
                    <li>Clases para programación orientada a objetos</li>
                    <li>Módulos para organizar el código</li>
                    <li>Promesas para manejar asincronía</li>
                </ul>
            </div>
        `
    },
    3: {
        id: 3,
        title: "Optimización Web",
        image: "https://www.hostingplus.pe/wp-content/uploads/2024/09/maxresdefault.jpg",
        excerpt: "Mejora la velocidad de tu sitio web.",
        content: `
            <h1>Optimización Web: Técnicas Básicas</h1>
            
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> 10 Enero, 2023</span>
                <span><i class="far fa-user"></i> Por Laura García</span>
                <span><i class="far fa-clock"></i> 6 min de lectura</span>
            </div>
            
            <div class="article-image">
                <img src="https://www.hostingplus.pe/wp-content/uploads/2024/09/maxresdefault.jpg" alt="Optimización Web">
            </div>
            
            <div class="article-body">
                <p>La velocidad de carga es crucial para la experiencia del usuario y el SEO.</p>
                
                <h2>Técnicas de Optimización</h2>
                
                <h3>Compresión de Imágenes</h3>
                <p>Reduce el tamaño de las imágenes sin perder calidad:</p>
                
                <pre><code>&lt;picture&gt;
    &lt;source srcset="image.webp" type="image/webp"&gt;
    &lt;img src="image.jpg" alt="Descripción"&gt;
&lt;/picture&gt;</code></pre>
                
                <h3>Minificación</h3>
                <p>Reduce el tamaño de CSS y JavaScript:</p>
                <ul>
                    <li>Elimina espacios en blanco</li>
                    <li>Elimina comentarios</li>
                    <li>Acorta nombres de variables</li>
                </ul>
                
                <h3>Caché del Navegador</h3>
                <p>Configura cabeceras HTTP para cachear recursos:</p>
                
                <pre><code>Cache-Control: max-age=31536000</code></pre>
                
                <h2>Herramientas Recomendadas</h2>
                <ul>
                    <li>Google PageSpeed Insights</li>
                    <li>GTmetrix</li>
                    <li>Lighthouse (Chrome DevTools)</li>
                    <li>WebPageTest</li>
                </ul>
            </div>
        `
    }
};

// Manejo de vista de los artículos
const blogList = document.getElementById('blogList');
const articleDetail = document.getElementById('articleDetail');
const articleContent = document.getElementById('articleContent');
const articleTitle = document.getElementById('articleTitle');
const relatedArticles = document.getElementById('relatedArticles');
const backToBlog = document.getElementById('backToBlog');

// Mostrar artículo detallado
function showArticle(articleId) {
    const article = articlesData[articleId];
    
    if (!article) return;
    
    // Actualizar título en el header
    articleTitle.textContent = article.title;
    
    // Cargar contenido del artículo
    articleContent.innerHTML = article.content;
    
    // Cargar artículos relacionados
    loadRelatedArticles(articleId);
    
    // Transición suave entre vistas
    blogList.classList.add('hidden');
    setTimeout(() => {
        articleDetail.classList.add('active');
        
        // Scroll suave a la sección de blog
        document.querySelector('#blog').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}

// Cargar artículos relacionados
function loadRelatedArticles(currentArticleId) {
    relatedArticles.innerHTML = '';
    
    Object.values(articlesData).forEach(article => {
        if (article.id !== parseInt(currentArticleId)) {
            const relatedArticle = document.createElement('a');
            relatedArticle.className = 'related-article-item';
            relatedArticle.href = '#';
            relatedArticle.dataset.article = article.id;
            
            relatedArticle.innerHTML = `
                <div class="related-img-small">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="related-info-small">
                    <h5>${article.title}</h5>
                    <p>${article.excerpt}</p>
                </div>
            `;
            
            relatedArticle.addEventListener('click', function(e) {
                e.preventDefault();
                showArticle(article.id);
            });
            
            relatedArticles.appendChild(relatedArticle);
        }
    });
}

// Volver a la lista de artículos
backToBlog.addEventListener('click', function() {
    // Transición suave entre vistas
    articleDetail.classList.remove('active');
    setTimeout(() => {
        blogList.classList.remove('hidden');
        
        // Scroll suave al inicio de la sección blog
        document.querySelector('#blog').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
});

// Inicializar eventos de los botones "Leer más"
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.dataset.article;
            showArticle(articleId);
        });
    });
});
