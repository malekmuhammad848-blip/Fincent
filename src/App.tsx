import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
      <Router>
        <main className="flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </main>
        <BottomNav />
      </Router>
    </div>
  );
}
export default App;
