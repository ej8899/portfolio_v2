import React from '../../assets/components/React';
import './SkillCards.scss';
import { LegacyRef, useEffect, useRef } from 'react';
import useElementOnScreen from '../../hooks/useElementOnScreen';

/* good reference on sliders here:
https://ryanmulligan.dev/blog/css-marquee/
some of this was used below:
*/

const SkillCards = (props: { reference: LegacyRef<HTMLElement> | undefined }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isOnScreen = useElementOnScreen(titleRef);

  useEffect(() => {
    if (!isOnScreen) return;
    titleRef.current?.classList.add('animate-in');
  }, [isOnScreen]);

  return (
    <div className='centered_container column centered_grid'>
      <div className='skill-details-container'>
        <div className='skill-details-column'>
          <ul id='skillcards'>
            <li className='skillcard' id='card_1'>
              <div className='skill-card__content skill-card'>
                <h4>What is a Frontend Develoment?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique
                  aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.
                </p>
              </div>
            </li>

            <li className='skillcard' id='card_2'>
              <div className='skill-card__content skill-card'>
                <h4>What is a Frontend Develoment?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique
                  aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.
                </p>
              </div>
            </li>

            <li className='skillcard' id='card_3'>
              <div className='skill-card__content skill-card'>
                <h4>What is a Frontend Develoment?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam porro similique
                  aliquid debitis ipsam soluta dolorum ipsa! Voluptate, suscipit iure.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillCards;
