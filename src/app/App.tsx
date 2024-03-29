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
// @ts-ignore: Object is possibly 'null'.
import React from '../assets/components/React';
import { useEffect, useRef, useState } from 'react';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import Portfolio from '../components/portfolio/Portfolio';
import './App.scss';
import { stickyNav, initCursor, activeAnimation, appTitle } from '../utils';
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import Splitting from 'splitting';
import SkillSlider from '../components/skillslider/SkillSlider';
import SectionObserver from '../components/SectionObserver';
// extras
import AboutSlider from '../components/about/AboutSlider';
import Chatbot from '../components/chatbot/Chatbot';
import Resume from '../components/resume/Resume';
import BlogComponent from '../components/blog/Blogs';
import FeedbackForm from '../components/contact/Feedback';
import CertificateList from '../components/resume/Certs';
import logger from '../loggerSingleton';

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import useWindowDimensions from '../hooks/useWindowDimensions';

// export const WindowContext = createContext({ height: 0, width: 0 });

function App() {
  // appTitle('ErnieJohnson.ca - Web Dev Portfolio');
  // const { height, width } = useWindowDimensions();
  // console.log('window height:', height);
  // what element is on screenconst [activeSection, setActiveSection] = useState(null);
  const [isChrome115Plus, setIsChrome115Plus] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = {
    portfolio: useRef(null),
    hero: useRef(null),
    skillslider: useRef(null),
    about: useRef(null),
    resume: useRef(null),
  };

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleEnter = (sectionName: string) => {
    setActiveSection(sectionName);
    switch (sectionName) {
      case 'about':
        appTitle('about -> ErnieJohnson.ca');
        break;
      case 'portfolio':
        appTitle('portfolio -> ErnieJohnson.ca');
        break;
      case 'resume':
        appTitle('resume -> ErnieJohnson.ca');
        break;
      case 'contact':
        appTitle('contact -> ErnieJohnson.ca');
        logger.info('in contact section');
        break;
      case 'footer':
        appTitle('hidden footer -> ErnieJohnson.ca');
        logger.info('found hidden footer (build click)');
        break;
      default:
        appTitle('ErnieJohnson.ca - Web Dev Portfolio');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLeave = (sectionName: string) => {
    if (sectionName === 'footer') {
      //
    }
    return;
  };

  // chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  /* Setup initial JS items */
  useEffect(() => {
    // Check if userId already exists in localStorage
    const userId = localStorage.getItem('userId');
    // If not, generate a new userId and save it to localStorage
    if (!userId) {
      const newUserId = generateUUID();
      localStorage.setItem('userId', newUserId);
      logger.info('App started - new user');
    } else {
      logger.info('App started - repeat visitor');
    }

    activeAnimation();
    initCursor();
    window.addEventListener('scroll', stickyNav);
    window.addEventListener('scroll', activeAnimation);

    // scroll listeners
    // const items = document.querySelectorAll('.parallax-item');
    // const targetElement = document.querySelector('.footer__wrapper');
    // const contentHeight = document.querySelector('.appwrapper').clientHeight;
    // const lastPixelsToShow = 50;
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    // const viewportHeight = window.innerHeight;
    // let scrollY;
    // console.log('appwrapper height:', contentHeight);
    // console.log('viewport height:', viewportHeight);

    // monitor for resizes
    window.addEventListener('resize', () => {
      stickyNav();
    });

    //
    // back to top button
    //
    window.addEventListener('scroll', () => {
      //
      // scroll position for back to top button
      //
      // const scrollPosition = window.scrollY;
      // scrollY = window.scrollY;
      // add the scroll to top button
      if (window.scrollY > 300) {
        if (scrollToTopButton) {
          scrollToTopButton.classList.add('active');
          if (line1 && line2) {
            line1.classList.add('nowblack');
            line2.classList.add('nowblack');
          }
        }
      } else {
        if (scrollToTopButton) {
          scrollToTopButton.classList.remove('active');
          if (line1 && line2) {
            line1.classList.remove('nowblack');
            line2.classList.remove('nowblack');
          }
        }
      }
    });

    if (scrollToTopButton) {
      scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // window.removeEventListener('resize', handleResize);
      });
    }

    const isChrome = /Chrome\/([0-9]+)/.test(navigator.userAgent);
    const chromeVersion = isChrome ? parseInt(RegExp.$1) : 0;
    if (isChrome && chromeVersion <= 115) {
      setIsChrome115Plus(true);
      setTimeout(() => {
        setIsChrome115Plus(false);
      }, 15000);
    } else {
      setIsChrome115Plus(false);
    }
  }, []);

  useEffect(() => {
    Splitting();
  });

  return (
    // <WindowContext.Provider value={{ height, width }}>
    <>
      <div className='appwrapper'>
        <Header sectionName={activeSection || ''} />
        <SectionObserver sectionName='hero' onEnter={handleEnter} onLeave={handleLeave}>
          <Hero reference={sectionRefs.hero} />
        </SectionObserver>
        <SectionObserver sectionName='about' onEnter={handleEnter} onLeave={handleLeave}>
          <About reference={sectionRefs.about} />
          <AboutSlider />
          <SkillSlider reference={sectionRefs.skillslider} />
        </SectionObserver>
        <SectionObserver sectionName='portfolio' onEnter={handleEnter} onLeave={handleLeave}>
          <Portfolio reference={sectionRefs.portfolio} />
        </SectionObserver>
        <SectionObserver sectionName='resume' onEnter={handleEnter} onLeave={handleLeave}>
          <Resume reference={sectionRefs.resume} />
          <BlogComponent />
        </SectionObserver>
        <CertificateList></CertificateList>
        <SectionObserver sectionName='contact' onEnter={handleEnter} onLeave={handleLeave}>
          <Contact />
        </SectionObserver>
        <SectionObserver sectionName='footer' onEnter={handleEnter} onLeave={handleLeave}>
          <Footer />
        </SectionObserver>
        <FeedbackForm />
      </div>
      <button id='scrollToTopButton' data-tooltip='top'>
        <i className='fas fa-chevron-up'></i>
      </button>
      <div className='cursor' />
      <div id='chatBotButton' data-tooltip='chat'>
        <div className='chat-icon' onClick={toggleChat}>
          <i className='fas fa-comment-alt rotate-10cw'></i>
        </div>
      </div>
      {isChrome115Plus ? <div id='snackbar'>browser update recommended!</div> : null}
      {isChatOpen && <Chatbot onClose={toggleChat} />}
    </>
    // </WindowContext.Provider>
  );
}

export default App;
