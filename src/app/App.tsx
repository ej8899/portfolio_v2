/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
// eslint-disable
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from 'react';
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
import Chatbot from '../components/chatbot/Chatbot';
import Resume from '../components/resume/Resume';

// export const WindowContext = createContext({ height: 0, width: 0 });

function App() {
  // const { height, width } = useWindowDimensions();
  const [activeSection, setActiveSection] = useState(null);

  // chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

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
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const viewportHeight = window.innerHeight;
    let scrollY;
    console.log('appwrapper height:', contentHeight);
    console.log('viewport height:', viewportHeight);

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return rect.top <= 20;
    }

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;

      const section1 = document.getElementById('portfolio');
      const section2 = document.getElementById('hero');
      if (isInViewport(section1)) {
        console.log('viewing portfolio');
        setActiveSection('white');
      } else if (isInViewport(section2)) {
        console.log('viewing hero');
        setActiveSection('white');
      } else {
        setActiveSection(null); // No section in view
      }

      scrollY = window.scrollY;
      // console.log('in app.tsx scrollY:', scrollY);
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
        line1.classList.add('nowblack');
        line2.classList.add('nowblack');
      } else {
        scrollToTopButton.classList.remove('active');
        line1.classList.remove('nowblack');
        line2.classList.remove('nowblack');
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
        <Hero vscroll={scrollY} />
        <About />
        <AboutSlider />
        <SkillSlider />
        <Portfolio />
        <Resume />
        <Contact />
        <Footer />
      </div>
      <button id='scrollToTopButton' title='Scroll to Top'>
        <i className='fas fa-chevron-up'></i>
      </button>
      <div className='cursor' />
      <div id='chatBotButton'>
        <div className='chat-icon' onClick={toggleChat}>
          <i className='fas fa-comment-alt'></i>
        </div>
      </div>
      {isChatOpen && <Chatbot onClose={toggleChat} />}
    </>
    // </WindowContext.Provider>
  );
}

export default App;
