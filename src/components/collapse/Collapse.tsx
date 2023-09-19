/* eslint-disable prettier/prettier */
/* eslint react/prop-types: 0 */
import { useEffect, useRef, useState } from 'react';
import './Collapse.scss';
import useElementOnScreen from '../../hooks/useElementOnScreen';

// up and down arrow fonts:
// Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. 

function Collapse({ title, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseRef = useRef(null);
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
        <div className="button-container">
            <span>{title === null || title === undefined ? (isCollapsed ? 'More' : 'Less') : title}</span>
            <svg className='collapse-arrows'>
              <use xlinkHref={isCollapsed ? '#rightarrow' : '#uparrow'} />
            </svg>
          </div>
        </button>
      </div>
      <div className={`collapsible-wrapper extraprojects-wrapper ${isCollapsed ? 'closed' : 'open'}`}>{children}</div>
      <svg
          style={{
            display: 'none',
          }}
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <symbol id='uparrow' viewBox='0 0 448 512'>
            <path d='M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z'/>
            </symbol>
            <symbol id='downarrow' viewBox='0 0 448 512'>
            <path d='M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z'/>
            </symbol>
            <symbol id='rightarrow' viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
            </symbol>
          </defs>
      </svg>
    </div>
  );
}

export default Collapse;
