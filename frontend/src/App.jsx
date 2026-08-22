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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Pending search: stored when user tries to plan while not logged in
  const [pendingSearch, setPendingSearch] = useState(null);
  const [activeSearch, setActiveSearch] = useState(null);

  // Simulate logged-in state (would be from real auth context)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  // When user submits search — check if logged in first
  const handleSearchSubmit = (searchParams) => {
    if (!isLoggedIn) {
      setPendingSearch(searchParams);
      setAuthModal({ isOpen: true, mode: 'login' });
    } else {
      setActiveSearch(searchParams);
    }
  };

  // After login, resume the pending search
  const handleAuthClose = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
    if (pendingSearch) {
      // Simulate login success on modal close
      setIsLoggedIn(true);
      setActiveSearch(pendingSearch);
      setPendingSearch(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-container selection:text-white relative">

      {/* Navbar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onSearch={handleSearchSubmit} />
        <StatsStrip />
        <TrendingDestinations onSelectDestination={(dest) => setSelectedDestination(dest)} />
        <StoriesSection onWriteStory={() => handleOpenAuth('signup')} />
        <TestimonialsSection />
      </main>

      <Footer />

      {/* Auth Modal — triggered on plan or by nav buttons */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleAuthClose}
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
