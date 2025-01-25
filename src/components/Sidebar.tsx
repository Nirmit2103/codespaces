import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pin, Home, Trophy, Users, MessageSquare, Code2, PanelLeftClose, PanelLeft } from 'lucide-react';

export const Sidebar = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-900/95 backdrop-blur-lg border-r border-gray-800/50 transition-all duration-300 z-50 
        ${isPinned || isHovered ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full p-4">
        {/* Pin Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`p-2 rounded-lg transition-colors
              ${isPinned 
                ? 'text-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
          >
            {isPinned ? <Pin size={20} /> : <PanelLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2">
          <Link 
            to="/" 
            className="nav-link"
          >
            <Home size={20} />
            <span className={`${isPinned || isHovered ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300`}>
              Home
            </span>
          </Link>

          <Link 
            to="/projects" 
            className="nav-link"
          >
            <Code2 size={20} />
            <span className={`${isPinned || isHovered ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300`}>
              Projects
            </span>
          </Link>

          <Link 
            to="/tournaments" 
            className="nav-link"
          >
            <Trophy size={20} />
            <span className={`${isPinned || isHovered ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300`}>
              Tournaments
            </span>
          </Link>

          <Link 
            to="/leaderboard" 
            className="nav-link"
          >
            <Users size={20} />
            <span className={`${isPinned || isHovered ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300`}>
              Leaderboard
            </span>
          </Link>

          <Link 
            to="/lounge" 
            className="nav-link"
          >
            <MessageSquare size={20} />
            <span className={`${isPinned || isHovered ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300`}>
              Lounge
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}; 