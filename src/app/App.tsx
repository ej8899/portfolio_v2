// eslint-disable
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect } from 'react';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import Portfolio from '../components/portfolio/Portfolio';
import './App.scss';
import { stickyNav, initCursor, activeAnimation } from '../utils';
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import Splitting from 'splitting';
import SkillSlider from '../components/skillslider/SkillSlider';

// extras
import globalconfig from '../config';
import AboutSlider from '../components/about/AboutSlider';

// export const WindowContext = createContext({ height: 0, width: 0 });

function App() {
  // const { height, width } = useWindowDimensions();

  /* Setup initial JS items */
  useEffect(() => {
    activeAnimation();
    initCursor();
    window.addEventListener('scroll', stickyNav);
    window.addEventListener('scroll', activeAnimation);

    // scroll listeners
    const items = document.querySelectorAll('.parallax-item');
    const targetElement = document.querySelector('.footer__wrapper');
    const contentHeight = document.querySelector('.appwrapper').clientHeight;
    const lastPixelsToShow = 50;
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    const viewportHeight = window.innerHeight;
    console.log('appwrapper height:', contentHeight);
    console.log('viewport height:', viewportHeight);
    window.addEventListener('scroll', () => {
      // const scrollY = window.scrollY;

      // items.forEach((item) => {
      //   const scrollRatio = item.getAttribute('data-scroll-ratio');
      //   const translateY = -scrollY * scrollRatio;

      //   item.style.transform = `translateY(${translateY}px)`;
      //   console.log('parallax event on', item);
      // });
      //
      // bring footer to surface for clickable links
      /*
      if (contentHeight - scrollY - viewportHeight < lastPixelsToShow) {
        if (globalconfig.debug) {
          console.log('debug: setting zindex on footer to 1');
        }
        targetElement.style.zIndex = 1;
      } else {
        if (globalconfig.debug) {
          // console.log('debug: setting zindex on footer to -1');
        }
        targetElement.style.zIndex = -1;
      }
      */
      // add the scroll to top button
      if (window.scrollY > 300) {
        scrollToTopButton.classList.add('active');
      } else {
        scrollToTopButton.classList.remove('active');
      }
    });
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    Splitting();
  });

  return (
    // <WindowContext.Provider value={{ height, width }}>
    <>
      <div className='appwrapper'>
        <Header />
        <Hero />
        <About />
        <AboutSlider />
        <SkillSlider />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
      <button id='scrollToTopButton' title='Scroll to Top'>
        <i className='fas fa-chevron-up'></i>
      </button>
      <div className='cursor' />
    </>
    // </WindowContext.Provider>
  );
}

export default App;
