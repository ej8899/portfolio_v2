//
// contact form - left side for text items only
//

function ContactText() {
  return (
    <div className='numbers-items contact__text'>
      <div className='numbers-item'>
        <div className='icon'>
          <i aria-hidden='true' className='far fa-map' />
        </div>
        <div className='title'>
          <span> Address: </span>
        </div>
        <div className='lui-text'>
          <span>
            Windsor, Ontario / Calgary, Alberta
            <br />
            Available for remote: Canada & USA
          </span>
        </div>
      </div>
      <div className='numbers-item'>
        <div className='icon'>
          <i aria-hidden='true' className='far fa-user' />
        </div>
        <div className='title'>
          <span> Freelance: </span>
        </div>
        <div className='lui-text'>
          <span> Currently Available </span>
        </div>
      </div>
      <div className='numbers-item'>
        <div className='icon'>
          <i aria-hidden='true' className='far fa-envelope' />
        </div>
        <div className='title'>
          <span> Email: </span>
        </div>
        <div className='lui-text'>
          <span> ernie@erniejohnson.ca </span>
        </div>
      </div>
      <div className='numbers-item'>
        <div className='icon'>
          <i aria-hidden='true' className='far fa-address-book' />
        </div>
        <div className='title'>
          <span> Phone: </span>
        </div>
        <div className='lui-text'>
          <span> +1 705 - 331 - 8899 </span>
        </div>
      </div>
    </div>
  );
}

export default ContactText;
