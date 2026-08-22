import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function BlurText({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll('.blur-item');
    const fromY = direction === 'top' ? -20 : 20;

    gsap.fromTo(
      spans,
      {
        opacity: 0,
        filter: 'blur(10px)',
        y: fromY,
        scale: 0.95,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: delay / 1000,
        ease: 'power3.out',
        onComplete: onAnimationComplete,
      }
    );
  }, [text, delay, direction, onAnimationComplete]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {elements.map((segment, i) => (
        <span
          key={i}
          className="blur-item inline-block will-change-transform will-change-[filter]"
        >
          {segment}
          {animateBy === 'words' && i < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
