/* eslint react/prop-types: 0 */
import React from '../../assets/components/React';
import { useEffect, useRef, useState, ReactNode } from 'react';
import './Collapse.scss';
import useElementOnScreen from '../../hooks/useElementOnScreen';

type CollapsePropTypes = {
  title?: string;
  children?: ReactNode;
};

function Collapse({ title, children }: CollapsePropTypes) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useElementOnScreen(collapseRef);

  useEffect(() => {
    if (!isOnScreen) {
      setIsCollapsed(true);
    }
  }, [isOnScreen]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='collapsible-section' ref={collapseRef}>
      <div className='collapsible-header'>
        <button
          className={`collapse-button ${isCollapsed ? 'down' : 'up'}`}
          onClick={toggleCollapse}
          aria-label={`Toggle ${isCollapsed ? 'Expand' : 'Collapse'}`}
        >
          <div className='button-container'>
            <span className='leftjustify'>
              {title === null || title === undefined ? (isCollapsed ? 'More' : 'Less') : title}
            </span>
            <span className='ldots'>&nbsp;</span>&nbsp;
            <span className='collapse-arrows-wrapper'>
              <svg className='collapse-arrows rightjustify'>
                <use xlinkHref={isCollapsed ? '#downcaret' : '#upcaret'} />
              </svg>
            </span>
          </div>
        </button>
      </div>
      <div
        className={`collapsible-wrapper extraprojects-wrapper ${isCollapsed ? 'closed' : 'open'}`}
      >
        {children}
      </div>
      <svg
        style={{
          display: 'none',
        }}
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <symbol id='uparrow' viewBox='0 0 448 512'>
            <path d='M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z' />
          </symbol>
          <symbol id='rightarrow' viewBox='0 0 320 512'>
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s-32.8-12.5 45.3 0l192 192z' />
          </symbol>
          <symbol id='downcaret' viewBox='0 0 320 512'>
            <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
          </symbol>
          <symbol id='upcaret' viewBox='0 0 320 512'>
            <path d='M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z' />
          </symbol>
        </defs>
      </svg>
    </div>
  );
}

export default Collapse;
