import React, { useState, useEffect } from 'react';

const BlurOnScroll = ({ children }) => {
  const [blur, setBlur] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      const scrollTop = window.scrollY;
      const maxBlur = 10; // Maximum blur amount
      const blurAmount = Math.min(scrollTop / 200, maxBlur); // Adjust the divisor to control blur sensitivity
      setBlur(blurAmount);

      // Clear the previous timeout
      clearTimeout(scrollTimeout);

      // Set a new timeout to reset the blur after scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setBlur(0); // Reset blur to 0 when scrolling stops
      }, 100); // Adjust this delay as needed
    };

    const debouncedHandleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      handleScroll();
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(scrollTimeout); // Clear timeout on cleanup
    };
  }, []);

  return (
    <div style={{ filter: `blur(${blur}px)`, transition: 'filter 0.2s ease' }}>
      {children}
    </div>
  );
};

export default BlurOnScroll;
