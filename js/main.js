document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer para animaciones al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: "5% 0px", // Ajuste para asegurar que una parte significativa del elemento sea visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('animated')) {
          entry.target.classList.add("animate__animated");
          const animationClass = entry.target.getAttribute("data-animation");
          entry.target.classList.add(animationClass);
          entry.target.classList.add('animated');

          const delay = entry.target.getAttribute("data-delay");
          if (delay) {
            entry.target.style.animationDelay = delay;
          }

          const animationDuration = window.getComputedStyle(entry.target).animationDuration || '0s';
          const totalDuration = (parseFloat(animationDuration) + parseFloat(delay || '0s')) * 1000;

          setTimeout(() => {
            observer.unobserve(entry.target);
          }, totalDuration);
        }
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((el) => {
    observer.observe(el);
  });

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navCollapse.classList.remove("show");
      navbarToggler.classList.remove("collapsed");
    });
  });

  navbarToggler.addEventListener("click", function () {
    this.classList.toggle("collapsed");
  });

  navCollapse.addEventListener("hidden.bs.collapse", function () {
    navbarToggler.classList.remove("collapsed");
  });

  const ABOUT_US = document.getElementById("about-us");
  if (ABOUT_US) {
    ABOUT_US.addEventListener("click", function () {
      scrollToTargetAdjusted("quienes-somos");
    });
  }

  const ABOUT_DOWN = document.getElementById("arrow-down");
  if (ABOUT_DOWN) {
    ABOUT_DOWN.addEventListener("click", function () {
      scrollToTargetAdjusted("quienes-somos");
    });
  }

  const OUR_SERVICES = document.getElementById("our-services");
  if (OUR_SERVICES) {
    OUR_SERVICES.addEventListener("click", function () {
      scrollToTargetAdjusted("servicios");
    });
  }

  const CONTACT = document.getElementById("contact");
  if (CONTACT) {
    CONTACT.addEventListener("click", function () {
      scrollToTargetAdjusted("contactarnos");
    });
  }

  const CONTACT_2 = document.getElementById("contact-2");
  if (CONTACT_2) {
    CONTACT_2.addEventListener("click", function () {
      scrollToTargetAdjusted("contactarnos");
    });
  }

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
      grecaptcha.execute(); // Ejecuta reCAPTCHA v3
    });
});

function scrollToTargetAdjusted(elementName) {
  const ELEMENT = document.getElementById(elementName);
  const HEADER_OFF_SET = 87; // Si cambian la altura de la navbar, actualizar este valor
  const ELEMENT_POSITION = ELEMENT.getBoundingClientRect().top;
  const OFFSET_POSITION = ELEMENT_POSITION + window.scrollY - HEADER_OFF_SET;

  window.scrollTo({
    top: OFFSET_POSITION,
    behavior: "smooth",
  });
}

function onSubmit(token) {
  verifyRecaptcha(token);
}

function verifyRecaptcha(token) {
  const secret = "6Le7bh0qAAAAAOgRmkGLmPCjNj8iDIcFiHO2t3xS";
  const response = token;

  fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `secret=${secret}&response=${response}`
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      sendEmail();
    } else {
      alert("La verificación de reCAPTCHA falló. Por favor, inténtalo de nuevo.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

function sendEmail() {
  const messageInput = document.getElementById('message');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const body = {
    to: [
      {
        name: `Soporte QR`,
        address: "pabloirigoin@gmail.com",
      },
    ],
    from: emailInput.value.trim(),
    data: {
      message: messageInput.value.trim(),
      subject: `Contacto desde el sitio de QR de ${nameInput.value.trim()}`,
    },
    methods: ["EMAIL"],
  };

  fetch("https://api-ar.develop-redremax.com/notifications/api/notification/webqr", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log(response);
    window.location.href = "/QR-Web/success"; //TODO: cambiar para cuando se deploye en un repo dedicado de QR
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Hubo un problema al enviar el formulario");
  });
}
