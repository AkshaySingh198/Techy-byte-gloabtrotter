import { useState } from 'react';
import { useTrip } from '../../context/TripContext';

export default function AddStopModal({ isOpen, onClose }) {
  const { addStop } = useTrip();

  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('2026-09-04');
  const [endDate, setEndDate] = useState('2026-09-06');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after end date.');
      return;
    }

    addStop({
      city: city.trim(),
      startDate,
      endDate,
    });

    setCity('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl max-w-md w-full p-6 relative ambient-shadow-3 border border-surface-container-highest">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-sm">add_location_alt</span>
            Multi-City Route
          </div>
          <h3 className="font-display text-xl font-extrabold text-on-surface">
            Add Destination Stop
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Expand your trip itinerary with an additional city or region stop.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              City / Region Name
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. South Goa, Hampi, Gokarna"
              className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </p>
          )}

          <div className="pt-3 border-t border-surface-container-highest flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-surface-container-highest text-xs font-semibold text-on-surface hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-primary transition-all cursor-pointer shadow-sm"
            >
              Add Stop to Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
