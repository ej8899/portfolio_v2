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

// export const WindowContext = createContext({ height: 0, width: 0 });

function App() {
  // const { height, width } = useWindowDimensions();

  /* Setup initial JS items */
  useEffect(() => {
    activeAnimation();
    initCursor();
    window.addEventListener('scroll', stickyNav);
    window.addEventListener('scroll', activeAnimation);

    // scroll to top button
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    window.addEventListener('scroll', () => {
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
      <Header />
      <Hero />
      <About />
      <SkillSlider />
      <Portfolio />
      <Contact />
      <Footer />
      <button id='scrollToTopButton' title='Scroll to Top'>
        <i className='fas fa-chevron-up'></i>
      </button>
      <div className='cursor' />
    </>
    // </WindowContext.Provider>
  );
}

export default App;
