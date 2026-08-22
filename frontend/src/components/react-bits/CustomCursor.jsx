import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor({
  color = '#ff7f50',
  secondaryColor = '#006a6a',
}) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Check if device is touch-based
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      setIsVisible(true);
      const { clientX: x, clientY: y } = e;

      // Inner dot follows instantly
      gsap.to(dot, {
        x: x,
        y: y,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Outer ring follows with smooth lag
      gsap.to(ring, {
        x: x,
        y: y,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const onMouseDown = () => {
      setIsClicked(true);
      gsap.to(ring, { scale: 0.7, duration: 0.15 });
      gsap.to(dot, { scale: 1.5, duration: 0.15 });
    };

    const onMouseUp = () => {
      setIsClicked(false);
      gsap.to(ring, { scale: isHovered ? 1.8 : 1, duration: 0.25, ease: 'back.out(2)' });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Attach hover listeners to interactive elements
    const handleElementHover = (e) => {
      const target = e.target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      if (target) {
        setIsHovered(true);
        gsap.to(ring, {
          scale: 1.8,
          backgroundColor: 'rgba(255, 127, 80, 0.12)',
          borderColor: color,
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 0.5,
          opacity: 0.8,
          duration: 0.2,
        });
      } else {
        setIsHovered(false);
        gsap.to(ring, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: color,
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [color, isHovered]);

  return (
    <>
      {/* Outer Smooth Lag Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-primary-container pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 12px rgba(255, 127, 80, 0.25)',
        }}
      />

      {/* Inner Fast Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-container pointer-events-none z-[9999] transition-opacity duration-150 hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
