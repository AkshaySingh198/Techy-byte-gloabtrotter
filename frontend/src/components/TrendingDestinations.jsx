import { useState, useRef } from 'react';
import TiltedCard from './react-bits/TiltedCard';
import SpotlightCard from './react-bits/SpotlightCard';
import InfiniteCarousel from './react-bits/InfiniteCarousel';

export const DESTINATIONS_DATA = [
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    category: 'Beach',
    categoryType: ['All', 'Beach', 'Honeymoon'],
    tag: 'Trending',
    tagColor: 'bg-primary-container text-white',
    tagIcon: 'local_fire_department',
    rating: 4.9,
    reviews: '2.1k reviews',
    price: '₹1,09,999',
    bestSeason: 'May-Oct',
    description: 'Iconic whitewashed cliffside villas, crystal blue Aegean waters, and world-renowned sunsets.'
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    category: 'Adventure',
    categoryType: ['All', 'Adventure', 'Mountains'],
    tag: 'Adventure',
    tagColor: 'bg-tertiary-container text-on-tertiary-container',
    tagIcon: 'landscape',
    rating: 4.8,
    reviews: '1.5k reviews',
    price: '₹74,999',
    bestSeason: 'Apr-Oct',
    description: 'Majestic 15th-century Inca citadel nestled high in the Peruvian Andes mountains.'
  },
  {
    id: 'nyc',
    name: 'New York City, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    category: 'Culture',
    categoryType: ['All', 'Honeymoon', 'Adventure'],
    tag: 'Popular',
    tagColor: 'bg-primary text-white',
    tagIcon: 'apartment',
    rating: 4.7,
    reviews: '4.2k reviews',
    price: '₹1,29,999',
    bestSeason: 'Sep-Nov',
    description: 'Endless energy, Broadway theaters, world-class dining, and landmark skyscrapers.'
  },
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    category: 'Culture',
    categoryType: ['All', 'Honeymoon', 'Adventure'],
    tag: 'Culture',
    tagColor: 'bg-secondary text-white',
    tagIcon: 'spa',
    rating: 4.9,
    reviews: '3.8k reviews',
    price: '₹1,49,999',
    bestSeason: 'Mar-May',
    description: 'Ancient temples, peaceful zen gardens, traditional tea houses, and seasonal cherry blossoms.'
  },
  {
    id: 'swiss-alps',
    name: 'Interlaken, Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    category: 'Mountains',
    categoryType: ['All', 'Mountains', 'Adventure', 'Honeymoon'],
    tag: 'Scenic',
    tagColor: 'bg-secondary text-white',
    tagIcon: 'snowboarding',
    rating: 4.9,
    reviews: '2.9k reviews',
    price: '₹1,42,000',
    bestSeason: 'Dec-Apr',
    description: 'Snow-capped alpine peaks, scenic cogwheel trains, glacier hikes, and serene turquoise lakes.'
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    category: 'Beach',
    categoryType: ['All', 'Beach', 'Honeymoon'],
    tag: 'Paradise',
    tagColor: 'bg-primary-container text-white',
    tagIcon: 'wb_sunny',
    rating: 4.8,
    reviews: '3.4k reviews',
    price: '₹68,500',
    bestSeason: 'Apr-Oct',
    description: 'Lush terraced rice paddies, spiritual Hindu temples, surf breaks, and tranquil wellness retreats.'
  }
];

export default function TrendingDestinations({ onSelectDestination }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);

  // Category filter chips without 'Budget'
  const categories = ['All', 'Beach', 'Mountains', 'Honeymoon', 'Adventure'];

  const filteredDestinations = DESTINATIONS_DATA.filter(item =>
    item.categoryType.includes(activeCategory)
  );

  return (
    <section id="destinations" ref={sectionRef} className="py-20 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
              Best Places to Visit This Season
            </h2>
            <p className="font-body text-on-surface-variant text-base mt-1">
              Curated selections for your next adventure.
            </p>
          </div>

          <a
            href="#explore-all"
            className="text-secondary font-bold flex items-center gap-1 hover:text-on-secondary-container transition-colors group text-sm"
          >
            View All Destinations
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Filter Chips - Clean without Budget */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-surface-container border border-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Auto-scrolling Carousel at 1-sec step */}
        <InfiniteCarousel autoScroll={true} intervalMs={1000} scrollStep={360}>
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="min-w-[300px] sm:min-w-[350px] max-w-[350px] snap-start"
            >
              <TiltedCard maxTilt={6} scale={1.02}>
                <SpotlightCard
                  spotlightColor="rgba(255, 127, 80, 0.18)"
                  className="ambient-shadow-1 hover:ambient-shadow-2 transition-all duration-300 border border-surface-container-highest cursor-pointer group bg-surface rounded-2xl"
                >
                  <div
                    onClick={() => onSelectDestination?.(dest)}
                    className="flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="relative h-60 overflow-hidden rounded-t-2xl">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Tag Badge */}
                      <div
                        className={`absolute top-3.5 left-3.5 ${dest.tagColor} px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1 backdrop-blur-sm`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {dest.tagIcon}
                        </span>
                        {dest.tag}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          {dest.name}
                        </h3>

                        {/* Ratings */}
                        <div className="flex items-center gap-1.5 mt-1.5 mb-3">
                          <span
                            className="material-symbols-outlined text-tertiary-fixed-dim text-base"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="font-bold text-on-surface text-xs sm:text-sm">
                            {dest.rating}
                          </span>
                          <span className="text-on-surface-variant text-xs">
                            ({dest.reviews})
                          </span>
                        </div>
                      </div>

                      {/* Card Footer with Price in Rupees (₹) */}
                      <div className="flex justify-between items-center pt-3 border-t border-surface-container-highest mt-2">
                        <div>
                          <span className="text-on-surface-variant text-[11px] block">
                            Starting from
                          </span>
                          <span className="font-display text-lg font-extrabold text-primary">
                            {dest.price}
                          </span>
                        </div>

                        <span className="text-xs font-medium bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant">
                          Best: {dest.bestSeason}
                        </span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>
          ))}
        </InfiniteCarousel>
      </div>
    </section>
  );
}
