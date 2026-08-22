import { useRef, useEffect, useState } from 'react';

export default function InfiniteCarousel({
  children,
  autoScroll = true,
  intervalMs = 1000,
  scrollStep = 320,
  className = '',
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoScroll || isHovered) return;

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoScroll, isHovered, intervalMs, scrollStep]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={`relative group/carousel w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        type="button"
        aria-label="Previous destination"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-surface/90 hover:bg-primary hover:text-white text-on-surface w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 backdrop-blur-md border border-white/40 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">chevron_left</span>
      </button>
      <button
        onClick={scrollRight}
        type="button"
        aria-label="Next destination"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-surface/90 hover:bg-primary hover:text-white text-on-surface w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 backdrop-blur-md border border-white/40 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">chevron_right</span>
      </button>

      {/* Scrolling Content Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-5 pb-4 pt-1 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {children}
      </div>
    </div>
  );
}
