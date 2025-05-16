// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const skillLevels = document.querySelectorAll('.skill-level');

    // Menu burger pour mobile
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');
        // Animation burger
        burger.classList.toggle('toggle');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    // Navigation active selon la section visible
    function activeLink() {
        let position = window.scrollY + 200;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector('nav ul li a[href="#' + id + '"]');
            
            if (position >= top && position < top + height) {
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }

    // Effet sticky pour la navigation
    window.addEventListener('scroll', function() {
        // Effet sticky header
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Navigation active
        activeLink();
        
        // Animation de la barre de compétences
        animateSkills();
    });

    // Animation des barres de compétences
    function animateSkills() {
        skillLevels.forEach(skillLevel => {
            const skillSection = document.getElementById('skills');
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPos < screenPosition) {
                // Récupérer la largeur à partir du style inline
                const width = skillLevel.style.width;
                // Animer seulement si ce n'est pas déjà animé
                if (!width || width === '0%') {
                    skillLevel.style.width = skillLevel.style.width || '0%';
                }
            }
        });
    }

    // Animation au défilement pour les sections
    function revealOnScroll() {
        sections.forEach(section => {
            const sectionPos = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPos < screenPosition) {
                section.classList.add('active');
            }
        });
    }
    
    // Animation pour les projets
    function animateProjects() {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, 200 * index);
        });
    }
    
    // Appel de l'animation des projets
    setTimeout(animateProjects, 500);

    // Appeler une fois pour initialiser
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // Formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Ici vous pouvez traiter le formulaire (envoyer un email, appeler une API, etc.)
            // Pour GitHub Pages, vous devrez utiliser une solution comme FormSpree ou Netlify Forms
            
            // Exemple avec FormSpree (vous devrez remplacer 'votre-identifiant' par votre identifiant FormSpree)
            // const formData = new FormData();
            // formData.append('name', name);
            // formData.append('email', email);
            // formData.append('subject', subject);
            // formData.append('message', message);
            // fetch('https://formspree.io/f/votre-identifiant', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // }).then(response => {
            //     if (response.ok) {
            //         alert('Message envoyé avec succès !');
            //         contactForm.reset();
            //     } else {
            //         alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            //     }
            // }).catch(error => {
            //     console.error('Erreur:', error);
            //     alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            // });
            
            // Pour le démo, simplement afficher un message
            alert('Message envoyé avec succès ! (Démo)');
            contactForm.reset();
        });
    }

    // Filtrer les projets
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            // Filtrer les projets
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Effet de défilement doux pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset pour la navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation au chargement de la page
    window.addEventListener('load', function() {
        // Afficher la section d'accueil avec une animation
        document.querySelector('header').classList.add('active');
        
        // Initialiser les animations
        activeLink();
        animateSkills();
    });
    
    // Effet de typage pour le titre (optionnel)
    function typeEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // Décommenter si vous voulez l'effet de typage sur un élément spécifique
    // const titleElement = document.querySelector('header p');
    // const titleText = titleElement.innerHTML;
    // typeEffect(titleElement, titleText);
});