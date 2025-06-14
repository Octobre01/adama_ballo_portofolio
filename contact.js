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

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    
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
            !closeMenu.contains(e.target)) {
            
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
});

// Gestion des inputs pour les labels flottants
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// Gestion de l'envoi du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.btn[type="submit"]');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(form);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const message = formData.get('message') || '';
            
            // Validation basique
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires (Nom, Email, Message)');
                return;
            }
            
            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }
            
            // Préparation du contenu de l'email
            const subject = encodeURIComponent(`Nouveau message de ${name} - Portfolio Contact`);
            const body = encodeURIComponent(`
Nouveau message reçu depuis votre portfolio :

Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Message: ${message}

---
Ce message a été envoyé depuis votre formulaire de contact.
            `);
            
            // Création du lien mailto
            const mailtoLink = `mailto:adama.zie.ballo@gmail.com?subject=${subject}&body=${body}`;
            
            // Animation du bouton
            const originalText = submitBtn.value;
            submitBtn.value = 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Ouverture du client email
            window.location.href = mailtoLink;
            
            // Réinitialisation du bouton après un délai
            setTimeout(() => {
                submitBtn.value = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // Confirmation et réinitialisation du formulaire
                alert('Votre client email s\'est ouvert avec le message pré-rempli. Envoyez-le pour que je puisse vous répondre !');
                form.reset();
                
                // Suppression de la classe focus des containers
                document.querySelectorAll('.input-container').forEach(container => {
                    container.classList.remove('focus');
                });
            }, 1000);
        });
    }
});