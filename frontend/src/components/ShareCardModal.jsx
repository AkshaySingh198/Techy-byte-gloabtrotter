import { useState, useRef } from 'react';

const defaultPhotos = [
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600'
];

export default function ShareCardModal({ isOpen, onClose, trip }) {
  const [photos, setPhotos] = useState(defaultPhotos);
  const [theme, setTheme] = useState('coral'); // 'coral' | 'teal' | 'sunset'
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const currentTrip = trip || {
    name: 'Goa Coastal Expedition',
    title: 'Goa Coastal Expedition',
    dates: 'Oct 15 - Oct 25, 2026',
    cities: 'Goa ➔ Goa',
    location: 'Goa, India',
    cost: '₹10,600',
    price: '₹10,600'
  };

  const tripName = currentTrip.name || currentTrip.title || 'Goa Coastal Expedition';
  const tripDates = currentTrip.dates || 'Oct 15 - Oct 25, 2026';
  const tripLocation = currentTrip.cities || currentTrip.location || 'Goa, India';
  const tripCost = currentTrip.cost || currentTrip.price || '₹10,600';

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newUrls = files.map(file => URL.createObjectURL(file));
      setPhotos(prev => [...newUrls, ...prev].slice(0, 4));
    }
  };

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById('share-card-svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tripName.toLowerCase().replace(/\s+/g, '_')}_share_card.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-surface rounded-3xl max-w-lg w-full p-6 border border-surface-container-highest shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
          <div>
            <h3 className="font-bold text-base text-on-surface">Post-Trip Social Share Card</h3>
            <p className="text-xs text-on-surface-variant">Generate a styled collage card for Instagram &amp; WhatsApp</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-on-surface-variant">Card Theme:</span>
          <div className="flex gap-2">
            {[
              { id: 'coral', label: 'Sunset Coral', cls: 'bg-orange-500' },
              { id: 'teal', label: 'Coastal Teal', cls: 'bg-teal-600' },
              { id: 'sunset', label: 'Twilight Purple', cls: 'bg-purple-600' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] text-white cursor-pointer ${t.cls} ${theme === t.id ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-70'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rendered Live SVG Share Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/20">
          <svg
            id="share-card-svg"
            viewBox="0 0 600 750"
            className="w-full h-auto rounded-3xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Gradient */}
            <defs>
              <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme === 'coral' ? '#ea580c' : theme === 'teal' ? '#0d9488' : '#9333ea'} />
                <stop offset="100%" stopColor={theme === 'coral' ? '#d97706' : theme === 'teal' ? '#047857' : '#c026d3'} />
              </linearGradient>
            </defs>

            <rect width="600" height="750" fill="url(#cardGrad)" rx="24" />

            {/* Header Badge */}
            <rect x="40" y="40" width="180" height="32" rx="16" fill="rgba(255,255,255,0.2)" />
            <text x="130" y="61" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">GLOBETROTTER</text>

            {/* Trip Title & Route */}
            <text x="40" y="115" fill="#ffffff" fontSize="24" fontWeight="800">{tripName}</text>
            <text x="40" y="145" fill="rgba(255,255,255,0.9)" fontSize="14" fontWeight="600">✈️ {tripLocation} • {tripDates}</text>

            {/* Photo Collage Grid */}
            <g transform="translate(40, 175)">
              <rect x="0" y="0" width="250" height="320" rx="16" fill="#ffffff" opacity="0.15" />
              <image href={photos[0] || defaultPhotos[0]} x="0" y="0" width="250" height="320" preserveAspectRatio="xMidYMid slice" clipPath="inset(0 rounded 16px)" />

              <rect x="270" y="0" width="250" height="150" rx="16" fill="#ffffff" opacity="0.15" />
              <image href={photos[1] || defaultPhotos[1]} x="270" y="0" width="250" height="150" preserveAspectRatio="xMidYMid slice" clipPath="inset(0 rounded 16px)" />

              <rect x="270" y="170" width="250" height="150" rx="16" fill="#ffffff" opacity="0.15" />
              <image href={photos[2] || defaultPhotos[2]} x="270" y="170" width="250" height="150" preserveAspectRatio="xMidYMid slice" clipPath="inset(0 rounded 16px)" />
            </g>

            {/* Stats Bar */}
            <rect x="40" y="525" width="520" height="120" rx="20" fill="rgba(0,0,0,0.3)" />

            <text x="120" y="565" fill="#ffffff" fontSize="22" fontWeight="800" textAnchor="middle">1,250</text>
            <text x="120" y="588" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="600" textAnchor="middle">KMS TRAVELED</text>

            <text x="300" y="565" fill="#ffffff" fontSize="22" fontWeight="800" textAnchor="middle">3</text>
            <text x="300" y="588" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="600" textAnchor="middle">CITIES VISITED</text>

            <text x="480" y="565" fill="#ffffff" fontSize="22" fontWeight="800" textAnchor="middle">{tripCost}</text>
            <text x="480" y="588" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="600" textAnchor="middle">TOTAL BUDGET</text>

            {/* Footer Handle */}
            <text x="300" y="695" fill="rgba(255,255,255,0.9)" fontSize="14" fontWeight="bold" textAnchor="middle">Made with GlobeTrotter Travel Planner 🌍</text>
          </svg>
        </div>

        {/* Upload Custom Photos Action */}
        <div className="flex items-center justify-between pt-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-bold text-primary-container hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_a_photo</span> Upload Custom Trip Photos
          </button>

          <span className="text-[11px] text-on-surface-variant font-medium">{photos.length} photos selected</span>
        </div>

        {/* Export Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleDownloadSVG}
            className="w-full bg-primary-container text-white py-3 rounded-2xl font-bold text-xs hover:bg-primary shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span> Download Card (SVG)
          </button>
          
          <button
            onClick={handleCopyLink}
            className="w-full border border-surface-container-highest text-on-surface py-3 rounded-2xl font-bold text-xs hover:bg-surface-container flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">share</span> {copied ? 'Link Copied!' : 'Share to Socials'}
          </button>
        </div>

      </div>
    </div>
  );
}
