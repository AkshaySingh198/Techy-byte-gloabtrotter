import { useTrip } from '../../context/TripContext';

export default function ItineraryModal({ isOpen, onClose }) {
  const { tripState } = useTrip();

  if (!isOpen) return null;

  const { fromCity, toCity, startDate, endDate, selectedRental } = tripState;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative ambient-shadow-3 border border-surface-container-highest max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-xs">auto_awesome</span>
            Itinerary Builder
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface">
            {toCity} Travel Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Trip from <span className="font-semibold text-primary">{fromCity}</span> to{' '}
            <span className="font-semibold text-primary">{toCity}</span> • {startDate} to {endDate}
          </p>
        </div>

        {/* Selected Transportation Section */}
        <div className="mb-6 bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">directions_car</span>
              Destination Transport Auto-Populated
            </span>
            <span className="text-[11px] bg-emerald-500/15 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
              Confirmed
            </span>
          </div>

          {selectedRental ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface rounded-xl p-4 border border-surface-container-highest">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedRental.image}
                  alt={selectedRental.model}
                  className="w-16 h-16 rounded-xl object-cover border border-surface-container-highest"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-container text-white">
                      {selectedRental.vehicleType || selectedRental.type}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      {selectedRental.fuelType}
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-base text-on-surface mt-0.5">
                    {selectedRental.model}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Provider: <span className="font-semibold">{selectedRental.provider}</span> • Pickup: {selectedRental.pickupLocation}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                <div className="text-xs text-on-surface-variant">Estimated Total</div>
                <div className="font-display font-black text-xl text-primary">
                  ₹{(selectedRental.totalCost || selectedRental.pricePerDay * 4).toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-on-surface-variant">
                  ₹{selectedRental.pricePerDay}/day
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">info</span>
              No rental vehicle selected yet. Choose a bike or car from the Rentals tab to auto-populate here.
            </div>
          )}
        </div>

        {/* Schedule Timeline */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-base text-on-surface">Daily Schedule Overview</h3>

          <div className="space-y-3 border-l-2 border-primary/20 pl-4 ml-2 text-xs">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Day 1 — Pickup & Arrival
              </span>
              <h4 className="font-display text-sm font-bold text-on-surface mt-0.5">
                Collect {selectedRental ? selectedRental.model : 'Vehicle'} at {selectedRental?.pickupLocation || 'Airport Hub'}
              </h4>
              <p className="text-on-surface-variant text-xs mt-0.5">
                Check-in at destination hotel, drive down scenic coastal road for sunset dinner.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-secondary border-2 border-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                Day 2 & 3 — Local Exploration
              </span>
              <h4 className="font-display text-sm font-bold text-on-surface mt-0.5">
                Self-driven City & Beach Hopping
              </h4>
              <p className="text-on-surface-variant text-xs mt-0.5">
                Enjoy flexible travel around key viewpoints, heritage markets, and local eateries.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-tertiary border-2 border-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">
                Final Day — Vehicle Drop-off
              </span>
              <h4 className="font-display text-sm font-bold text-on-surface mt-0.5">
                Return Vehicle & Departure
              </h4>
              <p className="text-on-surface-variant text-xs mt-0.5">
                Return key at drop-off location before outbound flight/train.
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-8 pt-4 border-t border-surface-container-highest flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-surface-container-highest text-on-surface font-semibold text-xs hover:bg-surface-container cursor-pointer"
          >
            Close Preview
          </button>
          <button
            onClick={() => {
              alert(`Trip itinerary with ${selectedRental ? selectedRental.model : 'rentals'} confirmed!`);
              onClose();
            }}
            className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-primary hover:shadow-md transition-all cursor-pointer"
          >
            Confirm & Save Trip
          </button>
        </div>
      </div>
    </div>
  );
}
