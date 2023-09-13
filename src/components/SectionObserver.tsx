/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */

import { useRef, useEffect, useState } from 'react';

const SectionObserver = ({ sectionName, onEnter, onLeave, children }) => {
  const sectionRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);

  const isElementInViewport = () => {
    const rect = sectionRef.current.getBoundingClientRect();
    return rect.top <= 50 && rect.bottom >= 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isElementInViewport() && !isInViewport) {
        // The section entered the viewport
        onEnter(sectionName);
        setIsInViewport(true);
      } else if (!isElementInViewport() && isInViewport) {
        // The section left the viewport
        onLeave(sectionName);
        setIsInViewport(false);
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
  }, [onEnter, onLeave, sectionName, isInViewport]);

  return <div ref={sectionRef}>{children}</div>;
};

export default SectionObserver;
