import { useState, useEffect } from 'react';
import { getRouteSuggestions } from '../services/api';

const mockFlightOptions = [
  { id: 'f1', type: 'flight', operator: 'IndiGo (Direct 6E-204)', depTime: '06:15 AM', arrTime: '08:45 AM', duration: '2h 30m', price: 4500, badge: 'Fastest', tier: 'premium' },
  { id: 'f2', type: 'flight', operator: 'Air India (AI-883)', depTime: '11:30 AM', arrTime: '02:05 PM', duration: '2h 35m', price: 5200, badge: null, tier: 'premium' },
  { id: 'f3', type: 'flight', operator: 'Akasa Air (QP-1102)', depTime: '07:20 PM', arrTime: '09:55 PM', duration: '2h 35m', price: 4100, badge: 'Cheapest', tier: 'budget' }
];

const mockTrainOptions = [
  { id: 't1', type: 'train', operator: 'Vande Bharat Express (20901)', depTime: '06:00 AM', arrTime: '01:30 PM', duration: '7h 30m', price: 1650, badge: 'Fastest', tier: 'mid' },
  { id: 't2', type: 'train', operator: 'Rajdhani Express (12432)', depTime: '03:55 PM', arrTime: '09:45 AM', duration: '17h 50m', price: 1250, badge: 'Cheapest', tier: 'budget' },
  { id: 't3', type: 'train', operator: 'Goa Sampark Kranti (12450)', depTime: '06:15 AM', arrTime: '11:30 AM', duration: '29h 15m', price: 850, badge: null, tier: 'budget' }
];

const mockBusOptions = [
  { id: 'b1', type: 'bus', operator: 'Zingbus AC Multi-Axle Volvo', depTime: '07:00 PM', arrTime: '07:30 AM', duration: '12h 30m', price: 1200, badge: 'Cheapest', tier: 'budget' },
  { id: 'b2', type: 'bus', operator: 'IntrCity SmartBus Sleeper', depTime: '08:30 PM', arrTime: '08:45 AM', duration: '12h 15m', price: 1450, badge: 'Fastest', tier: 'mid' }
];

const mockLocalRentalOptions = [
  { id: 'r1', type: 'bike', operator: 'Royal Enfield Himalayan 450 (Self Ride)', depTime: 'Instant Pickup', arrTime: '24 Hours', duration: 'Full Day', price: 1200, badge: 'Popular', tier: 'budget' },
  { id: 'r2', type: 'scooter', operator: 'Honda Activa 6G Scooty (Helmet Included)', depTime: 'Instant Pickup', arrTime: '24 Hours', duration: 'Full Day', price: 450, badge: 'Cheapest', tier: 'budget' },
  { id: 'r3', type: 'car', operator: 'Mahindra Thar 4x4 (Self Drive)', depTime: 'Airport / Station Delivery', arrTime: '24 Hours', duration: 'Full Day', price: 3500, badge: 'Top Rated', tier: 'premium' },
  { id: 'r4', type: 'cab', operator: 'Local City AC Cab (Full Day 10 Hrs / 100 Kms)', depTime: 'Chauffeur Included', arrTime: '10 Hours', duration: 'Full Day', price: 2200, badge: 'Comfort', tier: 'mid' },
  { id: 'r5', type: 'bus', operator: 'City Hop-On Hop-Off Sightseeing Bus', depTime: '09:00 AM', arrTime: '06:00 PM', duration: 'Daily Pass', price: 350, badge: 'Budget', tier: 'budget' }
];

export default function TravelOptions({ searchParams, onBackToSearch, onContinueToHotels }) {
  const parseCityName = (val, defaultVal) => {
    if (!val) return defaultVal;
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val.city) return val.city;
    return defaultVal;
  };

  const fromCity = parseCityName(searchParams?.fromCity || searchParams?.from, 'Goa');
  const toCity = parseCityName(searchParams?.toCity || searchParams?.to, 'Goa');
  const travelDates = searchParams?.dates || 'Oct 15 - Oct 25, 2026';

  const isSameCity = fromCity.toLowerCase().trim() === toCity.toLowerCase().trim();

  const [activeTab, setActiveTab] = useState(isSameCity ? 'rentals' : 'flights');
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Filters & Sorting
  const [sortBy, setSortBy] = useState('price_asc');
  const [maxPrice, setMaxPrice] = useState(6000);

  const [optionsMap, setOptionsMap] = useState({
    flights: isSameCity ? [] : mockFlightOptions,
    trains: isSameCity ? [] : mockTrainOptions,
    buses: mockBusOptions,
    rentals: mockLocalRentalOptions
  });

  useEffect(() => {
    setLoading(true);
    getRouteSuggestions(fromCity, toCity, 'mid')
      .then((data) => {
        if (data && data.transport_options && data.transport_options.length > 0) {
          const adapted = data.transport_options.map((t, idx) => ({
            id: `api_${idx}`,
            type: t.type,
            operator: t.provider,
            depTime: t.type === 'flight' ? '08:00 AM' : '07:00 PM',
            arrTime: t.duration,
            duration: t.duration,
            price: t.cost,
            badge: idx === 0 ? 'Cheapest' : null,
            tier: t.tier
          }));
          
          setOptionsMap(prev => ({
            ...prev,
            rentals: mockLocalRentalOptions,
            buses: adapted.filter(a => a.type === 'bus').length ? adapted.filter(a => a.type === 'bus') : mockBusOptions,
            trains: isSameCity ? [] : (adapted.filter(a => a.type === 'train').length ? adapted.filter(a => a.type === 'train') : mockTrainOptions),
            flights: isSameCity ? [] : (adapted.filter(a => a.type === 'flight').length ? adapted.filter(a => a.type === 'flight') : mockFlightOptions)
          }));
        }
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setLoading(false), 300);
      });
  }, [fromCity, toCity, isSameCity]);

  const currentOptions = optionsMap[activeTab] || [];

  const filteredOptions = currentOptions
    .filter(item => item.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background text-on-background pb-28 md:pb-16">

      {/* Header Route Bar */}
      <div className="bg-surface border-b border-surface-container-highest shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSearch}
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface flex items-center gap-2">
                {fromCity} <span className="text-primary-container">➔</span> {toCity}
              </h1>
              <p className="text-xs text-on-surface-variant font-medium">
                {isSameCity ? `📍 Local City Travel Mode (${fromCity})` : `${travelDates} • Intercity Travel`}
              </p>
            </div>
          </div>

          <button
            onClick={onBackToSearch}
            className="text-xs font-bold text-primary-container hover:bg-primary-fixed px-3.5 py-1.5 rounded-full transition-colors border border-primary-container/30 flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">edit</span> Change Route
          </button>
        </div>

        {/* Same-City Informational Banner */}
        {isSameCity && (
          <div className="bg-emerald-50 border-y border-emerald-200 px-4 sm:px-6 py-2.5 text-emerald-800 text-xs font-semibold flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-emerald-600">location_on</span>
              <span>Same city selected ({fromCity})! Displaying local bike rentals, self-drive cars, city cabs, and local sightseeing buses.</span>
            </div>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold uppercase">Local Mode Active</span>
          </div>
        )}

        {/* Transport Category Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-6 overflow-x-auto no-scrollbar border-t border-surface-container-highest">
          {[
            { id: 'rentals', label: isSameCity ? 'Bike & Car Rentals' : 'Rentals', icon: 'directions_car', disabled: false },
            { id: 'buses', label: isSameCity ? 'City Sightseeing Buses' : 'Buses', icon: 'directions_bus', disabled: false },
            { id: 'flights', label: 'Flights', icon: 'flight', disabled: isSameCity },
            { id: 'trains', label: 'Trains', icon: 'train', disabled: isSameCity }
          ].map(tab => (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => { setActiveTab(tab.id); setSelectedOption(null); }}
              className={`py-3 flex items-center gap-2 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                tab.disabled ? 'opacity-35 cursor-not-allowed border-transparent text-outline' :
                activeTab === tab.id
                  ? 'border-primary-container text-primary-container font-extrabold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
              {tab.disabled && <span className="text-[9px] bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded font-bold ml-1">N/A Same City</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

        {/* Left Column: Options & Filters */}
        <div className="space-y-6">

          {/* Filter & Sort Control Bar */}
          <div className="bg-surface rounded-2xl p-4 border border-surface-container-highest ambient-shadow-1 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-lg">sort</span>
              <label className="text-xs font-bold text-on-surface-variant">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container-low border border-surface-container-highest rounded-xl text-xs font-semibold text-on-surface px-3 py-1.5 outline-none"
              >
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-on-surface-variant">Max Budget: ₹{maxPrice}</label>
              <input
                type="range"
                min="300"
                max="8000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-primary-container cursor-pointer"
              />
            </div>
          </div>

          {/* Options Cards */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-surface rounded-2xl p-6 border border-surface-container-highest animate-pulse space-y-4">
                  <div className="h-6 bg-surface-container-highest rounded-lg w-1/3" />
                  <div className="h-8 bg-surface-container-highest rounded-xl w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="bg-surface rounded-2xl p-10 text-center border border-surface-container-highest space-y-3">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">filter_alt_off</span>
              <h3 className="font-bold text-base text-on-surface">No options matching filters</h3>
              <p className="text-xs text-on-surface-variant">Try adjusting max budget slider.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOptions.map((item) => {
                const isSelected = selectedOption?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`bg-surface rounded-2xl p-5 border transition-all duration-200 ambient-shadow-1 ${
                      isSelected
                        ? 'border-primary-container ring-2 ring-primary-container/20 bg-primary-fixed/20'
                        : 'border-surface-container-highest hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary font-bold text-xl">
                          <span className="material-symbols-outlined">
                            {item.type === 'flight' ? 'flight_takeoff' : item.type === 'train' ? 'train' : item.type === 'bike' || item.type === 'scooter' ? 'two_wheeler' : 'directions_car'}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-on-surface">{item.operator}</h3>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-on-surface-variant font-medium">{item.depTime} • {item.arrTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-surface-container-highest">
                        <div className="text-right">
                          <p className="text-lg font-extrabold text-on-surface">₹{item.price.toLocaleString('en-IN')}</p>
                          <p className="text-[10px] text-on-surface-variant">{item.duration}</p>
                        </div>
                        
                        <button
                          onClick={() => setSelectedOption(item)}
                          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary-container text-white shadow-md'
                              : 'border border-primary-container text-primary-container hover:bg-primary-container/10'
                          }`}
                        >
                          {isSelected ? '✓ Selected' : 'Select'}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Sidebar Summary */}
        <div>
          <div className="sticky top-24 bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-2 space-y-6">
            <h3 className="font-bold text-base text-on-surface pb-3 border-b border-surface-container-highest">Your Selection</h3>
            
            {selectedOption ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-highest space-y-1">
                  <p className="text-xs font-bold text-on-surface">{selectedOption.operator}</p>
                  <p className="text-xs font-extrabold text-primary-container">₹{selectedOption.price} ({selectedOption.duration})</p>
                </div>
                <button
                  onClick={() => onContinueToHotels?.(selectedOption)}
                  className="w-full bg-primary-container text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-primary shadow-lg transition-all cursor-pointer"
                >
                  Continue to Hotel Booking &amp; Timeline ➔
                </button>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant text-center py-6">Select a transport or rental option to proceed.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
