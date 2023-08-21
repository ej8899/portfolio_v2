import Github from '../../assets/components/Github';
import LinkedIn from '../../assets/components/LinkedIn';
import Button from '../button/Button';
import './Hero.scss';
import globalconfig from '../../config';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import { FormEvent, useEffect, useRef, useState } from 'react';

function Hero() {
  return (
    <section id='hero' className='hero' aria-label='hero with github & linkedin links'>
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
              <span id='line2'>Johnson</span>
            </span>
          </h2>
          <h3>
            Your Full Stack <span>Web & App Developer!</span>
          </h3>
          <div className='hero__cta'>
            <a target='_new' rel='nofollow' href={globalconfig.link.linkedin}>
              <i aria-hidden='true' className='fab fa-linkedin-in socicons' />
            </a>
            <a target='_new' rel='nofollow' href={globalconfig.link.github}>
              <i aria-hidden='true' className='fab fa-github socicons' />
            </a>
            <a target='_new' rel='nofollow' href={globalconfig.link.twitter}>
              <i aria-hidden='true' className='fab fa-twitter socicons' />
            </a>
            <a target='_new' rel='nofollow' href={globalconfig.link.youtube}>
              <i aria-hidden='true' className='fab fa-youtube socicons' />
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href='#about'>
              <Button type='outline'>About Me</Button>
            </a>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          &nbsp;
        </div>
      </div>
    </section>
  );
}

export default Hero;
