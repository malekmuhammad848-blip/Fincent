import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Library, Settings } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/search', label: 'Search' },
    { icon: Library, path: '/library', label: 'Library' },
    { icon: Settings, path: '/settings', label: 'Settings' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-yellow-600/30 px-6 py-3 flex justify-between items-center z-50 backdrop-blur-xl">
      {navItems.map(({ icon: Icon, path, label }) => {
        const isActive = location.pathname === path;
        return (
          <button key={path} onClick={() => navigate(path)} className="flex flex-col items-center gap-1 group relative">
            <div className={`p-2 rounded-2xl transition-all duration-500 ${isActive ? 'bg-yellow-500/20 scale-125' : 'group-hover:bg-white/5'}`}>
              <Icon size={26} className={`transition-all duration-500 ${isActive ? 'text-yellow-500 animate-bounce' : 'text-gray-500 group-hover:text-yellow-200'}`} />
            </div>
            {isActive && <div className="absolute -top-1 w-1 h-1 bg-yellow-500 rounded-full shadow-[0_0_10px_#FFD700]"></div>}
          </button>
        );
      })}
    </div>
  );
};
export default BottomNav;
