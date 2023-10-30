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
                    same time always entertained by alternatives, however performance was always
                    lacking. MongoDB seems to have largely solved the performance issues while still
                    delivering scalability, simplicity.
                    <br />
                    I&apos;m eager to expand my knowledge of MongoDB.
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique
                    aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique
                    aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.
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
                    Although I utilize AI on a daily basis as a coding assistant and even as a
                    assistant, I have yet to incorporate AI into any applications on a significant
                    <br />I have a few projects in the &apos;to do&apos; list as well as a couple of
                    projects that I&apos;d like to add an AI componenent to them. Updates will be
                    enough!
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
