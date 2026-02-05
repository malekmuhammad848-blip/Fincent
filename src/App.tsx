import React, { useState } from 'react';
import { Home, Search } from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden font-sans">
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' ? <HomeScreen /> : <SearchScreen />}
      </main>
      
      <nav className="h-20 bg-black border-t border-yellow-500/20 flex justify-around items-center px-8 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-yellow-500' : 'text-gray-500'}>
          <Home size={28} className={activeTab === 'home' ? 'animate-pulse' : ''} />
        </button>
        <button onClick={() => setActiveTab('search')} className={activeTab === 'search' ? 'text-yellow-500' : 'text-gray-500'}>
          <Search size={28} className={activeTab === 'search' ? 'animate-pulse' : ''} />
        </button>
      </nav>
    </div>
  );
}
export default App;
