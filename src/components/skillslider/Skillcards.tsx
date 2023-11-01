import React from '../../assets/components/React';
import './SkillCards.scss';
import { LegacyRef, useEffect, useRef } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import ChatGpt from '../../assets/components/ChatGpt';
import MongoDB from '../../assets/components/MongoDB';

const SkillCards = (props: { reference: LegacyRef<HTMLElement> | undefined }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isOnScreen = useElementOnScreen(titleRef);

  useEffect(() => {
    if (!isOnScreen) return;
    titleRef.current?.classList.add('animate-in');
  }, [isOnScreen]);

  return (
    <div className='centered_container column centered_grid'>
      <div className='column centered_grid studies_sticky'>
        <br />
        <h2 id='studies' className='studies__title'>
          Current Studies
        </h2>
        <div className='subtitle-message'>Continuous learning is one reason why I love coding!</div>
      </div>
      <div className='skill-details-container'>
        <div className='skill-details-column'>
          <ul id='skillcards'>
            <li className='skillcard' id='card_1'>
              <div className='skill-card__content skill-card'>
                <div className='skill-card-text w200'>
                  <svg className='devsvg skill-logo'>
                    <use xlinkHref='#mongodb' />
                  </svg>
                </div>
                <div className='skill-card-text'>
                  <h4>MongoDB</h4>
                  <p>
                    I&apos;ve been involved in SQL & Relational databases for many years, but at the
                    same time was always entertained by alternatives, however performance was always
                    lacking.
                    <br />
                    <br />
                    MongoDB seems to have largely solved the performance issues while still
                    delivering scalability, simplicity to developers.
                  </p>
                </div>
              </div>
            </li>

            <li className='skillcard' id='card_2'>
              <div className='skill-card__content skill-card'>
                <div className='skill-card-text w200'>
                  <svg className='devsvg skill-logo'>
                    <use xlinkHref='#aws' />
                  </svg>
                </div>
                <div className='skill-card-text'>
                  <h4>AWS</h4>
                  <p>
                    Learning Amazon Web Services is essential to design, deploy, and manage scalable
                    and reliable cloud solutions, which is a critical component in today&apos;s
                    world. Since AWS offers a wide array of cloud services, this makes it a highly
                    sought-after platform, making it a valuable skill for career growth in cloud
                    computing.
                  </p>
                </div>
              </div>
            </li>

            <li className='skillcard' id='card_3'>
              <div className='skill-card__content skill-card'>
                <div className='skill-card-text w200'>
                  <svg className='devsvg skill-logo'>
                    <use xlinkHref='#python' />
                  </svg>
                </div>
                <div className='skill-card-text'>
                  <h4>Advanced Python</h4>
                  <p>
                    I utilize Python for a few API end points in various applications, as well as
                    some home automation scripts. What I don&apos;t do is get fully immersed in my
                    development projects, so that&apos;s on the task list - I&apos;m currently
                    evaluating game development with PyGame.
                  </p>
                </div>
              </div>
            </li>

            <li className='skillcard' id='card_4'>
              <div className='skill-card__content skill-card'>
                <div className='skill-card-text w200'>
                  <svg className='devsvg skill-logo chatgpt-logo'>
                    <use xlinkHref='#chatgpt' />
                  </svg>
                </div>
                <div className='skill-card-text'>
                  <h4>AI Integration</h4>
                  <p>
                    Although I do utilize AI on a daily basis as a coding assistant and even as a
                    assistant, I have yet to incorporate AI into any applications on a significant
                    level. However I do have a few projects in the &apos;to do&apos; list as well as
                    a couple projects that I&apos;d like to add an AI componenent to them.
                    <br />
                    <br />
                    Updates on this will be soon enough!
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SkillCards;
