import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import BlurText from './react-bits/BlurText';
import ShinyText from './react-bits/ShinyText';

export default function HeroSection({ onSearch }) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const searchBoxRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        searchBoxRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.45, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ from: fromLocation, to: toLocation });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-[#111827] pt-24 pb-16 overflow-hidden">
      {/* High-Quality Panoramic Amalfi Coast Hero Image */}
      <div
        className="absolute inset-0 w-full h-full transform scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/amalfi-coast-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Cinematic gradient overlay for visual pop and high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#111827]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight leading-tight">
          <BlurText
            text="Plan Your Perfect Trip in Minutes"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-white drop-shadow-md"
          />
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-8 drop-shadow font-medium leading-relaxed"
        >
          Discover destinations, compare travel options, and build your itinerary — all in one place.
        </p>

        {/* Clean Search Bar */}
        <div
          ref={searchBoxRef}
          className="w-full max-w-3xl bg-white/95 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl ambient-shadow-3 border border-white/30 shadow-2xl"
        >
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-2 items-center">
            {/* Where from? */}
            <div className="flex-1 w-full relative group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-lg">
                location_on
              </span>
              <input
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all text-sm font-medium bg-surface text-on-surface placeholder:text-on-surface-variant/70"
                placeholder="Where from?"
                type="text"
              />
            </div>

            <div className="hidden md:flex h-8 w-[1px] bg-surface-container-highest mx-1" />

            {/* Where to? */}
            <div className="flex-1 w-full relative group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-lg">
                flight_takeoff
              </span>
              <input
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all text-sm font-medium bg-surface text-on-surface placeholder:text-on-surface-variant/70"
                placeholder="Where to?"
                type="text"
              />
            </div>

            {/* Plan My Trip Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-primary-container text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 min-w-[150px] active:scale-95 cursor-pointer shadow-sm"
            >
              <ShinyText text="Plan My Trip" speed={3} />
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
