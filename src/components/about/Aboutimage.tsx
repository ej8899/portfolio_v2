import React from '../../assets/components/React';
import './About.scss';
import './Aboutimage.scss';
import './Aboutresponse.scss';

import { useEffect, useRef } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';

function Aboutimage() {
  const infoRef1 = useRef<HTMLLIElement>(null);
  const infoRef2 = useRef<HTMLLIElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const pat1Ref = useRef<HTMLDivElement>(null);
  const pat2Ref = useRef<HTMLDivElement>(null);
  const pat3Ref = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(infoRef1, '-100px');

  useEffect(() => {
    // TODO remove ani classes if off screen to reset these
    if (!isOnScreen) {
      infoRef1.current?.classList.remove('animate__zoomIn');
      infoRef2.current?.classList.remove('animate__zoomIn');
      return;
    }

    setTimeout(() => {
      infoRef1.current?.classList.add('animate__zoomIn');
      infoRef2.current?.classList.add('animate__zoomIn');
      circleRef.current?.classList.add('animate__fadeInUp');
      pat1Ref.current?.classList.add('animate__fadeInTopRight');
      pat3Ref.current?.classList.add('animate__fadeInBottomRight');
      pat2Ref.current?.classList.add('animate__fadeInLeft');
    }, 100);
  }, [isOnScreen]);

  return (
    <div className='section about-started photo-scaling'>
      <div className='slide'>
        <img
          decoding='async'
          data-scroll-ratio='0.9'
          src='src/assets/images/profile2.png'
          alt='<b>Ernie</b> Johnson'
        />
        <span className='circle circle-1'></span>
        <span
          className='circle img-1 animate__animated'
          ref={pat1Ref}
          data-scroll-ratio='0.1'
          id='item1'
          style={{
            backgroundImage: 'url(src/assets/images/pat-1.png)',
          }}
        />
        <span
          className='circle img-2  animate__animated'
          ref={pat2Ref}
          data-scroll-ratio='0.1'
          id='item2'
          style={{
            backgroundImage: 'url(src/assets/images/pat-2.png)',
          }}
        />
        <span
          className='circle img-3  animate__animated'
          ref={pat3Ref}
          style={{
            backgroundImage: 'url(src/assets/images/pat-2.png)',
          }}
        />
        <div className='info-list'>
          <ul>
            <li className='rotate3l animate__animated animate__delay-1s' ref={infoRef1}>
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
