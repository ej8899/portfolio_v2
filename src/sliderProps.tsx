/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable

/*
  https://swiperjs.com/
  https://swiperjs.com/react#effects
*/

export const servicesSliderProps = {
  slidesPerView: 3,
  spaceBetween: 20,
  watchSlidesProgress: true,
  noSwipingSelector: 'a',
  centeredSlides: true,
  loop: true,
  speed: 1000,
  effect: 'slide',

  watchOverflow: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  // pagination: {
  //   el: '.swiper-pagination',
  //   type: 'bullets',
  //   clickable: true,
  // },
  navigation: true,

  on: {
    // eslint-disable-next-line object-shorthand
    slideChange: function () {
      const activeIndex = this.activeIndex; // Index of the active (middle) slide
      const slides = this.slides; // All slides in the carousel

      // Remove 'swiper-slide-active' class from all slides
      slides.forEach((slide) => {
        slide.classList.remove('swiper-slide-active');
      });

      // Add 'swiper-slide-active' class to the active (middle) slide
      slides[activeIndex].classList.add('swiper-slide-active');
    },
  },

  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
};

export const testimonialsSliderProps = {
  slidesPerView: 3,
  spaceBetween: 40,
  watchSlidesProgress: false,
  noSwipingSelector: 'a',
  loop: true,
  speed: 1000,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: true,
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    767: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
};
