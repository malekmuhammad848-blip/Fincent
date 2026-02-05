import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // كود تشغيل الصوت في الخلفية (Native Web API)
  const handlePlay = (title: string) => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: 'Cent Music',
        artwork: [{ src: 'https://placehold.co/512x512/000000/FFD700?text=C' }]
      });
    }
    alert('Playing: ' + title);
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col font-sans overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6 pb-24">
        {activeTab === 'home' ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-40 h-40 border-8 border-yellow-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(202,138,4,0.4)]">
              <span className="text-8xl font-serif font-bold text-yellow-500">C</span>
            </div>
            <h1 className="text-3xl font-bold tracking-[0.3em] text-yellow-600">CENT</h1>
          </div>
        ) : (
          <div className="space-y-4">
            <input 
              className="w-full bg-zinc-900 border-2 border-yellow-600/50 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500"
              placeholder="Search music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="p-4 bg-zinc-900 rounded-lg flex justify-between items-center border-l-4 border-yellow-600">
              <div>
                <p className="font-bold text-yellow-500">Sample Track</p>
                <p className="text-xs text-gray-400">Cent Original</p>
              </div>
              <button onClick={() => handlePlay('Sample Track')} className="bg-yellow-600 p-2 rounded-full">▶</button>
            </div>
          </div>
        )}
      </main>

      <nav className="h-20 bg-zinc-950 border-t border-yellow-600/30 flex justify-around items-center">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-yellow-500' : 'text-gray-600'}>
          <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </button>
        <button onClick={() => setActiveTab('search')} className={activeTab === 'search' ? 'text-yellow-500' : 'text-gray-600'}>
          <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </button>
      </nav>
    </div>
  );
}
export default App;
