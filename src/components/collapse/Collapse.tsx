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
            <span className='ldots'>&nbsp;</span>
            <span className='collapse-arrows-wrapper'>
              <svg className='collapse-arrows rightjustify'>
                <use xlinkHref={isCollapsed ? '#rightcircle' : '#uparrow'} />
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
          <symbol id='downarrow' viewBox='0 0 448 512'>
            <path d='M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0-45.3l160 160z' />
          </symbol>
          <symbol id='rightarrow' viewBox='0 0 320 512'>
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s-32.8-12.5 45.3 0l192 192z' />
          </symbol>
          <symbol id='rightcircle' viewBox='0 0 512 512'>
            <path d='M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s-24.6-9.4-33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z' />
          </symbol>
        </defs>
      </svg>
    </div>
  );
}

export default Collapse;
