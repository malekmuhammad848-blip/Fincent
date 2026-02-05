import React, { useState } from 'react';
import './index.css';

function App() {
  const [tab, setTab] = useState('home');
  const [query, setQuery] = useState('');

  const handlePlay = (name: string) => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: 'Cent Music',
        artwork: [{ src: 'https://placehold.co/512x512/000000/FFD700?text=C' }]
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {tab === 'home' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '6px solid #ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', boxShadow: '0 0 25px rgba(202, 138, 4, 0.5)' }}>
              <span style={{ fontSize: '90px', color: '#eab308', fontWeight: 'bold' }}>C</span>
            </div>
            <h1 style={{ color: '#ca8a04', letterSpacing: '8px', fontSize: '24px', fontWeight: 'bold' }}>CENT MUSIC</h1>
          </div>
        ) : (
          <div>
            <input 
              style={{ width: '100%', padding: '18px', borderRadius: '15px', border: '2px solid #ca8a04', backgroundColor: '#18181b', color: 'white', marginBottom: '25px', outline: 'none' }}
              placeholder="Search music..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div onClick={() => handlePlay('Graduation Track')} style={{ padding: '20px', backgroundColor: '#18181b', borderRadius: '15px', borderLeft: '6px solid #ca8a04', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span>My Project Song</span>
              <span style={{ color: '#ca8a04' }}>▶</span>
            </div>
          </div>
        )}
      </main>

      <nav style={{ height: '85px', borderTop: '1px solid #27272a', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#09090b' }}>
        <button onClick={() => setTab('home')} style={{ background: 'none', border: 'none', color: tab === 'home' ? '#eab308' : '#52525b', fontSize: '30px' }}>🏠</button>
        <button onClick={() => setTab('search')} style={{ background: 'none', border: 'none', color: tab === 'search' ? '#eab308' : '#52525b', fontSize: '30px' }}>🔍</button>
      </nav>
    </div>
  );
}
export default App;
