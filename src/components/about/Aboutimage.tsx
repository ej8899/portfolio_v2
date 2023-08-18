import './About.scss';

function Aboutimage() {
  return (
    <div
      className='section hero-started slide scrolla-element-anim-1 scroll-animate lui-section lui-section-hero lui-gradient-top lui-started parallax-section'
      data-animate='active'
    >
      {/* TODO setup for @media resizing */}
      {/* TODO setup for animation on scroll to view and parallax */}
      <div>
        <img
          decoding='async'
          className='greyscale aboutimage parallax-about-item-photo'
          src='src/assets/images/profile2.png'
          alt='<b>Ernie</b> Johnson'
        />
        <span className='circle circle-1' />
        <span
          className='circle img-1 parallax-item'
          data-scroll-ratio='0.1'
          id='item1'
          style={{
            backgroundImage: 'url(src/assets/images/pat-1.png)',
          }}
        />
        <span
          className='circle img-2 parallax-item'
          data-scroll-ratio='0.1'
          id='item2'
          style={{
            backgroundImage: 'url(src/assets/images/pat-2.png)',
          }}
        />
        <span
          className='circle img-3 parallax-about-item-bubbles'
          style={{
            backgroundImage: 'url(src/assets/images/pat-2.png)',
          }}
        />
        <div className='info-list'>
          <ul>
            <li className='rotate3l parallax-about-item-info'>
              <span className='num'>
                2 <strong>+</strong>
              </span>
              <span className='value'>
                Years of <strong>Experience</strong>
              </span>
            </li>
            <li className='rotate3r parallax-about-item-info2'>
              <span className='num'>53</span>
              <span className='value'>
                Completed <strong>Projects</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Aboutimage;
