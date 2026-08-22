import ShinyText from './react-bits/ShinyText';
import Magnet from './react-bits/Magnet';

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-primary-fixed border-t border-outline/20 pt-16 pb-12 font-body">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Newsletter / CTA banner */}
        <div className="bg-white/5 rounded-3xl p-8 md:p-12 mb-16 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2">
              Ready to embark on your dream journey?
            </h3>
            <p className="text-outline-variant text-base">
              Subscribe to get exclusive secret travel deals, seasonal flight alerts, and itinerary ideas.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to GlobeTrotter travel updates!');
            }}
            className="flex w-full md:w-auto gap-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-5 py-3.5 rounded-2xl bg-surface/10 border border-white/20 text-white placeholder:text-outline-variant outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 w-full sm:w-72 text-sm"
            />
            <Magnet magnetStrength={8}>
              <button
                type="submit"
                className="bg-primary-container text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-primary hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <ShinyText text="Subscribe" speed={2.5} />
              </button>
            </Magnet>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <a
              href="#"
              className="font-display text-2xl font-extrabold text-surface-bright mb-4 flex items-center gap-2 tracking-tight"
            >
              <span className="material-symbols-outlined text-primary-container text-2xl">
                travel_explore
              </span>
              GlobeTrotter
            </a>
            <p className="text-outline-variant text-sm mb-6 leading-relaxed">
              Crafting unforgettable journeys for the modern explorer. Your perfect personalized itinerary starts here.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'public', label: 'Global' },
                { icon: 'share', label: 'Share' },
                { icon: 'flight_takeoff', label: 'Travel' },
                { icon: 'favorite', label: 'Love' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-container hover:text-white transition-colors cursor-pointer flex items-center justify-center text-surface-bright"
                >
                  <span className="material-symbols-outlined text-base">
                    {item.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-surface-bright text-base mb-4 font-bold">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Careers <span className="text-[10px] bg-primary-container text-white px-2 py-0.5 rounded-full ml-1 font-bold">Hiring</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Press & Media
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Our Impact & Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-surface-bright text-base mb-4 font-bold">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Help Center & FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Destination Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Travel Insurance Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Contact Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-surface-bright text-base mb-4 font-bold">
              Legal & Trust
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a href="#" className="text-outline-variant hover:text-primary-container transition-colors">
                  Security & Data Protection
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-outline-variant text-sm">
          <div>
            © {new Date().getFullYear()} GlobeTrotter Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
