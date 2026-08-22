import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { searchCities, validateCity } from "../data/cities";
import BlurText from "./react-bits/BlurText";
import ShinyText from "./react-bits/ShinyText";

export default function HeroSection({ onSearch }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
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
    setFromError(""); setToError("");
    const fromValid = validateCity(fromLocation);
    const toValid   = validateCity(toLocation);
    if (!fromLocation.trim()) { setFromError("Please enter a departure city."); return; }
    if (!fromValid) { setFromError('"' + fromLocation + '" not recognized. Try: Mumbai, Paris, Bali...'); return; }
    if (!toLocation.trim()) { setToError("Please enter a destination city."); return; }
    if (!toValid) { setToError('"' + toLocation + '" not recognized. Try: Santorini, Tokyo, Goa...'); return; }
    if (fromLocation.trim().toLowerCase() === toLocation.trim().toLowerCase()) {
      setToError("Departure and destination cannot be the same."); return;
    }
    if (onSearch) onSearch({ from: fromValid, to: toValid });
  };

  const inputCls = (err) =>
    "w-full pl-10 pr-3 py-3 rounded-xl border " +
    (err
      ? "border-red-400 ring-2 ring-red-200"
      : "border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20") +
    " outline-none transition-all text-sm font-medium bg-surface text-on-surface placeholder:text-on-surface-variant/70";

  return (
    /*
      Extra bottom padding (pb-40) gives the dropdown ~200px of hero
      background beneath the search box before the dark stats strip starts.
    */
    <section className="relative flex flex-col bg-[#111827] pt-16 pb-[155px]">

      {/* Amalfi Coast background — covers hero + extra space for dropdown */}
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
      <div className="relative z-30 w-full max-w-4xl px-4 sm:px-6 mx-auto flex flex-col items-center text-center pt-2">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight leading-tight">
          <BlurText
            text="Plan Your Perfect Trip in Minutes"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-white drop-shadow-md"
          />
        </h1>
        <p ref={subtitleRef} className="font-body text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-6 drop-shadow font-medium leading-relaxed">
          Discover destinations, compare travel options, and build your itinerary in minutes.
        </p>

        {/* Search Bar */}
        <div ref={searchBoxRef} className="w-full max-w-3xl bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/30 relative z-40">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2 items-start">

              {/* Where From */}
              <div className="flex-1 w-full relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-outline-variant group-focus-within:text-primary transition-colors text-lg">location_on</span>
                <input
                  value={fromLocation}
                  onChange={(e) => handleFromChange(e.target.value)}
                  onBlur={() => setTimeout(() => setFromSuggestions([]), 150)}
                  className={inputCls(fromError)}
                  placeholder="Where from?"
                  type="text"
                  autoComplete="off"
                />
                {fromSuggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-surface-container-highest z-50 overflow-hidden">
                    {fromSuggestions.slice(0, 5).map((c) => (
                      <li
                        key={c.code + c.city}
                        onMouseDown={() => { setFromLocation(c.city); setFromSuggestions([]); setFromError(""); }}
                        className="flex items-center gap-2 px-4 py-1.5 hover:bg-surface-container cursor-pointer text-sm"
                      >
                        <span className="material-symbols-outlined text-base text-primary">flight_takeoff</span>
                        <span className="font-semibold text-on-surface">{c.city}</span>
                        <span className="text-on-surface-variant text-xs ml-auto">{c.country}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="hidden md:flex items-center self-stretch">
                <div className="h-8 w-[1px] bg-surface-container-highest mx-1" />
              </div>

              {/* Where To */}
              <div className="flex-1 w-full relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-outline-variant group-focus-within:text-primary transition-colors text-lg">flight_land</span>
                <input
                  value={toLocation}
                  onChange={(e) => handleToChange(e.target.value)}
                  onBlur={() => setTimeout(() => setToSuggestions([]), 150)}
                  className={inputCls(toError)}
                  placeholder="Where to?"
                  type="text"
                  autoComplete="off"
                />
                {toSuggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-surface-container-highest z-50 overflow-hidden">
                    {toSuggestions.slice(0, 5).map((c) => (
                      <li
                        key={c.code + c.city}
                        onMouseDown={() => { setToLocation(c.city); setToSuggestions([]); setToError(""); }}
                        className="flex items-center gap-2 px-4 py-1.5 hover:bg-surface-container cursor-pointer text-sm"
                      >
                        <span className="material-symbols-outlined text-base text-tertiary">location_on</span>
                        <span className="font-semibold text-on-surface">{c.city}</span>
                        <span className="text-on-surface-variant text-xs ml-auto">{c.country}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Plan My Trip */}
              <button
                type="submit"
                className="w-full md:w-auto bg-primary-container text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 min-w-[150px] active:scale-95 cursor-pointer shadow-sm self-start"
              >
                <ShinyText text="Plan My Trip" speed={3} />
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

            {fromError && <p className="text-red-400 text-xs font-medium flex items-center gap-1 px-1"><span className="material-symbols-outlined text-sm">error</span>{fromError}</p>}
            {toError   && <p className="text-red-400 text-xs font-medium flex items-center gap-1 px-1"><span className="material-symbols-outlined text-sm">error</span>{toError}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
