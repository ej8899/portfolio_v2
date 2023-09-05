/* eslint-disable prettier/prettier */
/* eslint react/prop-types: 0 */
import { useState } from 'react';
import './Collapse.scss';

// up and down arrow fonts:
// Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. 

function Collapse({ title, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='collapsible-section'>
      <div className='collapsible-header'>
        <h3>{title}</h3>
        <button
          className={`collapse-button ${isCollapsed ? 'down' : 'up'}`}
          onClick={toggleCollapse}
          aria-label={`Toggle ${isCollapsed ? 'Expand' : 'Collapse'}`}
        >
        {isCollapsed ? 
          <svg className='collapsearrows'>
            <use xlinkHref='#downarrow' />
          </svg> 
          :
          <svg className='collapsearrows'>
            <use xlinkHref='#uparrow' />
          </svg>
        }
        </button>
      </div>
      {!isCollapsed && <div className='collapsible-content '>{children}</div>}

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
          </defs>
      </svg>
    </div>
  );
}

export default Collapse;
