import { useState, useEffect, useMemo } from 'react';
import { useTrip } from '../../context/TripContext';
import { MOCK_RENTALS, RENTAL_LOCATIONS } from '../../data/rentalsData';
import RentalCard from './RentalCard';
import RentalSkeletonCard from './RentalSkeletonCard';
import ItineraryModal from './ItineraryModal';

export default function RentalsPage() {
  const { tripState, updateTrip, setSelectedRental, isItineraryOpen, setIsItineraryOpen, setActiveTab } = useTrip();
  const { fromCity, toCity, startDate, endDate, selectedRental } = tripState;

  // Filter Bar state
  const [vehicleTab, setVehicleTab] = useState('All'); // 'All' | 'Scooty' | 'Bike' | 'Car'
  const [pickupLocation, setPickupLocation] = useState(RENTAL_LOCATIONS[0]);
  const [pickupDateTime, setPickupDateTime] = useState(`${startDate}T10:00`);
  const [dropoffDateTime, setDropoffDateTime] = useState(`${endDate}T10:00`);
  const [sortBy, setSortBy] = useState('price-asc'); // 'price-asc' | 'price-desc' | 'rating' | 'provider'

  // Loading state (simulated 500ms fetch delay)
  const [isLoading, setIsLoading] = useState(true);

  // Toast confirmation state
  const [toastMessage, setToastMessage] = useState(null);

  // City editor for Guard state testing
  const [editFrom, setEditFrom] = useState(fromCity);
  const [editTo, setEditTo] = useState(toCity);

  // Simulate loading delay whenever tab or sort changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [vehicleTab, sortBy]);

  // Sync edit state if global trip state changes
  useEffect(() => {
    setEditFrom(fromCity);
    setEditTo(toCity);
  }, [fromCity, toCity]);

  // Sync pickup/dropoff defaults if trip dates change
  useEffect(() => {
    if (startDate) setPickupDateTime(`${startDate}T10:00`);
    if (endDate) setDropoffDateTime(`${endDate}T10:00`);
  }, [startDate, endDate]);

  // Calculate rental duration in days
  const totalDays = useMemo(() => {
    try {
      const pDate = new Date(pickupDateTime);
      const dDate = new Date(dropoffDateTime);
      const diffMs = dDate - pDate;
      const calculatedDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return Math.max(1, isNaN(calculatedDays) ? 1 : calculatedDays);
    } catch {
      return 1;
    }
  }, [pickupDateTime, dropoffDateTime]);

  // Filter & Sort Listings
  const filteredRentals = useMemo(() => {
    let list = [...MOCK_RENTALS];
    if (vehicleTab !== 'All') {
      list = list.filter((r) => r.type === vehicleTab);
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'provider') {
      list.sort((a, b) => a.provider.localeCompare(b.provider));
    }
    return list;
  }, [vehicleTab, sortBy]);

  // Handle vehicle selection
  const handleSelectRental = (rental) => {
    const totalCost = rental.pricePerDay * totalDays;
    const rentalPayload = {
      vehicleType: rental.type,
      model: rental.model,
      provider: rental.provider,
      pricePerDay: rental.pricePerDay,
      fuelType: rental.fuelType,
      pickupLocation,
      pickupDateTime,
      dropoffDateTime,
      totalCost,
      image: rental.image,
      id: rental.id,
    };

    setSelectedRental(rentalPayload);

    // Show Toast
    setToastMessage({
      model: rental.model,
      cost: totalCost,
    });

    // Auto dismiss toast after 3 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Guard Condition Check: Rentals only render when From city != To city
  const isSameCity = fromCity?.trim().toLowerCase() === toCity?.trim().toLowerCase();

  if (isSameCity || !fromCity || !toCity) {
    return (
      <div className="min-h-[80vh] pt-24 pb-16 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="bg-surface rounded-3xl p-8 sm:p-10 border border-surface-container-highest ambient-shadow-2 max-w-2xl w-full">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">minor_crash</span>
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold mb-3">
            Route Guard Active
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface mb-2">
            Local Rentals Guarded
          </h2>

          <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-6 leading-relaxed">
            Destination rentals are designed for inter-city travel. Your current selection has matching departure and arrival cities:
          </p>

          <div className="bg-surface-container rounded-2xl p-4 mb-6 flex items-center justify-center gap-3 text-sm font-bold text-on-surface">
            <span className="px-3 py-1 bg-surface rounded-lg border border-surface-container-highest">{fromCity || 'City A'}</span>
            <span className="material-symbols-outlined text-primary">arrow_forward</span>
            <span className="px-3 py-1 bg-surface rounded-lg border border-surface-container-highest">{toCity || 'City A'}</span>
          </div>

          <p className="text-xs text-on-surface-variant/80 mb-6">
            To view scooty, bike, and car rentals, set different "From" and "To" cities below:
          </p>

          {/* Quick Switcher Form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center">
            <input
              type="text"
              value={editFrom}
              onChange={(e) => setEditFrom(e.target.value)}
              placeholder="From City"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-medium bg-surface text-on-surface focus:outline-none focus:border-primary"
            />
            <span className="material-symbols-outlined text-on-surface-variant hidden sm:inline">sync_alt</span>
            <input
              type="text"
              value={editTo}
              onChange={(e) => setEditTo(e.target.value)}
              placeholder="To City"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-medium bg-surface text-on-surface focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => {
                if (editFrom.trim() && editTo.trim()) {
                  updateTrip({ fromCity: editFrom.trim(), toCity: editTo.trim() });
                }
              }}
              className="w-full sm:w-auto bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-primary whitespace-nowrap cursor-pointer"
            >
              Update Route
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-28 md:pb-16 bg-background text-on-background">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg">check</span>
          </div>
          <div className="text-xs">
            <div className="font-bold text-white">Vehicle Selected!</div>
            <div className="text-white/80">
              {toastMessage.model} reserved (₹{toastMessage.cost.toLocaleString('en-IN')} total).
            </div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-auto text-white/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">directions_car</span>
              Local Destination Transport
            </div>

            {/* Interactive Route Pill */}
            <div className="flex items-center gap-2 bg-surface px-3 py-1 rounded-full border border-surface-container-highest text-xs text-on-surface">
              <span className="text-on-surface-variant font-medium">Route:</span>
              <span className="font-bold text-primary">{fromCity}</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
              <span className="font-bold text-primary">{toCity}</span>
              <button
                onClick={() => updateTrip({ fromCity: toCity, toCity: toCity })}
                className="ml-2 text-[10px] text-amber-600 hover:underline font-semibold"
                title="Test Same City Guard"
              >
                (Test Guard)
              </button>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
            Get Around {toCity}
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Book local scooty, bike, or car rentals for {startDate} – {endDate} ({totalDays} {totalDays === 1 ? 'Day' : 'Days'})
          </p>
        </div>

        {/* Filter & Booking Bar */}
        <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-surface-container-highest shadow-sm mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Pickup Location */}
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-container-highest bg-surface text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
              >
                {RENTAL_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date & Time */}
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                Pickup Date & Time
              </label>
              <input
                type="datetime-local"
                value={pickupDateTime}
                onChange={(e) => setPickupDateTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-container-highest bg-surface text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            {/* Drop-off Date & Time */}
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">event_available</span>
                Drop-off Date & Time
              </label>
              <input
                type="datetime-local"
                value={dropoffDateTime}
                onChange={(e) => setDropoffDateTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-container-highest bg-surface text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">sort</span>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-container-highest bg-surface text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="provider">Provider Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Type Tabs (Pill style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {['All', 'Scooty', 'Bike', 'Car'].map((tab) => {
            const count =
              tab === 'All'
                ? MOCK_RENTALS.length
                : MOCK_RENTALS.filter((r) => r.type === tab).length;
            const active = vehicleTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setVehicleTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-primary-container text-white shadow-md ring-2 ring-primary/20 scale-102'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container border border-surface-container-highest'
                }`}
              >
                <span>{tab === 'All' ? '🛵🚗 All Rentals' : tab === 'Scooty' ? '🛵 Scooty' : tab === 'Bike' ? '🏍️ Bike' : '🚘 Car'}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    active
                      ? 'bg-white/25 text-white'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Grid & Desktop Summary Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-2">
          {/* Card Grid (3 cols on desktop) */}
          <div className="lg:col-span-3">
            {isLoading ? (
              /* Skeleton Loader Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <RentalSkeletonCard key={i} />
                ))}
              </div>
            ) : filteredRentals.length === 0 ? (
              <div className="bg-surface rounded-2xl p-10 text-center border border-surface-container-highest">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">
                  search_off
                </span>
                <h3 className="font-display font-bold text-lg text-on-surface">No vehicles found</h3>
                <p className="text-xs text-on-surface-variant mt-1">Try switching tabs or resetting filters.</p>
              </div>
            ) : (
              /* Real Rental Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRentals.map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    isSelected={selectedRental?.id === rental.id}
                    onSelect={handleSelectRental}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar Summary */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <div className="bg-surface rounded-2xl p-5 border border-surface-container-highest shadow-sm space-y-4">
              <h3 className="font-display font-extrabold text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">shopping_bag</span>
                Rental Summary
              </h3>

              {selectedRental ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="relative rounded-xl overflow-hidden h-32 bg-surface-container border border-surface-container-highest">
                    <img
                      src={selectedRental.image}
                      alt={selectedRental.model}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {selectedRental.vehicleType}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-extrabold text-lg text-on-surface">
                      {selectedRental.model}
                    </h4>
                    <p className="text-xs text-on-surface-variant">
                      Provider: <span className="font-semibold text-on-surface">{selectedRental.provider}</span>
                    </p>
                  </div>

                  <div className="space-y-2 text-xs border-t border-surface-container-highest pt-3 text-on-surface-variant">
                    <div className="flex justify-between">
                      <span>Daily Rate</span>
                      <span className="font-bold text-on-surface">₹{selectedRental.pricePerDay.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rental Duration</span>
                      <span className="font-bold text-on-surface">{totalDays} {totalDays === 1 ? 'Day' : 'Days'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pickup</span>
                      <span className="font-semibold text-on-surface truncate max-w-[140px]" title={selectedRental.pickupLocation}>
                        {selectedRental.pickupLocation}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-surface-container-highest pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-on-surface">Total Cost</span>
                    <span className="font-display font-black text-2xl text-primary">
                      ₹{(selectedRental.totalCost || selectedRental.pricePerDay * totalDays).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className="w-full bg-primary-container text-white py-3 rounded-xl font-bold text-xs hover:bg-primary hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Itinerary</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center text-on-surface-variant space-y-2">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto text-on-surface-variant/60">
                    <span className="material-symbols-outlined text-2xl">no_crash</span>
                  </div>
                  <p className="text-xs font-semibold">No Vehicle Selected</p>
                  <p className="text-[11px] text-on-surface-variant/70">
                    Click "Select" on any vehicle card to reserve your local transport.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-surface-container-highest p-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {selectedRental ? (
            <>
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={selectedRental.image}
                  alt={selectedRental.model}
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-surface-container-highest"
                />
                <div className="min-w-0">
                  <div className="font-display font-bold text-xs sm:text-sm text-on-surface truncate">
                    {selectedRental.model}
                  </div>
                  <div className="text-[11px] text-on-surface-variant">
                    <span className="font-black text-primary">₹{(selectedRental.totalCost || selectedRental.pricePerDay * totalDays).toLocaleString('en-IN')}</span>
                    <span className="text-[10px]"> ({totalDays} days)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('itinerary')}
                className="bg-primary-container text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-primary transition-all whitespace-nowrap cursor-pointer shadow-sm flex items-center gap-1"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </>
          ) : (
            <div className="flex items-center justify-between w-full text-xs text-on-surface-variant px-1">
              <span>Select a vehicle to view estimated cost</span>
              <span className="font-bold text-primary">0 Selected</span>
            </div>
          )}
        </div>
      </div>

      {/* Itinerary Modal View */}
      <ItineraryModal
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
      />
    </div>
  );
}
