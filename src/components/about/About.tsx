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
      <div className='about-custom-shape-divider-top-1681930915'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1920 1080'
          preserveAspectRatio='none'
        >
          <path
            d='M0,144.271L106.667,136.358C213.333,128.446,426.667,112.621,640,158.459C853.333,204.298,1066.667,311.799,1280,373.049C1493.333,434.298,1706.667,449.295,1813.333,456.793L1920,464.291L1920,1080L1813.333,1080C1706.667,1080,1493.333,1080,1280,1080C1066.667,1080,853.333,1080,640,1080C426.667,1080,213.333,1080,106.667,1080L0,1080Z'
            className='about-shape-fill'
          ></path>
        </svg>
      </div>
      <section id='about' className='about about-parallax-wrapper' aria-labelledby='about__title'>
        <div className='column full_height centered_grid'>
          <br />
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
                When much younger, I did start coding mini games and applications in BASIC language
                on <span data-tooltip='VIC-20 -> C64 -> C128'>Commodore</span> computers.
                Eventually, this transitioned into PC&apos;s and the early mobile devices like
                Blackberry and Palm and then into the early days of web development - from static
                web pages, to full-stack e-commerce applications.
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
              <p>I loved every minute of it, and now here we are!</p>
              <p>
                Other interests include: <span data-tooltip='my dog'>🐕</span>{' '}
                <span data-tooltip='travel'>✈️</span> <span data-tooltip='scuba diving'>🤿</span>{' '}
                <span data-tooltip='fitness'>💪</span> <span data-tooltip='photography'>📸</span>
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
