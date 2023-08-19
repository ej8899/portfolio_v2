import './About.scss';
import './animate.css';
import { useEffect, useRef } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';

function Aboutimage() {
  const infoRef1 = useRef<HTMLDivElement>(null);
  const infoRef2 = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(infoRef1, '-100px');

  useEffect(() => {
    if (!isOnScreen) return;
    infoRef1.current?.classList.add('animate__zoomIn');
    infoRef2.current?.classList.add('animate__zoomIn');
    circleRef.current?.classList.add('fadeInUp');
  }, [isOnScreen]);

  // TODO bug in circle if scrolling into view - it already fades in, then does the fadeInUp animation - need to keep circle off for start.

  return (
    <div
      className='section hero-started slide scrolla-element-anim-1 scroll-animate lui-section lui-section-hero lui-gradient-top lui-started parallax-section'
      data-animate='active'
    >
      {/* TODO setup for @media resizing */}
      {/* TODO setup for animation on scroll to view and parallax */}
      <div>
        <img
          decoding='async'
          className='greyscale aboutimage parallax-item'
          data-scroll-ratio='0.9'
          src='src/assets/images/profile2.png'
          alt='<b>Ernie</b> Johnson'
        />
        <span className='circle circle-1 animate__animated' ref={circleRef} />
        <span
          className='circle img-1 parallax-item'
          data-scroll-ratio='0.1'
          id='item1'
          style={{
            backgroundImage: 'url(src/assets/images/pat-1.png)',
          }}
        />
        <span
          className='circle img-2 parallax-item'
          data-scroll-ratio='0.1'
          id='item2'
          style={{
            backgroundImage: 'url(src/assets/images/pat-2.png)',
          }}
        />
        <span
          className='circle img-3 parallax-about-item-bubbles'
          style={{
            backgroundImage: 'url(src/assets/images/pat-2.png)',
          }}
        />
        <div className='info-list'>
          <ul>
            <li
              className='rotate3l parallax-about-item-info animate__animated animate__delay-1s'
              ref={infoRef1}
            >
              <span className='num'>
                2 <strong>+</strong>
              </span>
              <span className='value'>
                Years of <strong>Experience</strong>
              </span>
            </li>
            <li
              className='rotate3r parallax-about-item-info2 animate__animated animate__delay-2s'
              ref={infoRef2}
            >
              <span className='num'>53</span>
              <span className='value'>
                Completed <strong>Projects</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Aboutimage;
