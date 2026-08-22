import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { searchCities, validateCity } from "../data/cities";
import BlurText from "./react-bits/BlurText";
import ShinyText from "./react-bits/ShinyText";

export default function HeroSection({ onSearch }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [startDate, setStartDate] = useState("2026-10-15");
  const [endDate, setEndDate] = useState("2026-10-25");
  
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const [dateError, setDateError] = useState("");

  const searchBoxRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: "power2.out" });
      gsap.fromTo(searchBoxRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.45, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  const handleFromChange = (val) => {
    setFromLocation(val);
    setFromError("");
    setFromSuggestions(val.length >= 1 ? searchCities(val) : []);
  };

  const handleToChange = (val) => {
    setToLocation(val);
    setToError("");
    setToSuggestions(val.length >= 1 ? searchCities(val) : []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFromError(""); setToError(""); setDateError("");

    const fromValid = validateCity(fromLocation);
    const toValid   = validateCity(toLocation);

    if (!fromLocation.trim()) { setFromError("Please enter a departure city."); return; }
    if (!fromValid) { setFromError('"' + fromLocation + '" not recognized. Try: Mumbai, Delhi, Goa...'); return; }
    if (!toLocation.trim()) { setToError("Please enter a destination city."); return; }
    if (!toValid) { setToError('"' + toLocation + '" not recognized. Try: Jaipur, Manali, Goa...'); return; }
    
    if (!startDate || !endDate) {
      setDateError("Travel start and end dates are required.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setDateError("End date must be after start date.");
      return;
    }
    
    if (onSearch) {
      onSearch({
        from: fromValid.city,
        to: toValid.city,
        fromCity: fromValid.city,
        toCity: toValid.city,
        startDate,
        endDate,
        dates: `${startDate} to ${endDate}`,
        fromObj: fromValid,
        toObj: toValid
      });
    }
  };

  const inputCls = (err) =>
    "w-full pl-10 pr-3 py-3 rounded-xl border " +
    (err
      ? "border-red-400 ring-2 ring-red-200"
      : "border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20") +
    " outline-none transition-all text-sm font-medium bg-surface text-on-surface placeholder:text-on-surface-variant/70";

  return (
    <section className="relative flex flex-col bg-[#111827] pt-24 pb-[155px]">

      {/* Amalfi Coast background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/amalfi-coast-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
      </div>

      {/* Hero text + search */}
      <div className="relative z-30 w-full max-w-5xl px-4 sm:px-6 mx-auto flex flex-col items-center text-center pt-8">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight leading-tight">
          <BlurText
            text="Plan Your Perfect Trip in Minutes"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-white drop-shadow-md"
          />
        </h1>
        <p ref={subtitleRef} className="font-body text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-8 drop-shadow font-medium leading-relaxed">
          Discover destinations, compare travel options, and build your itinerary in minutes.
        </p>

        {/* Search Bar - Generously Spaced Grid */}
        <div ref={searchBoxRef} className="w-full max-w-5xl bg-white/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl border border-white/40 relative z-40">
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">

              {/* Where From */}
              <div className="lg:col-span-3 text-left relative group">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-1 px-1">
                  Departure City
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-lg">location_on</span>
                  <input
                    value={fromLocation}
                    onChange={(e) => handleFromChange(e.target.value)}
                    onBlur={() => setTimeout(() => setFromSuggestions([]), 150)}
                    className={inputCls(fromError)}
                    placeholder="Where from?"
                    type="text"
                    autoComplete="off"
                  />
                </div>
                {fromSuggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-surface-container-highest z-50 overflow-hidden text-left">
                    {fromSuggestions.slice(0, 4).map((c) => (
                      <li
                        key={c.code + c.city}
                        onMouseDown={() => { setFromLocation(c.city); setFromSuggestions([]); setFromError(""); }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container cursor-pointer text-sm"
                      >
                        <span className="material-symbols-outlined text-base text-primary">flight_takeoff</span>
                        <span className="font-semibold text-on-surface">{c.city}</span>
                        <span className="text-on-surface-variant text-xs ml-auto">{c.country}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Where To */}
              <div className="lg:col-span-3 text-left relative group">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-1 px-1">
                  Destination City
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-lg">flight_land</span>
                  <input
                    value={toLocation}
                    onChange={(e) => handleToChange(e.target.value)}
                    onBlur={() => setTimeout(() => setToSuggestions([]), 150)}
                    className={inputCls(toError)}
                    placeholder="Where to?"
                    type="text"
                    autoComplete="off"
                  />
                </div>
                {toSuggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-surface-container-highest z-50 overflow-hidden text-left">
                    {toSuggestions.slice(0, 4).map((c) => (
                      <li
                        key={c.code + c.city}
                        onMouseDown={() => { setToLocation(c.city); setToSuggestions([]); setToError(""); }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container cursor-pointer text-sm"
                      >
                        <span className="material-symbols-outlined text-base text-tertiary">location_on</span>
                        <span className="font-semibold text-on-surface">{c.city}</span>
                        <span className="text-on-surface-variant text-xs ml-auto">{c.country}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Travel Dates */}
              <div className="lg:col-span-4 text-left">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-1 px-1">
                  Travel Dates (Start - End)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline-variant text-base">calendar_month</span>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => { setStartDate(e.target.value); setDateError(""); }}
                      className="w-full pl-8 pr-2 py-3 rounded-xl border border-surface-container-highest focus:border-primary-container outline-none text-xs font-semibold bg-surface text-on-surface"
                      title="Departure Date"
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline-variant text-base">event</span>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => { setEndDate(e.target.value); setDateError(""); }}
                      className="w-full pl-8 pr-2 py-3 rounded-xl border border-surface-container-highest focus:border-primary-container outline-none text-xs font-semibold bg-surface text-on-surface"
                      title="Return Date"
                    />
                  </div>
                </div>
              </div>

              {/* Plan Trip Button */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-primary-container text-white py-3.5 px-4 rounded-xl font-bold text-sm hover:bg-primary hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-md"
                >
                  <ShinyText text="Plan Trip" speed={3} />
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

            </div>

            {/* Inline Error Messages */}
            {fromError && <p className="text-red-500 text-xs font-semibold flex items-center gap-1 px-1 mt-1 text-left"><span className="material-symbols-outlined text-sm">error</span>{fromError}</p>}
            {toError   && <p className="text-red-500 text-xs font-semibold flex items-center gap-1 px-1 mt-1 text-left"><span className="material-symbols-outlined text-sm">error</span>{toError}</p>}
            {dateError && <p className="text-red-500 text-xs font-semibold flex items-center gap-1 px-1 mt-1 text-left"><span className="material-symbols-outlined text-sm">error</span>{dateError}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
