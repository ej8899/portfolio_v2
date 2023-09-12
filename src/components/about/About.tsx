/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useRef } from 'react';
// import SkillSlider from '../skillslider/SkillSlider';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import './About.scss';
import Aboutimage from './Aboutimage';
import Collapse from '../collapse/Collapse';
import { useModal } from '../modal/ModalManager';

function About(props) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(aboutRef, '-100px');
  const { openModal } = useModal();

  const handleOpenModal = (modalItem) => {
    let modalTitle = '';
    console.log('about- opening modal');
    const modalContent = (
      <div>
        <h2>Quarum ambarum rerum cum medicinam pollicetur, luxuriae licentiam pollicetur.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unum nescio, quo modo possit, si
          luxuriosus sit, finitas cupiditates habere. Hoc est non modo cor non habere, sed ne
          palatum quidem. Sic, et quidem diligentius saepiusque ista loquemur inter nos agemusque
          communiter. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Quid igitur
          dubitamus in tota eius natura quaerere quid sit effectum? Duo Reges: constructio
          interrete.{' '}
        </p>

        <h3>Ut proverbia non nulla veriora sint quam vestra dogmata.</h3>

        <p>
          Quasi vero, inquit, perpetua oratio rhetorum solum, non etiam philosophorum sit. Tria
          genera cupiditatum, naturales et necessariae, naturales et non necessariae, nec naturales
          nec necessariae. Sin aliud quid voles, postea. Consequatur summas voluptates non modo
          parvo, sed per me nihilo, si potest;{' '}
        </p>

        <p>
          Cur igitur easdem res, inquam, Peripateticis dicentibus verbum nullum est, quod non
          intellegatur? Primum in nostrane potestate est, quid meminerimus? Eam tum adesse, cum
          dolor omnis absit; Quodsi ipsam honestatem undique pertectam atque absolutam. Aliam vero
          vim voluptatis esse, aliam nihil dolendi, nisi valde pertinax fueris, concedas necesse
          est. Nec enim, cum tua causa cui commodes, beneficium illud habendum est, sed faeneratio,
          nec gratia deberi videtur ei, qui sua causa commodaverit. Universa enim illorum ratione
          cum tota vestra confligendum puto. Sed residamus, inquit, si placet. Sed vobis voluptatum
          perceptarum recordatio vitam beatam facit, et quidem corpore perceptarum. Itaque primos
          congressus copulationesque et consuetudinum instituendarum voluntates fieri propter
          voluptatem; Ita enim se Athenis collocavit, ut sit paene unus ex Atticis, ut id etiam
          cognomen videatur habiturus. Atque hoc loco similitudines eas, quibus illi uti solent,
          dissimillimas proferebas.{' '}
        </p>
      </div>
    );
    switch (modalItem) {
      case 'engineer':
        modalTitle = 'Software Engineers in 🇨🇦...';
        break;
      case 'majorprojects':
        modalTitle = 'Major Projects...';
        break;
      default:
        break;
    }
    openModal(modalTitle, modalContent);
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
        className='about about-parallax-wrapper'
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
        <div className='whiteout'></div>

        <div className='column centered_grid'>
          <h2 id='about__title' className='js-parallax'>
            About Me
          </h2>
        </div>
        <div className='column centered_grid'>
          <div className='about__content' ref={aboutRef}>
            <div className='about__text' ref={leftColumnRef}>
              <p>
                I am a Construction Manager-transitioned- Web & Applications Developer. (
                <button
                  className='button-text'
                  onClick={() => {
                    handleOpenModal('engineer');
                  }}
                >
                  Why am I not a software engineer?
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
                <span data-tooltip='VIC-20 -> C64 -> C128'>Commodore</span> computers. Eventually,
                this transitioned into PC&apos;s and{' '}
                <span data-tooltip='Blackberry and PalmPilot'>early mobile devices</span>
                and then into the early days of web development - from static web pages, to web to
                full-stack e-commerce applications.
                <Collapse title='' key='1'>
                  <p>
                    extra info here - tooltips ok?{' '}
                    <span data-tooltip='freeware and shareware'>applications</span> in BASIC
                    <br />
                    tool tips work, but can be broken depending on position. best to avoid.
                    <hr />
                  </p>
                </Collapse>
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
                <span data-tooltip='Lighthouse Labs'>bootcamp</span>.
              </p>
              <p>I loved seeing what was new, and now here we are!</p>
              <p>
                Other interests include:
                <span data-tooltip='my dog'>
                  <big>🐕</big>
                </span>{' '}
                <span data-tooltip='travel'>
                  <big>✈️</big>
                </span>
                <span data-tooltip='scuba diving'>
                  <big>🤿</big>
                </span>{' '}
                <span data-tooltip='fitness'>
                  <big>💪</big>
                </span>{' '}
                <span data-tooltip='photography'>
                  <big>📸</big>
                </span>
              </p>
            </div>
            <div className='about__text' ref={rightColumnRef}>
              <Aboutimage />
            </div>
          </div>
          <br />
          <br />
          &nbsp;
        </div>
      </section>
    </>
  );
}

export default About;
