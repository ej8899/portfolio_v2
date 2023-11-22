import React from '../../assets/components/React';
import './About.scss';
import './Aboutimage.scss';
import './Aboutresponse.scss';
import aboutPhoto from '../../assets/images/profile2.png';
import imagePattern1 from '../../assets/images/pat-1.png';
import imagePattern2 from '../../assets/images/pat-2.png';

import { useEffect, useRef } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';

function Aboutimage() {
  const photoRef = useRef<HTMLImageElement>(null);
  const infoRef1 = useRef<HTMLLIElement>(null);
  const infoRef2 = useRef<HTMLLIElement>(null);
  const infoRef3 = useRef<HTMLLIElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const pat1Ref = useRef<HTMLDivElement>(null);
  const pat2Ref = useRef<HTMLDivElement>(null);
  const pat3Ref = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(infoRef1, '-100px');

  useEffect(() => {
    // TODO remove ani classes if off screen to reset these  // hideitems // showitems
    if (!isOnScreen) {
      // infoRef1.current?.classList.remove('animate__zoomIn');
      // infoRef2.current?.classList.remove('animate__zoomIn');

      // circleRef.current?.classList.add('hideitems');
      return;
    }
    // TODO above and below we're going to need to run a show and hide class with opacity 0 / opacity 1
    setTimeout(() => {
      infoRef1.current?.classList.add('animate__fadeIn');
      infoRef2.current?.classList.add('animate__fadeIn');
      infoRef3.current?.classList.add('animate__fadeIn');
      photoRef.current?.classList.add('animate__fadeIn');
      circleRef.current?.classList.add('animate__fadeInUp');
      circleRef.current?.classList.add('showitems');
      pat1Ref.current?.classList.add('animate__fadeInDown');
      pat3Ref.current?.classList.add('animate__fadeInUp');
      pat2Ref.current?.classList.add('animate__fadeInLeft');
    }, 100);
  }, [isOnScreen]);

  return (
    <div className='section about-started photo-scaling'>
      <div className='slide photowrapper'>
        <img
          decoding='async'
          className='animate__animated about-photo'
          data-scroll-ratio='0.9'
          src={aboutPhoto}
          alt='<b>Ernie</b> Johnson'
          ref={photoRef}
        />
        <span className='circle circle-1 animate__animated' ref={circleRef}></span>
        <span
          className='circle img-1 animate__animated'
          ref={pat1Ref}
          data-scroll-ratio='0.1'
          id='item1'
          style={{
            backgroundImage: `url(${imagePattern1})`,
          }}
        />
        <span
          className='circle img-2  animate__animated'
          ref={pat2Ref}
          data-scroll-ratio='0.1'
          id='item2'
          style={{
            backgroundImage: `url(${imagePattern2})`,
          }}
        />
        <span
          className='circle img-3  animate__animated'
          ref={pat3Ref}
          style={{
            backgroundImage: `url(${imagePattern2})`,
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
              <span className='num'>53+</span>
              <span className='value'>
                Completed <strong>Projects</strong>
              </span>
            </li>
            <li
              className='parallax-about-item-info3 animate__animated animate__delay-3s'
              ref={infoRef3}
            >
              <span className='num'>22+</span>
              <span className='value'>
                <strong>Freelance Clients</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Aboutimage;
