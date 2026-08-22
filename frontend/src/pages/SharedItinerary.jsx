import { useState, useEffect } from 'react';

const mockSharedTrip = {
  id: 1,
  name: 'Goa & Sikkim Beach-to-Mountain Expedition',
  owner: { name: 'Aarav Patel', city: 'Mumbai', avatar: 'A' },
  dates: 'Oct 15 - Oct 25, 2026',
  visibility: 'group',
  permitRequired: true,
  estimatedCost: 10600,
  cities: ['Goa', 'Gangtok Sikkim'],
  membersCount: 3,
  openSlots: 2,
  description: 'Join us for a 10-day adventure across Goa beaches and Gangtok Sikkim alpine lakes! Looking for 2 travel buddies.',
  coverPhoto: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
  days: [
    { day_number: 1, title: 'Arrival in Goa & Watersports', activities: ['Baga Beach Parasailing', 'Fontainhas Heritage Walk'] },
    { day_number: 2, title: 'Dudhsagar Waterfalls & Safari', activities: ['Jeep Safari to Dudhsagar'] },
    { day_number: 3, title: 'Fly to Gangtok & Ridge Park', activities: ['Cable Car Ride & MG Marg Stroll'] }
  ]
};

const mockOpenGroups = [
  { id: 2, name: 'Manali Snow & Trekking Group', host: 'Rohan S.', dates: 'Dec 01 - Dec 07', members: '3/5', slots: 2, city: 'Manali' },
  { id: 3, name: 'Rajasthan Forts & Camel Safari', host: 'Priya K.', dates: 'Nov 10 - Nov 16', members: '2/4', slots: 2, city: 'Jaipur' }
];

export default function SharedItinerary({ tripData = mockSharedTrip, onBack, onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'chat' | 'explore'
  const [messages, setMessages] = useState([
    { sender: 'Aarav Patel', text: 'Hey guys! Excited for the Baga beach watersports on Day 1 🏄‍♂️', time: '10:15 AM' },
    { sender: 'Priya K.', text: 'Is the Inner Line Permit for Sikkim approved yet?', time: '10:20 AM' },
    { sender: 'Aarav Patel', text: 'Yes! Got the ILP clearance yesterday 🎉', time: '10:22 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [joinRequested, setJoinRequested] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { sender: 'You', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputMsg('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-on-background pb-20">

      {/* Top Header */}
      <div className="bg-surface border-b border-surface-container-highest sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface flex items-center gap-2">
                {tripData.name}
              </h1>
              <p className="text-xs text-on-surface-variant">Created by {tripData.owner.name} • {tripData.dates}</p>
            </div>
          </div>

          {/* Social Share Toolbar & Copy Trip */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-full border border-surface-container-highest text-xs font-bold hover:bg-surface-container text-on-surface flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">link</span>
              {copiedLink ? 'Link Copied!' : 'Copy Link'}
            </button>
            
            <a
              href={`https://wa.me/?text=Check out this awesome trip itinerary: ${tripData.name}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
              title="Share on WhatsApp"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
            </a>

            <button
              onClick={() => onOpenAuth?.('login')}
              className="bg-primary-container text-white px-4 py-1.5 rounded-full font-bold text-xs hover:bg-primary shadow-sm transition-all"
            >
              Copy / Clone Trip
            </button>
          </div>
        </div>

        {/* Mode Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-6 border-t border-surface-container-highest">
          {[
            { id: 'itinerary', label: 'Itinerary Summary', icon: 'auto_stories' },
            { id: 'chat', label: 'Group Chat & Discussion', icon: 'forum' },
            { id: 'explore', label: 'Explore Open Groups', icon: 'groups' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 flex items-center gap-2 font-bold text-xs sm:text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-primary-container text-primary-container'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">

        {activeTab === 'itinerary' && (
          /* ================= READ-ONLY ITINERARY SUMMARY ================= */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

            {/* Left Column: Itinerary Overview */}
            <div className="space-y-6">

              {/* Cover Banner */}
              <div className="relative h-64 rounded-3xl overflow-hidden ambient-shadow-2 border border-surface-container-highest">
                <img src={tripData.coverPhoto} alt={tripData.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="bg-primary-container text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {tripData.visibility} Group Trip
                  </span>
                  <h2 className="text-2xl font-extrabold">{tripData.name}</h2>
                  <p className="text-xs opacity-90">{tripData.cities.join(' ➔ ')} • {tripData.dates}</p>
                </div>
              </div>

              {/* Trip Description */}
              <div className="bg-surface rounded-2xl p-5 border border-surface-container-highest space-y-2">
                <h3 className="font-bold text-sm text-on-surface">About This Trip</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{tripData.description}</p>
              </div>

              {/* Day-Wise Schedule */}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-on-surface">Day-by-Day Plan</h3>
                {tripData.days.map(d => (
                  <div key={d.day_number} className="bg-surface rounded-2xl p-4 border border-surface-container-highest space-y-2">
                    <h4 className="font-bold text-sm text-primary-container">Day {d.day_number}: {d.title}</h4>
                    <ul className="space-y-1 pl-4 list-disc text-xs text-on-surface-variant font-medium">
                      {d.activities.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Host & Join Card */}
            <div className="space-y-6">
              <div className="bg-surface rounded-3xl p-6 border border-surface-container-highest ambient-shadow-2 space-y-5">
                
                <div className="flex items-center gap-3 pb-4 border-b border-surface-container-highest">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-extrabold text-base flex items-center justify-center">
                    {tripData.owner.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{tripData.owner.name}</p>
                    <p className="text-[11px] text-on-surface-variant">Trip Host • {tripData.owner.city}</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Estimated Cost per Person</span>
                    <span className="font-extrabold text-on-surface">₹{tripData.estimatedCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Open Member Slots</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{tripData.openSlots} Slots Available</span>
                  </div>
                  {tripData.permitRequired && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">warning</span> Inner Line Permit required for Sikkim.
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setJoinRequested(true)}
                  disabled={joinRequested}
                  className="w-full bg-primary-container text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-primary shadow-lg shadow-primary-container/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-lg">{joinRequested ? 'check_circle' : 'group_add'}</span>
                  {joinRequested ? 'Join Request Sent!' : 'Request to Join Group Trip'}
                </button>

              </div>
            </div>

          </div>
        )}

        {activeTab === 'chat' && (
          /* ================= GROUP CHAT & MESSAGING ================= */
          <div className="max-w-2xl mx-auto bg-surface rounded-3xl border border-surface-container-highest ambient-shadow-2 flex flex-col h-[520px]">
            <div className="p-4 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-low rounded-t-3xl">
              <div>
                <h3 className="font-bold text-sm text-on-surface">Group Discussion ({tripData.name})</h3>
                <p className="text-[11px] text-on-surface-variant">{tripData.membersCount} Members Active</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-on-surface-variant mb-0.5">{m.sender}</span>
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-xs ${
                    m.sender === 'You' ? 'bg-primary-container text-white rounded-br-none' : 'bg-surface-container text-on-surface rounded-bl-none border border-surface-container-highest'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-outline mt-0.5">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-surface-container-highest flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type your message to trip members..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-highest text-xs font-semibold text-on-surface outline-none focus:border-primary-container"
              />
              <button type="submit" className="bg-primary-container text-white px-4 py-2.5 rounded-2xl font-bold text-xs hover:bg-primary">
                Send
              </button>
            </form>
          </div>
        )}

        {activeTab === 'explore' && (
          /* ================= EXPLORE OPEN GROUP TRIPS ================= */
          <div className="space-y-4">
            <h3 className="font-bold text-base text-on-surface">Open Group Trips Looking for Travel Buddies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockOpenGroups.map(grp => (
                <div key={grp.id} className="bg-surface rounded-2xl p-5 border border-surface-container-highest ambient-shadow-1 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full">{grp.city}</span>
                    <h4 className="font-bold text-sm text-on-surface mt-1">{grp.name}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Host: {grp.host} • {grp.dates}</p>
                    <p className="text-xs font-semibold text-emerald-600 mt-1">{grp.slots} Slots Left ({grp.members} filled)</p>
                  </div>
                  <button onClick={() => setJoinRequested(true)} className="bg-primary-container text-white text-xs font-bold px-4 py-2 rounded-xl">
                    Request Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
