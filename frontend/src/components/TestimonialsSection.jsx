import InfiniteCarousel from './react-bits/InfiniteCarousel';
import SpotlightCard from './react-bits/SpotlightCard';

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Marcus Thorne',
    trip: 'Trip to Machu Picchu, Peru',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    quote: 'The itinerary was perfectly balanced. From train bookings to local Inca trail guides, I didn’t have to worry about a single logistical detail!',
  },
  {
    id: 2,
    name: 'Aisha Khan',
    trip: 'Trip to Kyoto, Japan',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    quote: 'GlobeTrotter uncovered the most amazing hidden ramen bars and serene bamboo groves that weren’t in any generic guidebooks. An absolute game-changer.',
  },
  {
    id: 3,
    name: 'David Chen',
    trip: 'Trip to New York City, USA',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    quote: 'Fast, efficient, and beautifully designed. Planning our family weekend in Manhattan took less than 10 minutes instead of days of researching.',
  },
  {
    id: 4,
    name: 'Lucia Garcia',
    trip: 'Trip to Santorini, Greece',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    quote: 'The best travel planning platform I have ever experienced. Seamless hotel recommendations, stellar restaurant tips, and sunset boat tour integration.',
  },
  {
    id: 5,
    name: 'Oliver Schmidt',
    trip: 'Trip to Interlaken, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    quote: 'Saved over $400 on our Swiss travel passes and excursions thanks to the integrated cost comparison tool. 10/10 recommend!',
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-10 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-block text-primary font-bold tracking-wider uppercase text-xs mb-2">
            Verified Experiences
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            What Our Travelers Say
          </h2>
          <p className="font-body text-on-surface-variant text-lg mt-3">
            Join over 5,200+ passionate adventurers who create memorable journeys with GlobeTrotter.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <InfiniteCarousel speed={30}>
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="min-w-[320px] sm:min-w-[380px] max-w-[380px] snap-start"
            >
              <SpotlightCard
                spotlightColor="rgba(255, 127, 80, 0.15)"
                className="p-8 rounded-3xl bg-surface-container/70 border border-surface-container-highest ambient-shadow-1 hover:ambient-shadow-2 transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  {/* User Profile */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary-container shadow-sm"
                    />
                    <div>
                      <p className="font-display font-bold text-on-surface text-lg">
                        {item.name}
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        {item.trip}
                      </p>
                    </div>
                  </div>

                  {/* 5-Star Ratings */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.stars)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-tertiary-fixed-dim text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-on-surface-variant italic font-normal leading-relaxed text-base">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-container-highest flex items-center justify-between text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1 text-secondary font-semibold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Verified Traveler
                  </span>
                  <span>Trip Review</span>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </InfiniteCarousel>
      </div>
    </section>
  );
}
