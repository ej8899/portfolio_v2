import Github from '../../assets/components/Github';
import LinkedIn from '../../assets/components/LinkedIn';
import Button from '../button/Button';
import './Hero.scss';
import globalconfig from '../../config';
function Hero() {
  return (
    <section className='hero' aria-label='hero with github & linkedin links'>
      <div className='hero-content column centered_grid full_height'>
        <div className='hero__text'>
          <h2
            className='splitting-text-anim-1 scroll-animate'
            data-splitting='chars'
            data-animate='active'
          >
            <span>
              <b>Ernie</b>
              <br />
              Johnson
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
        </div>
      </div>
    </section>
  );
}

export default Hero;
