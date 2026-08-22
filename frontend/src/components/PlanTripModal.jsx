import { useState, useEffect } from 'react';
import ShinyText from './react-bits/ShinyText';

export default function PlanTripModal({ searchData, onClose }) {
  const [step, setStep] = useState('generating');

  useEffect(() => {
    if (searchData) {
      setStep('generating');
      const timer = setTimeout(() => {
        setStep('ready');
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [searchData]);

  if (!searchData) return null;

  const destinationName = searchData.to || 'Your Dream Destination';
  const originName = searchData.from || 'Origin City';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl max-w-xl w-full p-6 sm:p-7 relative ambient-shadow-3 border border-surface-container-highest max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {step === 'generating' ? (
          <div className="text-center py-10 space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-primary-container/20 animate-ping" />
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-spin">
                <span className="material-symbols-outlined text-2xl">sync</span>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-on-surface">
                Generating Custom Itinerary...
              </h3>
              <p className="text-on-surface-variant text-xs mt-1">
                Searching flight routes from <span className="font-semibold text-primary">{originName}</span> to <span className="font-semibold text-primary">{destinationName}</span>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-1.5">
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                AI Itinerary Ready
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface">
                5-Day Trip: {destinationName}
              </h3>
              <p className="text-on-surface-variant text-xs">
                Departing from {originName} • Customized travel plan
              </p>
            </div>

            {/* Schedule timeline */}
            <div className="space-y-3 border-l-2 border-primary/20 pl-3.5 ml-1.5 text-xs">
              {[
                {
                  day: 'Day 1',
                  title: 'Arrival & Scenic Sunset Walk',
                  desc: 'Check-in to your boutique stay, explore historical downtown alleyways, and enjoy local dinner.',
                },
                {
                  day: 'Day 2',
                  title: 'Iconic Landmarks & Guided Tour',
                  desc: 'Skip-the-line pass to the main heritage sites, visit artisanal markets, and experience authentic tasting.',
                },
                {
                  day: 'Day 3',
                  title: 'Nature Excursion & Viewpoints',
                  desc: 'Half-day scenic trip to surrounding mountain/coastal viewpoints with local guide.',
                },
                {
                  day: 'Day 4',
                  title: 'Local Markets & Gastronomy',
                  desc: 'Coffee tour, vintage shopping, sunset photography session, and food tour.',
                },
                {
                  day: 'Day 5',
                  title: 'Leisure Morning & Departure',
                  desc: 'Relaxing spa morning, souvenir picking, and transfer back to the airport.',
                },
              ].map((d, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-primary-container border border-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {d.day}
                  </span>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-on-surface">
                    {d.title}
                  </h4>
                  <p className="text-on-surface-variant text-[11px] mt-0.5 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions with Rupees (₹) */}
            <div className="pt-4 border-t border-surface-container-highest flex flex-col sm:flex-row justify-between items-center gap-3">
              <div>
                <span className="text-[11px] text-on-surface-variant block">Estimated Cost</span>
                <span className="font-display text-xl font-extrabold text-primary">₹89,500</span>
                <span className="text-[11px] text-on-surface-variant font-medium"> / person</span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-surface-container-highest text-on-surface font-semibold text-xs hover:bg-surface-container flex-1 sm:flex-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    alert(`Booking confirmed for ${destinationName}!`);
                    onClose();
                  }}
                  className="bg-primary-container text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-primary hover:shadow transition-all flex-1 sm:flex-none"
                >
                  <ShinyText text="Save Itinerary" speed={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
