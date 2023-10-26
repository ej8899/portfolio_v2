/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from '../../assets/components/React';
import { useEffect, useRef } from 'react';
// import SkillSlider from '../skillslider/SkillSlider';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import './About.scss';
import Aboutimage from './Aboutimage';

import { useModal } from '../modal/ModalManager';
import {
  modalContentEngineer,
  modalContentMProjects,
  modalContentBootcamp,
  modalContentCommodore,
} from './ModalContent'; // Import the modal content

interface AboutProps {
  reference: React.RefObject<HTMLDivElement>;
}

function About(props: AboutProps) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(aboutRef, '-100px');
  const { openModal } = useModal();

  const handleOpenModal = (modalItem: string) => {
    // console.log('about- opening modal');
    switch (modalItem) {
      case 'engineer':
        openModal('Software Engineers in 🇨🇦', modalContentEngineer, '');
        break;
      case 'majorprojects':
        openModal('Major Projects...', modalContentMProjects, '');
        break;
      case 'bootcamp':
        openModal('Coding Bootcamp', modalContentBootcamp, '');
        break;
      case 'commodore':
        openModal('Commodore & Tandy!', modalContentCommodore, '');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isOnScreen) return;
    leftColumnRef.current?.classList.add('animate-in');
    rightColumnRef.current?.classList.add('animate-in');
  }, [isOnScreen]);

  return (
    <>
      <section
        id='about'
        className='about'
        aria-labelledby='about__title'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, react/prop-types
        ref={props.reference}
      >
        <div className='about-header-wrapper'>
          <div className='custom-shape-divider-bottom-1694044314'>
            <svg
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1200 120'
              preserveAspectRatio='none'
            >
              <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='shape-fill'></path>
            </svg>
          </div>
          <div className='custom-shape-divider-bottom-1694044314b'>
            <svg
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1200 120'
              preserveAspectRatio='none'
            >
              <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='shape-fillb'></path>
            </svg>
          </div>
        </div>

        <div className='column centered_grid about__wrapper'>
          <h2 id='about__title'>About Me</h2>
          <div className='subtitle-message'>Get to know a bit more about me.</div>
          <div className='about__content' ref={aboutRef}>
            <div className='about__text' ref={leftColumnRef}>
              <p>
                I am a Construction Manager-transitioned- Web & Applications Developer.
                <br />(
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('engineer');
                  }}
                >
                  &nbsp;Why am I not a software engineer?&nbsp;
                </button>
                )
              </p>
              <p>
                In all honesty, I&apos;ve now come &quot;full-circle&quot; in my career journey and
                am coming back to web and applications development.
              </p>
              <p>
                When much younger, I did start coding mini games and{' '}
                <span data-tooltip='freeware and shareware'>applications</span> in BASIC language on{' '}
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('commodore');
                  }}
                >
                  Commodore (& Tandy)&nbsp;
                </button>
                computers. Eventually, this transitioned into PC&apos;s and{' '}
                <span data-tooltip='Blackberry and PalmPilot'>early mobile devices</span>
                &nbsp;and then into the early days of web development - from static web pages, to
                web to full-stack e-commerce applications.
              </p>
              <p>
                Life happened, and I decided to re-think my career choices - I made a sudden shift
                into first responder & emergency service roles. A few years years later and I found
                myself involved in construction management of &quot;
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('majorprojects');
                  }}
                >
                  major projects
                </button>
                &quot; across Canada.
              </p>
              <p>
                Fast forwarding into 2021, life-happened once again, and I&apos;ve once again
                decided to re-ignite my passion for{' '}
                <span data-tooltip='including hardware!'>technology</span> and application
                development. I decided to leave my job to enroll in an intensive full-stack web
                development&nbsp;
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('bootcamp');
                  }}
                >
                  bootcamp
                </button>
                .
              </p>
              <p>I loved seeing what was new, and now here we are!</p>
              <p>
                Other interests include:
                <span data-tooltip='my dog'>
                  <big className='about-extra'>🐕</big>
                </span>{' '}
                <span className='about-extra' data-tooltip='travel'>
                  <big>✈️</big>
                </span>
                <span className='about-extra' data-tooltip='scuba diving'>
                  <big>🤿</big>
                </span>{' '}
                <span className='about-extra' data-tooltip='fitness'>
                  <big>💪</big>
                </span>{' '}
                <span className='about-extra' data-tooltip='photography'>
                  <big>📸</big>
                </span>
              </p>
            </div>
            <div ref={rightColumnRef}>
              <Aboutimage />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
