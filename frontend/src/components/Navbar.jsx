import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Magnet from './react-bits/Magnet';
import ShinyText from './react-bits/ShinyText';

export default function Navbar({ onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-surface/75 backdrop-blur-sm shadow-[0px_2px_10px_rgba(0,0,0,0.04)] py-2.5'
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 max-w-6xl mx-auto h-10">
        {/* Brand - Sleek & Small */}
        <a
          href="#"
          className="font-display text-lg sm:text-xl font-bold text-primary tracking-tight hover:opacity-90 transition-opacity"
        >
          GlobeTrotter
        </a>

        {/* Desktop Nav - Small font, only Explore, Blogs, Reviews */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold">
          <a
            href="#destinations"
            className="text-primary border-b-2 border-primary pb-0.5 hover:opacity-80 transition-opacity"
          >
            Explore
          </a>
          <a
            href="#stories"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Blogs
          </a>
          <a
            href="#testimonials"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Reviews
          </a>
        </nav>

        {/* Actions - Small, compact buttons */}
        <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm">
          <Magnet magnetStrength={6}>
            <button
              onClick={() => onOpenAuth?.('login')}
              className="text-primary font-semibold hover:bg-surface-container px-3 py-1.5 rounded-full transition-colors active:scale-95 cursor-pointer text-xs"
            >
              Log In
            </button>
          </Magnet>

          <Magnet magnetStrength={8}>
            <button
              onClick={() => onOpenAuth?.('signup')}
              className="bg-primary-container text-white px-4 py-1.5 rounded-full font-semibold hover:bg-primary hover:shadow transition-all duration-150 active:scale-95 cursor-pointer text-xs shadow-sm"
            >
              <ShinyText text="Sign Up" speed={2.5} />
            </button>
          </Magnet>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden text-on-surface p-1 rounded-md hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-container-highest px-6 py-3 space-y-2 text-sm font-semibold">
          <a
            href="#destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-primary py-1"
          >
            Explore
          </a>
          <a
            href="#stories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-on-surface-variant hover:text-primary py-1"
          >
            Blogs
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-on-surface-variant hover:text-primary py-1"
          >
            Reviews
          </a>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.('login');
              }}
              className="flex-1 text-primary font-semibold py-1.5 rounded-full border border-primary/30 text-xs"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.('signup');
              }}
              className="flex-1 bg-primary-container text-white font-semibold py-1.5 rounded-full text-xs"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
