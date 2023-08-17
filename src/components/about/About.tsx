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
      <section id='about' className='about' aria-labelledby='about__title'>
        <div className='column full_height centered_grid'>
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
    </div>
  );
}

export default About;
