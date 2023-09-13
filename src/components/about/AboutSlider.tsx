// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import './About.scss';
import './Swiper.scss';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
// import { useEffect, useRef } from 'react';
import { servicesSliderProps } from '../../sliderProps';

// import Swiper core and required modules

// import function to register Swiper custom elements
// https://swiperjs.com/element#usage-with-react
import { register } from 'swiper/element/bundle';
register();
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';

// TODO - swiper - how to use breakpoints in this style of usage?
// TODO - swiper pagination isn't clickable for some reason.
// TODO - check styles - might need webkit mask for firefox

function AboutSlider() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const swiperElRef = useRef(null);

  return (
    <section className='faqs' aria-labelledby='my skills and tools'>
      <div className='column centered_grid'>
        <h2 id='faqs' className='faqs__title'>
          Skills & Traits
        </h2>
      </div>
      <Swiper
        modules={[Pagination, Navigation, EffectFade, Autoplay]}
        {...servicesSliderProps}
        pagination={true}
        className='column centered_grid aboutslidercontainer scrolla-element-anim-1 scroll-animate'
      >
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Web Development </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> Web Design </span>
            </h5>
            <div className='lui-text'>
              <div>
                {' '}
                Web designers craft the overall vision &amp; plan for a website layout. Professional
                logo development: Business, Company, or Personal.
              </div>
            </div>
            &nbsp;
            {/* <a href='#pricing-section' className='lnk'>
                
            See Pricing
            </a>*/}
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-laptop-code fa-slider'></i>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Backend Web Development </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> API & SQL Server Design </span>
            </h5>
            <div className='lui-text'>
              <div>
                <p>
                  Any website beyond a basic static site needs secure backend code to deliver
                  content to the front end client. I have experience with effective database design
                  in MySQL and PostreSQL combined with creating RESTful (& secure) APIs.
                </p>
              </div>
            </div>
            &nbsp;
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-database fa-slider'></i>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Hardware </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> Hardware & Servicing </span>
            </h5>
            <div className='lui-text'>
              <div>
                <p>
                  I love working on hardware - from building custom PCs to building custom servers -
                  and yes, even wiring!
                </p>
              </div>
            </div>
            &nbsp;
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-microchip fa-slider'></i>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Code Versioning </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> Git Version Control </span>
            </h5>
            <div className='lui-text'>
              <div>
                <p>
                  I recall the days of having to constantly save files with different version
                  numbers attached, and then doing manual code merges with different team members.
                  Today, I just use Git.
                </p>
              </div>
            </div>
            &nbsp;
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-code-branch fa-slider'></i>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Soft Skills </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> Team Communicator </span>
            </h5>
            <div className='lui-text'>
              <div>
                <p>
                  I work equally well either on my own or as part of a team and enjoy the
                  communications of team environments.
                </p>
              </div>
            </div>
            &nbsp;
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-comments fa-slider'></i>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Project Skills </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> Project Management </span>
            </h5>
            <div className='lui-text'>
              <div>
                <p>
                  I enjoy setting up project flow, task delegation and overall project management
                  through the most effective means available to the team.
                </p>
              </div>
            </div>
            &nbsp;
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-list-check fa-slider'></i>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Cybersecurity </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> Secure Code Crafting </span>
            </h5>
            <div className='lui-text'>
              <div>
                <p>
                  It is important in all aspects of web and app development that your code is
                  secure. I prefer to have a &apos;security-first&apos; mentality when I build an
                  application, rather than chasing down security leaks later on.
                </p>
              </div>
            </div>
            &nbsp;
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-shield-halved fa-slider'></i>
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> ai engineering </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> AI Prompting </span>
            </h5>
            <div className='lui-text'>
              <div>
                <p>
                  AI is here and is a powerful tool to use is web development and much more.fdsfl.
                  secure. I prefer to have a &apos;security-first&apos; mentality when I build an
                  application, rather than chasing down security leaks later on.
                </p>
              </div>
            </div>
            &nbsp;
            <div
              className='image'
              style={{
                backgroundImage: 'url(src/assets/images/pat-2.png)',
              }}
            />
            <i className='fa-solid fa-brain fa-slider'></i>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default AboutSlider;
