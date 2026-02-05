import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // دالة تشغيل الصوت والتحكم في الإشعارات
  const handlePlay = (title: string) => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: 'Cent Music',
        artwork: [{ src: 'https://placehold.co/512x512/000000/FFD700?text=C' }]
      });
    }
    alert("Now Playing: " + title);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      
      {/* المحتوى الرئيسي */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '25px', paddingBottom: '100px' }}>
        {activeTab === 'home' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
            {/* الأيقونة الذهبية المتوهجة */}
            <div style={{ 
              width: '160px', height: '160px', borderRadius: '50%', 
              border: '6px solid #ca8a04', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', 
              marginBottom: '30px', boxShadow: '0 0 30px rgba(202, 138, 4, 0.6)' 
            }}>
              <span style={{ fontSize: '90px', color: '#eab308', fontWeight: 'bold', textShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}>C</span>
            </div>
            <h1 style={{ color: '#ca8a04', letterSpacing: '10px', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>CENT</h1>
            <p style={{ color: '#52525b', marginTop: '10px', letterSpacing: '2px' }}>PREMIUM AUDIO</p>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            {/* شريط البحث الاحترافي */}
            <div style={{ position: 'relative', marginBottom: '30px' }}>
              <input 
                style={{ 
                  width: '100%', padding: '18px 20px', borderRadius: '15px', 
                  border: '2px solid #ca8a04', backgroundColor: '#09090b', 
                  color: 'white', fontSize: '16px', outline: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                }}
                placeholder="Search your music..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span style={{ position: 'absolute', right: '20px', top: '18px', color: '#ca8a04' }}>🔍</span>
            </div>

            {/* قائمة تجريبية للأغاني */}
            <div onClick={() => handlePlay('Cent Original Track')} style={{ 
              padding: '20px', backgroundColor: '#18181b', borderRadius: '15px', 
              borderLeft: '6px solid #ca8a04', display: 'flex', 
              justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
              transition: '0.3s'
            }}>
              <div>
                <p style={{ fontWeight: 'bold', margin: 0, fontSize: '18px' }}>Cent Original Track</p>
                <p style={{ fontSize: '12px', color: '#71717a', margin: '5px 0 0 0' }}>Graduation Project Special</p>
              </div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#ca8a04', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'black', fontSize: '14px' }}>▶</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* شريط التنقل السفلي الاحترافي */}
      <nav style={{ 
        height: '85px', borderTop: '1px solid rgba(202, 138, 4, 0.2)', 
        display: 'flex', justifyContent: 'space-around', 
        alignItems: 'center', backgroundColor: '#050505', paddingBottom: '15px' 
      }}>
        <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: activeTab === 'home' ? '#eab308' : '#3f3f46', cursor: 'pointer' }}>
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </button>
        <button onClick={() => setActiveTab('search')} style={{ background: 'none', border: 'none', color: activeTab === 'search' ? '#eab308' : '#3f3f46', cursor: 'pointer' }}>
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </button>
      </nav>
    </div>
  );
}
export default App;
