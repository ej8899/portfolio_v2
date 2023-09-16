/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable  react/prop-types */
import { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './KeywordPopover.scss'; // Add your custom CSS styles

const KeywordPopover = ({ keyword, content, header }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const keywordRef = useRef(null);

  const handleMouseEnter = () => {
    if (keywordRef.current) {
      const keywordRect = keywordRef.current.getBoundingClientRect();

      // const popoverTop = keywordRect.bottom + window.scrollY + 5; // Adjust as needed
      // const popoverLeft = keywordRect.left + window.scrollX + keywordRect.width / 2; // Center horizontally
      const popoverTop = 20;
      const popoverLeft = 20;
      setPosition({ top: popoverTop, left: popoverLeft });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ top: 0, left: 0 });
  };

  return (
    <span
      ref={keywordRef}
      className='keyword-popover-keyword'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {keyword}
      {position.top !== 0 && (
        <div className='keyword-popover' style={{ top: position.top, left: position.left }}>
          {header && <div className='keyword-popover-header'>{header}</div>}
          <div className='keyword-popover-content'>{content}</div>
        </div>
      )}
    </span>
  );
};

// KeywordPopover.propTypes = {
//   keyword: PropTypes.string.isRequired,
//   content: PropTypes.node.isRequired,
//   header: PropTypes.string,
// };

export default KeywordPopover;
