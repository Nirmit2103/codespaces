import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Globe, Clock, Users, ExternalLink, Trophy, Search, Filter, X, Zap } from 'lucide-react';
import { fetchAllContests } from '../lib/platformApi';

interface Tournament {
  id: string;
  title: string;
  platform: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  url: string;
  type: 'Competition' | 'Hackathon';
  participantCount: number;
  description: string;
  duration: string;
  status: string;
  inTwentyFourHours: boolean;
  phase: string;
  difficulty: string;
}

type FilterType = 'all' | 'Competition' | 'Hackathon';
type DurationFilter = 'all' | 'short' | 'medium' | 'long';
type StatusFilter = 'all' | 'upcoming' | 'ongoing';

interface Filters {
  type: FilterType;
  platform: string;
  duration: DurationFilter;
  status: StatusFilter;
}

const placeholderTournaments = [
  {
    id: '1',
    title: "Codeforces Round #900 (Div. 3)",
    platform: "Codeforces",
    startDate: new Date(Date.now() + 86400000),
    endDate: new Date(Date.now() + 86400000 + 7200000),
    duration: 7200,
    url: "https://codeforces.com/contests/1",
    type: "Competition",
    participantCount: 15000,
    phase: "BEFORE",
    description: "Competitive programming contest for Div. 3 participants"
  },
  {
    id: '2',
    title: "Educational Codeforces Round 155",
    platform: "Codeforces",
    startDate: new Date(Date.now() + 172800000),
    endDate: new Date(Date.now() + 172800000 + 7200000),
    duration: 7200,
    url: "https://codeforces.com/contests/2",
    type: "Competition",
    participantCount: 12000,
    phase: "BEFORE",
    description: "Educational round focusing on specific algorithms and techniques"
  }
];

export default function Tournaments() {
  const [tournaments, setTournaments] = useState(placeholderTournaments);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    platform: 'all',
    duration: 'all',
    status: 'all'
  });

  // Get unique platforms from tournaments
  const platforms = useMemo(() => {
    const platformSet = new Set(tournaments.map(t => t.platform));
    return ['all', ...Array.from(platformSet)];
  }, [tournaments]);

  // Duration classification helper
  const getDurationCategory = (duration: string): DurationFilter => {
    const hours = parseInt(duration) / 3600; // Convert seconds to hours
    if (hours <= 3) return 'short';
    if (hours <= 24) return 'medium';
    return 'long';
  };

  // Status classification helper
  const getContestStatus = (contest: Tournament) => {
    const now = new Date();
    if (contest.phase === 'CODING') return 'ongoing';
    if (now > contest.startDate && now < contest.endDate) return 'ongoing';
    return 'upcoming';
  };

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(tournament => {
      // Search term filter
      const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.platform.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = filters.type === 'all' || tournament.type === filters.type;
      
      // Platform filter
      const matchesPlatform = filters.platform === 'all' || tournament.platform === filters.platform;
      
      // Duration filter
      const matchesDuration = filters.duration === 'all' || 
                             getDurationCategory(tournament.duration) === filters.duration;
      
      // Status filter
      const matchesStatus = filters.status === 'all' || 
                           getContestStatus(tournament) === filters.status;

      return matchesSearch && matchesType && matchesPlatform && matchesDuration && matchesStatus;
    });
  }, [tournaments, searchTerm, filters]);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoading(true);
        const data = await fetchAllContests();
        if (data && data.length > 0) {
          setTournaments(data);
          setError(null);
        } else {
          setTournaments(placeholderTournaments);
          setError('Using placeholder data while we fetch live contests.');
        }
      } catch (err) {
        console.error('Error loading tournaments:', err);
        setTournaments(placeholderTournaments);
        setError('Using placeholder data while we fetch live contests.');
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  const isUpcoming = (date: Date) => date > new Date();
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const resetFilters = () => {
    setFilters({
      type: 'all',
      platform: 'all',
      duration: 'all',
      status: 'all'
    });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-800/50 rounded-lg p-6">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Coding Competitions</h1>
        <p className="text-gray-400">Discover and participate in coding contests from various platforms</p>
      </div>

      {/* Error/Info Message */}
      {error && (
        <div className="mb-8 bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex items-center gap-4">
          <div className="bg-gray-700/50 p-3 rounded-full">
            <Zap className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-medium text-white mb-1">Competition Updates</h3>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-gray-600/50 transition-all duration-300"
          >
            {/* Platform Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm rounded-full border border-indigo-500/20">
                {tournament.platform}
              </span>
              <a
                href={tournament.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3">
              {tournament.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4">
              {tournament.description}
            </p>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm">
                <Calendar size={16} className="text-indigo-400 mr-2" />
                <span>
                  {tournament.startDate.toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center text-gray-300 text-sm">
                <Clock size={16} className="text-indigo-400 mr-2" />
                <span>
                  Duration: {Math.round(tournament.duration / 3600)}h
                </span>
              </div>

              {tournament.participantCount > 0 && (
                <div className="flex items-center text-gray-300 text-sm">
                  <Users size={16} className="text-indigo-400 mr-2" />
                  <span>{tournament.participantCount.toLocaleString()} participants</span>
                </div>
              )}
            </div>

            {/* Register Button */}
            <a
              href={tournament.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
            >
              View Competition
              <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 