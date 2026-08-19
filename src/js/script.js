document.addEventListener('DOMContentLoaded', () => {
    // Elementos principales
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('main > section');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const projectCards = document.querySelectorAll('.project-card');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animación inicial de la página
    const initPageAnimation = () => {
        if (prefersReducedMotion) {
            document.body.style.opacity = '1';
            header.style.opacity = '1';
            projectCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
            });
            return;
        }

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

    // Activa visualmente el link correspondiente
    const setActiveLink = (sectionId) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });
    };

    // Manejo de la navegación
    const handleNavigation = (e) => {
        e.preventDefault();
        const clickedLink = e.target.closest('.nav__link');
        if (!clickedLink) return;

        const sectionId = clickedLink.getAttribute('data-section');
        setActiveLink(sectionId);

        // Ocultar todas las secciones con animación
        sections.forEach(section => {
            section.classList.add('hidden');
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.3s ease';
        });

        if (sectionId === 'profile') {
            // "Inicio" no es una <section>, sino el <header>: solo hacemos scroll hacia él
            header.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            return;
        }

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 50);
            targetSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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

        // Si una sección está oculta (navegación por tabs), no recalculamos el link activo por scroll
        const anySectionHidden = Array.from(sections).some(section => section.classList.contains('hidden'));
        if (anySectionHidden) return;

        // Estamos en la parte superior de la página: "Inicio" es lo relevante
        if (scrollPosition < header.clientHeight / 2) {
            setActiveLink('profile');
            return;
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        if (current) setActiveLink(current);
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

        setActiveLink('profile');
        initPageAnimation();
    };

    // Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Inicializar
    init();
});