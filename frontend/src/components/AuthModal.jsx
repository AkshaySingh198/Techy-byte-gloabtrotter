import { useState } from 'react';
import ShinyText from './react-bits/ShinyText';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Successfully ${mode === 'login' ? 'logged in' : 'signed up'} as ${email}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl max-w-md w-full p-8 relative ambient-shadow-3 border border-surface-container-highest">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-2xl">travel_explore</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-on-surface">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-on-surface-variant text-sm mt-1">
            {mode === 'login'
              ? 'Log in to access your saved itineraries and bookings.'
              : 'Join GlobeTrotter to plan custom trips in minutes.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-surface-container rounded-xl p-1 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-4 py-3 rounded-xl border border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all text-sm bg-surface text-on-surface"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-4 py-3 rounded-xl border border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all text-sm bg-surface text-on-surface"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-surface-container-highest focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all text-sm bg-surface text-on-surface"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-container text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary hover:shadow-lg transition-all duration-200 mt-2 cursor-pointer"
          >
            <ShinyText
              text={mode === 'login' ? 'Log In to GlobeTrotter' : 'Create Free Account'}
              speed={2.5}
            />
          </button>
        </form>

        {/* Social Logins */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-container-highest" />
          </div>
          <span className="relative bg-surface px-4 text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Or continue with
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              alert('Google login simulated successfully!');
              onClose();
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-surface-container-highest hover:bg-surface-container text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-lg text-[#ea4335]">
              language
            </span>
            Google
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Apple login simulated successfully!');
              onClose();
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-surface-container-highest hover:bg-surface-container text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              terminal
            </span>
            Apple ID
          </button>
        </div>
      </div>
    </div>
  );
}
