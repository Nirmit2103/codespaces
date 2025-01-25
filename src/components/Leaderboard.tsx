import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Search, ArrowUp, ArrowDown } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  problemsSolved: number;
  contests: number;
  progress: number;
  trend: 'up' | 'down' | 'stable';
}

const dummyData: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "CodeMaster",
    score: 2500,
    problemsSolved: 450,
    contests: 25,
    progress: 95,
    trend: 'up'
  },
  {
    rank: 2,
    username: "AlgoNinja",
    score: 2350,
    problemsSolved: 425,
    contests: 22,
    progress: 88,
    trend: 'stable'
  },
  {
    rank: 3,
    username: "ByteWizard",
    score: 2200,
    problemsSolved: 380,
    contests: 20,
    progress: 82,
    trend: 'up'
  },
  {
    rank: 4,
    username: "DataDragon",
    score: 2100,
    problemsSolved: 360,
    contests: 18,
    progress: 78,
    trend: 'down'
  },
  {
    rank: 5,
    username: "CipherSage",
    score: 2050,
    problemsSolved: 340,
    contests: 16,
    progress: 75,
    trend: 'up'
  },
  {
    rank: 6,
    username: "BinaryBoss",
    score: 1980,
    problemsSolved: 320,
    contests: 15,
    progress: 72,
    trend: 'stable'
  },
  {
    rank: 7,
    username: "LogicLord",
    score: 1920,
    problemsSolved: 300,
    contests: 14,
    progress: 70,
    trend: 'up'
  },
  {
    rank: 8,
    username: "QueryQuester",
    score: 1850,
    problemsSolved: 280,
    contests: 12,
    progress: 68,
    trend: 'down'
  },
  {
    rank: 9,
    username: "HashHero",
    score: 1800,
    problemsSolved: 260,
    contests: 10,
    progress: 65,
    trend: 'stable'
  },
  {
    rank: 10,
    username: "StackSensei",
    score: 1750,
    problemsSolved: 240,
    contests: 8,
    progress: 62,
    trend: 'up'
  }
];

export default function Leaderboard() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  console.log('Leaderboard rendering', { dummyData, loading });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="text-green-500" size={16} />;
      case 'down':
        return <ArrowDown className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-600" size={20} />;
      default:
        return <Star className="text-gray-600" size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-2/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-gray-400">Top performers in competitive programming</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedTimeframe('all')}
          className={`px-4 py-2 rounded-lg ${
            selectedTimeframe === 'all' ? 'bg-indigo-600' : 'bg-gray-800'
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setSelectedTimeframe('month')}
          className={`px-4 py-2 rounded-lg ${
            selectedTimeframe === 'month' ? 'bg-indigo-600' : 'bg-gray-800'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setSelectedTimeframe('week')}
          className={`px-4 py-2 rounded-lg ${
            selectedTimeframe === 'week' ? 'bg-indigo-600' : 'bg-gray-800'
          }`}
        >
          This Week
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Score</th>
              <th className="px-6 py-3 text-left">Problems</th>
              <th className="px-6 py-3 text-left">Contests</th>
              <th className="px-6 py-3 text-left">Progress</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((entry) => (
              <tr key={entry.rank} className="border-t border-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {entry.rank === 1 && <Trophy className="text-yellow-500" size={20} />}
                    {entry.rank === 2 && <Medal className="text-gray-400" size={20} />}
                    {entry.rank === 3 && <Medal className="text-amber-600" size={20} />}
                    #{entry.rank}
                  </div>
                </td>
                <td className="px-6 py-4">{entry.username}</td>
                <td className="px-6 py-4">{entry.score}</td>
                <td className="px-6 py-4">{entry.problemsSolved}</td>
                <td className="px-6 py-4">{entry.contests}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Results */}
      {dummyData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No results found</p>
        </div>
      )}
    </div>
  );
} 