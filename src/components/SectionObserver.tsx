/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';

const SectionObserver = ({ sectionName, onEnter, onLeave, children }) => {
  const sectionRef = useRef(null);
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);

  useEffect(() => {
    const callback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section enters the viewport
          onEnter(sectionName);
        } else {
          // Section leaves the viewport
          onLeave(sectionName);
        }
      });
    };

    // const handleScroll = () => {
    //   const currentScrollY = window.scrollY;
    //   const scrollingDown = currentScrollY > prevScrollY;

    //   // Determine rootMargin based on scrolling direction
    //   const rootMargin = scrollingDown ? '-50px 0px 0px 0px' : '0px 0px 0px 0px';
    //   // console.log('scrolling down:', scrollingDown);
    //   // Apply the IntersectionObserver with the updated rootMargin
    //   const observer = new IntersectionObserver(callback, { rootMargin });

    //   if (sectionRef.current) {
    //     observer.observe(sectionRef.current);
    //   }

    //   // Update the previous scroll position
    //   setPrevScrollY(currentScrollY);
    // };
    // window.addEventListener('scroll', handleScroll);

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
      // window.removeEventListener('scroll', handleScroll);
      // Cleanup: Disconnect the observer when unmounting
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [prevScrollY, onEnter, onLeave]);

  return <div ref={sectionRef}>{children}</div>;
};

export default SectionObserver;
