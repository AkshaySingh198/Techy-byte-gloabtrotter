import { useState } from 'react';
import { useTrip } from '../../context/TripContext';

export default function AddActivityModal({ isOpen, onClose, defaultDayNum = 1 }) {
  const { addActivity, itineraryDays } = useTrip();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Activity');
  const [cost, setCost] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [location, setLocation] = useState('');
  const [dayNum, setDayNum] = useState(defaultDayNum);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter an activity title.');
      return;
    }

    addActivity({
      title: title.trim(),
      category,
      cost: Number(cost) || 0,
      time: time.trim() || 'TBD',
      location: location.trim() || 'Destination',
      dayNum: Number(dayNum),
      notes: notes.trim(),
      provider: 'Custom Entry',
    });

    // Reset
    setTitle('');
    setCost('');
    setLocation('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl max-w-lg w-full p-6 relative ambient-shadow-3 border border-surface-container-highest max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-sm">local_activity</span>
            Custom Event
          </div>
          <h3 className="font-display text-xl font-extrabold text-on-surface">
            Add Activity to Itinerary
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Add custom sightseeing, dining, or travel stops to your day-wise schedule.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Activity Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scuba Diving at Grand Island, Sunset Dinner"
              className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Activity">🎟️ Activity</option>
                <option value="Meal">🍽️ Dining / Meal</option>
                <option value="Travel">✈️ Travel</option>
                <option value="Hotel">🏨 Hotel / Stay</option>
                <option value="Rental">🛵 Rental Transport</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Assign to Day
              </label>
              <select
                value={dayNum}
                onChange={(e) => setDayNum(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              >
                {itineraryDays.map((d) => (
                  <option key={d.dayNum} value={d.dayNum}>
                    Day {d.dayNum} ({d.date})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Estimated Cost (₹)
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Time Slot
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 10:30 AM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Palolem Beach, North Goa"
              className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Notes & Hints
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Booking codes, dress code, entry ticket details..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface text-on-surface focus:outline-none focus:border-primary resize-none"
            />
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
              Add to Day {dayNum}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
