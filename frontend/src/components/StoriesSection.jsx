import { useRef } from 'react';
import SpotlightCard from './react-bits/SpotlightCard';

export const STORIES_DATA = [
  {
    id: 1,
    title: 'Hidden Gems in the Swiss Alps',
    excerpt: 'Beyond the crowded peaks lie secret alpine villages, pristine glacier lakes, and local cheesemakers.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    author: 'Elena Rossi',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    readTime: '5 min read',
    category: 'Guides',
    date: 'Oct 12, 2025',
  },
  {
    id: 2,
    title: "A Foodie's Ultimate Guide to Kyoto",
    excerpt: 'Savoring Michelin-starred kaiseki feasts, matcha parlors, and hidden alleyway ramen counters.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    author: 'Kenji Tanaka',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    readTime: '8 min read',
    category: 'Culinary',
    date: 'Nov 03, 2025',
  },
  {
    id: 3,
    title: 'Sunset Chasing & Cliffside Magic in Santorini',
    excerpt: 'The finest vantage points in Oia and Imerovigli to capture unforgettable Aegean twilight horizons.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    readTime: '6 min read',
    category: 'Photography',
    date: 'Dec 18, 2025',
  },
];

export default function StoriesSection({ onWriteStory }) {
  const sectionRef = useRef(null);

  return (
    <section id="stories" ref={sectionRef} className="py-24 bg-surface-container-low relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="inline-block text-primary font-bold tracking-wider uppercase text-xs mb-2">
              Community & Inspiration
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
              Stories from Fellow Travelers
            </h2>
            <p className="font-body text-on-surface-variant text-lg mt-2">
              Authentic travel diaries, local insights, and itineraries from our global explorer community.
            </p>
          </div>

          <button
            onClick={onWriteStory}
            className="border-2 border-primary-container text-primary hover:bg-primary-container hover:text-white font-bold px-7 py-3 rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-xl">edit_square</span>
            Write Your Story
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORIES_DATA.map((story) => (
            <SpotlightCard
              key={story.id}
              spotlightColor="rgba(0, 106, 106, 0.15)"
              className="ambient-shadow-1 hover:ambient-shadow-2 transition-all duration-300 border border-surface-container-highest cursor-pointer group flex flex-col h-full bg-surface"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-on-surface">
                  {story.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mb-6 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-surface-container-highest">
                  <img
                    src={story.authorAvatar}
                    alt={story.author}
                    className="w-10 h-10 rounded-full object-cover border border-primary-container/40"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">
                      {story.author}
                    </p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
                      <span>{story.readTime}</span>
                      <span>•</span>
                      <span>{story.date}</span>
                    </p>
                  </div>

                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all text-xl">
                    arrow_forward
                  </span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
