import { useEffect, useRef } from 'react';
// import SkillSlider from '../skillslider/SkillSlider';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import './About.scss';
import Aboutimage from './Aboutimage';

function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(aboutRef, '-100px');

  useEffect(() => {
    if (!isOnScreen) return;
    leftColumnRef.current?.classList.add('animate-in');
    rightColumnRef.current?.classList.add('animate-in');
  }, [isOnScreen]);

  return (
    <section id='about' className='about' aria-labelledby='about__title'>
      <div className='column centered_grid'>
        <h2 id='about__title' className='js-parallax'>
          About Me
        </h2>
        <div className='about__content' ref={aboutRef}>
          <div className='about__text' ref={leftColumnRef}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla Excepteur
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          <div ref={rightColumnRef}>
            <Aboutimage />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
