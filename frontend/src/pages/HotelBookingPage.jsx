import { useState } from 'react';

const MOCK_HOTELS = [
  {
    id: 'h1',
    name: 'Taj Exotica Resort & Spa',
    city: 'Goa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 1240,
    pricePerNight: 8500,
    platformPrices: {
      makeMyTrip: 8500,
      bookingCom: 8750,
      agoda: 8400,
      zostel: null
    },
    badge: 'Luxury 5-Star',
    amenities: ['Ocean View', 'Private Pool', 'Breakfast Included', 'Free WiFi']
  },
  {
    id: 'h2',
    name: 'Zostel Goa (Anjuna Beach)',
    city: 'Goa',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 890,
    pricePerNight: 950,
    platformPrices: {
      makeMyTrip: 1100,
      bookingCom: 1050,
      agoda: 990,
      zostel: 950
    },
    badge: 'Backpacker Favorite',
    amenities: ['Dorm & Private Rooms', 'Social Vibe', 'Cafe & Bar', 'Free WiFi']
  },
  {
    id: 'h3',
    name: 'W Goa - Vagator Beach Resort',
    city: 'Goa',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 650,
    pricePerNight: 12000,
    platformPrices: {
      makeMyTrip: 12000,
      bookingCom: 12300,
      agoda: 11800,
      zostel: null
    },
    badge: 'Beachfront Resort',
    amenities: ['Cliffside Pool', 'Spa', 'Sunset Lounge', 'Free Breakfast']
  },
  {
    id: 'h4',
    name: 'Heritage Villa Fontainhas',
    city: 'Goa',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 420,
    pricePerNight: 3200,
    platformPrices: {
      makeMyTrip: 3200,
      bookingCom: 3100,
      agoda: 3250,
      zostel: null
    },
    badge: 'Portuguese Heritage',
    amenities: ['Boutique Rooms', 'Heritage Garden', 'Art Cafe', 'Free WiFi']
  }
];

export default function HotelBookingPage({ transportOption, onBack, onContinueToFinalItinerary }) {
  const [selectedHotel, setSelectedHotel] = useState(MOCK_HOTELS[1]); // Default Zostel
  const [selectedPlatform, setSelectedPlatform] = useState('agoda');
  const [skipHotel, setSkipHotel] = useState(false);

  const handleProceed = () => {
    const hotelData = skipHotel ? null : {
      ...selectedHotel,
      chosenPlatform: selectedPlatform,
      finalPrice: selectedHotel.platformPrices[selectedPlatform] || selectedHotel.pricePerNight
    };
    onContinueToFinalItinerary?.(hotelData);
  };

  return (
    <div className="min-h-screen bg-background text-on-background pb-28 md:pb-16 pt-4">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary mb-3"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span> Back to Transport Selection
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-surface-container-highest pb-4">
          <div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
              Step 2 of 4: Accommodation Comparison (Optional)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
              Select Hotels &amp; Stays in Goa
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Compare prices across MakeMyTrip, Booking.com, Agoda, and Zostel for best deals.
            </p>
          </div>

          <button
            onClick={() => {
              setSkipHotel(true);
              handleProceed();
            }}
            className="text-xs font-bold text-on-surface-variant hover:text-primary bg-surface-container hover:bg-surface-container-high px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Skip Accommodation (I have my own stay) ➔
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        
        {/* Left List of Hotels */}
        <div className="space-y-6">
          {MOCK_HOTELS.map((hotel) => {
            const isSelected = !skipHotel && selectedHotel?.id === hotel.id;
            return (
              <div
                key={hotel.id}
                className={`bg-surface rounded-3xl overflow-hidden border transition-all duration-200 ambient-shadow-1 flex flex-col md:flex-row ${
                  isSelected ? 'border-primary-container ring-2 ring-primary-container/20 bg-primary-fixed/10' : 'border-surface-container-highest'
                }`}
              >
                {/* Image */}
                <div className="md:w-64 h-48 md:h-auto relative shrink-0">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {hotel.badge}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-lg text-on-surface">{hotel.name}</h3>
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2 py-0.5 rounded-md">
                        <span className="material-symbols-outlined text-sm text-emerald-600">star</span>
                        {hotel.rating} ({hotel.reviews})
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {hotel.amenities.map(a => (
                        <span key={a} className="text-[10px] font-semibold bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Multi-platform Prices Comparison */}
                  <div className="pt-3 border-t border-surface-container-highest space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Compare Platform Rates:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'makeMyTrip', label: 'MakeMyTrip' },
                        { key: 'bookingCom', label: 'Booking.com' },
                        { key: 'agoda', label: 'Agoda' },
                        { key: 'zostel', label: 'Zostel Direct' }
                      ].map(p => {
                        const price = hotel.platformPrices[p.key];
                        if (!price) return null;
                        const isBest = price === Math.min(...Object.values(hotel.platformPrices).filter(Boolean));
                        const isChosen = isSelected && selectedPlatform === p.key;
                        return (
                          <button
                            key={p.key}
                            onClick={() => {
                              setSelectedHotel(hotel);
                              setSelectedPlatform(p.key);
                              setSkipHotel(false);
                            }}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                              isChosen
                                ? 'border-primary-container bg-primary-container text-white shadow-sm'
                                : isBest
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                                : 'border-surface-container-highest hover:bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            <p className="text-[10px] font-bold truncate">{p.label}</p>
                            <p className="text-xs font-extrabold mt-0.5">₹{price.toLocaleString('en-IN')}</p>
                            {isBest && !isChosen && <span className="text-[8px] uppercase font-bold text-emerald-600 block">Lowest</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Right Sticky Booking Summary */}
        <div>
          <div className="sticky top-24 bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-2 space-y-6">
            <h3 className="font-bold text-base text-on-surface pb-3 border-b border-surface-container-highest">
              Trip Package Summary
            </h3>

            {/* Selected Transport */}
            {transportOption && (
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-highest space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">Transport Chosen</span>
                <p className="text-xs font-bold text-on-surface">{transportOption.operator}</p>
                <p className="text-xs font-extrabold text-primary-container">₹{transportOption.price}</p>
              </div>
            )}

            {/* Selected Hotel */}
            {!skipHotel && selectedHotel ? (
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-highest space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">Stay Chosen</span>
                <p className="text-xs font-bold text-on-surface">{selectedHotel.name}</p>
                <p className="text-xs text-on-surface-variant">Via <span className="font-bold uppercase text-on-surface">{selectedPlatform}</span></p>
                <p className="text-xs font-extrabold text-primary-container">₹{(selectedHotel.platformPrices[selectedPlatform] || selectedHotel.pricePerNight).toLocaleString('en-IN')} / night</p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                Accommodation Skipped
              </div>
            )}

            {/* Total Cost */}
            <div className="pt-3 border-t border-surface-container-highest flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface-variant">Package Estimate</span>
              <span className="text-xl font-extrabold text-primary-container">
                ₹{(
                  (transportOption?.price || 4500) + 
                  (!skipHotel && selectedHotel ? (selectedHotel.platformPrices[selectedPlatform] || selectedHotel.pricePerNight) * 3 : 0)
                ).toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleProceed}
              className="w-full bg-primary-container text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-primary shadow-lg shadow-primary-container/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Continue to Final Itinerary ➔
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
