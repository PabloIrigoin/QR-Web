// document.addEventListener("DOMContentLoaded", function () {
//   // Intersection Observer para animaciones al hacer scroll
//   const observerOptions = {
//     root: null,
//     rootMargin: "5% 0px", // Ajuste para asegurar que una parte significativa del elemento sea visible
//   };

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         // Comprueba si la animación ya se ha ejecutado
//         if (!entry.target.classList.contains('animated')) {
//           // Añade 'animate__animated' y la clase específica de animación
//           entry.target.classList.add("animate__animated");
//           const animationClass = entry.target.getAttribute("data-animation");
//           entry.target.classList.add(animationClass);

//           // Añade la clase 'animated' para indicar que la animación se ha ejecutado
//           entry.target.classList.add('animated');

//           // Añade delay si existe
//           const delay = entry.target.getAttribute("data-delay");
//           if (delay) {
//             entry.target.style.animationDelay = delay;
//           }

//           // Calcula la duración total de la animación incluyendo el delay
//           const animationDuration = window.getComputedStyle(entry.target).animationDuration || '0s';
//           const totalDuration = (parseFloat(animationDuration) + parseFloat(delay || '0s')) * 1000;

//           // Usa setTimeout para dejar de observar después de que la animación se complete
//           setTimeout(() => {
//             observer.unobserve(entry.target);
//           }, totalDuration);
//         }
//       }
//     });
//   }, observerOptions);

//   const elements = document.querySelectorAll(".animate-on-scroll");
//   elements.forEach((el) => {
//     observer.observe(el);
//   });

//   // Código para cerrar el menú desplegable al hacer clic en un enlace
//   const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
//   const navCollapse = document.querySelector(".navbar-collapse");
//   const navbarToggler = document.querySelector(".navbar-toggler");

//   navLinks.forEach(function (link) {
//     link.addEventListener("click", function () {
//       navCollapse.classList.remove("show");
//       navbarToggler.classList.remove("collapsed"); // Volver a estado hamburguesa
//     });
//   });

//   navbarToggler.addEventListener("click", function () {
//     this.classList.toggle("collapsed");
//   });

//   navCollapse.addEventListener("hidden.bs.collapse", function () {
//     navbarToggler.classList.remove("collapsed"); // Volver a estado hamburguesa
//   });

//   const ABOUT_US = document.getElementById("about-us");
//   if (ABOUT_US) {
//     ABOUT_US.addEventListener("click", function () {
//       scrollToTargetAdjusted("quienes-somos");
//     });
//   }

//   const ABOUT_DOWN = document.getElementById("arrow-down");
//   if (ABOUT_DOWN) {
//     ABOUT_DOWN.addEventListener("click", function () {
//       scrollToTargetAdjusted("quienes-somos");
//     });
//   }

//   const OUR_SERVICES = document.getElementById("our-services");
//   if (OUR_SERVICES) {
//     OUR_SERVICES.addEventListener("click", function () {
//       scrollToTargetAdjusted("servicios");
//     });
//   }

//   const CONTACT = document.getElementById("contact");
//   if (CONTACT) {
//     CONTACT.addEventListener("click", function () {
//       scrollToTargetAdjusted("contactarnos");
//     });
//   }

//   const CONTACT_2 = document.getElementById("contact-2");
//   if (CONTACT_2) {
//     CONTACT_2.addEventListener("click", function () {
//       scrollToTargetAdjusted("contactarnos");
//     });
//   }

// });

// function scrollToTargetAdjusted(elementName) {
//   const ELEMENT = document.getElementById(elementName);
//   const HEADER_OFF_SET = 87; // Si cambian la altura de la navbar, actualizar este valor
//   const ELEMENT_POSITION = ELEMENT.getBoundingClientRect().top;
//   const OFFSET_POSITION = ELEMENT_POSITION + window.scrollY - HEADER_OFF_SET;

//   window.scrollTo({
//     top: OFFSET_POSITION,
//     behavior: "smooth",
//   });
// }

// document
//   .getElementById("contactForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

//     const messageInput = document.getElementById('message');
//     const nameInput = document.getElementById('name');
//     const emailInput = document.getElementById('email');

//     const body = {
//       to: [
//         {
//           name: `Soporte QR`,
//           address: "pabloirigoin@qrsolutions.com.ar",
//         },
//       ],
//       from: emailInput.value.trim(),
//       data: {
//         message: messageInput.value.trim(),
//         subject: `Contacto desde el sitio de QR de ${nameInput.value.trim()}`,
//       },
//       methods: ["EMAIL"],
//     };

//     fetch("https://api-ar.develop-redremax.com/notifications/api/notification/webqr", {
//       method: "POST",
//       body: JSON.stringify(body),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         window.location.href = "/QR-Web/success"; //TODO: cambiar para cuando se deploye en un repo dedicado de QR
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Hubo un problema al enviar el formulario");
//       });
//   });

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

      const messageInput = document.getElementById('message');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');

      let valid = true;

      // Validación de nombre
      if (!nameInput.value.trim()) {
          valid = false;
          showTooltip(nameInput, "tooltip-name");
      } else {
          hideTooltip("tooltip-name");
      }

      // Validación de email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
          valid = false;
          showTooltip(emailInput, "tooltip-email");
      } else {
          hideTooltip("tooltip-email");
      }

      // Validación de mensaje
      if (!messageInput.value.trim()) {
          valid = false;
          showTooltip(messageInput, "tooltip-message");
      } else {
          hideTooltip("tooltip-message");
      }

      if (valid) {
          const body = {
              to: [
                  {
                      name: `Soporte QR`,
                      address: "",
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
  });

  function showTooltip(inputElement, tooltipId) {
      const tooltip = document.getElementById(tooltipId);
      tooltip.style.display = "block";
      inputElement.classList.add("input-error");
  }

  function hideTooltip(tooltipId) {
      const tooltip = document.getElementById(tooltipId);
      tooltip.style.display = "none";
  }

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }
});
