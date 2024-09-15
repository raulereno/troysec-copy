/* Auxiliar functions */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


/* */



(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
 * Services Toggle
 */
  document.querySelectorAll('.service-item h3, .service-item .service-toggle').forEach((serviceItem) => {
    serviceItem.addEventListener('click', () => {
      serviceItem.parentNode.classList.toggle('service-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  // window.addEventListener('load', function (e) {
  //   if (window.location.hash) {
  //     if (document.querySelector(window.location.hash)) {
  //       setTimeout(() => {
  //         let section = document.querySelector(window.location.hash);
  //         let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
  //         window.scrollTo({
  //           top: section.offsetTop - parseInt(scrollMarginTop),
  //           behavior: 'smooth'
  //         });
  //       }, 100);
  //     }
  //   }
  // });

  // /**
  //  * Navmenu Scrollspy
  //  */
  // let navmenulinks = document.querySelectorAll('.navmenu a');

  // function navmenuScrollspy() {
  //   navmenulinks.forEach(navmenulink => {
  //     if (!navmenulink.hash) return;
  //     let section = document.querySelector(navmenulink.hash);
  //     if (!section) return;
  //     let position = window.scrollY + 200;
  //     if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
  //       document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
  //       navmenulink.classList.add('active');
  //     } else {
  //       navmenulink.classList.remove('active');
  //     }
  //   })
  // }
  // window.addEventListener('load', navmenuScrollspy);
  // document.addEventListener('scroll', navmenuScrollspy);

})();



/**
   * Language
   */
// Función que toma un string con notación de puntos y devuelve el valor correspondiente del objeto
const getNestedValue = (obj, path) => {
  try {
    return path.split('.').reduce((acc, part) => {
      // Si el parte es un índice de array (e.g. [0]), conviértelo en un entero
      if (part.includes('[')) {
        const [arrayPart, index] = part.split(/[\[\]]/).filter(Boolean);
        return acc[arrayPart][parseInt(index)];
      }
      return acc[part];
    }, obj);
  } catch (error) {
    console.error(`Error accediendo a la ruta: ${path}`, error);
    return null;
  }
};


const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {

    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;
    const isForm = textToChange.dataset.isForm;

    // Obtener el valor anidado basado en 'section' y 'value'
    const fullPath = `${section}.${value}`;
    const textValue = getNestedValue(texts, fullPath);

    // Verificar si textValue es un objeto o un valor simple
    if (textValue !== null) {
      if (typeof textValue === 'object' && !Array.isArray(textValue)) {
        if (isForm) {
          textToChange.placeholder = textValue.placeholder || textToChange.placeholder; // Mantener placeholder si no se encuentra traducción
        } else {
          textToChange.innerHTML = textValue.text || JSON.stringify(textValue) || textToChange.innerHTML; // Mantener el innerHTML si no hay valor
        }
      } else {
        textToChange.innerHTML = textValue || textToChange.innerHTML; // Si no hay valor, mantener el innerHTML actual
      }
    } else {
      console.warn(`Translation for path "${fullPath}" not found, keeping original content.`);
      // Si no se encuentra la traducción, el innerHTML actual permanece
    }
  }
}


const language = document.getElementById("leng");

const textsToChange = document.querySelectorAll("[data-section]");

//Detect current language of browser
const browserLanguage = window.navigator.language;
const isEn = browserLanguage.includes("en");
const languageCookie = getCookie("language");

if (languageCookie) {
  document.getElementById("language-toggler").setAttribute("data-language", languageCookie);
  changeLanguage(languageCookie);
} else {
  document.getElementById("language-toggler").setAttribute("data-language", isEn ? "en" : "es");
  changeLanguage(isEn ? "en" : "es");
}




document.getElementById("language-toggler").addEventListener("click", function () {

  const currentLanguage = this.getAttribute("data-language");


  if (currentLanguage === "es") {
    setCookie("language", "en", 365);
    this.setAttribute("data-language", "en");
    window.location.reload();
  } else {
    setCookie("language", "es", 365);
    this.setAttribute("data-language", "es");
    window.location.reload();
  }
});



language.addEventListener("click", (e) => {
  changeLanguage(e.target.dataset.language);
});



// Cargar el script de reCAPTCHA cuando se haga clic en cualquier campo del formulario
function loadRecaptcha() {
  console.log("Cargando reCAPTCHA...");
  const script = document.createElement('script');
  script.src = "https://www.google.com/recaptcha/api.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  // Remover el listener después de cargar el script
  formFields.forEach(field => {
    field.removeEventListener('click', loadRecaptcha);
  });
}

// Seleccionar todos los campos del formulario
const formFields = document.querySelectorAll('.php-email-form input, .php-email-form textarea, .php-email-form select');

// Agregar el listener de clic a cada campo del formulario
formFields.forEach(field => {
  field.addEventListener('click', loadRecaptcha, { once: true });
});