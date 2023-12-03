/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import './Footer.scss';
import globalconfig from '../../config';
import version from '../../version.json';
import { useState, useEffect, useRef } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';

function formatTimestamp(timestamp: string | number | Date) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(4, '0'); // Ensure 4-digit padding
  const formattedTimestamp = `${year}-${month}-${day}//${minute}`;
  return formattedTimestamp;
}
const formattedBuild = formatTimestamp(version.buildDate);

function Footer() {
  const currentYear = new Date().getFullYear();
  const [buildClicked, setBuildClicked] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(headerRef, '-100px');

  useEffect(() => {
    if (!isOnScreen) {
      // console.log('off screen');
      setBuildClicked(false);
      return;
    } // else console.log('on screen');
  }, [isOnScreen]);

  const handleBuildClick = () => {
    // console.log('Span clicked!');
    setBuildClicked(true);
    // document.body.classList.add('shake');
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }, 300);
  };

  return (
    <footer
      className={`footer ${buildClicked ? 'build-clicked' : ''}`}
      aria-label='footer containing github repo link'
      ref={headerRef}
    >
      <div className='footer-hidden'>
        <div className='glitch' data-text='More coming soon!'>
          More coming soon!
        </div>
        <div className='glow'>More coming soon!</div>
      </div>
      <div className='footer__wrapper copyright_text'>
        <div className='footer-section'>
          <div className='social-links' data-animate='active'>
            <a target='_new' rel='nofollow' href={globalconfig.link.twitter}>
              <i aria-hidden='true' className='fab fa-x-twitter socicons soctips' />
              &nbsp;&nbsp;&nbsp;
            </a>
            <a target='_new' rel='nofollow' href={globalconfig.link.linkedin}>
              <i aria-hidden='true' className='fab fa-linkedin-in socicons' />
              &nbsp;&nbsp;&nbsp;
            </a>
            <a target='_new' rel='nofollow' href={globalconfig.link.youtube}>
              <i aria-hidden='true' className='fab fa-youtube socicons' />
              &nbsp;&nbsp;&nbsp;
            </a>
            <a target='_new' rel='nofollow' href={globalconfig.link.github}>
              <i aria-hidden='true' className='fab fa-github socicons' />
            </a>
          </div>
        </div>
        <div className='footer-section'>
          <div className='copyright-text' data-animate='active'>
            © {currentYear} <strong>ERNIEJOHNSON.CA</strong>.
            <br />
            All rights reserved.
          </div>
        </div>
        <div className='footer-section'>
          <div className='copyright-text' data-animate='active'>
            version {globalconfig.appVersion}
            <br />
            <span onClick={handleBuildClick}>build: {formattedBuild}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
