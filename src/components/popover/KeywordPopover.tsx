/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable  react/prop-types */
import { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './KeywordPopover.scss'; // Add your custom CSS styles

const KeywordPopover = ({ keyword, content, header }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const keywordRef = useRef(null);

  const handleMouseEnter = () => {
    const keywordElement = keywordRef.current;
    const keywordRect = keywordElement.getBoundingClientRect();
    const keywordTop = keywordRect.top + window.scrollY;
    const keywordLeft = keywordRect.left + window.scrollX;

    // Calculate the position relative to the keyword
    let top = keywordTop + keywordRect.height + 10; // Add a buffer
    let left = keywordLeft;
    console.log(top, left);
    top = 20;
    left = 20;
    setPosition({ top, left });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    keywordRef.current.addEventListener('mouseenter', handleMouseEnter);
    keywordRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      keywordRef.current.removeEventListener('mouseenter', handleMouseEnter);
      keywordRef.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <span ref={keywordRef} className='keyword-popover-keyword'>
      {keyword}
      {isVisible && (
        <div
          className='keyword-popover'
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
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
