import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TripProvider, useTrip } from './context/TripContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MyTripsPage from './pages/MyTripsPage';
import ItineraryDetailPage from './pages/ItineraryDetailPage';
import RentalsPage from './components/Rentals/RentalsPage';
import ItineraryBuilderPage from './components/Itinerary/ItineraryBuilderPage';
import Footer from './components/Footer';

import AuthModal from './components/AuthModal';
import DestinationModal from './components/DestinationModal';
import PlanTripModal from './components/PlanTripModal';

gsap.registerPlugin(ScrollTrigger);

function MainApp() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Pending Actions
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [pendingSearch, setPendingSearch] = useState(null);
  const [activeSearch, setActiveSearch] = useState(null);

  const { activeTab, setActiveTab, updateTrip } = useTrip();

  useEffect(() => {
    if (activeTab === 'home') {
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
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [activeTab]);

  // Handle Navigation with Auth Gate
  const handlePageChange = (page) => {
    if ((page === 'my-trips' || page === 'trip-detail') && !isLoggedIn) {
      setPendingNavigation(page);
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }
    setActiveTab(page);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  // When user submits search in HeroSection
  const handleSearchSubmit = (searchParams) => {
    updateTrip({
      fromCity: searchParams.from,
      toCity: searchParams.to,
    });

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
      setActiveTab(pendingNavigation);
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
    if (activeTab === 'my-trips' || activeTab === 'trip-detail') {
      setActiveTab('home');
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
        activePage={activeTab}
        onPageChange={handlePageChange}
        onOpenAuth={handleOpenAuth}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Dynamic Page Component rendering */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onSearchSubmit={handleSearchSubmit}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'rentals' && <RentalsPage />}

        {activeTab === 'itinerary' && <ItineraryBuilderPage />}

        {activeTab === 'my-trips' && isLoggedIn && (
          <MyTripsPage
            onPlanNewTrip={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreTrending={() => {
              setActiveTab('home');
              setTimeout(() => {
                const el = document.getElementById('destinations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            onSelectTrip={(trip) => {
              setSelectedTrip(trip);
              setActiveTab('trip-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'trip-detail' && isLoggedIn && (
          <ItineraryDetailPage
            trip={selectedTrip}
            onBack={() => {
              setActiveTab('my-trips');
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

export default function App() {
  return (
    <TripProvider>
      <MainApp />
    </TripProvider>
  );
}
