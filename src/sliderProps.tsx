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
