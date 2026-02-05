import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { searchYouTube } from '../services/youtubeApi';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const data = await searchYouTube(query);
      setResults(data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <div className="p-4 pt-8">
      <form onSubmit={handleSearch} className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن موسيقى..."
          className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-12 focus:outline-none focus:border-yellow-500 transition-all"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </form>
      <div className="space-y-4">
        {results.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-all">
            <img src={item.thumbnail} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h3 className="font-medium line-clamp-1">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchScreen;
