import React, { useState, useEffect, useRef } from 'react';

const BlurOnScroll = ({ children }) => {
  const [blur, setBlur] = useState(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const maxBlur = 3; // Reduced maximum blur amount
    const blurThreshold = 200; // Pixels to reach maximum blur

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const scrollTop = window.scrollY;
      const blurAmount = Math.min(scrollTop / blurThreshold, maxBlur);
      setBlur(blurAmount);

      scrollTimeoutRef.current = setTimeout(() => {
        setBlur(0); // Reset blur to 0 when scrolling stops
      }, 50); // Adjust this delay as needed
    };

    const optimizedScrollHandler = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', optimizedScrollHandler);
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current); // Clear timeout on cleanup
      }
    };
  }, []);

  return (
    <div style={{ filter: `blur(${blur}px)`, transition: 'filter 0.2s ease' }}>
      {children}
    </div>
  );
};

export default BlurOnScroll;
