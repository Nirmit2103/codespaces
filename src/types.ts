export interface Profile {
  id: string;
  username: string;
  platforms: {
    leetcode?: string;
    codeforces?: string;
    hackerrank?: string;
  };
  totalSolved: number;
  rank: number;
  friends: string[];
  pendingRequests: string[];
  sentRequests: string[];
  performanceHistory: {
    date: string;
    solved: number;
  }[];
}

export interface Room {
  id: string;
  name: string;
  participants: string[];
  createdAt: Date;
  currentSong: {
    id: string;
    title: string;
    artist: string;
    image: string;
    preview: string;
    isPlaying: boolean;
  } | null;
}

export interface FriendRequest {
  id: string;
  from: string;
  to: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface PlatformData {
  leetcode?: {
    submitStats: {
      acSubmissionNum: {
        difficulty: string;
        count: number;
      }[];
    };
    profile: {
      ranking: number;
      reputation: number;
    };
  };
  codeforces?: {
    handle: string;
    rating: number;
    rank: string;
  };
  hackerrank?: {
    username: string;
    challenges: Array<{ name: string }>;
    total_challenges: number;
  };
}