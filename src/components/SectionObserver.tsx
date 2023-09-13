/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */

import { useRef, useEffect, useState } from 'react';

const SectionObserver = ({ sectionName, onEnter, onLeave, children }) => {
  const sectionRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const isElementInViewport = () => {
    const rect = sectionRef.current.getBoundingClientRect();
    return rect.top <= 50 && rect.bottom >= 0;
  };

  // below we use timeouts as we have fringe cases when sections are both at our trigger point.
  // the timeout loosely solves this issue.
  useEffect(() => {
    const handleScroll = () => {
      if (isElementInViewport() && !isInViewport) {
        // The section entered the viewport
        clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
          onEnter(sectionName);
          setIsInViewport(true);
        }, 200); // Adjust the delay as needed
        setTimeoutId(newTimeoutId);
      } else if (!isElementInViewport() && isInViewport) {
        // The section left the viewport
        clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
          onLeave(sectionName);
          setIsInViewport(false);
        }, 200); // Adjust the delay as needed
        setTimeoutId(newTimeoutId);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check when the component mounts
    handleScroll();

    return () => {
      // Cleanup: Remove the scroll event listener when unmounting
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onEnter, onLeave, sectionName, isInViewport, timeoutId]);

  return <div ref={sectionRef}>{children}</div>;
};

export default SectionObserver;
