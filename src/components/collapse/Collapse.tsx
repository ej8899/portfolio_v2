/* eslint-disable prettier/prettier */
/* eslint react/prop-types: 0 */
import { useState } from 'react';
import './Collapse.scss';

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
        ></button>
      </div>
      {!isCollapsed && <div className='collapsible-content'>{children}</div>}
    </div>
  );
}

export default Collapse;
