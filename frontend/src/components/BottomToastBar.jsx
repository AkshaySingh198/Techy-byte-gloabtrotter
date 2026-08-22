export default function BottomToastBar({ activeView, onNavigate }) {
  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: 'map', targetView: 'itinerary' },
    { id: 'rentals', label: 'Rentals', icon: 'directions_car', targetView: 'rentals' },
    // { id: 'calendar', label: 'Calendar', icon: 'calendar_month', targetView: 'calendar-timeline' },
    { id: 'group', label: 'Group', icon: 'groups', targetView: 'shared-itinerary' },
    { id: 'blogs', label: 'Blogs', icon: 'edit_square', targetView: 'blogs' }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 py-2 bg-surface/90 backdrop-blur-xl border border-surface-container-highest rounded-full shadow-2xl ambient-shadow-3 flex items-center gap-1 sm:gap-2 max-w-[95vw] overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeView === tab.targetView;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate?.(tab.targetView)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-primary-container text-white shadow-md shadow-primary-container/30 scale-105'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
