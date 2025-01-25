import React, { useState } from 'react';
import { Users, Plus, MessageSquare, Hash, Volume2, Play, Pause, Search, Music } from 'lucide-react';
import { Room } from '../types';

export default function Lounge() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Algorithm Warriors',
      participants: ['alice', 'bob', 'charlie'],
      createdAt: new Date()
    }
  ]);

  const [showMusicSearch, setShowMusicSearch] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMusic = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://musicapi.x007.workers.dev/search?q=${query}&searchEngine=gaama`
      );
      const data = await response.json();
      setSearchResults(data.response || []);
    } catch (error) {
      console.error('Error searching music:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-100">Coding Lounges</h2>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="glass-card relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Hash className="text-indigo-400" size={24} />
                <h3 className="text-xl font-semibold text-gray-100">{room.name}</h3>
              </div>
              <span className="text-gray-500 text-sm code-font">
                {room.createdAt.toLocaleDateString()}
              </span>
            </div>
            
            <div className="border-t border-gray-700/50 mt-4 pt-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Music size={20} className="text-indigo-400" />
                <span className="text-sm text-gray-400">Room Music</span>
              </div>
              
              {room.currentSong ? (
                <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                  <img 
                    src={room.currentSong.img} 
                    alt={room.currentSong.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 font-medium truncate">
                      {room.currentSong.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {room.currentSong.artist}
                    </p>
                  </div>
                  <button 
                    className="p-2 hover:bg-gray-700/50 rounded-full transition-colors"
                    onClick={() => {/* Toggle play/pause */}}
                  >
                    {room.currentSong.isPlaying ? (
                      <Pause size={18} className="text-indigo-400" />
                    ) : (
                      <Play size={18} className="text-indigo-400" />
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowMusicSearch(room.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800/30 transition-all text-sm text-gray-400 hover:text-indigo-400"
                >
                  <Search size={16} />
                  Add Music to Room
                </button>
              )}

              {showMusicSearch === room.id && (
                <div className="absolute inset-0 bg-gray-900/95 rounded-lg backdrop-blur-sm p-4 z-10">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="text"
                        placeholder="Search for music..."
                        className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          searchMusic(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => setShowMusicSearch(null)}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {searchResults.map((song) => (
                            <button
                              key={song.id}
                              onClick={() => {
                                // Handle song selection
                                setShowMusicSearch(null);
                              }}
                              className="w-full flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                            >
                              <img 
                                src={song.image} 
                                alt={song.title}
                                className="w-10 h-10 rounded-md object-cover"
                              />
                              <div className="flex-1 text-left">
                                <p className="text-sm text-gray-200 truncate">{song.title}</p>
                                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <Users size={20} className="text-indigo-400" />
              <span className="code-font">{room.participants.length} participants</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {room.participants.map((participant, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#1A1B1E] bg-[#2A2B2E] flex items-center justify-center text-xs font-medium text-gray-300 uppercase"
                  >
                    {participant[0]}
                  </div>
                ))}
              </div>
              <button className="btn-secondary flex items-center gap-2">
                <MessageSquare size={18} />
                Join Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}