# GlobeTrotter - Plan Your Perfect Trip 🌍✈️

GlobeTrotter is a modern, responsive travel planning and itinerary discovery web application built with **React**, **Vite**, **Tailwind CSS**, **GSAP**, and **React Bits** interactive components.

---

## ✨ Features & Architecture

### 1. Animated UI with React Bits & GSAP
- **`Aurora` Canvas Background**: Dynamic, glowing ambient gradient waves layered across the hero section.
- **`BlurText`**: Staggered letter/word reveal animations with motion blur for headlines.
- **`CountUp`**: Animated numerical counters powered by GSAP and `IntersectionObserver` on the stats strip.
- **`TiltedCard`**: 3D interactive tilt physics with dynamic glare following mouse position.
- **`SpotlightCard`**: Radial spotlight illumination tracking cursor movement on destination and testimonial cards.
- **`Magnet` & `ShinyText`**: Magnetic cursor pull and shimmering gradients on buttons and call-to-actions.
- **`InfiniteCarousel`**: Smooth auto-scrolling horizontal showcase with pause-on-hover and responsive navigation controls.
- **GSAP `ScrollTrigger`**: Staggered scroll-driven section transitions and entrance reveals.

### 2. Core Functional Components
- **Top Navigation Bar**: Sticky glassmorphic header with navigation links and Login / Sign Up triggers.
- **Hero & Search Engine**: Origin / Destination search with travel type selector (Flights, Stays, Itineraries).
- **Stats Strip**: 12,400+ Trips Planned, 3,200+ Itineraries Booked, 150+ Cities Covered.
- **Trending Destinations**: Categorized filtering (All, Beach, Mountains, Budget, Honeymoon, Adventure) with custom modals and trip pricing.
- **Traveler Stories**: Community travel articles with reading times and author profiles.
- **Testimonials**: 5-star traveler reviews with verified traveler badges.
- **Interactive Modals**:
  - **Auth Modal**: Login and Sign Up with email/password and social login options.
  - **Destination Modal**: Full package overview with itinerary highlights, inclusions, and booking flow.
  - **Plan Trip Modal**: AI-simulated custom itinerary generator.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Run the Frontend
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev
```

### Build for Production
```bash
cd frontend
npm run build
```
