import { useState, useEffect } from 'react';
import { getTrips } from '../services/api';

const MOCK_INITIAL_TRIPS = [
  {
    id: 'amalfi-coast',
    title: 'Amalfi Coast Escape',
    ownerName: 'Aarav Patel (Owner)',
    status: 'Upcoming',
    badgeText: 'Confirmed',
    badgeColor: 'text-teal-700 bg-teal-50 border border-teal-200',
    badgeIcon: 'check_circle',
    countdown: '14 Days To Go',
    dates: 'Oct 10 - Oct 17, 2026',
    location: 'Positano, Italy',
    duration: '8 Days',
    progressLabel: 'Trip Readiness',
    progressPercent: 85,
    price: '₹2,15,000',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    dateValue: 20261010,
  },
  {
    id: 'maldives-retreat',
    title: 'Maldives Retreat',
    ownerName: 'Aarav Patel (Owner)',
    status: 'Past',
    badgeText: 'Completed',
    badgeColor: 'text-on-surface-variant bg-surface-container-high/90',
    badgeIcon: 'history',
    countdown: null,
    dates: 'Jan 10 - Jan 17, 2025',
    location: 'Male, Maldives',
    duration: '7 Days',
    progressLabel: 'Memories Logged',
    progressPercent: 100,
    price: '₹1,80,000',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    dateValue: 20250110,
  },
  {
    id: 'peru-adventure',
    title: 'Peru Adventure',
    ownerName: 'Aarav Patel (Owner)',
    status: 'Drafts',
    badgeText: 'Draft',
    badgeColor: 'text-outline bg-white/90 border border-outline-variant',
    badgeIcon: 'edit_document',
    countdown: null,
    dates: 'Nov 12 - Nov 24, 2026 (Est.)',
    location: 'Cusco, Peru',
    duration: 'Est. 12 Days',
    progressLabel: 'Planning Progress',
    progressPercent: 30,
    price: 'Est. ₹2,45,000',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
    dateValue: 20261112,
  },
];

const FALLBACK_TRAVEL_THOUGHTS = [
  { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { quote: "Travel is fatal to prejudice, bigotry, and narrow-mindedness.", author: "Mark Twain" },
  { quote: "To travel is to live.", author: "Hans Christian Andersen" },
  { quote: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { quote: "The world is a book and those who do not travel read only one page.", author: "Saint Augustine" },
  { quote: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" }
];

const cleanDisplayName = (name, email) => {
  let target = name || email;
  if (!target) return 'Aarav Patel';
  if (target.includes('@')) {
    target = target.split('@')[0];
  }
  return target
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function MyTripsPage({ user, userTrips = [], onOpenShareCard, onPlanNewTrip, onExploreTrending, onSelectTrip }) {
  const [tripsList, setTripsList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [refreshing, setRefreshing] = useState(false);
  const [travelThought, setTravelThought] = useState(null);

  const ownerName = cleanDisplayName(user?.name, user?.email);
  const categories = ['All', 'Upcoming', 'Ongoing', 'Past', 'Drafts'];

  // Fetch Random Traveling Thoughts from Free Public API
  const fetchRandomThought = async () => {
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      const data = await res.json();
      if (data && data.quote) {
        setTravelThought({ quote: data.quote, author: data.author || 'Global Traveler' });
        return;
      }
    } catch (e) {}

    const rand = FALLBACK_TRAVEL_THOUGHTS[Math.floor(Math.random() * FALLBACK_TRAVEL_THOUGHTS.length)];
    setTravelThought(rand);
  };

  const loadLocalTrips = () => {
    let localTrips = [];
    try {
      const stored = localStorage.getItem('user_booked_trips');
      if (stored) {
        localTrips = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    const combined = [...userTrips, ...localTrips, ...MOCK_INITIAL_TRIPS];
    const uniqueMap = new Map();
    combined.forEach(t => {
      if (t && t.id) uniqueMap.set(t.id, t);
    });

    setTripsList(Array.from(uniqueMap.values()));
  };

  useEffect(() => {
    loadLocalTrips();
    fetchRandomThought();
  }, [userTrips]);

  // Manual Refresh Handler
  const handleManualRefresh = async () => {
    setRefreshing(true);
    fetchRandomThought();
    try {
      const apiTrips = await getTrips();
      if (apiTrips && apiTrips.length > 0) {
        const adaptedApi = apiTrips.map(t => ({
          id: `api_${t.id || t.trip_id}`,
          title: t.name || t.title || 'Goa Coastal Expedition',
          ownerName: `${cleanDisplayName(t.owner?.name, t.owner?.email)} (Owner)`,
          status: 'Upcoming',
          badgeText: 'Confirmed',
          badgeColor: 'text-teal-700 bg-teal-50 border border-teal-200',
          badgeIcon: 'check_circle',
          countdown: '12 Days To Go',
          dates: 'Oct 15 - Oct 25, 2026',
          location: t.destination_city || 'Goa, India',
          duration: '10 Days',
          progressLabel: 'Trip Readiness',
          progressPercent: 100,
          price: `₹${Number(t.estimated_cost || 10600).toLocaleString('en-IN')}`,
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
          dateValue: 20261015
        }));

        setTripsList(prev => {
          const combined = [...adaptedApi, ...prev];
          const map = new Map();
          combined.forEach(item => map.set(item.id, item));
          return Array.from(map.values());
        });
      }
    } catch (e) {
      console.log('Refresh info:', e.message);
    } finally {
      setTimeout(() => setRefreshing(false), 400);
    }
  };

  // Filter logic
  let filtered = tripsList.filter((trip) => {
    const matchesFilter = activeFilter === 'All' || trip.status === activeFilter;
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'newest') return (b.dateValue || 0) - (a.dateValue || 0);
    if (sortBy === 'oldest') return (a.dateValue || 0) - (b.dateValue || 0);
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface pt-16">
      {/* Header Section with Owner Badge Class */}
      <header className="w-full bg-gradient-to-r from-[#FFF5ED] via-[#FFEBE3] to-[#FFE6DF] pt-10 pb-8 px-4 sm:px-6 shadow-sm border-b border-surface-container-highest">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="owner font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface flex items-center gap-2">
                Welcome back, {ownerName}! 👋
              </h1>
              {/* <span className="owner-badge bg-primary-container/10 text-primary-container border border-primary-container/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm w-fit">
                <span className="material-symbols-outlined text-sm">shield_person</span>
                Trip Owner: {ownerName}
              </span> */}
            </div>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium">
              You have {tripsList.length} travel adventures booked &amp; planned.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your trips…"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-full text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none shadow-sm transition-all text-on-surface placeholder:text-on-surface-variant/70"
              />
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              title="Refresh database trips and get new travel thought"
              className="bg-white border border-surface-container-highest text-on-surface text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 hover:bg-surface-container transition-all cursor-pointer shadow-sm disabled:opacity-50 whitespace-nowrap"
            >
              <span className={`material-symbols-outlined text-base ${refreshing ? 'animate-spin text-primary' : 'text-on-surface-variant'}`}>
                refresh
              </span>
              {refreshing ? 'Refreshing…' : 'Refresh Trips'}
            </button>

            {/* Plan New Trip Button */}
            <button
              onClick={onPlanNewTrip}
              className="bg-primary-container text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer shadow-sm w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Plan New Trip
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Traveling Thought of the Day (Free Public API Feature) */}
        {travelThought && (
          <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-orange-200/60 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                <span className="material-symbols-outlined text-xl">format_quote</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                  Daily Traveling Thought
                </span>
                <p className="text-sm font-bold text-on-surface mt-1 italic leading-snug">
                  "{travelThought.quote}"
                </p>
                <p className="text-xs text-on-surface-variant font-semibold mt-0.5">
                  — {travelThought.author}
                </p>
              </div>
            </div>
            <button
              onClick={fetchRandomThought}
              className="text-xs font-bold text-orange-700 hover:text-orange-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full border border-orange-200 transition-all cursor-pointer whitespace-nowrap self-end sm:self-center"
            >
              New Thought 🎲
            </button>
          </div>
        )}
        
        {/* Banner if newly booked trip exists */}
        {tripsList.some(t => t.id.startsWith('trip_') || t.id.startsWith('api_')) && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
              <span>Your new trip has been confirmed and added to your itinerary dashboard below!</span>
            </div>
            <span className="text-[10px] uppercase font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Updated</span>
          </div>
        )}

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FFF0E5] p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform border border-[#FFDEC9]">
            <div className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center text-[#E56A49] shrink-0">
              <span className="material-symbols-outlined text-xl">public</span>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-on-surface leading-none mb-0.5">{tripsList.length}</div>
              <div className="text-xs font-semibold text-on-surface-variant/80 uppercase tracking-wider">Booked Trips</div>
            </div>
          </div>

          <div className="bg-[#E6F4F1] p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform border border-[#C6E9E3]">
            <div className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center text-teal-700 shrink-0">
              <span className="material-symbols-outlined text-xl">location_city</span>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-on-surface leading-none mb-0.5">23</div>
              <div className="text-xs font-semibold text-on-surface-variant/80 uppercase tracking-wider">Cities</div>
            </div>
          </div>

          <div className="bg-[#F0E6F5] p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform border border-[#E1D1ED]">
            <div className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center text-purple-700 shrink-0">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-on-surface leading-none mb-0.5">64</div>
              <div className="text-xs font-semibold text-on-surface-variant/80 uppercase tracking-wider">Days Traveled</div>
            </div>
          </div>

          <div className="bg-[#E6F0F9] p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform border border-[#C9E0F5]">
            <div className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center text-blue-700 shrink-0">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-on-surface leading-none mb-0.5">₹2.4L</div>
              <div className="text-xs font-semibold text-on-surface-variant/80 uppercase tracking-wider">Total Spent</div>
            </div>
          </div>
        </section>

        {/* Filters & Controls */}
        <section className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6">
          {/* Category Chips */}
          <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-primary-container text-white shadow-sm'
                    : 'bg-white border border-surface-container-highest text-on-surface-variant hover:border-primary-container hover:text-primary-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & View Mode */}
          <div className="flex items-center gap-3 justify-between lg:justify-end">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-surface-container-highest rounded-xl pl-3 pr-8 py-1.5 text-xs font-semibold text-on-surface-variant focus:border-primary outline-none shadow-sm cursor-pointer"
              >
                <option value="newest">Sort by: Date (Newest)</option>
                <option value="oldest">Sort by: Date (Oldest)</option>
                <option value="name">Sort by: Name (A-Z)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base">
                expand_more
              </span>
            </div>

            <div className="flex bg-white rounded-xl border border-surface-container-highest p-0.5 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-lg">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-lg">view_list</span>
              </button>
            </div>
          </div>
        </section>

        {/* Trips List / Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-surface-container-highest p-8">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-3 font-light">
              flight_takeoff
            </span>
            <h3 className="font-display text-xl font-bold text-on-surface mb-1">
              No trips found matching your criteria
            </h3>
            <p className="text-sm text-on-surface-variant max-w-md mb-5">
              Start building your dream itinerary and organize all your travel details in one place.
            </p>
            <button
              onClick={onPlanNewTrip}
              className="bg-primary-container text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-sm hover:bg-primary transition-all cursor-pointer"
            >
              Plan a New Trip
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filtered.map((trip) => (
              <article
                key={trip.id}
                onClick={() => onSelectTrip?.(trip)}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-surface-container-highest hover:border-primary-container/30 cursor-pointer relative ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row items-stretch' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'h-48 md:h-auto md:w-64 shrink-0' : 'h-48 w-full'}`}>
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`font-semibold text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1 ${trip.badgeColor}`}>
                      <span className="material-symbols-outlined text-sm">{trip.badgeIcon}</span>
                      {trip.badgeText}
                    </span>
                  </div>

                  {/* Countdown overlay */}
                  {trip.countdown && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-primary-container text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm inline-block">
                        {trip.countdown}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                        {trip.title}
                      </h3>
                      {trip.ownerName && (
                        <span className="owner-badge text-[10px] font-bold bg-primary/10 text-primary-container px-2 py-0.5 rounded-full whitespace-nowrap">
                          {trip.ownerName}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 mb-4 text-xs font-medium text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-primary">calendar_month</span>
                        <span>{trip.dates}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-primary">pin_drop</span>
                        <span>{trip.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-primary">schedule</span>
                        <span>{trip.duration}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-semibold text-on-surface-variant mb-1">
                        <span>{trip.progressLabel}</span>
                        <span>{trip.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${trip.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-surface-container-highest gap-2">
                    <div className="font-display text-base font-bold text-on-surface">{trip.price}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenShareCard?.(trip);
                        }}
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">share</span>
                        Share Card
                      </button>
                      <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
                        View Details
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Banner */}
      <div className="w-full bg-gradient-to-r from-teal-700 to-teal-800 text-white py-4 px-4 sm:px-6 mt-8">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <button
            onClick={onExploreTrending}
            className="text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Not sure where to go next?{' '}
            <span className="font-bold underline underline-offset-4">Explore Trending Destinations</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
