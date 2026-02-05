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
      
      <nav className="h-20 bg-black border-t border-yellow-500/20 flex justify-around items-center shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-yellow-500' : 'text-gray-500'}>
          <Home size={28} />
        </button>
        <button onClick={() => setActiveTab('search')} className={activeTab === 'search' ? 'text-yellow-500' : 'text-gray-500'}>
          <Search size={28} />
        </button>
      </nav>
    </div>
  );
}
export default App;
