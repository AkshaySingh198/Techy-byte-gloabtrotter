import { useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Magnet({
  children,
  magnetStrength = 20,
  active = true,
  className = '',
}) {
  const magnetRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!active || !magnetRef.current) return;
    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) / (width / 2);
    const deltaY = (e.clientY - centerY) / (height / 2);

    gsap.to(magnetRef.current, {
      x: deltaX * magnetStrength,
      y: deltaY * magnetStrength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!active || !magnetRef.current) return;
    gsap.to(magnetRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
