/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState } from 'react';
import './Resume.scss'; // You can name your CSS file accordingly

function Resume() {
  const sectionRef = useRef(null);
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
      const clampedPercentage = Math.min(100, Math.max(0, percentage));
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
      {/* section content */}
      <div className='column centered_grid'>
        <section className='timeline'>
          <div className='overlay-fade-top'></div>
          <div className='timeline-container'>
            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInLeft'>
                <h2>Title</h2>
                <div className='date'>1 MAY 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor,
                  nostrum excepturi amet in dolores. Alias, ullam.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content timeline-card js--fadeInRight'>
                <div className='timeline-img-header'>
                  <h2>Card Title</h2>
                </div>
                <div className='date'>25 MAY 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor,
                  nostrum excepturi amet in dolores. Alias, ullam.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInLeft'>
                <div className='date'>3 JUN 2016</div>
                <h2>Quote</h2>
                <blockquote>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo debitis
                  omnis dolor iste fugit totam quasi inventore!
                </blockquote>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInRight'>
                <h2>Title</h2>
                <div className='date'>22 JUN 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae
                  nostrum excepturi amet in dolores. Alias, ullam.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content timeline-card js--fadeInLeft'>
                <div className='timeline-img-header'>
                  <h2>Card Title</h2>
                </div>
                <div className='date'>10 JULY 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor,
                  nostrum excepturi amet in dolores. Alias, ullam.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content timeline-card js--fadeInRight'>
                <div className='timeline-img-header'>
                  <h2>Card Title</h2>
                </div>
                <div className='date'>30 JULY 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor,
                  nostrum excepturi amet in dolores. Alias, ullam.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInLeft'>
                <div className='date'>5 AUG 2016</div>
                <h2>Quote</h2>
                <blockquote>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo debitis
                  omnis dolor iste fugit totam quasi inventore!
                </blockquote>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content timeline-card js--fadeInRight'>
                <div className='timeline-img-header'>
                  <h2>Card Title</h2>
                </div>
                <div className='date'>19 AUG 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor,
                  nostrum excepturi amet in dolores. Alias, ullam.
                </p>
                <button className='bnt-more'>More</button>
              </div>
            </div>

            <div className='timeline-item'>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInLeft'>
                <div className='date'>1 SEP 2016</div>
                <h2>Title</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor,
                  nostrum excepturi amet in dolores. Alias, ullam.
                </p>
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
