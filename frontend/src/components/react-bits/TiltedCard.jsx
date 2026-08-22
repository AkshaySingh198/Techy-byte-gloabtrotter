import { useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  glare = true,
  scale = 1.02,
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: scale,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power1.out',
    });

    if (glare && glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="inline-block w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative transform-gpu will-change-transform ${className}`}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 z-20"
          />
        )}
      </div>
    </div>
  );
}
