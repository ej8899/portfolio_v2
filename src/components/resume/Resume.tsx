/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from '../../assets/components/React';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import './Resume.scss'; // You can name your CSS file accordingly

// import imageCAF from '../../assets/images/qrcode-contact2.png';
// import imageKGL from '../../assets/images/qrcode-contact2.png';
// import imageMarigold from '../../assets/images/qrcode-contact2.png';
// import imageLHL from '../../assets/images/qrcode-contact2.png';
// import imageFluor from '../../assets/images/qrcode-contact2.png';
// import imageCyberSec from '../../assets/images/qrcode-contact2.png';

function useAnimateOnScreen(
  itemOnScreen: boolean,
  timelineRef: React.RefObject<HTMLElement>,
  animationClass: string,
) {
  useEffect(() => {
    if (!itemOnScreen) {
      timelineRef.current?.classList.remove(animationClass);
      return;
    }
    timelineRef.current?.classList.add(animationClass);
  }, [itemOnScreen]);
}

function Resume(props: { reference: LegacyRef<HTMLElement> | undefined }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
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

  const timelineItem5 = useRef<HTMLDivElement>(null);
  const item5OnScreen = useElementOnScreen(timelineItem5, '-30%');

  const timelineItem6 = useRef<HTMLDivElement>(null);
  const item6OnScreen = useElementOnScreen(timelineItem6, '-30%');

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    // console.log('resume:useeffect');
    const handleScroll = () => {
      // console.log('resume:in scroller');
      if (!sectionRef.current) return;

      const windowMiddle = window.innerHeight / 2;
      const section = sectionRef.current;
      const sectionHeight = section.clientHeight;
      const scrollY = window.scrollY - section.offsetTop + windowMiddle;
      const percentage = (scrollY / sectionHeight) * 100;
      // console.log('resume:scrolly:', scrollY);
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
      // console.log(scrollPercentage);
    }
  }, [scrollPercentage]);

  // Custom hook for animating items on screen
  useAnimateOnScreen(item1OnScreen, timelineItem1, 'fadeIn');
  useAnimateOnScreen(item2OnScreen, timelineItem2, 'fadeIn');
  useAnimateOnScreen(item3OnScreen, timelineItem3, 'fadeIn');
  useAnimateOnScreen(item4OnScreen, timelineItem4, 'fadeIn');
  useAnimateOnScreen(item5OnScreen, timelineItem5, 'fadeIn');
  useAnimateOnScreen(item6OnScreen, timelineItem6, 'fadeIn');

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
          <h2 id='resume__title'>Résumé</h2>
          <div className='subtitle-message'>
            Here are just a few recent and/or key moments from my résumé!
          </div>
          <div className='resumedownload-message subtitle-message'>
            <a href='https://flowcv.com/resume/0chloacpte' target='_new'>
              Click to view my resume online
            </a>
            <span className='resumedownload-divider'>&nbsp;||&nbsp;</span>
            <a
              href='http://www.erniejohnson.ca/public/resume - ernie johnson - web and app developer.pdf'
              download
            >
              Here to download a PDF.
            </a>
          </div>
        </div>

        <section className='timeline'>
          <div className='overlay-grower' style={progressBarStyle}></div>
          <div className='overlay-fade-top'></div>
          <div className='timeline-container'>
            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-shield-halved'></i>
              </div>
              <div className='timeline-content timeline-card' ref={timelineItem6}>
                <div className='timeline-img-header img-gsecurity'>
                  <h3>
                    Google
                    <br />
                    Cybersecurity Professional
                  </h3>
                </div>
                <div className='date'>2023</div>
                <p>
                  Study essential topics such as network security, operating system security, cloud
                  security, and incident response. Demonstrate expertise in safeguarding digital
                  assets and combating cyber threats. &nbsp;
                </p>
              </div>
            </div>
            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-bridge'></i>
              </div>
              <div className='timeline-content timeline-card' ref={timelineItem1}>
                <div className='timeline-img-header img-fluor'>
                  <h3>Fluor Canada</h3>
                </div>
                <div className='date'>2023</div>
                <p>
                  Create Sharepoint site for mega-project specific jobs, integrate sharepoint
                  dashboard, integrate custom mapping application in order to visually organize (&
                  sort) data to facilitate team sharing of required data, photos, and tasks.
                  <br />
                  $5.7B project.
                  <br />
                  &nbsp;
                </p>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-code'></i>
              </div>
              <div className='timeline-content timeline-card' ref={timelineItem2}>
                <div className='timeline-img-header img-lhl'>
                  <h3>LighthouseLabs.ca</h3>
                </div>
                <div className='date'>JUL 2022 - FEB 2023</div>
                <p>
                  Graduate from LighthouseLabs.ca web developer bootcamp program (30 week program).
                  <br />
                  <br />
                  Study the basics of what is new in web development technologies like HTML, CSS,
                  jQuery, React, Ruby, Ruby on Rails and more.
                  <br />
                  <br />
                  Develop web applications in solo and team based environments.
                </p>
                {/* <button className='bnt-more'>More</button> */}
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-train'></i>
              </div>

              <div className='timeline-content timeline-card' ref={timelineItem3}>
                <div className='timeline-img-header img-marigold'>
                  <h3>Marigold Infrastructure</h3>
                </div>
                <div className='date'>2021 - 2022</div>
                <p>
                  Develop mapping system for tracking of shared documents and work packages
                  throughout project area. Work with developer team to establish MS Power Apps for
                  buried utility identification and inspections. Work with developer team to
                  implement and beta test vGIS systems for augmented reality buried utility
                  identification.
                  <br />
                  $2.7B project.
                </p>
                {/* <button className='bnt-more'>More</button> */}
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-road'></i>
              </div>

              <div className='timeline-content timeline-card' ref={timelineItem4}>
                <div className='timeline-img-header img-kgl'>
                  <h3>KGL Constructors</h3>
                </div>
                <div className='date'>2018 - 2021</div>
                <p>
                  Develop interactive mapping system for utility design, damage and conflict
                  tracking and monitoring. Develop utility safety programs, create interactive
                  training and safe excavation documents and materials in conjunction with site
                  safety team members. Monitor and assist work crews with safe excavation
                  proceedures.
                  <br />
                  $1.4B project.
                </p>
                {/* <button className='bnt-more'>More</button> */}
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-helicopter'></i>
              </div>

              <div className='timeline-content timeline-card' ref={timelineItem5}>
                <div className='timeline-img-header img-forces'>
                  <h3>Canadian Forces</h3>
                </div>
                <div className='date'>2001 - 2003</div>
                <p>
                  Attend various Canadian Forces schools for Avionics (Aircraft Electronics)
                  Technician training:
                  <li>Canadian Forces School of Aerospace & Technology,</li>
                  <li>Canadian Forces School of Communications & Electronics,</li>
                  <li>Performance Oriented Electronics Training</li>
                </p>
                {/* <button className='bnt-more'>More</button> */}
              </div>
            </div>
          </div>
          <div className='overlay-fade-bottom'></div>
        </section>
      </div>
    </section>
  );
}

export default Resume;
