import React, { useState } from 'react';
import { Home, Search, Library, Settings } from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

function App() {
  const [tab, setTab] = useState('home');

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-20">
        {tab === 'home' ? <HomeScreen /> : <SearchScreen />}
      </main>
      
      <nav className="h-20 bg-black border-t border-yellow-500/20 flex justify-around items-center px-6">
        <button onClick={() => setTab('home')} className={tab === 'home' ? 'text-yellow-500' : 'text-gray-400'}>
          <Home size={28} />
        </button>
        <button onClick={() => setTab('search')} className={tab === 'search' ? 'text-yellow-500' : 'text-gray-400'}>
          <Search size={28} />
        </button>
      </nav>
    </div>
  );
}
export default App;
