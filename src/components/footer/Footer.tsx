/* eslint-disable */
// import Github from '../../assets/components/Github';
import './Footer.scss';
import globalconfig from '../../config';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer' aria-label='footer containing github repo link'>
      <div className='footer-hidden'>
      </div>
      <div className='footer__wrapper copyright_text'>
            <div className='footer-section'>
              <div
                className='social-links'
                data-animate='active'
              >
                <a target='_new' rel='nofollow' href={globalconfig.link.twitter}>
                  <i aria-hidden='true' className='fab fa-x-twitter socicons soctips'/>
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
              <div
                className='copyright-text'
                data-animate='active'
              >
                © {currentYear} <strong>ERNIEJOHNSON.CA</strong>.
                <br />
                All rights reserved.
              </div>
            </div>
            <div className='footer-section'>
              <div
                className='copyright-text'
                data-animate='active'
              >
                version {globalconfig.appVersion}
              </div>
            </div>
      </div>
    </footer>
  );
}

export default Footer;
