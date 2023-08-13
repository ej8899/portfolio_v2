// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import './About.scss';
import { useRef } from 'react';
import { servicesSliderProps } from '../../sliderProps';

// import Swiper core and required modules

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
register();

function AboutSlider() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const swiperElRef = useRef(null);

  return (
    <div
      className='section hero-started slide scrolla-element-anim-1 scroll-animate lui-section lui-section-hero lui-gradient-top lui-started'
      data-animate='active'
    >
      <h2>test for swiper slider</h2>
      <div className='container'>
        <swiper-container
          ref={swiperElRef}
          slides-per-view='3'
          speed='400'
          loop='true'
          pagination='true'
          navigation='true'
          scrollbar='true'
        >
          <swiper-slide className='swiper-slide'>
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
                  Web designers craft the overall vision &amp; plan for a website layout.
                  Professional logo development: Business, Company, or Personal.
                </div>
              </div>
              &nbsp;
              {/* <a href='#pricing-section' className='lnk'>
                
                See Pricing
            </a>*/}
              <div
                className='image'
                style={{
                  backgroundImage: 'url(assets/images/pat-2.png)',
                }}
              />
            </div>
          </swiper-slide>
          <swiper-slide className='swiper-slide'>
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
                    content to the front end client. I have experience with effective database
                    design in MySQL and PostreSQL combined with creating RESTful (& secure) APIs.
                  </p>
                </div>
              </div>
              &nbsp;
              <div
                className='image'
                style={{
                  backgroundImage: 'url(assets/images/pat-2.png)',
                }}
              />
            </div>
          </swiper-slide>
          <swiper-slide className='swiper-slide'>
            <div className='services-item'>
              <div className='lui-subtitle'>
                <span> Apps Development </span>
              </div>
              <div className='icon' />
              <h5 className='lui-title'>
                <span> iOS &amp; Android </span>
              </h5>
              <div className='lui-text'>
                <div>
                  <p>
                    Design Software applications to run on mobile devices. Modern and mobile-ready
                    application that will help you reach all of your marketing.
                    <br />
                    &nbsp;
                  </p>
                </div>
              </div>
              &nbsp;
              <div
                className='image'
                style={{
                  backgroundImage: 'url(assets/images/pat-2.png)',
                }}
              />
            </div>
          </swiper-slide>
          <swiper-slide className='swiper-slide'>
            <div className='services-item'>
              <div className='lui-subtitle'>
                <span> Cybersecurity Evaluation </span>
              </div>
              <div className='icon' />
              <h5 className='lui-title'>
                <span> Application Security </span>
              </h5>
              <div className='lui-text'>
                <div>
                  {' '}
                  I enjoy developing, adding and testing security features within applications to
                  prevent security vulnerabilities against threats such as unauthorized access,
                  modification and SQL injection attacks. <br />
                  <br />
                  &nbsp;
                </div>
              </div>
              &nbsp;
              <div
                className='image'
                style={{
                  backgroundImage: 'url(assets/images/pat-2.png)',
                }}
              />
            </div>
          </swiper-slide>
          <swiper-slide className='swiper-slide'>
            <div className='services-item'>
              <div className='lui-subtitle'>
                <span> Sharepoint </span>
              </div>
              <div className='icon' />
              <h5 className='lui-title'>
                <span> Sharepoint Design </span>
              </h5>
              <div className='lui-text'>
                <div>
                  {' '}
                  I also do Microsoft Sharepoint setup, configuration and layouts for busy
                  corporations. <br />
                  <br />
                  &nbsp;
                </div>
              </div>
              &nbsp;
              <div
                className='image'
                style={{
                  backgroundImage: 'url(assets/images/pat-2.png)',
                }}
              />
            </div>
          </swiper-slide>
          <swiper-slide className='swiper-slide'>
            <div className='services-item'>
              <div className='lui-subtitle'>
                <span> Advertising </span>
              </div>
              <div className='icon' />
              <h5 className='lui-title'>
                <span> Google Ads </span>
              </h5>
              <div className='lui-text'>
                <div>
                  {' '}
                  Advertising services include: Google search result pages, gmails, YouTube and
                  other websites participated in Google Ads program. <br />
                  <br />
                  &nbsp;
                </div>
              </div>
              &nbsp;
              <div
                className='image'
                style={{
                  backgroundImage: 'url(assets/images/pat-2.png)',
                }}
              />
            </div>
          </swiper-slide>
          <div className='swiper-pagination' />
        </swiper-container>
      </div>
    </div>
  );
}

export default AboutSlider;
