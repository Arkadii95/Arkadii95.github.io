/*drop*/
const params = {
  btnClassName: "js-header-drop-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled",
  tabsClass: "js-tab-link",
  wrap: "js-tabs-catalog-content",
  content: "js-tab-content",
  active: "active"
};

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();

/*Tabs*/
function setTabs(params) {
  const tabBtns = document.querySelectorAll(`.${params.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${params.wrap}`);
    const currentContent = wrap.querySelector(`.${params.content}[data-target="${path}"]`);
    const contents = wrap.querySelectorAll(`.${params.content}`);

    contents.forEach((el) => {
      el.classList.remove(params.active);
    });

    currentContent.classList.add(params.active);
    
    tabBtns.forEach((el) => {
      el.classList.remove(params.active);
    });
    
    this.classList.add(params.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
}

setTabs(params);


/*slider*/
var swiper1 = new Swiper('.hero__swiper', {
  slidesPerView: 1,
  speed: 900,
  loop: true,

  a11y: {
    paginationBulletMessage: 'Слайд {{index}}',
  },

  autoplay: {
    delay: 1500,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
});


var swiper2 = new Swiper('.gallery__swiper-container',  {
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 1200,
    grid: {
      rows: 1,
      fill: "row",
    },

    pagination: {
      el: ".gallery .gallery__pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
    a11y: {
      prevSlideMessage: 'Предыдущие картины',
      nextSlideMessage: 'следующие картины',
    },

    breakpoints: {

      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38,
      },
      
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },

      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    },


  });

var swiper3 = new Swiper('.events-swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 900,


  a11y: {
    prevSlideMessage: 'Предыдущее событие ',
    nextSlideMessage: 'следующее событие',
  },

  navigation: {
    nextEl: ".events__btn-next",
    prevEl: ".events__btn-prev",
  },

  pagination: {
    el: ".events__pagination",
    type: 'bullets',
    clickable: true,
    dynamicMainBullets: 1
  },

  breakpoints: {

    441: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    769: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27,
    },

    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  }

  
});

var swiper4 = new Swiper('.projects__swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 900,

  a11y: {
    prevSlideMessage: 'Предыдущие проекты',
    nextSlideMessage: 'следующие проекты',
  },

  navigation: {
    nextEl: ".projects__btn-next",
    prevEl: ".projects__btn-prev",
  },

  breakpoints: {

    441: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    769: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },

    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  }
});

/*gallery-select*/
const element = document.querySelector('.select-custom');
const choices = new Choices(element, {
  searchEnabled: false,
});

/*catalog*/
(() => {
  new Accordion('.accordion__list', {
    elementClass: 'accordion__item',
    triggerClass: 'accordion__btn',
    panelClass: 'accordion__content',
    activeClass: 'accordion--active',
    openOnInit: [0]
  });
})();

/*tooltip*/
new tippy('.projects__btn-tooltip', {
  content(reference) {
    const id = reference.getAttribute('data-template');
    const template = document.getElementById(id);
    return template.innerHTML;
  },
  placement: 'top',
  theme: 'projects__btn-tooltip',
  maxWidth: 264,
  flip: false,
});

/*carta*/
ymaps.ready(init);
function init() {
  const mapElem = document.querySelector('#map');
  const myMap = new ymaps.Map("map", {
    center: [55.758964150453615, 37.60201117990102],
    zoom: 14,
    controls: ['geolocationControl', 'zoomControl']
  },
  { 
    suppressMapOpenBlock: true,
    geolocationControlSize: "large",
    geolocationControlPosition:  { top: "200px", right: "20px" },
    geolocationControlFloat: 'none',
    zoomControlSize: "small",
    zoomControlFloat: "none",
    zoomControlPosition: { top: "120px", right: "20px" }
  });

  myMap.behaviors.disable('scrollZoom');


  const myPlacemark = new ymaps.Placemark([55.758964150453615, 37.60201117990102], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/Subtract.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]
  });

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
  
}

/*forma*/
var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) - 999 - 99 - 99");

im.mask(selector);

new JustValidate('.contacts__form', {


  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 20,
      strength: {
        custom: '^[A-zA-яЁё]+$',
      },
    },

    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },

  },

  messages: {
    name: {
      required: 'Вы не ввели имя',
      minLength: 'Больше двух символов',
      strength: 'Недопустимый формат',
    },
    tel: 'Вы не ввели телефон',
  },

  colorWrong: ('.js-validate-error-field', '.js-validate-error-label')

});

/*Burger-menu*/
let burger = document.querySelector('.burger');
let menu = document.querySelector('.nav');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click',

  function () {
    burger.classList.toggle('burger--active');

    menu.classList.toggle('nav--active');

    document.body.classList.toggle('stop-scroll');
  });

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {

    burger.classList.remove('burger--active');

    menu.classList.remove('nav--active');

    document.body.classList.remove('stop-scroll');

  });
});

/*search*/
document.querySelector(".header__top-button").addEventListener("click", function() {
  document.querySelector(".search__container-js").classList.add("search__active");
  this.classList.add("active");
})
document.querySelector(".header__top-close-btn").addEventListener("click", function() {
   let form = document.querySelector(".search__container-js");
  form.classList.remove("search__active");
    form.querySelector("input").value = "";
    document.querySelector(".header__top-button").classList.remove("active")
});

document.addEventListener("click", function(e) {
  let target = e.target;
  let form = document.querySelector(".search__container-js");
  if (!target.closest(".search__container")) {
  form.classList.remove("search__active");
    form.querySelector("input").value = "";
    document.querySelector(".header__top-button").classList.remove("active")
  }
});


/*scroll*/
document.querySelectorAll('.js-scroll').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
  });
});

/*scroll-mobile*/
(() => {
	const MOBILE_WIDTH = 768;
	
	function getWindowWidth () {
	  return Math.max(
	    document.body.scrollWidth,
	    document.documentElement.scrollWidth,
	    document.body.offsetWidth,
	    document.documentElement.offsetWidth,
	    document.body.clientWidth,
	    document.documentElement.clientWidth
	  );
	}
	
	function scrollToContent (link, isMobile) {
		if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
			return;
		}
	
	  const href = link.getAttribute('href').substring(1);
	  const scrollTarget = document.getElementById(href);
	  const elementPosition = scrollTarget.getBoundingClientRect().top;
	
	  window.scrollBy({
	      top: elementPosition,
	      behavior: 'smooth'
	  });
	}
	
	document.querySelectorAll('.js-scroll-link').forEach(link => {
	  link.addEventListener('click', function(e) {
	      e.preventDefault();
	
	      scrollToContent(this, true);
	  });
	});
})();
