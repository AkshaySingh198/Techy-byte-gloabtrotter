import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CountUp({
  to = 0,
  from = 0,
  duration = 5.0, // Very slow and smooth count
  separator = ',',
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(from);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const obj = { value: from };
      gsap.to(obj, {
        value: to,
        duration: duration,
        ease: 'power1.out',
        onUpdate: () => {
          const formatted = Math.floor(obj.value)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
          setDisplayValue(formatted);
        },
      });
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      startAnimation();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [to, from, duration, separator]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
