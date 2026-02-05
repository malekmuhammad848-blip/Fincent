import React, { useState } from 'react';

function App() {
  const [tab, setTab] = useState('home');
  const [search, setSearch] = useState('');

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-sans">
      {/* المحتوى الرئيسي */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {tab === 'home' ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-32 h-32 border-4 border-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              <span className="text-6xl font-serif font-bold text-yellow-500">C</span>
            </div>
            <h1 className="text-2xl font-bold tracking-widest text-yellow-500">CENT MUSIC</h1>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search songs, artists..." 
                className="w-full bg-zinc-900 border border-yellow-500/30 rounded-full py-3 px-6 text-white focus:outline-none focus:border-yellow-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="text-zinc-500 text-center pt-10">Type something to search...</div>
          </div>
        )}
      </main>

      {/* شريط التنقل السفلي */}
      <nav className="h-20 bg-zinc-950 border-t border-yellow-500/20 flex justify-around items-center px-8 shadow-2xl">
        <button onClick={() => setTab('home')} className={tab === 'home' ? 'text-yellow-500 scale-110' : 'text-zinc-500'}>
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </button>
        <button onClick={() => setTab('search')} className={tab === 'search' ? 'text-yellow-500 scale-110' : 'text-zinc-500'}>
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </button>
      </nav>
    </div>
  );
}
export default App;
