import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSettingsStore } from './store/settingsStore';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  const { theme } = useSettingsStore();

  return (
    <div className={`min-h-[100vh] ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} pb-20`}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/library" element={<LibraryScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
        <BottomNav />
      </Router>
    </div>
  );
}
export default App;
