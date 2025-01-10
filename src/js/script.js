document.addEventListener('DOMContentLoaded', () => {
    // Elementos principales
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const projectCards = document.querySelectorAll('.project-card');

    // Animación inicial de la página
    const initPageAnimation = () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });

        setTimeout(() => {
            header.style.opacity = '1';
        }, 100);

        // Animación de las cards de proyectos
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    };

    // Manejo de la navegación
    const handleNavigation = (e) => {
        e.preventDefault();
        const clickedLink = e.target.closest('.nav__link'); // Asegura que obtenemos el enlace incluso si se hace clic en el ícono
        
        if (!clickedLink) return; // Si no se hizo clic en un enlace, salimos
        
        // Actualizar estado activo de los links
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');

        // Obtener y mostrar la sección seleccionada
        const sectionId = clickedLink.getAttribute('data-section');
        
        // Ocultar todas las secciones con animación
        sections.forEach(section => {
            section.classList.add('hidden');
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.3s ease';
        });

        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 50);
            
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Detectar sección activa durante el scroll
    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        // Efecto en la barra de navegación
        if (scrollPosition > 100) {
            nav.style.transform = 'translate(-50%, 0) scale(0.95)';
            nav.style.opacity = '0.9';
        } else {
            nav.style.transform = 'translate(-50%, 0) scale(1)';
            nav.style.opacity = '1';
        }

        // Actualizar link activo basado en la posición del scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    };

    // Manejar clicks en los botones de proyecto
    const handleProjectButtons = () => {
        const projectButtons = document.querySelectorAll('.project-button, .project-link');
        projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    window.open(href, '_blank');
                }
            });
        });
    };

    // Inicialización
    const init = () => {
        // Ocultar todas las secciones excepto experiencia
        sections.forEach(section => {
            if (section.id !== 'experience') {
                section.classList.add('hidden');
                section.style.opacity = '0';
            } else {
                section.classList.remove('hidden');
                section.style.opacity = '1';
            }
        });

        // Marcar el link de experiencia como activo
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === 'experience') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        initPageAnimation();
        handleProjectButtons();
    };

    // Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    window.addEventListener('scroll', handleScroll);

    // Inicializar
    init();
});