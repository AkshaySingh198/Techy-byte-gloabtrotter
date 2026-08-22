import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import MyTripsPage from './pages/MyTripsPage';
import ItineraryDetailPage from './pages/ItineraryDetailPage';

import AuthModal from './components/AuthModal';
import DestinationModal from './components/DestinationModal';
import PlanTripModal from './components/PlanTripModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Pending Actions (when user tries to access protected feature while logged out)
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [pendingSearch, setPendingSearch] = useState(null);
  const [activeSearch, setActiveSearch] = useState(null);

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
  }, [activePage]);

  // Handle Navigation with Auth Gate
  const handlePageChange = (page) => {
    if ((page === 'my-trips' || page === 'trip-detail') && !isLoggedIn) {
      setPendingNavigation('my-trips');
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }
    setActivePage(page);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  // When user submits search in HeroSection
  const handleSearchSubmit = (searchParams) => {
    if (!isLoggedIn) {
      setPendingSearch(searchParams);
      setAuthModal({ isOpen: true, mode: 'login' });
    } else {
      setActiveSearch(searchParams);
    }
  };

  // Login / Signup Success Callback
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData || { name: 'Alex Morgan', email: 'alex@example.com' });
    setAuthModal({ isOpen: false, mode: 'login' });

    if (pendingNavigation) {
      setActivePage(pendingNavigation);
      setPendingNavigation(null);
    } else if (pendingSearch) {
      setActiveSearch(pendingSearch);
      setPendingSearch(null);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    if (activePage === 'my-trips' || activePage === 'trip-detail') {
      setActivePage('home');
    }
  };

  // Modal Dismiss without completing Auth
  const handleAuthClose = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
    setPendingNavigation(null);
    setPendingSearch(null);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-container selection:text-white relative">
      {/* Navbar */}
      <Navbar
        activePage={activePage}
        onPageChange={handlePageChange}
        onOpenAuth={handleOpenAuth}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Dynamic Page Component rendering */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onSearchSubmit={handleSearchSubmit}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activePage === 'my-trips' && isLoggedIn && (
          <MyTripsPage
            onPlanNewTrip={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreTrending={() => {
              setActivePage('home');
              setTimeout(() => {
                const el = document.getElementById('destinations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            onSelectTrip={(trip) => {
              setSelectedTrip(trip);
              setActivePage('trip-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'trip-detail' && isLoggedIn && (
          <ItineraryDetailPage
            trip={selectedTrip}
            onBack={() => {
              setActivePage('my-trips');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleAuthClose}
        onLoginSuccess={handleLoginSuccess}
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
