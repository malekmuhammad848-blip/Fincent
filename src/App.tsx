import React, { useState } from 'react';

function App() {
  const [tab, setTab] = useState('home');
  const [query, setQuery] = useState('');

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {tab === 'home' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '5px solid #ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 0 20px #ca8a04' }}>
              <span style={{ fontSize: '80px', color: '#eab308', fontWeight: 'bold' }}>C</span>
            </div>
            <h1 style={{ color: '#ca8a04', letterSpacing: '5px' }}>CENT MUSIC</h1>
          </div>
        ) : (
          <div>
            <input 
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ca8a04', backgroundColor: '#18181b', color: 'white', marginBottom: '20px' }}
              placeholder="Search music..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div style={{ padding: '15px', backgroundColor: '#18181b', borderRadius: '10px', borderLeft: '5px solid #ca8a04' }}>
              <span>Search results will appear here</span>
            </div>
          </div>
        )}
      </main>
      <nav style={{ height: '80px', borderTop: '1px solid #27272a', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#09090b' }}>
        <button onClick={() => setTab('home')} style={{ background: 'none', border: 'none', color: tab === 'home' ? '#eab308' : '#52525b', fontSize: '24px' }}>🏠</button>
        <button onClick={() => setTab('search')} style={{ background: 'none', border: 'none', color: tab === 'search' ? '#eab308' : '#52525b', fontSize: '24px' }}>🔍</button>
      </nav>
    </div>
  );
}
export default App;
