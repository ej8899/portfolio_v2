import { useEffect, useRef } from 'react';
// import SkillSlider from '../skillslider/SkillSlider';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import './About.scss';
import './AboutParallax.scss';
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
    <div>
      <section id='about' className='about about-parallax-wrapper' aria-labelledby='about__title'>
        <div className='column full_height centered_grid'>
          <h2 id='about__title' className='js-parallax'>
            About Me
          </h2>
          <div className='about__content' ref={aboutRef}>
            <div className='about__text' ref={leftColumnRef}>
              <p>I am a Construction Manager-transitioned- Web & Applications Developer.</p>
              <p>
                In all honesty, I&apos;ve now come &quot;full-circle&quot; in my career journey and
                am coming back to web and applications development.
              </p>
              <p>
                When much younger, I did start coding mini games and{' '}
                <span data-tooltip='freeware and shareware'>applications</span> in BASIC language on{' '}
                <span data-tooltip='VIC-20 -> C64 -> C128'>Commodore</span> computers. Eventually,
                this transitioned into PC&apos;s and{' '}
                <span data-tooltip='Blackberry and PalmPilot'>early mobile devices</span>
                and then into the early days of web development - from static web pages, to web to
                full-stack e-commerce applications.
              </p>
              <p>
                Life happened, and I decided to re-think my career choices - I made a sudden shift
                into first responder & emergency service roles. A few years years later and I found
                my self involved in construction management of &quot;
                <span data-tooltip='multi-billion dollar jobs'>major projects</span>&quot; across
                Canada.
              </p>
              <p>
                Fast forwarding into 2021, life-happened once again, and I&apos;ve once again
                decided to re-ignite my passion for{' '}
                <span data-tooltip='including hardware!'>technology</span> and application
                development. I decided to leave my job to enroll in an intensive full-stack web
                development&nbsp;
                <span data-tooltip='Lighthouse Labs'>bootcamp</span>.
              </p>
              <p>I loved seeing what was new, and now here we are!</p>
              <p>
                Other interests include:
                <span data-tooltip='my dog'>
                  <big>🐕</big>
                </span>{' '}
                <span data-tooltip='travel'>
                  <big>✈️</big>
                </span>
                <span data-tooltip='scuba diving'>
                  <big>🤿</big>
                </span>{' '}
                <span data-tooltip='fitness'>
                  <big>💪</big>
                </span>{' '}
                <span data-tooltip='photography'>
                  <big>📸</big>
                </span>
              </p>
            </div>
            <div ref={rightColumnRef}>
              <Aboutimage />
            </div>
          </div>
          <br />
          <br />
          &nbsp;
        </div>
      </section>
    </div>
  );
}

export default About;
