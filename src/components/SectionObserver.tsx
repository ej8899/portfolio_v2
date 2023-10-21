import React from '../assets/components/React';
import { useRef, useEffect, useState } from 'react';

type SectionObserverProps = {
  sectionName: string; // Define the type for sectionName
  onEnter: (sectionName: string) => void; // Adjust the function signature
  onLeave: (sectionName: string) => void; // Adjust the function signature
  children: React.ReactNode;
};
const SectionObserver = ({ sectionName, onEnter, onLeave, children }: SectionObserverProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  const isElementInViewport = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      return rect.top <= 50 && rect.bottom >= 0;
    }
    return false;
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
