import { useState } from 'react';

const INITIAL_TRIPS = [
  {
    id: 'amalfi-coast',
    title: 'Amalfi Coast Escape',
    status: 'Upcoming',
    badgeText: 'Confirmed',
    badgeColor: 'text-brand-teal bg-white/90',
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

export default function MyTripsPage({ onPlanNewTrip, onExploreTrending, onSelectTrip }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const categories = ['All', 'Upcoming', 'Ongoing', 'Past', 'Drafts'];

  // Filter logic
  let filtered = INITIAL_TRIPS.filter((trip) => {
    const matchesFilter = activeFilter === 'All' || trip.status === activeFilter;
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'newest') return b.dateValue - a.dateValue;
    if (sortBy === 'oldest') return a.dateValue - b.dateValue;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface pt-16">
      {/* Header Section */}
      <header className="w-full bg-gradient-to-r from-[#FFF5ED] via-[#FFEBE3] to-[#FFE6DF] pt-10 pb-8 px-4 sm:px-6 shadow-sm border-b border-surface-container-highest">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-on-surface mb-1 flex items-center gap-2">
              My Trips ✈️
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium">
              12 adventures and counting
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
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

            {/* Plan New Trip Button */}
            <button
              onClick={onPlanNewTrip}
              className="bg-primary-container text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Plan New Trip
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FFF0E5] p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform border border-[#FFDEC9]">
            <div className="w-11 h-11 rounded-full bg-white/70 flex items-center justify-center text-[#E56A49] shrink-0">
              <span className="material-symbols-outlined text-xl">public</span>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-on-surface leading-none mb-0.5">8</div>
              <div className="text-xs font-semibold text-on-surface-variant/80 uppercase tracking-wider">Countries</div>
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
                    <h3 className="font-display text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {trip.title}
                    </h3>

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
                  <div className="flex justify-between items-center pt-3 border-t border-surface-container-highest">
                    <div className="font-display text-base font-bold text-on-surface">{trip.price}</div>
                    <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
                      View Details
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
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
