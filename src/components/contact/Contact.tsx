import { FormEvent, useEffect, useRef, useState } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import Button from '../button/Button';
import './Contact.scss';
import ContactText from './ContactText';

function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const staticInfoRef = useRef<HTMLFormElement>(null);
  const isOnScreen = useElementOnScreen(headerRef, '-100px');

  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(' ');
  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState(' ');
  const [message, setMessage] = useState('');
  const [messageValidation, setMessageValidation] = useState(' ');
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isSendPending, setIsSendPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isOnScreen) return;
    headerRef.current?.classList.add('animate-in');
    formRef.current?.classList.add('animate-in');
    staticInfoRef.current?.classList.add('animate__fadeInLeft');
  }, [isOnScreen]);

  const isValidEmail = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email) ? true : false;
  };

  const isValidName = () => {
    return name.trim().length >= 2 ? true : false;
  };

  const isValidMessage = () => {
    return message.trim().length >= 15 ? true : false;
  };

  // validate fields when a value changes
  useEffect(() => {
    if (!email || isValidEmail()) setEmailValidation('validated_input');
    else setEmailValidation('A valid e-mail address is required. Example: joe@gmail.com');

    if (!name || isValidName()) setNameValidation('validated_input');
    else setNameValidation('Names must be at least 2 characters long');

    if (!message || isValidMessage()) setMessageValidation('validated_input');
    else setMessageValidation('Messages must be at least 15 characters long');

    if (isValidEmail() && isValidMessage() && isValidName()) setIsFormValidated(true);
    else setIsFormValidated(false);
  }, [email, name, message]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValidated) {
      setMessageValidation('Please complete all sections of this form!');
      return;
    }
    setIsSendPending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '7160e73c-4a32-4952-ab02-e07ea131ed58',
          from_name: 'erniejohnson.ca',
          subject: 'erniejohnson.ca - contact form response',
          message,
          name,
          email,
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
    }
  };

  return (
    // book style section separator
    <section id='contact' className='contact' aria-labelledby='contact__title'>
      <div className='custom-shape-divider-top-1680975773' aria-hidden='true'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className='shape-fill'
          ></path>
        </svg>
      </div>
      {/* section content */}
      <div className='column centered_grid'>
        <div className='contact__header' ref={headerRef}>
          <h2 id='contact__title'>Contact Me</h2> <br />
          <p className='thanksmessage'>& let&apos;s work together!</p>
          {/* <p>Feedback is always appreciated!</p> */}
        </div>
      </div>
      <div className='column centered_grid contact__content'>
        <div ref={staticInfoRef} className='animate__animated'>
          <ContactText />
        </div>
        <div className='form__wrapper'>
          {!isSendPending && !isSent && !isError && (
            <form
              onSubmit={(e) => void handleFormSubmit(e)}
              noValidate
              aria-label='contact'
              ref={formRef}
            >
              {/* form data */}
              <div className='input-wrapper'>
                <label htmlFor='email'>email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  placeholder='email@domain.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    email && emailValidation !== 'validated_input' ? 'invalid' : 'valid'
                  }`}
                />
                <p
                  className={`validation-message ${
                    emailValidation === 'validated_input' ? 'invisible' : ''
                  }`}
                >
                  <b>{emailValidation}</b>
                </p>
              </div>

              <div className='input-wrapper'>
                <label htmlFor='name'>name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  required
                  placeholder='John Doe'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${
                    name && nameValidation !== 'validated_input' ? 'invalid' : 'valid'
                  }`}
                />
                <p
                  className={`validation-message ${
                    nameValidation === 'validated_input' ? 'invisible' : ''
                  }`}
                >
                  <b>{nameValidation}</b>
                </p>
              </div>

              <div className='input-wrapper'>
                <label htmlFor='message'>message</label>
                <textarea
                  name='Message'
                  id='message'
                  required
                  placeholder='Hi Ernie!'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${
                    message && messageValidation !== 'validated_input' ? 'invalid' : 'valid'
                  }`}
                ></textarea>
                <p
                  className={`validation-message ${
                    messageValidation === 'validated_input' ? 'invisible' : ''
                  }`}
                >
                  <b>{messageValidation}</b>
                </p>
              </div>
              <input type='checkbox' name='botcheck' className='hidden'></input>
              <Button type='outline'>Send Me A Message</Button>
            </form>
          )}

          {/* animated hourglass */}
          {isSendPending && (
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
          )}

          {/* green checkmark icon */}
          {isSent && (
            <>
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
              <p className='thanksmessage'>
                Thank you for reaching out...
                <br />I will respond to your message asap!
              </p>
            </>
          )}
        </div>
      </div>

      {/* error during send */}
      {isError && (
        <>
          <svg xmlns='http://www.w3.org/2000/svg' className='send-status error' viewBox='0 0 24 24'>
            <path
              fill='var(--clr-error)'
              d='M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
            />
          </svg>
          <p>
            Something went wrong. Email me directly at{' '}
            <a href='mailto:ernie@erniejohnson.ca'>ernie@erniejohnson.ca</a>
          </p>
        </>
      )}
    </section>
  );
}

export default Contact;
