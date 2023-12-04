/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import './Feedback.scss';

const FeedbackForm = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(3);
  const [feedbackText, setFeedbackText] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSendPending, setIsSendPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRatingClick = (rating: number) => {
    if (!rating) rating = 3;
    setSelectedRating(rating);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setTimeout(() => {
      setIsError(false);
      setIsSent(false);
      setIsSendPending(false);
    }, 300);
  };
  const handleOpen = () => {
    setIsFormOpen(true);
    setIsSendPending(false);
    setIsError(false);
    setIsSent(false);
  };

  const handleSubmit = async () => {
    //     e.preventDefault();
    setIsSendPending(true);
    // console.log('Selected Rating:', selectedRating);
    // console.log('Feedback Text:', feedbackText);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '7160e73c-4a32-4952-ab02-e07ea131ed58',
          from_name: 'erniejohnson.ca',
          subject: 'erniejohnson.ca - feedback form response',
          feedbackText,
          selectedRating,
          botcheck: '',
        }),
      });
      const json = (await response.json()) as { success: boolean };

      setIsSendPending(false);

      if (!json.success) throw new Error('Something went wrong.');

      setIsSent(true);
    } catch (err) {
      setIsSendPending(false);
      setIsError(true);
      console.error('error sending');
    }
  };

  return (
    <div className='feedback-wrapper'>
      <div className={'feedback-tab'} onClick={handleOpen}>
        <i className='fa-regular fa-face-smile-wink'></i>&nbsp;Feedback
      </div>

      <div className={`feedback-form ${isFormOpen ? 'feedback-open' : 'feedback-closed'}`}>
        <i className='close-icon' onClick={handleClose}>
          <i className='fa-solid fa-circle-xmark'></i>
        </i>
        {!isSendPending && !isSent && !isError && (
          <>
            <div className='rating-icons'>
              <i
                className={`rating-icon ${selectedRating === 1 ? 'active' : ''}`}
                onClick={() => handleRatingClick(1)}
              >
                <i className='fa-regular fa-face-angry fa-rating'></i>
              </i>
              <i
                className={`rating-icon ${selectedRating === 2 ? 'active' : ''}`}
                onClick={() => handleRatingClick(2)}
              >
                <i className='fa-regular fa-face-frown fa-rating'></i>
              </i>
              <i
                className={`rating-icon ${selectedRating === 3 ? 'active' : ''}`}
                onClick={() => handleRatingClick(3)}
              >
                <i className='fa-regular fa-face-meh fa-rating'></i>
              </i>
              <i
                className={`rating-icon ${selectedRating === 4 ? 'active' : ''}`}
                onClick={() => handleRatingClick(4)}
              >
                <i className='fa-regular fa-face-smile fa-rating'></i>
              </i>
              <i
                className={`rating-icon ${selectedRating === 5 ? 'active' : ''}`}
                onClick={() => handleRatingClick(5)}
              >
                <i className='fa-regular fa-face-grin-hearts fa-rating'></i>
              </i>
            </div>

            <textarea
              placeholder='Tell us about your experience...'
              value={feedbackText}
              className='feedback-textarea'
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={5}
            />

            <button className='feedback-button' onClick={() => void handleSubmit()}>
              Send
            </button>
          </>
        )}

        {isSendPending && (
          <div className='centered_container'>
            <div className='centered_item'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='send-status pending'
                viewBox='0 0 24 24'
              >
                <path
                  fill='var(--clr-neutral-500)'
                  d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z'
                  opacity='.5'
                />
                <path
                  fill='currentColor'
                  d='M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z'
                  opacity='.75'
                >
                  <animateTransform
                    attributeName='transform'
                    dur='2s'
                    from='0 12 12'
                    repeatCount='indefinite'
                    to='360 12 12'
                    type='rotate'
                  />
                </path>
              </svg>
            </div>
          </div>
        )}
        {/* green checkmark icon */}
        {isSent && (
          <>
            <div className='centered_container'>
              <div className='centered_item'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='send-status sent'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='var(--clr-success)'
                    d='m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
                  />
                </svg>
                <p className='thanksmessage'>Thanks for the feedback!</p>
              </div>
            </div>
          </>
        )}
        {/* error during send */}
        {isError && (
          <>
            <div className='centered_container'>
              <div className='centered_item'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='send-status error'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='var(--clr-error)'
                    d='M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
                  />
                </svg>
                <p>
                  Something went wrong. <br />
                  <br />
                  Email me directly at{' '}
                  <a href='mailto:ernie@erniejohnson.ca'>
                    <b>ernie@erniejohnson.ca</b>
                  </a>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
