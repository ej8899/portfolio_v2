/* eslint-disable */
// import Github from '../../assets/components/Github';
import './Footer.scss';
import globalconfig from '../../config';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label='footer containing github repo link'>
      <div className='footer__builder'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
              <div
                className='social-links scrolla-element-anim-1 scroll-animate'
                data-animate='active'
              >
                <a target='_new' rel='nofollow' href={globalconfig.link.twitter}>
                  <i aria-hidden='true' className='fab fa-twitter' />
                </a>
                <a target='_new' rel='nofollow' href={globalconfig.link.linkedin}>
                  <i aria-hidden='true' className='fab fa-linkedin-in' />
                </a>
                <a target='_new' rel='nofollow' href={globalconfig.link.youtube}>
                  <i aria-hidden='true' className='fab fa-youtube' />
                </a>
                <a target='_new' rel='nofollow' href={globalconfig.link.github}>
                  <i aria-hidden='true' className='fab fa-github' />
                </a>
              </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
              <div
                className='copyright-text align-center scrolla-element-anim-1 scroll-animate'
                data-animate='active'
              >
                © {currentYear} <strong>ERNIEJOHNSON.CA</strong>. All rights reserved
              </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
              <div
                className='copyright-text align-right scrolla-element-anim-1 scroll-animate'
                data-animate='active'
              >
                Developed by <strong>ERNIEJOHNSON.CA</strong> - version {globalconfig.appVersion}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
