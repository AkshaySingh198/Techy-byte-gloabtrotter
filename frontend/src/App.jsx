import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsStrip from './components/StatsStrip';
import TrendingDestinations from './components/TrendingDestinations';
import StoriesSection from './components/StoriesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

import AuthModal from './components/AuthModal';
import DestinationModal from './components/DestinationModal';
import PlanTripModal from './components/PlanTripModal';
import SplashCursor from './components/react-bits/SplashCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeSearch, setActiveSearch] = useState(null);

  useEffect(() => {
    // Smooth GSAP scroll-triggered section fade & rise animations
    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0.88, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleSearchSubmit = (searchParams) => {
    setActiveSearch(searchParams);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-container selection:text-white relative">
      {/* Dynamic Background-Aware SplashCursor Effect */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.22}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={true}
        DYNAMIC_TRAVEL_MODE={true}
        DARK_BG_COLOR="#FF6B4A" // Sunset Coral over dark sections
        LIGHT_BG_COLOR="#0D9488" // Aegean Coastal Teal over light sections
        INTERACTIVE_COLOR="#F59E0B" // Sunlit Gold on buttons & cards
      />

      {/* Navbar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Search */}
        <HeroSection onSearch={handleSearchSubmit} />

        {/* 2. Stats Strip with Slow Smooth CountUp */}
        <StatsStrip />

        {/* 3. Trending Destinations with 3D Tilt & Auto-scroll */}
        <TrendingDestinations
          onSelectDestination={(dest) => setSelectedDestination(dest)}
        />

        {/* 4. Stories from Fellow Travelers */}
        <StoriesSection
          onWriteStory={() => handleOpenAuth('signup')}
        />

        {/* 5. Traveler Testimonials */}
        <TestimonialsSection />
      </main>

      {/* 6. Comprehensive Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
      />

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

      <PlanTripModal
        searchData={activeSearch}
        onClose={() => setActiveSearch(null)}
      />
    </div>
  );
}
