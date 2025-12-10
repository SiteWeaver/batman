// ===== ПЛАВНАЯ ПРОКРУТКА К РАЗДЕЛАМ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Прокрутка с учетом высоты фиксированного хедера
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Подсветка активной ссылки в навигации
            if(this.classList.contains('nav-link')) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
            
            // Закрытие мобильного меню (если открыто)
            const navList = document.querySelector('.nav-list');
            if(navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
                document.querySelector('.menu-toggle i').classList.remove('fa-times');
                document.querySelector('.menu-toggle i').classList.add('fa-bars');
            }
        }
    });
});

// ===== ФИКСИРОВАННЫЙ HEADER ПРИ СКРОЛЛЕ =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
    
    // Автоматическая подсветка активного раздела
    highlightActiveSection();
});

// ===== МОБИЛЬНОЕ МЕНЮ =====
document.querySelector('.menu-toggle')?.addEventListener('click', function() {
    const navList = document.querySelector('.nav-list');
    const icon = this.querySelector('i');
    
    navList.classList.toggle('active');
    
    if(navList.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===== КНОПКА "НАВЕРХ" =====
const scrollTopBtn = document.createElement('a');
scrollTopBtn.href = '#';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTopBtn.style.display = 'none';
document.body.appendChild(scrollTopBtn);

// Показывать/скрывать кнопку при скролле
window.addEventListener('scroll', () => {
    if(window.scrollY > 500) {
        scrollTopBtn.style.display = 'flex';
        setTimeout(() => {
            scrollTopBtn.classList.add('visible');
        }, 10);
    } else {
        scrollTopBtn.classList.remove('visible');
        setTimeout(() => {
            if(window.scrollY <= 500) {
                scrollTopBtn.style.display = 'none';
            }
        }, 300);
    }
});

// ===== ПОДСВЕТКА АКТИВНОГО РАЗДЕЛА =====
function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== ТАБЫ "СОЮЗНИКИ/ВРАГИ" =====
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        // Скрываем все вкладки
        document.querySelectorAll('.character-grid').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Показываем выбранную вкладку
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// ===== ИНТЕРАКТИВНАЯ КАРТА BATCAVE =====
document.querySelectorAll('.map-area').forEach(area => {
    area.addEventListener('click', function() {
        const areaName = this.getAttribute('data-area');
        
        // Убираем активный класс у всех областей
        document.querySelectorAll('.map-area').forEach(a => {
            a.classList.remove('active');
        });
        
        // Добавляем активный класс выбранной области
        this.classList.add('active');
        
        // Показываем информацию об области (можно расширить)
        showAreaInfo(areaName);
    });
});

function showAreaInfo(areaName) {
    const info = {
        'armory': 'Weapon storage and maintenance facility. Contains non-lethal weaponry, armor, and specialized equipment.',
        'computer': 'The Batcomputer - world\'s most advanced supercomputer with AI capabilities and city-wide surveillance.',
        'garage': 'Vehicle bay housing the Batmobile, Batwing, Batcycle, and various other ground/air vehicles.',
        'lab': 'Forensic laboratory for crime scene analysis, chemical testing, and evidence examination.'
    };
    
    alert(`Batcave Area: ${areaName.toUpperCase()}\n\n${info[areaName]}`);
}

// ===== ТЕСТ "НАСКОЛЬКО ТЫ БЭТМЕН?" =====
let batmanScore = 0;
const maxScore = 30;

document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
        const points = parseInt(this.getAttribute('data-points'));
        batmanScore += points;
        
        // Обновляем прогресс-бар
        const percentage = Math.min((batmanScore / maxScore) * 100, 100);
        document.querySelector('.result-fill').style.width = `${percentage}%`;
        
        // Показываем результат
        let resultText = '';
        if(batmanScore >= 25) {
            resultText = 'You are THE BATMAN! Justice flows through your veins.';
        } else if(batmanScore >= 15) {
            resultText = 'You\'re a capable hero, but still need some training.';
        } else if(batmanScore >= 5) {
            resultText = 'You have potential, but Gotham isn\'t ready for you yet.';
        } else {
            resultText = 'Maybe stick to being a law-abiding citizen for now.';
        }
        
        document.querySelector('.result-text').textContent = resultText;
        
        // Отключаем кнопки после ответа
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
    });
});

// ===== ИНТЕРАКТИВНАЯ ГАЛЕРЕЯ КОСТЮМОВ =====
document.querySelectorAll('.costume-era').forEach(era => {
    era.addEventListener('click', function() {
        const eraYear = this.getAttribute('data-era');
        
        // Убираем активный класс у всех эпох
        document.querySelectorAll('.costume-era').forEach(e => {
            e.classList.remove('active');
        });
        
        // Добавляем активный класс выбранной эпохе
        this.classList.add('active');
        
        // Обновляем отображаемый костюм
        updateCostumeDisplay(eraYear);
    });
});

function updateCostumeDisplay(year) {
    const costumes = {
        '1939': {
            title: '1939 Original Costume',
            description: 'The original Detective Comics #27 design featuring purple gloves, a simple cowl, and a basic utility belt.',
            image: 'images/costume1.jpg'
        },
        '1966': {
            title: '1966 TV Series Costume',
            description: 'Bright blue and grey costume with yellow ellipse bat-symbol, made famous by the Adam West television series.',
            image: 'images/costume2.jpg'
        },
        '1989': {
            title: '1989 Movie Costume',
            description: 'All-black armored suit designed by Tim Burton, featuring a muscular sculpt and retractable cape.',
            image: 'images/costume3.jpg'
        },
        '2005': {
            title: '2005 Batman Begins Costume',
            description: 'Tactical military armor with segmented plates for mobility, based on real-world military technology.',
            image: 'images/costume4.jpg'
        }
    };
    
    const costume = costumes[year];
    if(costume) {
        document.getElementById('costume-title').textContent = costume.title;
        document.getElementById('costume-description').textContent = costume.description;
        document.querySelector('.display-image').style.backgroundImage = `url('${costume.image}')`;
    }
}

// ===== ИНТЕРАКТИВНЫЙ ПОЯС =====
document.querySelectorAll('.belt-item').forEach(item => {
    item.addEventListener('click', function() {
        const toolName = this.getAttribute('data-tool');
        
        // Убираем активный класс у всех предметов
        document.querySelectorAll('.belt-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Добавляем активный класс выбранному предмету
        this.classList.add('active');
        
        // Обновляем информацию о предмете
        updateToolInfo(toolName);
    });
});

function updateToolInfo(tool) {
    const tools = {
        'batarang': {
            title: 'Batarang',
            description: 'A bat-shaped throwing weapon used for distraction, disarming opponents, or as a grappling hook attachment. Can be explosive, electric, or tracking-enabled.',
            icon: 'fas fa-boomerang'
        },
        'grapple': {
            title: 'Grapple Gun',
            description: 'Pneumatic launcher that fires a tungsten carbide grapple hook. Can support up to 500kg and reach heights of 30 stories. Silent operation mode available.',
            icon: 'fas fa-anchor'
        },
        'smoke': {
            title: 'Smoke Pellets',
            description: 'Chemical smoke grenades that create dense, non-toxic smoke screens for escapes or tactical advantages. Can be combined with tear gas or flashbangs.',
            icon: 'fas fa-smog'
        },
        'tracker': {
            title: 'Micro-Tracker',
            description: 'GPS tracking device smaller than a coin. Range of 50km, battery life of 72 hours, and undetectable by standard scanning equipment.',
            icon: 'fas fa-satellite'
        },
        'cutter': {
            title: 'Laser Cutter',
            description: 'Miniature plasma torch capable of cutting through 10cm of steel in 30 seconds. Adjustable intensity for different materials.',
            icon: 'fas fa-cut'
        },
        'scanner': {
            title: 'Forensic Scanner',
            description: 'Multi-spectral analyzer that can detect fingerprints, DNA residue, chemical compounds, and electronic signatures at crime scenes.',
            icon: 'fas fa-search'
        }
    };
    
    const toolInfo = tools[tool];
    if(toolInfo) {
        document.getElementById('tool-title').textContent = toolInfo.title;
        document.getElementById('tool-text').textContent = toolInfo.description;
        document.querySelector('.tool-image i').className = `${toolInfo.icon} fa-5x`;
    }
}

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с анимацией
document.querySelectorAll('.timeline-item, .feature-card, .character-card, .ability-card').forEach(el => {
    observer.observe(el);
});

// ===== КАРТА ГОТЭМА =====
document.querySelectorAll('.map-point').forEach(point => {
    point.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    point.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    point.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        alert(`Location: ${location}\n\nClick would normally show detailed information about this location in Gotham City.`);
    });
});

// ===== ЗАГРУЗКА ИЗОБРАЖЕНИЙ С ЗАПАСНЫМ ВАРИАНТОМ =====
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем загрузку изображений
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // Можно установить placeholder изображение
            if(this.classList.contains('batman-head')) {
                this.src = 'https://via.placeholder.com/500x500/000000/FFD700?text=BATMAN';
            } else if(this.classList.contains('logo-img')) {
                this.src = 'https://via.placeholder.com/100x100/000000/FFD700?text=LOGO';
            }
        });
    });
});

// ===== ЭФФЕКТ ТИПОГРАФИИ ДЛЯ ЗАГОЛОВКА =====
window.addEventListener('load', function() {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        // Небольшая задержка для визуального эффекта
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});

// ===== ОБРАБОТКА ФОРМ (если будут формы) =====
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Простая валидация
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if(!input.value.trim()) {
                input.style.borderColor = 'var(--batman-red)';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if(isValid) {
            // В реальном проекте здесь был бы AJAX запрос
            alert('Form submitted successfully! (This is a demo)');
            this.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});

// ===== СОХРАНЕНИЕ ТЕМЫ =====
if(localStorage.getItem('batman-theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// ===== КОНЕЦ СКРИПТА =====
console.log('Batman website loaded successfully! 🦇');

// Показываем кнопку наверх сразу если страница загрузилась не сверху
if(window.scrollY > 500) {
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.classList.add('visible');
}