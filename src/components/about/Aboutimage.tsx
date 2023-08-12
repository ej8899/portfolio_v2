import './About.scss';

function Aboutimage() {
  return (
    <div
      className='section hero-started slide scrolla-element-anim-1 scroll-animate lui-section lui-section-hero lui-gradient-top lui-started'
      data-animate='active'
    >
      {/* TODO setup for @media resizing */}
      {/* TODO setup for animation on scroll to view and parallax */}
      <img
        decoding='async'
        className='greyscale aboutimage'
        src='src/assets/images/profile2.png'
        alt='<b>Ernie</b> Johnson'
      />
      <span className='circle circle-1' />
      <span
        className='circle img-1'
        style={{
          backgroundImage: 'url(src/assets/images/pat-1.png)',
        }}
      />
      <span
        className='circle img-2'
        style={{
          backgroundImage: 'url(src/assets/images/pat-2.png)',
        }}
      />
      <span
        className='circle img-3'
        style={{
          backgroundImage: 'url(src/assets/images/pat-2.png)',
        }}
      />
      <div className='info-list'>
        <ul>
          <li>
            <span className='num'>
              2 <strong>+</strong>
            </span>
            <span className='value'>
              Years of <strong>Experience</strong>
            </span>
          </li>
          <li>
            <span className='num'>53</span>
            <span className='value'>
              Completed <strong>Projects</strong>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Aboutimage;
