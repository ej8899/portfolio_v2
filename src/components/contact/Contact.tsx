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
      <div className='custom-shape-divider-top-1693860419'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 420 110'
          preserveAspectRatio='none'
        >
          <path
            d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
            opacity='.25'
            className='shape-fill'
          ></path>
          <path
            d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
            opacity='.5'
            className='shape-fill'
          ></path>
          <path
            d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
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
                  <p className='thanksmessage'>
                    Thank you for reaching out...
                    <br />I will respond to your message asap!
                  </p>
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
    </section>
  );
}

export default Contact;
