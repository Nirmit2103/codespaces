import React from 'react';
import { Heart, Code, Trophy, MessageSquare, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlatformLink {
  platform: string;
  username: string;
  problemsSolved: number;
}

const platformLinks: PlatformLink[] = [
  { platform: 'Leetcode', username: 'leetcode_user', problemsSolved: 450 },
  { platform: 'Codeforces', username: 'cf_user', problemsSolved: 0 },
  { platform: 'Hackerrank', username: 'hr_user', problemsSolved: 0 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-400 mb-4">Welcome to CodeArena</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Join our thriving community of developers. Share your progress, learn together, and grow your coding skills with friends.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            Join Community
          </button>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Browse Lounges
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400">Friends</h3>
            <Heart className="text-pink-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-indigo-400">2</p>
        </div>

        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400">Problems Solved</h3>
            <Code className="text-indigo-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-indigo-400">450</p>
        </div>

        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400">Community Rank</h3>
            <Trophy className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-indigo-400">#3</p>
        </div>

        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400">Active Lounges</h3>
            <MessageSquare className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-indigo-400">3</p>
        </div>
      </div>

      {/* Friend Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Friend Activity</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                <span className="text-indigo-400 font-semibold">C</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">currentUser</h3>
                <p className="text-gray-400 text-sm">450 problems solved</p>
              </div>
            </div>

            {platformLinks.map((link) => (
              <div key={link.platform} className="flex items-center justify-between py-3 px-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Code size={18} className="text-indigo-400" />
                  <span className="text-gray-300">{link.platform}</span>
                </div>
                <span className="text-indigo-400">{link.username}</span>
              </div>
            ))}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={18} />
                <span className="text-gray-400">Achievement Score</span>
              </div>
              <span className="text-yellow-500">4500</span>
            </div>
          </div>
        </div>

        {/* Friend Requests Section */}
        <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Friend Requests</h2>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-400" />
              <span className="text-gray-400">0 requests</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter username"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 