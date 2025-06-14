// Mobile Menu Toggle Function
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

// Initialize menu functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('nav');
            const menuToggle = document.querySelector('.menu-toggle');
            
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Close menu when clicking outside of navigation
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const closeMenu = document.querySelector('.close-menu');
        
        // Check if click is outside nav, menu toggle, and close button
        if (!nav.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            !closeMenu.contains(e.target)) {
            
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Handle escape key to close menu
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

    // Smooth scrolling for anchor links (if you add sections later)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to header (optional enhancement)
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background opacity based on scroll
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add loading animation for image
    const profileImg = document.querySelector('.home-img img');
    if (profileImg) {
        profileImg.addEventListener('load', () => {
            profileImg.style.opacity = '1';
        });
        
        // Fallback in case image is already loaded
        if (profileImg.complete) {
            profileImg.style.opacity = '1';
        }
    }

    // Add typing animation restart on focus/visibility change
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            const typingElement = document.querySelector('.typing-text span');
            if (typingElement) {
                // Restart animation by removing and re-adding
                typingElement.style.animation = 'none';
                setTimeout(() => {
                    typingElement.style.animation = '';
                }, 10);
            }
        }
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Add any scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    console.log('🚀 Portfolio mobile optimizations loaded successfully!');
});