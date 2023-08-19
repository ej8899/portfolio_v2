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

function AboutSlider() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const swiperElRef = useRef(null);

  return (
    <div
      className='section hero-started slide scrolla-element-anim-1 scroll-animate lui-section lui-section-hero lui-gradient-top lui-started aboutslidercontainer'
      data-animate='active'
    >
      <h2>test for swiper slider</h2>
      <Swiper
        modules={[Pagination, Navigation, EffectFade, Autoplay]}
        {...servicesSliderProps}
        pagination={true}
        className='swiper-slide'
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
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <div className='services-item'>
            <div className='lui-subtitle'>
              <span> Hardware </span>
            </div>
            <div className='icon' />
            <h5 className='lui-title'>
              <span> Hardware Upgrades & Servicing </span>
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
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>4afdsfkdlsl</SwiperSlide>
        <SwiperSlide className='swiper-slide'>5asfdf afdsf</SwiperSlide>
        <SwiperSlide className='swiper-slide'>6sdfdsfdss</SwiperSlide>
      </Swiper>
    </div>
  );
}

export default AboutSlider;
