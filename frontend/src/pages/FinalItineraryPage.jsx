import { useState } from 'react';

export default function FinalItineraryPage({ transportOption, hotelOption, onBack, onProceedToPayment }) {
  const [selectedTier, setSelectedTier] = useState('standard'); // 'budget' | 'standard' | 'luxury'

  const transportCost = transportOption?.price || 4500;
  const hotelCost = hotelOption ? (hotelOption.finalPrice || 2800) * 3 : 0;
  const activityCost = 3200;
  const subtotal = transportCost + hotelCost + activityCost;
  const gst = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gst;

  return (
    <div className="min-h-screen bg-background text-on-background pb-28 md:pb-16 pt-4">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary mb-3"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span> Back to Hotel Booking
        </button>

        <div className="border-b border-surface-container-highest pb-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            Step 3 of 4: Final Itinerary &amp; Cost Estimation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            Your Complete Goa Travel Package &amp; Timeline
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Review your selected transport, stays, day-wise schedule, and cost breakdown before payment.
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        
        {/* Left Column: Itinerary Details & Day Schedule */}
        <div className="space-y-6">

          {/* Selected Services Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Transport Card */}
            <div className="bg-surface rounded-2xl p-5 border border-surface-container-highest ambient-shadow-1 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">directions_car</span>
                Selected Transport
              </div>
              <h3 className="font-extrabold text-sm text-on-surface">{transportOption?.operator || 'IndiGo Flight'}</h3>
              <p className="text-xs text-on-surface-variant font-medium">₹{transportCost.toLocaleString('en-IN')}</p>
            </div>

            {/* Hotel Card */}
            <div className="bg-surface rounded-2xl p-5 border border-surface-container-highest ambient-shadow-1 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">hotel</span>
                Selected Accommodation
              </div>
              <h3 className="font-extrabold text-sm text-on-surface">
                {hotelOption ? hotelOption.name : 'Own Accommodation / Skipped'}
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                {hotelOption ? `₹${hotelCost.toLocaleString('en-IN')} (3 Nights)` : '₹0'}
              </p>
            </div>

          </div>

          {/* Permit Check Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-blue-900 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-xl">verified_user</span>
              <span>Sikkim / Ladakh Permit Status: No Inner Line Permit (ILP) required for Goa coastal zone.</span>
            </div>
            <span className="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-bold uppercase">Clear</span>
          </div>

          {/* Day-by-Day Timeline Schedule */}
          <div className="bg-surface rounded-3xl p-6 border border-surface-container-highest space-y-6 ambient-shadow-1">
            <h3 className="font-extrabold text-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              Day-by-Day Customized Timeline
            </h3>

            <div className="space-y-6 border-l-2 border-primary-container/30 pl-4 ml-2">
              {[
                {
                  day: 'Day 1',
                  title: 'Arrival & Calangute Beach Sunset 🌅',
                  desc: 'Pick up from airport/station, check-in to stay, relaxed evening stroll along beach shacks.'
                },
                {
                  day: 'Day 2',
                  title: 'Water Sports & Fort Aguada 🌊',
                  desc: 'Baga beach parasailing & jet ski, followed by historic 17th century Portuguese fort tour.'
                },
                {
                  day: 'Day 3',
                  title: 'Dudhsagar Waterfalls Trek 🏞️',
                  desc: 'Jeep safari into Bhagwan Mahavir Wildlife Sanctuary to experience majestic cascades.'
                },
                {
                  day: 'Day 4',
                  title: 'Old Goa Latin Quarter (Fontainhas) 🏛️',
                  desc: 'Heritage walk amidst colorful Portuguese villas, art cafes, and souvenir picking.'
                }
              ].map((d, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-primary-container border-2 border-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{d.day}</span>
                  <h4 className="font-bold text-sm text-on-surface">{d.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Cost Estimation & Final Payment Trigger */}
        <div>
          <div className="sticky top-24 bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-2 space-y-6">
            <h3 className="font-extrabold text-base text-on-surface pb-3 border-b border-surface-container-highest">
              Cost Breakdown &amp; Payment
            </h3>

            {/* Cost Details */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Transport ({transportOption?.operator || 'Transport'}):</span>
                <span className="font-bold text-on-surface">₹{transportCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Accommodation (3 Nights):</span>
                <span className="font-bold text-on-surface">₹{hotelCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Guided Activities &amp; Permits:</span>
                <span className="font-bold text-on-surface">₹{activityCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxes &amp; GST (18%):</span>
                <span className="font-bold text-on-surface">₹{gst.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-3 border-t border-surface-container-highest flex justify-between items-center text-sm font-extrabold">
                <span className="text-on-surface">Final Total Amount:</span>
                <span className="text-xl text-primary-container font-extrabold">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Final Payment Button */}
            <button
              onClick={() => onProceedToPayment?.({
                id: 101,
                name: `Goa Expedition (${transportOption?.operator || 'Flight'})`,
                amount: totalAmount
              })}
              className="w-full bg-primary-container text-white py-4 rounded-2xl font-bold text-sm hover:bg-primary shadow-xl shadow-primary-container/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              Proceed to Final Payment &amp; Confirmation ➔
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
