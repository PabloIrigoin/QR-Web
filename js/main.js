document.addEventListener("DOMContentLoaded", function() {
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade 'animate__animated' y la clase específica de animación
                entry.target.classList.add('animate__animated');
                const animationClass = entry.target.getAttribute('data-animation');
                entry.target.classList.add(animationClass);

                // Añade delay si existe
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.animationDelay = delay;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        observer.observe(el);
    });

    // Función para volver a observar los elementos cuando se hace scroll up
    function reobserveElements() {
        elements.forEach(el => {
            if (!el.classList.contains('animate__animated')) {
                observer.observe(el);
            } else {
                el.classList.remove('animate__animated');
                const animationClass = el.getAttribute('data-animation');
                el.classList.remove(animationClass);
            }
        });
    }

    // Escucha el evento de scroll
    window.addEventListener('scroll', reobserveElements);

    // Código para cerrar el menú desplegable al hacer clic en un enlace
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navCollapse = document.querySelector('.navbar-collapse');
    var navbarToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navCollapse.classList.remove('show');
            navbarToggler.classList.remove('collapsed'); // Volver a estado hamburguesa
        });
    });

    navbarToggler.addEventListener('click', function () {
        this.classList.toggle('collapsed');
    });

    navCollapse.addEventListener('hidden.bs.collapse', function () {
        navbarToggler.classList.remove('collapsed'); // Volver a estado hamburguesa
    });

    // Agregar esta función para reducir el menú al hacer scroll
    const navbar = document.querySelector('header.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-reducido');
        } else {
            navbar.classList.remove('navbar-reducido');
        }
    });
});
