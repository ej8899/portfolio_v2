/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';

const SectionObserver = ({ sectionName, onEnter, onLeave, children }) => {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState(''); // Track the active section

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        let intersectionRatio = 0;
        if (entry.isIntersecting) {
          // Calculate the intersection ratio
          intersectionRatio = entry.intersectionRatio;

          // Check if this section has higher visibility than the current active section
          if (!activeSection || intersectionRatio > activeSection.intersectionRatio) {
            setActiveSection({ sectionName, intersectionRatio });
          }

          // Section enters the viewport
          onEnter(sectionName, intersectionRatio);
        } else {
          // Section leaves the viewport
          onLeave(sectionName, intersectionRatio);
        }
      });
    };

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '-50px 0px 0px 0px', // No margin
      threshold: 0, // threshold logic in callback
    };

    const observer = new IntersectionObserver(callback, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // Cleanup: Disconnect the observer when unmounting
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onEnter, onLeave]);

  return <div ref={sectionRef}>{children}</div>;
};

export default SectionObserver;
