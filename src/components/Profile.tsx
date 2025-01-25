import React, { useEffect, useState } from 'react';
import { Code2, Trophy, Edit2, User, RefreshCw, Code, ExternalLink, Github, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { getProfile, updatePlatformUsername, syncPlatformStats } from '../lib/api';
import { 
  fetchUserData, 
  fetchMyProfile, 
  fetchContests, 
  fetchProblems, 
  fetchStatistics 
} from '../lib/platformApi';
import axios from 'axios';

export interface PlatformStats {
  username: string;
  solved: number;
  rank: string;
  lastSynced: Date;
}

export interface UserProfile {
  username: string;
  joinDate: Date;
  platformStats: {
    leetcode?: PlatformStats;
    codeforces?: PlatformStats;
    hackerrank?: PlatformStats;
  };
}

interface PlatformData {
  leetcode?: any;
  codeforces?: any;
  hackerrank?: any;
}

export default function Profile() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>({
    username: '',
    rank: 0,
    total_solved: 0,
    platform_stats: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    leetcode: '',
    codeforces: '',
    hackerrank: ''
  });
  const [platform, setPlatform] = useState('leetcode');
  const [username, setUsername] = useState('');
  const [importedData, setImportedData] = useState<PlatformData | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [contests, setContests] = useState<any[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    try {
      const data = await getProfile(user.id);
      setProfile(data);
      
      const platformUsernames = {
        leetcode: '',
        codeforces: '',
        hackerrank: ''
      };
      
      data.platform_stats?.forEach((stat: any) => {
        if (stat.platform in platformUsernames) {
          platformUsernames[stat.platform as keyof typeof platformUsernames] = stat.username || '';
        }
      });
      
      setFormData(platformUsernames);
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const platforms = ['leetcode', 'codeforces', 'hackerrank'] as const;
      
      for (const platform of platforms) {
        if (formData[platform]) {
          await updatePlatformUsername(user.id, platform, formData[platform]);
        }
      }

      setIsEditing(false);
      await loadProfile();
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message);
    }
  };

  const handleSync = async () => {
    if (!user) return;
    setIsSyncing(true);
    try {
      await syncPlatformStats(user.id);
      await loadProfile();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImport = async () => {
    if (!username) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchUserData(platform, username);
      setImportedData(data);
      
      // Here you would typically send the data to your backend
      console.log('Imported data:', data);
      
    } catch (err: any) {
      setError(err.message || 'Failed to import data');
    } finally {
      setLoading(false);
    }
  };

  const loadProfileData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch all required data in parallel
      const [profile, contestsData, problemsData, statsData] = await Promise.all([
        fetchMyProfile(),
        fetchContests(),
        fetchProblems(),
        fetchStatistics()
      ]);

      setProfileData(profile);
      setContests(contestsData.objects || []);
      setProblems(problemsData.objects || []);
      setStatistics(statsData);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load profile data');
      console.error('Error loading profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={loadProfileData}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
            <RefreshCw size={18} />
            Sync Stats
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors">
            <Edit2 size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center">
                <User size={32} className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">LObika</h2>
                <p className="text-gray-400">Joined January 2024</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Trophy size={18} className="text-indigo-400" />
                <span>Rank: #N/A</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Code size={18} className="text-indigo-400" />
                <span>0 problems solved</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Github size={18} className="text-indigo-400" />
                <span>@breaking-byts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Platform Stats</h3>
            
            {/* LeetCode Stats */}
            <div className="mb-6 pb-6 border-b border-gray-700/50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src="/leetcode-logo.svg" alt="LeetCode" className="w-6 h-6" />
                  <h4 className="text-lg font-medium text-white">LeetCode</h4>
                </div>
                <span className="text-sm text-gray-400">Last synced: 25/1/2024</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Username</p>
                  <p className="text-white">breaking-byts</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Problems Solved</p>
                  <p className="text-white">0</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Rank</p>
                  <p className="text-white">#N/A</p>
                </div>
              </div>
            </div>

            {/* Import Platform Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Import Platform Data</h3>
              <div className="flex items-center gap-4">
                <select className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-indigo-500">
                  <option value="leetcode">LeetCode</option>
                  <option value="codeforces">CodeForces</option>
                  <option value="hackerrank">HackerRank</option>
                </select>
                <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors">
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="text-center py-8 text-gray-400">
              <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
              <p>No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}