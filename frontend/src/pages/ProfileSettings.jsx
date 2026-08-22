import { useState, useEffect } from 'react';
import { getMe, logout } from '../services/api';

export default function ProfileSettings({ user: initialUser, onBack, onLogoutSuccess }) {
  const [user, setUser] = useState(initialUser || { name: 'Aarav Patel', email: 'aarav.patel@example.com', phone: '9876543210', city: 'Mumbai', state: 'Maharashtra', gender: 'male', age: 25 });
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
    gender: user?.gender || 'male',
    age: user?.age || ''
  });

  const [language, setLanguage] = useState('en'); // 'en' | 'hi'
  const [savedDestinations, setSavedDestinations] = useState([
    { id: 1, name: 'Goa', state: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300' },
    { id: 2, name: 'Leh Ladakh', state: 'Ladakh', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=300' },
    { id: 3, name: 'Munnar', state: 'Kerala', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=300' }
  ]);

  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          city: data.city || '',
          state: data.state || '',
          gender: data.gender || 'male',
          age: data.age || ''
        });
      })
      .catch(() => {});
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRemoveSaved = (id) => {
    setSavedDestinations(prev => prev.filter(d => d.id !== id));
  };

  const handleDeleteAccount = () => {
    alert('Account deleted successfully.');
    onLogoutSuccess?.();
  };

  return (
    <div className="min-h-screen bg-background text-on-background pb-20">

      {/* Header */}
      <div className="bg-surface border-b border-surface-container-highest sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">Account &amp; Profile Settings</h1>
          </div>
          <button onClick={onLogoutSuccess} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors">
            Log Out
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-8">

        {/* Success Alert */}
        {message && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            {message}
          </div>
        )}

        {/* User Info Header Card */}
        <div className="bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-1 flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary-container text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
              {formData.name ? formData.name[0].toUpperCase() : 'U'}
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white hover:bg-primary-container shadow-md">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-on-surface">{formData.name || 'Traveler'}</h2>
            <p className="text-xs text-on-surface-variant">{formData.email}</p>
            <span className="text-[10px] font-bold bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full inline-block mt-1">
              Verified GlobeTrotter Explorer
            </span>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-1 space-y-4">
          <h3 className="font-bold text-base text-on-surface pb-2 border-b border-surface-container-highest">Personal Details</h3>
          
          <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold outline-none focus:border-primary-container"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">Email Address</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold bg-surface-container-low text-on-surface-variant"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold outline-none focus:border-primary-container"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold outline-none focus:border-primary-container"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold outline-none bg-surface"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-container-highest text-xs font-semibold outline-none focus:border-primary-container"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button type="submit" className="bg-primary-container text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-primary shadow-md">
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* App Preferences */}
        <div className="bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-1 space-y-4">
          <h3 className="font-bold text-base text-on-surface pb-2 border-b border-surface-container-highest">App Preferences</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-on-surface">Language Preference</p>
              <p className="text-[11px] text-on-surface-variant">Select interface language for GlobeTrotter</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-surface-container-low border border-surface-container-highest rounded-xl text-xs font-semibold text-on-surface px-3 py-1.5 outline-none"
            >
              <option value="en">English (US)</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>

        {/* Saved Destinations */}
        <div className="bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-1 space-y-4">
          <h3 className="font-bold text-base text-on-surface pb-2 border-b border-surface-container-highest">Saved Destinations</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {savedDestinations.map(d => (
              <div key={d.id} className="relative rounded-2xl overflow-hidden border border-surface-container-highest group">
                <img src={d.image} alt={d.name} className="w-full h-28 object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-between text-white">
                  <button
                    onClick={() => handleRemoveSaved(d.id)}
                    className="self-end p-1 rounded-full bg-black/50 text-white hover:bg-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                  <p className="font-bold text-xs">{d.name}, {d.state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Deletion */}
        <div className="bg-red-50 rounded-3xl p-6 border border-red-200 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-red-700">Delete Account</h4>
            <p className="text-xs text-red-600">Permanently remove your account and saved itineraries.</p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>

      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface rounded-3xl max-w-sm w-full p-6 border border-surface-container-highest shadow-2xl space-y-4 text-center">
            <span className="material-symbols-outlined text-4xl text-red-500">warning</span>
            <h3 className="font-bold text-lg text-on-surface">Are you sure?</h3>
            <p className="text-xs text-on-surface-variant">This action cannot be undone. All your trip plans, group expenses, and saved data will be deleted.</p>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-xl border border-surface-container-highest text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
