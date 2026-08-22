import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Magnet from './react-bits/Magnet';
import ShinyText from './react-bits/ShinyText';

export default function Navbar({ activePage = 'home', onPageChange, onOpenAuth, isLoggedIn, currentUser, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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

  const handleNavClick = (page, sectionId) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (onPageChange) {
      onPageChange(page);
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
        {/* Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-display text-lg sm:text-xl font-bold text-primary tracking-tight hover:opacity-90 transition-opacity cursor-pointer"
        >
          GlobeTrotter
        </button>

        {/* Desktop Nav - Explore, My Trips, Blogs, Reviews */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => handleNavClick('home', 'destinations')}
            className={`transition-colors cursor-pointer ${
              activePage === 'home'
                ? 'text-primary border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => handleNavClick('my-trips')}
            className={`transition-colors cursor-pointer ${
              activePage === 'my-trips'
                ? 'text-primary border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            My Trips
          </button>

          <button
            onClick={() => handleNavClick('home', 'stories')}
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Blogs
          </button>

          <button
            onClick={() => handleNavClick('home', 'testimonials')}
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Reviews
          </button>
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm relative">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={currentUser?.name || 'User Account'}
                className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm shadow-sm hover:bg-primary transition-colors cursor-pointer border border-primary-container/20"
              >
                {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-surface-container-highest py-1 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2 border-b border-surface-container-highest">
                    <p className="font-bold text-xs text-on-surface truncate">{currentUser?.name || 'User'}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{currentUser?.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('my-trips')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-primary">flight_takeoff</span>
                    My Trips
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout?.();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Toggle */}
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
          <button
            onClick={() => handleNavClick('home', 'destinations')}
            className="block text-left w-full py-1 text-primary"
          >
            Explore
          </button>
          <button
            onClick={() => handleNavClick('my-trips')}
            className="block text-left w-full py-1 text-on-surface-variant hover:text-primary"
          >
            My Trips
          </button>
          <button
            onClick={() => handleNavClick('home', 'stories')}
            className="block text-left w-full py-1 text-on-surface-variant hover:text-primary"
          >
            Blogs
          </button>
          <button
            onClick={() => handleNavClick('home', 'testimonials')}
            className="block text-left w-full py-1 text-on-surface-variant hover:text-primary"
          >
            Reviews
          </button>

          <div className="pt-2 flex gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout?.();
                }}
                className="w-full text-red-600 font-semibold py-1.5 rounded-full border border-red-200 text-xs"
              >
                Log Out ({currentUser?.name || 'User'})
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
