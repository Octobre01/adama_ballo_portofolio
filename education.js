// JavaScript pour la navigation burger
// Fonction principale pour toggle le menu
function toggleMenu() {
    const nav = document.getElementById('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('active');
    
    // Change hamburger to X when menu is open
    if (nav.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Animation d'apparition des éléments au scroll
window.addEventListener('load', function() {
    // Éléments à animer
    const educationCards = document.querySelectorAll('.education-card');
    const certificationCards = document.querySelectorAll('.certification-card');
    const otherQualifications = document.querySelector('.other-qualifications');
    
    // Configuration de l'observateur d'intersection
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Fonction d'animation
    const animateElement = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Délai d'animation basé sur l'index
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200);
                
                // Arrêter d'observer cet élément
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Créer l'observateur
    const observer = new IntersectionObserver(animateElement, observerOptions);
    
    // Observer les cartes d'éducation
    educationCards.forEach((card, index) => {
        // Définir le délai d'animation
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observer les cartes de certification
    certificationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observer les autres qualifications
    if (otherQualifications) {
        observer.observe(otherQualifications);
    }
    
    // Animation du titre principal
    const sectionTitle = document.querySelector('.section-title');
    const sectionSubtitle = document.querySelector('.section-subtitle');
    
    if (sectionTitle) {
        sectionTitle.style.opacity = '0';
        sectionTitle.style.transform = 'translateY(-30px)';
        sectionTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            sectionTitle.style.opacity = '1';
            sectionTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (sectionSubtitle) {
        sectionSubtitle.style.opacity = '0';
        sectionSubtitle.style.transform = 'translateY(20px)';
        sectionSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            sectionSubtitle.style.opacity = '1';
            sectionSubtitle.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Animation des icônes au survol (désactivée sur mobile)
document.addEventListener('DOMContentLoaded', function() {
    // Navigation burger - Initialisation
    // Fermer le menu quand on clique sur les liens de navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('nav');
            const menuToggle = document.querySelector('.menu-toggle');
            
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Fermer le menu quand on clique à l'extérieur
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const closeMenu = document.querySelector('.close-menu');
        
        // Vérifier si le clic est en dehors de la nav, du bouton menu et du bouton fermer
        if (!nav.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            !closeMenu?.contains(e.target)) {
            
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Fermer le menu avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const nav = document.getElementById('nav');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Effet de scroll sur le header (optionnel)
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ajouter une opacité d'arrière-plan basée sur le scroll
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    console.log('🚀 Navigation burger chargée avec succès!');
    
    // Code existant pour les animations des icônes
    const icons = document.querySelectorAll('.icon-wrapper, .cert-icon, .qual-icon');
    
    // Détection des appareils tactiles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(10deg)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
    
    // Effet de parallaxe léger pour les cartes (adapté pour mobile)
    const cards = document.querySelectorAll('.education-card, .certification-card');
    
    cards.forEach(card => {
        if (!isTouchDevice) {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        }
    });
    
    // Animation du statut des certifications (optimisée pour mobile)
    const certStatuses = document.querySelectorAll('.cert-status');
    
    certStatuses.forEach(status => {
        if (status.classList.contains('active')) {
            // Animation de pulsation pour les certifications actives (réduite sur mobile)
            const pulseInterval = window.innerWidth <= 768 ? 3000 : 2000;
            setInterval(() => {
                status.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.6)';
                setTimeout(() => {
                    status.style.boxShadow = '0 0 10px rgba(40, 167, 69, 0.3)';
                }, 1000);
            }, pulseInterval);
        }
        
        if (status.classList.contains('in-progress')) {
            // Animation de progression pour les certifications en cours (optimisée)
            let progress = 0;
            const progressSpeed = window.innerWidth <= 768 ? 150 : 100;
            const progressInterval = setInterval(() => {
                progress = (progress + 1) % 100;
                status.style.background = `linear-gradient(45deg, #ffc107 ${progress}%, #ffca2c ${progress + 20}%)`;
            }, progressSpeed);
        }
    });
    
    // Lancer les optimisations existantes
    animateListItems();
    optimizeForMobile();
    improveMobileAccessibility();
});

// Gestion du scroll fluide (désactivé sur mobile pour les performances)
document.addEventListener('scroll', function() {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.education-card.main-diploma');
        
        parallaxElements.forEach(element => {
            const speed = 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Animation d'apparition progressive des éléments de liste
function animateListItems() {
    const listItems = document.querySelectorAll('.cert-content, .qual-content');
    
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        // Délai réduit sur mobile
        const delay = window.innerWidth <= 768 ? index * 0.05 : index * 0.1;
        item.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });
        
        observer.observe(item);
    });
}

// Optimisation pour les performances mobiles
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Désactiver les animations coûteuses sur mobile
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.01ms !important;
                animation-delay: 0.01ms !important;
                transition-duration: 0.01ms !important;
                transition-delay: 0.01ms !important;
            }
            
            .education-card,
            .certification-card {
                transition: transform 0.2s ease, box-shadow 0.2s ease !important;
            }
            
            .fade-in {
                transition: opacity 0.3s ease, transform 0.3s ease !important;
            }
        `;
        
        // Appliquer seulement si l'utilisateur préfère des animations réduites
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.head.appendChild(style);
        }
    }
}

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    // Réinitialiser les transformations sur les cartes lors du redimensionnement
    const cards = document.querySelectorAll('.education-card, .certification-card');
    cards.forEach(card => {
        if (window.innerWidth <= 768) {
            card.style.transform = 'none';
        }
    });
});

// Amélioration de l'accessibilité mobile
function improveMobileAccessibility() {
    const interactiveElements = document.querySelectorAll('.education-card, .certification-card, .qualification-item');
    
    interactiveElements.forEach(element => {
        // Ajouter des attributs d'accessibilité
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'article');
        
        // Gestion du focus pour la navigation au clavier
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #b74b4b';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        // Support tactile amélioré
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Performance monitoring pour mobile
if (window.innerWidth <= 768) {
    // Lazy loading pour les animations
    const lazyAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-when-visible');
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    document.querySelectorAll('.education-card, .certification-card').forEach(card => {
        lazyAnimationObserver.observe(card);
    });
}