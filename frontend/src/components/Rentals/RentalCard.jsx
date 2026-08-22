export default function RentalCard({ rental, isSelected, onSelect }) {
  const {
    type,
    model,
    pricePerDay,
    provider,
    providerLogo,
    fuelType,
    rating,
    reviewsCount,
    image,
    transmission,
    seats,
    tagline,
  } = rental;

  // Fuel badge color scheme
  const fuelBadgeCls =
    fuelType === 'Electric'
      ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
      : fuelType === 'Diesel'
      ? 'bg-amber-500/15 text-amber-800 border-amber-500/30'
      : 'bg-sky-500/15 text-sky-700 border-sky-500/30';

  return (
    <div
      className={`group bg-surface rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
        isSelected
          ? 'border-2 border-primary ring-4 ring-primary/10 shadow-lg bg-primary/[0.02]'
          : 'border-surface-container-highest hover:border-primary/40 hover:shadow-md'
      }`}
    >
      {/* Selection Active Ribbon/Badge */}
      {isSelected && (
        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm z-10">
          <span className="material-symbols-outlined text-xs">check_circle</span>
          Selected
        </div>
      )}

      <div>
        {/* Vehicle Image Container */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3.5 bg-surface-container">
          <img
            src={image}
            alt={model}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80';
            }}
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            {/* Fuel Badge */}
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-xs ${fuelBadgeCls}`}
            >
              {fuelType}
            </span>

            {/* Type Badge */}
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md">
              {type}
            </span>
          </div>

          {/* Rating Badge Overlay */}
          <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1 text-xs">
            <span className="material-symbols-outlined text-amber-500 text-sm fill-1">
              star
            </span>
            <span className="font-bold text-on-surface">{rating}</span>
            <span className="text-[10px] text-on-surface-variant font-medium">
              ({reviewsCount})
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
            <span>{transmission}</span>
            <span>•</span>
            <span>{seats} Seats</span>
          </div>

          <h3 className="font-display font-extrabold text-base sm:text-lg text-on-surface group-hover:text-primary transition-colors">
            {model}
          </h3>

          <p className="text-xs text-on-surface-variant line-clamp-1">
            {tagline}
          </p>
        </div>

        {/* Provider */}
        <div className="flex items-center gap-2 pt-3 mt-3 border-t border-surface-container-highest">
          <img
            src={providerLogo}
            alt={provider}
            className="w-6 h-6 rounded-full object-cover border border-surface-container-highest"
          />
          <span className="text-xs font-semibold text-on-surface">
            {provider}
          </span>
          <span className="material-symbols-outlined text-emerald-600 text-xs ml-auto" title="Verified Partner">
            verified
          </span>
        </div>
      </div>

      {/* Footer: Price & Select Action */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-surface-container-highest/60">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-black text-xl sm:text-2xl text-primary">
              ₹{pricePerDay.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              / day
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium block">
            Free cancellation
          </span>
        </div>

        <button
          onClick={() => onSelect(rental)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
            isSelected
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md ring-2 ring-emerald-300'
              : 'bg-primary-container text-white hover:bg-primary hover:shadow-md'
          }`}
        >
          {isSelected ? (
            <>
              <span className="material-symbols-outlined text-sm">check</span>
              Selected
            </>
          ) : (
            <>
              Select
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
