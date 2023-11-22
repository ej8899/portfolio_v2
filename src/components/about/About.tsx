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
  modalContentServers,
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
        openModal('Software Engineers in Canada', modalContentEngineer, '');
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
      case 'hardware':
        openModal('Hardware', modalContentServers, '');
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
              <br />
              <p>
                I&apos;m a Construction Manager turned Web & Applications Developer.
                <br />(
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('engineer');
                  }}
                >
                  &nbsp;Why am I <s>NOT</s> a software engineer?&nbsp;
                </button>
                )
              </p>
              <p>
                My journey has taken me full-circle, returning to my passion for web and application
                development.
              </p>
              <p>
                It all started when I was younger, coding mini games and applications in BASIC on{' '}
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('commodore');
                  }}
                >
                  Commodore and Tandy
                </button>{' '}
                computers. This evolved into PC and early mobile device development and eventually
                led to building full-stack e-commerce applications.
              </p>
              <p>
                After a brief shift into first responder and emergency service roles, I found myself
                managing{' '}
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('majorprojects');
                  }}
                >
                  major construction projects
                </button>{' '}
                across Canada.
              </p>
              <p>
                In 2021, I decided to reignite my love for technology and application development. I
                left my job to enroll in an intensive full-stack web development&nbsp;
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('bootcamp');
                  }}
                >
                  bootcamp
                </button>
                &nbsp;program to learn about what was new in the industry.
              </p>
              <p>
                I thrive on embracing the latest technologies (
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('hardware');
                  }}
                >
                  including hardware
                </button>
                ) and this is where my journey has brought me today.
              </p>
              <p>
                Other interests include:
                <br />
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
            {/* about image here */}
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
