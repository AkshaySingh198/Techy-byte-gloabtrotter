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
import ShareCardModal from './components/ShareCardModal';
import BlogEditorModal from './components/BlogEditorModal';
import PaymentModal from './components/PaymentModal';

import TravelOptions from './pages/TravelOptions';
import HotelBookingPage from './pages/HotelBookingPage';
import FinalItineraryPage from './pages/FinalItineraryPage';
import TripCalendarTimeline from './pages/TripCalendarTimeline';
import SharedItinerary from './pages/SharedItinerary';
import ProfileSettings from './pages/ProfileSettings';
import BottomToastBar from './components/BottomToastBar';

import { getMe, logout, createTrip } from './services/api';

gsap.registerPlugin(ScrollTrigger);

function MainApp() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [shareCardOpen, setShareCardOpen] = useState(false);
  const [blogEditorOpen, setBlogEditorOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  // Package Selections
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [pendingPaymentTrip, setPendingPaymentTrip] = useState({ id: 1, name: 'Goa Coastal Expedition', amount: 10600 });
  const [userTrips, setUserTrips] = useState([]);

  // Active view
  const [currentView, setCurrentView] = useState('home');
  const [searchParams, setSearchParams] = useState(null);

  // Auth state
  const [user, setUser] = useState(null);
  const [pendingSearch, setPendingSearch] = useState(null);

  const { activeTab, setActiveTab, updateTrip } = useTrip();

  useEffect(() => {
    getMe()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if (currentView === 'home' || activeTab === 'home') {
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
  }, [currentView, activeTab]);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleSearchSubmit = (params) => {
    setSearchParams(params);
    if (params?.from && params?.to) {
      updateTrip({ fromCity: params.from, toCity: params.to });
    }
    if (!user) {
      setPendingSearch(params);
      setAuthModal({ isOpen: true, mode: 'login' });
    } else {
      setCurrentView('travel-options');
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    if (pendingSearch) {
      setSearchParams(pendingSearch);
      setCurrentView('travel-options');
      setPendingSearch(null);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentView('home');
    setActiveTab('home');
  };

  const handlePageNavigate = (view) => {
    // Unauthenticated users can only access the Explore tab ('home')
    if (!user && view !== 'home') {
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }

    if (view === 'blogs') {
      setBlogEditorOpen(true);
      return;
    }
    setCurrentView(view);
    setActiveTab(view);
  };

  const handlePaymentConfirmed = async (receiptData) => {
    const sDate = searchParams?.startDate || '2026-10-15';
    const eDate = searchParams?.endDate || '2026-10-25';
    const destination = searchParams?.toCity || searchParams?.to || 'Goa';

    const newTrip = {
      id: `trip_${Date.now()}`,
      title: pendingPaymentTrip.name || `${destination} Expedition`,
      status: 'Upcoming',
      badgeText: 'Confirmed',
      badgeColor: 'text-teal-700 bg-teal-50 border border-teal-200',
      badgeIcon: 'check_circle',
      countdown: 'Upcoming',
      dates: `${sDate} to ${eDate}`,
      location: `${destination}, India`,
      duration: 'Custom Duration',
      progressLabel: 'Trip Readiness',
      progressPercent: 100,
      price: `₹${Number(pendingPaymentTrip.amount || 10600).toLocaleString('en-IN')}`,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      dateValue: parseInt(sDate.replace(/-/g, ''), 10)
    };

    setUserTrips(prev => [newTrip, ...prev]);

    // Also attempt saving to database API with user dates
    try {
      await createTrip({
        name: newTrip.title,
        start_date: sDate,
        end_date: eDate,
        description: `Paid travel package to ${destination}`,
        visibility: 'public'
      });
    } catch (e) {
      console.log('Database trip sync fallback:', e.message);
    }

    setCurrentView('my-trips');
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary-container selection:text-white relative">

      {/* Top Navbar */}
      <Navbar
        activePage={currentView}
        onPageChange={handlePageNavigate}
        onOpenAuth={handleOpenAuth}
        isLoggedIn={!!user}
        user={user}
        currentUser={user}
        onLogout={handleLogout}
        onNavigate={handlePageNavigate}
      />

      {/* Main View Router - Flow: Home ➔ TravelOptions ➔ HotelBookingPage ➔ FinalItineraryPage ➔ Payment ➔ MyTripsPage */}
      <main className="flex-1 pt-14">
        {currentView === 'travel-options' ? (
          <TravelOptions
            searchParams={searchParams}
            onBackToSearch={() => setCurrentView('home')}
            onContinueToHotels={(option) => {
              setSelectedTransport(option);
              setCurrentView('hotel-booking');
            }}
          />
        ) : currentView === 'hotel-booking' ? (
          <HotelBookingPage
            transportOption={selectedTransport}
            onBack={() => setCurrentView('travel-options')}
            onContinueToFinalItinerary={(hotelData) => {
              setSelectedHotel(hotelData);
              setCurrentView('final-itinerary');
            }}
          />
        ) : currentView === 'final-itinerary' ? (
          <FinalItineraryPage
            transportOption={selectedTransport}
            hotelOption={selectedHotel}
            onBack={() => setCurrentView('hotel-booking')}
            onProceedToPayment={(tripInfo) => {
              setPendingPaymentTrip(tripInfo);
              setPaymentModalOpen(true);
            }}
          />
        ) : currentView === 'calendar-timeline' ? (
          <TripCalendarTimeline onBack={() => setCurrentView('home')} />
        ) : currentView === 'shared-itinerary' ? (
          <SharedItinerary onBack={() => setCurrentView('home')} onOpenAuth={handleOpenAuth} />
        ) : currentView === 'profile-settings' ? (
          <ProfileSettings user={user} onBack={() => setCurrentView('home')} onLogoutSuccess={handleLogout} />
        ) : currentView === 'rentals' ? (
          <RentalsPage />
        ) : currentView === 'itinerary' ? (
          <ItineraryBuilderPage />
        ) : currentView === 'my-trips' ? (
          <MyTripsPage
            user={user}
            userTrips={userTrips}
            onOpenShareCard={(trip) => {
              setSelectedTrip(trip);
              setShareCardOpen(true);
            }}
            onPlanNewTrip={() => setCurrentView('home')}
            onExploreTrending={() => setCurrentView('home')}
            onSelectTrip={(trip) => {
              setSelectedTrip(trip);
              setCurrentView('trip-detail');
            }}
          />
        ) : currentView === 'trip-detail' ? (
          <ItineraryDetailPage trip={selectedTrip} onBack={() => setCurrentView('my-trips')} />
        ) : (
          /* Default Home Screen */
          <HomePage
            onSearchSubmit={handleSearchSubmit}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onOpenAuth={handleOpenAuth}
          />
        )}
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onAuthSuccess={handleAuthSuccess}
        onLoginSuccess={handleAuthSuccess}
      />

      {/* Destination Details Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

      {/* Payment Confirmation Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        tripData={pendingPaymentTrip}
        onClose={() => {
          setPaymentModalOpen(false);
          setCurrentView('my-trips');
        }}
        onPaymentConfirmed={handlePaymentConfirmed}
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={shareCardOpen}
        trip={selectedTrip}
        onClose={() => setShareCardOpen(false)}
      />

      {/* Blog Editor Modal */}
      <BlogEditorModal
        isOpen={blogEditorOpen}
        onClose={() => setBlogEditorOpen(false)}
      />

      {/* Fallback Plan Trip Modal */}
      <PlanTripModal searchData={null} onClose={() => setSearchParams(null)} />

      {/* Floating Bottom Toast Bar Navigation */}
      <BottomToastBar activeView={currentView} onNavigate={handlePageNavigate} />
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
