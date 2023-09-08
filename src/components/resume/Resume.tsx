/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState } from 'react';
import './Resume.scss'; // You can name your CSS file accordingly

function Resume() {
  const sectionRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);
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
      if (clampedPercentage > 75) {
        clampedPercentage = 75;
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
          <path d='M1200 120L0 16.48 0 0 1200 0 1200 120z' className='contact-divider-fill'></path>
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

              <div className='timeline-content js--fadeInLeft'>
                <h2>Fluor Canada</h2>
                <div className='date'>2023</div>
                <p>
                  Create Sharepoint site for mega-project specific jobs, integrate sharepoint
                  dashboard, and integrate custom mapping application for shortcuts to sharepoint
                  data to facilitate team sharing of required data, photos, and tasks.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-code'></i>
              </div>

              <div className='timeline-content timeline-card js--fadeInRight'>
                <div className='timeline-img-header'>
                  <h2>LighthouseLabs.ca</h2>
                </div>
                <div className='date'>FEB 2023</div>
                <p>
                  Graduate from LighthouseLabs.ca web developer bootcamp program (30 week program).
                  <br />
                  Study the basics of what is new in web development technologies like HTML, CSS,
                  jQuery, React, Ruby, Ruby on Rails and more.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'>
                <i className='fa-solid fa-code'></i>
              </div>

              <div className='timeline-content timeline-card js--fadeInRight'>
                <div className='timeline-img-header'>
                  <h2>Marigold Infrastructure</h2>
                </div>
                <div className='date'>2022</div>
                <p>mapping, powerapps, beta test 3d modelling</p>
                <button className='bnt-more'>More</button>
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
