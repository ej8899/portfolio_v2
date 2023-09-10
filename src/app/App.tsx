/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
// eslint-disable
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { SetStateAction, useEffect, useRef, useState } from 'react';
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
import SectionObserver from '../components/SectionObserver';
// extras
import globalconfig from '../config';
import AboutSlider from '../components/about/AboutSlider';
import Chatbot from '../components/chatbot/Chatbot';
import Resume from '../components/resume/Resume';
import useElementOnScreen from '../hooks/useElementOnScreen';
import useWindowDimensions from '../hooks/useWindowDimensions';

// export const WindowContext = createContext({ height: 0, width: 0 });

function App() {
  const { height, width } = useWindowDimensions();
  // console.log('window height:', height);
  // what element is on screenconst [activeSection, setActiveSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = {
    portfolio: useRef(null),
    hero: useRef(null),
    skillslider: useRef(null),
    about: useRef(null),
    resume: useRef(null),
  };

  const handleEnter = (sectionName) => {
    setActiveSection(sectionName);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Section entered: ${sectionName}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLeave = (sectionName) => {
    // setActiveSection(null);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // console.log(`Section left: ${sectionName}`);
  };

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

    //
    // back to top button
    //
    window.addEventListener('scroll', () => {
      //
      // scroll position for back to top button
      //
      const scrollPosition = window.scrollY;
      scrollY = window.scrollY;
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
        <SectionObserver sectionName='hero' onEnter={handleEnter} onLeave={handleLeave}>
          <Hero vscroll={scrollY} reference={sectionRefs.hero} />
        </SectionObserver>
        <SectionObserver sectionName='about' onEnter={handleEnter} onLeave={handleLeave}>
          <About reference={sectionRefs.about} />
          <AboutSlider />
          <SkillSlider reference={sectionRefs.skillslider} />
        </SectionObserver>
        <SectionObserver sectionName='portfolio' onEnter={handleEnter} onLeave={handleLeave}>
          <Portfolio reference={sectionRefs.portfolio} />
        </SectionObserver>
        <SectionObserver sectionName='contact' onEnter={handleEnter} onLeave={handleLeave}>
          <Resume reference={sectionRefs.resume} />
          <Contact />
        </SectionObserver>
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
