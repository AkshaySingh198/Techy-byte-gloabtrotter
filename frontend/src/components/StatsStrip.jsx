import CountUp from "./react-bits/CountUp";

export default function StatsStrip() {
  const stats = [
    { value: 5200, suffix: "+", label: "Trips Planned",      color: "text-primary-container" },
    { value: 1800, suffix: "+", label: "Itineraries Booked", color: "text-secondary-fixed-dim" },
    { value: 320,  suffix: "+", label: "Cities Covered",     color: "text-tertiary-fixed-dim" },
  ];

  return (
    <div className="w-full bg-[#1c1b1b]/95 backdrop-blur-md border-t border-white/10 py-3 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center pt-2 sm:pt-0 sm:px-8 text-center">
              <div className={"font-display text-2xl sm:text-3xl font-extrabold tracking-tight " + stat.color}>
                <CountUp to={stat.value} suffix={stat.suffix} duration={5.0} />
              </div>
              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-surface-variant/80 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
