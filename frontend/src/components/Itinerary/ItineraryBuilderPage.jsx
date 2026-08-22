import { useState, useMemo } from 'react';
import { useTrip } from '../../context/TripContext';
import AddStopModal from './AddStopModal';
import AddActivityModal from './AddActivityModal';

export default function ItineraryBuilderPage() {
  const {
    tripState,
    stops,
    removeStop,
    itineraryDays,
    removeActivity,
    moveActivityInDay,
    reassignActivityDay,
  } = useTrip();

  const { fromCity, toCity, startDate, endDate, selectedRental } = tripState;

  // Modal controls
  const [isAddStopOpen, setIsAddStopOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [selectedDayForActivity, setSelectedDayForActivity] = useState(1);

  // Toast / alert confirmation state
  const [confirmedNotice, setConfirmedNotice] = useState(false);

  // Calculate Running Summary totals
  const summary = useMemo(() => {
    let travelCost = 0;
    let hotelCost = 0;
    let rentalCost = 0;
    let activityCost = 0;

    itineraryDays.forEach((day) => {
      day.items.forEach((item) => {
        const cost = item.cost || 0;
        if (item.category === 'Travel') travelCost += cost;
        else if (item.category === 'Hotel') hotelCost += cost;
        else if (item.category === 'Rental') rentalCost += cost;
        else activityCost += cost;
      });
    });

    // If selected rental total cost exists, include it
    if (selectedRental && selectedRental.totalCost && rentalCost === 0) {
      rentalCost = selectedRental.totalCost;
    }

    const grandTotal = travelCost + hotelCost + rentalCost + activityCost;
    const totalDaysCount = itineraryDays.length;
    const citiesList = Array.from(new Set([fromCity, toCity, ...stops.map((s) => s.city)]));

    return {
      travelCost,
      hotelCost,
      rentalCost,
      activityCost,
      grandTotal,
      totalDaysCount,
      citiesList,
    };
  }, [itineraryDays, selectedRental, fromCity, toCity, stops]);

  const handleOpenAddActivityForDay = (dayNum) => {
    setSelectedDayForActivity(dayNum);
    setIsAddActivityOpen(true);
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Travel':
        return 'bg-indigo-500/15 text-indigo-700 border-indigo-500/30 icon-flight';
      case 'Hotel':
        return 'bg-teal-500/15 text-teal-700 border-teal-500/30 icon-hotel';
      case 'Rental':
        return 'bg-orange-500/15 text-orange-700 border-orange-500/30 icon-moped';
      case 'Meal':
        return 'bg-amber-500/15 text-amber-800 border-amber-500/30 icon-restaurant';
      default:
        return 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 icon-local_activity';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 md:pb-16 bg-background text-on-background">
      {/* Confirmed Toast Banner */}
      {confirmedNotice && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-2xl">check_circle</span>
          <div className="text-xs">
            <div className="font-bold text-sm">Itinerary Saved & Confirmed!</div>
            <div className="text-white/90">Your customized travel plan has been stored.</div>
          </div>
          <button onClick={() => setConfirmedNotice(false)} className="ml-2 text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="pt-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Day-Wise Trip Builder
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
                Itinerary Builder: {fromCity} ➔ {toCity}
              </h1>

              <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
                {startDate} to {endDate} • {summary.totalDaysCount} Days Plan • Auto-populated from your selections
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddStopOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-surface border border-surface-container-highest text-xs font-bold text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-base text-primary">add_location_alt</span>
                Add Stop
              </button>

              <button
                onClick={() => handleOpenAddActivityForDay(1)}
                className="px-4 py-2 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Activity
              </button>
            </div>
          </div>

          {/* Multi-city Route Stops Bar */}
          <div className="mt-4 bg-surface rounded-2xl p-3.5 border border-surface-container-highest flex flex-wrap items-center gap-2 text-xs">
            <span className="text-on-surface-variant font-bold uppercase tracking-wider text-[11px] mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">route</span>
              Route Stops:
            </span>

            {/* Primary Origin / Destination Pill */}
            <span className="px-3 py-1 bg-surface-container rounded-full border border-surface-container-highest text-on-surface font-semibold flex items-center gap-1">
              <span>🛫 {fromCity}</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
              <span>🛬 {toCity}</span>
            </span>

            {/* Additional Multi-City Stops */}
            {stops.map((stop) => (
              <span
                key={stop.id}
                className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-xs">place</span>
                <span>{stop.city}</span>
                <span className="text-[10px] text-on-surface-variant font-normal">
                  ({stop.startDate.slice(5)} to {stop.endDate.slice(5)})
                </span>
                <button
                  onClick={() => removeStop(stop.id)}
                  className="hover:text-red-500 ml-1 text-xs"
                  title="Remove Stop"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Layout Grid (Main Timeline + Summary Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Main Day-wise Schedule Timeline (3 columns on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {itineraryDays.map((day) => (
              <div
                key={day.dayNum}
                className="bg-surface rounded-2xl p-5 border border-surface-container-highest shadow-sm relative overflow-hidden"
              >
                {/* Day Header */}
                <div className="flex flex-wrap items-center justify-between pb-3.5 mb-4 border-b border-surface-container-highest gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-container text-white font-display font-black text-sm flex items-center justify-center shadow-xs">
                      D{day.dayNum}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-base text-on-surface flex items-center gap-2">
                        Day {day.dayNum} Overview
                        <span className="text-xs text-on-surface-variant font-normal">
                          • {day.date}
                        </span>
                      </h3>
                      <span className="text-xs text-primary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        {day.city}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenAddActivityForDay(day.dayNum)}
                    className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-bold hover:bg-primary/10 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add to Day {day.dayNum}
                  </button>
                </div>

                {/* Day Items List */}
                {day.items.length === 0 ? (
                  <div className="py-6 text-center text-on-surface-variant/70 text-xs border-2 border-dashed border-surface-container-highest rounded-xl bg-surface-container-low">
                    No activities scheduled for Day {day.dayNum}. Click "+ Add to Day {day.dayNum}" to customize.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {day.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="group bg-surface-container-low hover:bg-surface-container rounded-xl p-3.5 border border-surface-container-highest transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Reorder Up / Down Controls */}
                          <div className="flex flex-col gap-0.5 shrink-0 pt-0.5">
                            <button
                              disabled={index === 0}
                              onClick={() => moveActivityInDay(day.dayNum, item.id, 'up')}
                              className="text-on-surface-variant/60 hover:text-primary disabled:opacity-20 p-0.5 rounded cursor-pointer"
                              title="Move Up"
                            >
                              <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                            </button>
                            <button
                              disabled={index === day.items.length - 1}
                              onClick={() => moveActivityInDay(day.dayNum, item.id, 'down')}
                              className="text-on-surface-variant/60 hover:text-primary disabled:opacity-20 p-0.5 rounded cursor-pointer"
                              title="Move Down"
                            >
                              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                            </button>
                          </div>

                          {/* Item Details */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(
                                  item.category
                                )}`}
                              >
                                {item.category}
                              </span>

                              <span className="text-[11px] text-on-surface-variant font-semibold flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-xs">schedule</span>
                                {item.time}
                              </span>

                              {item.location && (
                                <span className="text-[11px] text-on-surface-variant/80 truncate max-w-[150px]">
                                  📍 {item.location}
                                </span>
                              )}
                            </div>

                            <h4 className="font-display font-extrabold text-sm text-on-surface group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>

                            {item.notes && (
                              <p className="text-[11px] text-on-surface-variant mt-0.5 line-clamp-1">
                                {item.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Price, Day Assignment & Delete Action */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-container-highest">
                          <div className="text-left sm:text-right">
                            <span className="font-display font-black text-sm text-primary block">
                              ₹{item.cost ? item.cost.toLocaleString('en-IN') : '0'}
                            </span>
                            <span className="text-[10px] text-on-surface-variant">
                              {item.provider || 'Included'}
                            </span>
                          </div>

                          {/* Reassign to Day Dropdown */}
                          <select
                            value={day.dayNum}
                            onChange={(e) => reassignActivityDay(item.id, Number(e.target.value))}
                            className="text-[11px] font-semibold bg-surface border border-surface-container-highest rounded-lg px-2 py-1 text-on-surface focus:outline-none focus:border-primary"
                            title="Reassign to Day"
                          >
                            {itineraryDays.map((d) => (
                              <option key={d.dayNum} value={d.dayNum}>
                                Move to Day {d.dayNum}
                              </option>
                            ))}
                          </select>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeActivity(item.id)}
                            className="text-on-surface-variant/60 hover:text-red-500 p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                            title="Remove Activity"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Running Summary Sidebar (1 col desktop / Sticky Mobile) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <div className="bg-surface rounded-2xl p-5 border border-surface-container-highest shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
                <h3 className="font-display font-extrabold text-base text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                  Running Summary
                </h3>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-700 px-2.5 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container-highest">
                  <span className="font-display font-black text-xl text-primary block">
                    {summary.totalDaysCount}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">
                    Days Used
                  </span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container-highest">
                  <span className="font-display font-black text-xl text-secondary block">
                    {summary.citiesList.length}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">
                    Cities Added
                  </span>
                </div>
              </div>

              {/* Cost Category Breakdown */}
              <div className="space-y-2.5 text-xs text-on-surface-variant border-t border-b border-surface-container-highest py-3">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>✈️</span> Travel Tickets
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{summary.travelCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>🏨</span> Hotels & Stays
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{summary.hotelCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>🛵</span> Destination Rentals
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{summary.rentalCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>🎟️</span> Sights & Activities
                  </span>
                  <span className="font-bold text-on-surface">
                    ₹{summary.activityCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Running Total Cost */}
              <div>
                <span className="text-xs text-on-surface-variant font-medium block">
                  Estimated Running Total
                </span>
                <span className="font-display font-black text-3xl text-primary block mt-0.5">
                  ₹{summary.grandTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  Taxes & fees auto-included
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setConfirmedNotice(true)}
                  className="w-full bg-primary-container text-white py-3 rounded-xl font-bold text-xs hover:bg-primary hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">bookmark</span>
                  Confirm & Save Itinerary
                </button>

                <button
                  onClick={() => {
                    alert(`Booking confirmed for ₹${summary.grandTotal.toLocaleString('en-IN')}! Confirmation sent.`);
                  }}
                  className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">payment</span>
                  Book All Items
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Running Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-surface-container-highest p-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-on-surface-variant">
              {summary.totalDaysCount} Days • {summary.citiesList.length} Cities
            </div>
            <div className="font-display font-black text-lg text-primary">
              ₹{summary.grandTotal.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            onClick={() => setConfirmedNotice(true)}
            className="bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-primary transition-all whitespace-nowrap cursor-pointer shadow-sm flex items-center gap-1"
          >
            <span>Save Plan</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Add Stop Modal */}
      <AddStopModal
        isOpen={isAddStopOpen}
        onClose={() => setIsAddStopOpen(false)}
      />

      {/* Add Activity Modal */}
      <AddActivityModal
        isOpen={isAddActivityOpen}
        defaultDayNum={selectedDayForActivity}
        onClose={() => setIsAddActivityOpen(false)}
      />
    </div>
  );
}
