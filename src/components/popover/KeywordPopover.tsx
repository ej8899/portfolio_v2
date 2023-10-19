/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable  react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Object is possibly 'null'.
import React from '../../assets/components/React';
import { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './KeywordPopover.scss'; // Add your custom CSS styles

type KeywordPopoverProps = {
  keyword: string;
  content: React.ReactNode;
  header?: string;
};

const KeywordPopover = ({ keyword, content, header }: KeywordPopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const keywordRef = useRef(null);

  const handleMouseEnter = () => {
    if (!keywordRef.current) {
      return;
    }
    const keywordElement = keywordRef.current as HTMLElement;
    const keywordRect = keywordElement.getBoundingClientRect();
    const keywordTop = keywordRect.top + window.scrollY;
    const keywordLeft = keywordRect.left + window.scrollX;

    // Calculate the position relative to the keyword
    let top = keywordTop + keywordRect.height + 10; // Add a buffer
    let left = keywordLeft;
    // console.log(top, left);
    top = 20;
    left = 20;
    setPosition({ top, left });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const keywordElement = keywordRef.current as unknown as HTMLElement;

    if (keywordElement) {
      keywordElement.addEventListener('mouseenter', handleMouseEnter);
      keywordElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        keywordElement.removeEventListener('mouseenter', handleMouseEnter);
        keywordElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
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
