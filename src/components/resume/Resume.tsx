/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import './Resume.scss'; // You can name your CSS file accordingly

function useAnimateOnScreen(itemOnScreen, timelineRef, animationClass: string) {
  useEffect(() => {
    if (!itemOnScreen) return;
    timelineRef.current?.classList.add(animationClass);
  }, [itemOnScreen]);
}

function Resume() {
  const sectionRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // timeline items for slide in
  const timelineItem1 = useRef<HTMLDivElement>(null);
  const item1OnScreen = useElementOnScreen(timelineItem1, '-30%');

  const timelineItem2 = useRef<HTMLDivElement>(null);
  const item2OnScreen = useElementOnScreen(timelineItem2, '-30%');

  const timelineItem3 = useRef<HTMLDivElement>(null);
  const item3OnScreen = useElementOnScreen(timelineItem3, '-30%');

  const timelineItem4 = useRef<HTMLDivElement>(null);
  const item4OnScreen = useElementOnScreen(timelineItem4, '-30%');

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const windowMiddle = window.innerHeight / 2;
      const section = sectionRef.current;
      const sectionHeight = section.clientHeight;
      const scrollY = window.scrollY - section.offsetTop + windowMiddle;
      const percentage = (scrollY / sectionHeight) * 100;
      // console.log('scrolly:', scrollY);
      // Ensure the percentage is between 0 and 100
      let clampedPercentage = Math.min(100, Math.max(0, percentage));
      if (clampedPercentage > 85) {
        clampedPercentage = 85;
      }
      setScrollPercentage(clampedPercentage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // sectionRef.current.style.width = `${scrollPercentage}%`;
      console.log(scrollPercentage);
    }
  }, [scrollPercentage]);

  // Custom hook for animating items on screen
  useAnimateOnScreen(item1OnScreen, timelineItem1, 'fadeIn');
  useAnimateOnScreen(item2OnScreen, timelineItem2, 'fadeIn');
  useAnimateOnScreen(item3OnScreen, timelineItem3, 'fadeIn');
  useAnimateOnScreen(item4OnScreen, timelineItem4, 'fadeIn');

  const progressBarStyle = {
    height: `${scrollPercentage}%`, // Set the progress bar height based on scroll percentage
  };

  return (
    <section id='resume' className='resume' aria-labelledby='contact__title' ref={sectionRef}>
      <div className='custom-shape-divider-top-1681930915'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='resume-divider-fill'></path>
        </svg>
      </div>

      {/* section content */}
      <div className='column centered_grid'>
        <div className='resume__header' ref={headerRef}>
          <h2 id='resume__title'>Resume</h2> <br />
          <p className='thanksmessage'>click here to download my full resume</p>
        </div>

        <section className='timeline'>
          <div className='overlay-grower' style={progressBarStyle}></div>
          <div className='overlay-fade-top'></div>
          <div className='timeline-container'>
            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-person-digging'></i>
              </div>
              <div className='timeline-content' ref={timelineItem1}>
                <h3>Fluor Canada</h3>
                <div className='date'>2023</div>
                <p>
                  Create Sharepoint site for mega-project specific jobs, integrate sharepoint
                  dashboard, integrate custom mapping application in order to visually organize (&
                  sort) data to facilitate team sharing of required data, photos, and tasks.
                </p>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-code'></i>
              </div>
              <div className='timeline-content timeline-card' ref={timelineItem2}>
                <div className='timeline-img-header'>
                  <h3>LighthouseLabs.ca</h3>
                </div>
                <div className='date'>JUL 2022 - FEB 2023</div>
                <p>
                  Graduate from LighthouseLabs.ca web developer bootcamp program (30 week program).
                  <br />
                  <br />
                  Study the basics of what is new in web development technologies like HTML, CSS,
                  jQuery, React, Ruby, Ruby on Rails and more.
                </p>
                <button>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-train'></i>
              </div>

              <div className='timeline-content timeline-card' ref={timelineItem3}>
                <div className='timeline-img-header'>
                  <h3>Marigold Infrastructure</h3>
                </div>
                <div className='date'>2021 - 2022</div>
                <p>mapping, powerapps, beta test 3d modelling</p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-road'></i>
              </div>

              <div className='timeline-content timeline-card' ref={timelineItem4}>
                <div className='timeline-img-header'>
                  <h3>KGL Constructors</h3>
                </div>
                <div className='date'>2021 - 2022</div>
                <p>mapping, powerapps, beta test 3d modelling</p>
                <button className='bnt-more'>More</button>
              </div>
            </div>
            {''}
          </div>
          <div className='overlay-fade-bottom'></div>
        </section>
      </div>
    </section>
  );
}

export default Resume;
