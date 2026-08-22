import { useState, useEffect } from 'react';

const mockDaywiseData = [
  {
    day_number: 1,
    date: '2026-10-15',
    title: 'Arrival in Goa & Baga Beach Sunset',
    emoji: '✈️',
    stops: [{ id: 1, city: 'Goa' }],
    activities: [
      { id: 101, name: 'Baga Beach Watersports (Parasailing & Jet Ski)', time: '11:00 AM', duration: '2h', cost: 1800, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400' },
      { id: 102, name: 'Fontainhas Latin Quarter Walking Tour', time: '04:30 PM', duration: '1.5h', cost: 500, image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400' }
    ]
  },
  {
    day_number: 2,
    date: '2026-10-16',
    title: 'Dudhsagar Waterfalls & Spice Plantation',
    emoji: '🌊',
    stops: [{ id: 1, city: 'Goa' }],
    activities: [
      { id: 103, name: 'Dudhsagar Waterfalls Trek & Jeep Safari', time: '09:00 AM', duration: '6h', cost: 2200, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' }
    ]
  },
  {
    day_number: 3,
    date: '2026-10-17',
    title: 'Fly to Gangtok & Ridge Park View',
    emoji: '🏔️',
    stops: [{ id: 2, city: 'Gangtok Sikkim' }],
    activities: [
      { id: 104, name: 'Gangtok Cable Car Ride & MG Marg Stroll', time: '03:00 PM', duration: '2h', cost: 350, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400' }
    ]
  }
];

export default function TripCalendarTimeline({ tripId = 1, onBack }) {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'calendar'
  const [days, setDays] = useState(mockDaywiseData);
  const [editingActivity, setEditingActivity] = useState(null); // Activity popover state
  const [editTime, setEditTime] = useState('');
  const [expandedDay, setExpandedDay] = useState(1);

  const handleEditClick = (act, dayNum) => {
    setEditingActivity({ ...act, dayNum });
    setEditTime(act.time);
  };

  const handleSaveEdit = () => {
    if (!editingActivity) return;
    setDays(prev => prev.map(d => {
      if (d.day_number === editingActivity.dayNum) {
        return {
          ...d,
          activities: d.activities.map(a => a.id === editingActivity.id ? { ...a, time: editTime } : a)
        };
      }
      return d;
    }));
    setEditingActivity(null);
  };

  const handleRemoveActivity = (actId, dayNum) => {
    setDays(prev => prev.map(d => {
      if (d.day_number === dayNum) {
        return {
          ...d,
          activities: d.activities.filter(a => a.id !== actId)
        };
      }
      return d;
    }));
  };

  return (
    <div className="min-h-screen bg-background text-on-background pb-16">

      {/* Top Header */}
      <div className="bg-surface border-b border-surface-container-highest sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface flex items-center gap-2">
                Goa &amp; Sikkim Expedition <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-300">ILP Approved</span>
              </h1>
              <p className="text-xs text-on-surface-variant">Oct 15 - Oct 25, 2026 • 11 Days Itinerary Timeline</p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex bg-surface-container rounded-xl p-1">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'timeline' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">view_timeline</span> Timeline View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                viewMode === 'calendar' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">calendar_month</span> Calendar Grid
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {viewMode === 'timeline' ? (
          /* ================= VERTICAL TIMELINE VIEW ================= */
          <div className="space-y-6 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-surface-container-highest">
            {days.map((day) => {
              const dayTotalCost = day.activities.reduce((acc, a) => acc + a.cost, 0);
              const isExpanded = expandedDay === day.day_number;

              return (
                <div key={day.day_number} className="relative pl-10 sm:pl-14 space-y-3">
                  
                  {/* Timeline Node Icon */}
                  <div className="absolute left-2 sm:left-4 top-1 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold shadow-md">
                    {day.day_number}
                  </div>

                  {/* Day Card Header */}
                  <div
                    onClick={() => setExpandedDay(isExpanded ? null : day.day_number)}
                    className="bg-surface rounded-2xl p-4 border border-surface-container-highest ambient-shadow-1 hover:ambient-shadow-2 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{day.emoji}</span>
                        <h3 className="font-extrabold text-base text-on-surface">Day {day.day_number}: {day.title}</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">{day.date} • Destination: {day.stops.map(s => s.city).join(', ')}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        ₹{dayTotalCost.toLocaleString('en-IN')}
                      </span>
                      <span className="material-symbols-outlined text-on-surface-variant">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                  </div>

                  {/* Day Activities List */}
                  {isExpanded && (
                    <div className="space-y-3 pt-1">
                      {day.activities.length === 0 ? (
                        <p className="text-xs text-on-surface-variant italic pl-2">No activities scheduled for this day yet.</p>
                      ) : (
                        day.activities.map((act) => (
                          <div
                            key={act.id}
                            className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary-container/40 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img src={act.image} alt={act.name} className="w-14 h-14 rounded-xl object-cover" />
                              <div>
                                <h4 className="font-bold text-sm text-on-surface">{act.name}</h4>
                                <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-1">
                                  <span className="flex items-center gap-1 text-primary-container font-semibold">
                                    <span className="material-symbols-outlined text-sm">schedule</span> {act.time} ({act.duration})
                                  </span>
                                  <span className="font-bold text-on-surface">₹{act.cost}</span>
                                </div>
                              </div>
                            </div>

                            {/* Actions Popover Trigger */}
                            <div className="flex items-center gap-2 justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-container-highest">
                              <button
                                onClick={() => handleEditClick(act, day.day_number)}
                                className="px-3 py-1.5 rounded-xl border border-surface-container-highest text-xs font-semibold hover:bg-surface-container text-on-surface"
                              >
                                Edit Time
                              </button>
                              <button
                                onClick={() => handleRemoveActivity(act.id, day.day_number)}
                                className="p-1.5 rounded-xl text-red-500 hover:bg-red-50"
                                title="Remove activity"
                              >
                                <span className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        ) : (
          /* ================= CALENDAR GRID VIEW ================= */
          <div className="bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-2 space-y-4">
            <h3 className="font-bold text-base text-on-surface">October 2026 Calendar Grid</h3>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface-variant border-b border-surface-container-highest pb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((dateNum) => {
                const isTripDate = dateNum >= 15 && dateNum <= 25;
                return (
                  <div
                    key={dateNum}
                    className={`min-h-[70px] p-2 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isTripDate
                        ? 'bg-primary-fixed/40 border-primary-container text-on-surface font-bold'
                        : 'bg-surface-container-low border-surface-container-highest text-on-surface-variant opacity-60'
                    }`}
                  >
                    <span className="text-xs">{dateNum}</span>
                    {isTripDate && (
                      <span className="text-[10px] bg-primary-container text-white px-1.5 py-0.5 rounded-md truncate font-semibold">
                        Day {dateNum - 14}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Quick Edit Time Popover Modal */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-3xl max-w-sm w-full p-6 border border-surface-container-highest shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest">
              <h3 className="font-bold text-base text-on-surface">Edit Scheduled Time</h3>
              <button onClick={() => setEditingActivity(null)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant font-medium">{editingActivity.name}</p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">Scheduled Time</label>
              <input
                type="text"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                placeholder="e.g. 11:30 AM"
                className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-sm font-semibold outline-none focus:border-primary-container"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setEditingActivity(null)}
                className="flex-1 py-2.5 rounded-xl border border-surface-container-highest text-xs font-bold text-on-surface"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
