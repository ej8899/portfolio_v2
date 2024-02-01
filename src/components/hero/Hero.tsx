import React from '../../assets/components/React';
import Button from '../button/Button';
import './Hero.scss';
import globalconfig from '../../config';
import { LegacyRef } from 'react';

function Hero(props: { reference: LegacyRef<HTMLElement> | undefined }) {
  return (
    <section
      id='hero'
      className='hero'
      aria-label='hero with social media links'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, react/prop-types
      ref={props.reference}
    >
      <div className='hero-content column centered_grid full_height'>
        <div className='hero__text'>
          <h2
            className='title splitting-text-anim-1 animate__active scroll-animate hero-started'
            data-splitting='chars'
            data-animate='active'
          >
            <span>
              <b id='line1'>Ernie</b>
              <br />
              &nbsp;<span id='line2'>Johnson</span>
            </span>
          </h2>
          <h3>
            Your Full Stack{' '}
            <span>
              Web <br className='display-none' />& App Developer!
            </span>
          </h3>
          <div className='hero__cta'>
            <div>
              <a target='_new' rel='nofollow' href={globalconfig.link.linkedin}>
                <i aria-hidden='true' className='fab fa-linkedin-in socicons p10px' />
              </a>
              <a target='_new' rel='nofollow' href={globalconfig.link.github}>
                <i aria-hidden='true' className='fab fa-github socicons p10px' />
              </a>
              <a target='_new' rel='nofollow' href={globalconfig.link.twitter}>
                <i aria-hidden='true' className='fab fa-x-twitter socicons p10px' />
              </a>
              <a target='_new' rel='nofollow' href={globalconfig.link.youtube}>
                <i aria-hidden='true' className='fab fa-youtube socicons p10px' />
              </a>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <a href='#about'>
                <Button type='outline'>About Me</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
