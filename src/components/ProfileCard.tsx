import React from 'react';
import { Trophy, Star, Code } from 'lucide-react';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="glass-card group hover:scale-105">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#2A2B2E] border-2 border-gray-800 flex items-center justify-center text-xl font-medium text-gray-300 uppercase">
            {profile.username[0]}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs px-2 py-1 rounded-full code-font">
            #{profile.rank}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-gray-100">{profile.username}</h3>
          <p className="text-gray-400 text-sm code-font">
            {profile.totalSolved} problems solved
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {Object.entries(profile.platforms).map(([platform, username]) => (
          <div
            key={platform}
            className="flex items-center justify-between p-3 rounded-lg bg-[#2A2B2E]/50 group-hover:bg-[#2A2B2E] transition-colors"
          >
            <span className="flex items-center text-gray-300">
              <Code size={18} className="mr-2 text-indigo-400" />
              <span className="capitalize">{platform}</span>
            </span>
            <span className="font-mono text-indigo-400">{username}</span>
          </div>
        ))}
        
        <div className="pt-4 flex justify-between items-center border-t border-gray-800">
          <div className="flex items-center text-amber-400">
            <Trophy size={18} className="mr-2" />
            <span className="text-sm font-medium">Achievement Score</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-amber-400" />
            <span className="ml-1 font-bold code-font text-amber-400">{profile.totalSolved * 10}</span>
          </div>
        </div>
      </div>
    </div>
  );
}