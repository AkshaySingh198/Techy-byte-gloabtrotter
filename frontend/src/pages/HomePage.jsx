import HeroSection from '../components/HeroSection';
import StatsStrip from '../components/StatsStrip';
import TrendingDestinations from '../components/TrendingDestinations';
import StoriesSection from '../components/StoriesSection';
import TestimonialsSection from '../components/TestimonialsSection';

export default function HomePage({ onSearchSubmit, onSelectDestination, onOpenAuth }) {
  return (
    <>
      <HeroSection onSearch={onSearchSubmit} />
      <StatsStrip />
      <TrendingDestinations onSelectDestination={onSelectDestination} />
      <StoriesSection onWriteStory={() => onOpenAuth('signup')} />
      <TestimonialsSection />
    </>
  );
}
