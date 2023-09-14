/* eslint-disable */
/* eslint prefer-const */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { jarallax } from "jarallax";

//
// cursor manipulation system here:
//
export function initCursor() {
  let mouseX = window.innerWidth / 2,
      mouseY = window.innerHeight / 2;

  let cursor = {
    el: document.querySelector(".cursor"),
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    w: 30,
    h: 30,
    update: function () {
      let l = this.x - this.w / 2;
      let t = this.y - this.h / 2;
      this.el.style.transform = "translate3d(" + l + "px," + t + "px, 0)";
    },
  };

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const link = document.querySelectorAll(
    "a,  button, .button, .swiper-pagination, .swiper-button-prev, .swiper-button-next"
  );
  link.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.el.classList.add("cursor-zoom");
    });
    link.addEventListener("mouseleave", () => {
      cursor.el.classList.remove("cursor-zoom");
    });
  });

  setInterval(move, 1000 / 60);
  function move() {
    cursor.x = lerp(cursor.x, mouseX, 0.08);
    cursor.y = lerp(cursor.y, mouseY, 0.08);
    cursor.update();
  }
  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
}

export const activeAnimation = () => {
  const progress_inner = document.querySelectorAll(".scroll-animate"),
    triggerBottom = (window.innerHeight / 5) * 5 - 20;
  progress_inner.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.style.visibility = "visible";
      box.classList.add("animate__active");
    }
  });
};

export const stickyNav = () => {
  const sticky = document.querySelectorAll(".header");
  const mediaSize = 500; // pixels

  let offset = window.scrollY;

  sticky.forEach((sticky) => {
    if (sticky) {
      if (offset > 100 && window.innerWidth > mediaSize) {
        sticky.classList.add("animate-in", "sticky", "frosting");
      } else {
        sticky.classList.remove("animate-in", "sticky", "frosting");
      }
    }
  });
};



