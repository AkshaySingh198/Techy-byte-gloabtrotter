const mockRecentTrips = [
  {
    id: 1,
    name: 'Goa & Sikkim Beach-to-Mountain',
    dates: 'Oct 15 - Oct 25, 2026',
    progress: 80,
    cover: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
    permitRequired: true,
    status: 'Group Trip'
  },
  {
    id: 2,
    name: 'Manali Alpine Retreat',
    dates: 'Dec 01 - Dec 07, 2026',
    progress: 45,
    cover: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600',
    permitRequired: false,
    status: 'Solo Trip'
  },
  {
    id: 3,
    name: 'Jaipur Heritage & Forts',
    dates: 'Jan 10 - Jan 14, 2027',
    progress: 95,
    cover: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600',
    permitRequired: false,
    status: 'Completed'
  }
];

const mockRecommended = [
  { name: 'Munnar', state: 'Kerala', tag: 'Because you loved Goa', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500', costIndex: '₹2,500/day' },
  { name: 'Leh Ladakh', state: 'Ladakh', tag: 'High Altitude Adventure', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=500', costIndex: '₹4,200/day' },
  { name: 'Varanasi', state: 'Uttar Pradesh', tag: 'Cultural & Spiritual', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=500', costIndex: '₹1,800/day' },
  { name: 'Gangtok', state: 'Sikkim', tag: 'Monastery & Lake Escapes', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500', costIndex: '₹3,100/day' }
];

import { useState, useEffect } from 'react';
import { fetchCities, fetchUserTrips } from '../services/api';

export default function Dashboard({ user, onNavigateToSearch, onLogout }) {
  const [fromCity, setFromCity] = useState('New Delhi');
  const [toCity, setToCity] = useState('Goa');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-25');
  
  const [cities, setCities] = useState([]);
  const [trips, setTrips] = useState(mockRecentTrips);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Trip Update', text: 'Baga Beach Activity added to Day 2.', time: '10m ago' },
    { id: 2, title: 'Permit Alert', text: 'Inner Line Permit approved for Sikkim.', time: '1h ago' }
  ]);

  useEffect(() => {
    fetchCities()
      .then((data) => setCities(data))
      .catch(() => {});

    fetchUserTrips()
      .then((data) => {
        if (data && data.length > 0) {
          setTrips(data.map(t => ({
            id: t.id,
            name: t.name,
            dates: `${t.start_date} to ${t.end_date}`,
            progress: 75,
            cover: t.cover_photo_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
            permitRequired: t.permit_required,
            status: t.visibility === 'group' ? 'Group Trip' : 'Private'
          })));
        }
      })
      .catch(() => {});
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigateToSearch?.({ fromCity, toCity, startDate, endDate });
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <div className="min-h-screen bg-background text-on-background pb-16">

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container-highest shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">travel_explore</span>
            <span className="font-display text-xl font-bold text-primary tracking-tight">GlobeTrotter</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotifDropdown(!notifDropdown)}
                className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors relative"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notifDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-2xl shadow-xl border border-surface-container-highest p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest mb-2">
                    <h4 className="font-bold text-sm text-on-surface">Notifications</h4>
                    <span className="text-xs font-semibold text-primary-container cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-highest hover:bg-surface-container transition-colors">
                        <p className="text-xs font-bold text-on-surface">{n.title}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">{n.text}</p>
                        <span className="text-[10px] text-outline text-right block mt-1">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-surface-container transition-colors border border-surface-container-highest"
              >
                <div className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-semibold text-on-surface hidden sm:inline">{user?.name || 'Traveler'}</span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">expand_more</span>
              </button>

              {/* User Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-2xl shadow-xl border border-surface-container-highest py-2 z-50">
                  <div className="px-4 py-2 border-b border-surface-container-highest mb-1">
                    <p className="text-xs font-bold text-on-surface truncate">{user?.name || 'Traveler'}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{user?.email || 'user@globetrotter.com'}</p>
                  </div>
                  <a href="#profile" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-sm">person</span> Profile Settings
                  </a>
                  <a href="#trips" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-sm">flight_takeoff</span> My Itineraries
                  </a>
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors text-left border-t border-surface-container-highest mt-1"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span> Log Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-10">

        {/* Header Greeting & Prominent Search Card */}
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Welcome back, <span className="text-primary">{user?.name || 'Traveler'}</span> 👋
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">Where are we going next?</p>
          </div>

          {/* Search Card */}
          <div className="bg-surface rounded-3xl p-6 ambient-shadow-2 border border-surface-container-highest">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_auto] gap-3 items-center">
                
                {/* From Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">From City</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">flight_takeoff</span>
                    <input
                      type="text"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      placeholder="e.g. New Delhi"
                      className="w-full pl-10 pr-3 py-3 rounded-2xl bg-surface-container-low border border-surface-container-highest text-sm font-semibold text-on-surface outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center md:pt-5">
                  <button
                    type="button"
                    onClick={swapCities}
                    className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary transition-transform active:rotate-180"
                    title="Swap cities"
                  >
                    <span className="material-symbols-outlined text-lg">swap_horiz</span>
                  </button>
                </div>

                {/* To Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">To City / Destination</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">location_on</span>
                    <input
                      type="text"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      placeholder="e.g. Goa"
                      className="w-full pl-10 pr-3 py-3 rounded-2xl bg-surface-container-low border border-surface-container-highest text-sm font-semibold text-on-surface outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">Travel Dates</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">calendar_month</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-2xl bg-surface-container-low border border-surface-container-highest text-xs font-semibold text-on-surface outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
                    />
                  </div>
                </div>

                {/* Plan My Trip Button */}
                <div className="md:pt-5">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-primary-container text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-primary shadow-lg shadow-primary-container/30 hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">near_me</span>
                    Plan My Trip
                  </button>
                </div>

              </div>
            </form>
          </div>
        </section>

        {/* Section: Your Recent Trips */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Your Recent Trips</h2>
              <p className="text-xs text-on-surface-variant">Continue planning or view itinerary details</p>
            </div>
            <button className="text-xs font-bold text-primary-container hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Horizontal Scrollable Carousel */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-1">
            {trips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => onNavigateToSearch?.({ fromCity: 'Delhi', toCity: trip.name })}
                className="shrink-0 w-72 sm:w-80 bg-surface rounded-2xl overflow-hidden border border-surface-container-highest ambient-shadow-1 hover:ambient-shadow-2 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={trip.cover}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md text-on-surface text-[10px] font-bold px-2.5 py-1 rounded-full border border-surface-container-highest">
                    {trip.status}
                  </span>

                  {trip.permitRequired && (
                    <span className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">warning</span> ILP Required
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-sm line-clamp-1">{trip.name}</h3>
                    <p className="text-[11px] opacity-90">{trip.dates}</p>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant font-medium">Itinerary Status</span>
                    <span className="font-bold text-primary-container">{trip.progress}% planned</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full bg-primary-container rounded-full transition-all duration-500"
                      style={{ width: `${trip.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Recommended For You */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Recommended For You</h2>
            <p className="text-xs text-on-surface-variant">Personalized destinations based on your travel style</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockRecommended.map((dest, i) => (
              <div
                key={i}
                onClick={() => onNavigateToSearch?.({ fromCity: 'Delhi', toCity: dest.name })}
                className="bg-surface rounded-2xl overflow-hidden border border-surface-container-highest ambient-shadow-1 hover:ambient-shadow-2 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {dest.tag}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">{dest.name}</h3>
                    <p className="text-xs text-on-surface-variant">{dest.state}</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary-fixed px-2.5 py-1 rounded-lg">
                    {dest.costIndex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Trending This Season */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Trending This Season</h2>
            <p className="text-xs text-on-surface-variant">Top rated Indian destinations for current weather window</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(cities.length > 0 ? cities.slice(0, 6) : [
              { name: 'Goa', state: 'Goa', best_season: 'Nov-Feb', popularity_score: 95, cost_index: 3.5 },
              { name: 'Manali', state: 'Himachal', best_season: 'Oct-June', popularity_score: 90, cost_index: 2.8 },
              { name: 'Jaipur', state: 'Rajasthan', best_season: 'Oct-March', popularity_score: 88, cost_index: 3.0 },
              { name: 'Munnar', state: 'Kerala', best_season: 'Sept-May', popularity_score: 85, cost_index: 2.5 },
              { name: 'Varanasi', state: 'Uttar Pradesh', best_season: 'Oct-March', popularity_score: 87, cost_index: 2.0 },
              { name: 'Leh Ladakh', state: 'Ladakh', best_season: 'May-Sept', popularity_score: 92, cost_index: 4.2 }
            ]).map((city, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToSearch?.({ fromCity: 'Delhi', toCity: city.name })}
                className="bg-surface rounded-2xl p-4 border border-surface-container-highest ambient-shadow-1 hover:ambient-shadow-2 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">{city.name}</h3>
                    <p className="text-xs text-on-surface-variant">Best: {city.best_season || 'October-March'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ★ {city.popularity_score || 90}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Bottom Travel Stats Strip */}
        <section className="bg-surface-container-low rounded-3xl p-6 border border-surface-container-highest">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-surface rounded-2xl border border-surface-container-highest">
              <span className="material-symbols-outlined text-primary text-2xl mb-1 block">flight_takeoff</span>
              <p className="text-xl font-extrabold text-on-surface">5</p>
              <p className="text-[11px] font-semibold text-on-surface-variant uppercase">Trips Taken</p>
            </div>
            <div className="p-3 bg-surface rounded-2xl border border-surface-container-highest">
              <span className="material-symbols-outlined text-secondary text-2xl mb-1 block">public</span>
              <p className="text-xl font-extrabold text-on-surface">3</p>
              <p className="text-[11px] font-semibold text-on-surface-variant uppercase">States Visited</p>
            </div>
            <div className="p-3 bg-surface rounded-2xl border border-surface-container-highest">
              <span className="material-symbols-outlined text-amber-500 text-2xl mb-1 block">event_upcoming</span>
              <p className="text-xl font-extrabold text-on-surface">1</p>
              <p className="text-[11px] font-semibold text-on-surface-variant uppercase">Upcoming Trip</p>
            </div>
            <div className="p-3 bg-surface rounded-2xl border border-surface-container-highest">
              <span className="material-symbols-outlined text-emerald-600 text-2xl mb-1 block">account_balance_wallet</span>
              <p className="text-xl font-extrabold text-on-surface">₹34,500</p>
              <p className="text-[11px] font-semibold text-on-surface-variant uppercase">Saved via GlobeTrotter</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
