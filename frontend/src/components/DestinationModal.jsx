import ShinyText from './react-bits/ShinyText';

export default function DestinationModal({ destination, onClose, onBook }) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl max-w-xl w-full overflow-hidden relative ambient-shadow-3 border border-surface-container-highest max-h-[85vh] flex flex-col">
        {/* Header Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full backdrop-blur-md transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          {/* Badge */}
          <div
            className={`absolute top-3.5 left-3.5 ${destination.tagColor} px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 backdrop-blur-md`}
          >
            <span className="material-symbols-outlined text-xs">
              {destination.tagIcon}
            </span>
            {destination.tag}
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h3 className="font-display text-2xl font-extrabold drop-shadow">
              {destination.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span
                className="material-symbols-outlined text-tertiary-fixed-dim text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-bold">{destination.rating}</span>
              <span className="text-white/80">({destination.reviews})</span>
              <span className="text-white/40">•</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                Best: {destination.bestSeason}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              Overview
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Trip Highlights & Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { icon: 'hotel', text: '4-Star Boutique Hotel Stay' },
                { icon: 'tour', text: 'Guided Excursions' },
                { icon: 'restaurant', text: 'Daily Breakfast & Food Tastings' },
                { icon: 'directions_bus', text: 'Airport Transfers Included' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container border border-surface-container-highest text-xs font-medium text-on-surface"
                >
                  <span className="material-symbols-outlined text-primary text-base">
                    {item.icon}
                  </span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bar with Rupees (₹) */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-surface-container-highest">
            <div>
              <span className="text-[11px] text-on-surface-variant block">Total Package</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-extrabold text-primary">
                  {destination.price}
                </span>
                <span className="text-xs text-on-surface-variant font-semibold">/ person</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-surface-container-highest text-on-surface font-semibold text-xs hover:bg-surface-container"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Starting custom itinerary booking for ${destination.name}!`);
                  onClose();
                }}
                className="bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-primary hover:shadow transition-all"
              >
                <ShinyText text="Book Package" speed={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
