import axios from 'axios';

const API_BASE_URL = 'https://competeapi.onrender.com/api';

interface PlatformResponse {
  username: string;
  totalSolved?: number;
  rating?: number;
  rank?: number;
  contests?: number;
}

export async function fetchLeetCodeStats(username: string): Promise<PlatformResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/leetcode/${username}`);
    return {
      username,
      totalSolved: response.data.totalSolved,
      rating: response.data.rating,
      rank: response.data.ranking,
      contests: response.data.totalParticipated
    };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    throw new Error('Failed to fetch LeetCode stats');
  }
}

export async function fetchCodeForcesStats(username: string): Promise<PlatformResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/codeforces/${username}`);
    return {
      username,
      rating: response.data.rating,
      rank: response.data.rank,
      contests: response.data.contests
    };
  } catch (error) {
    console.error('Error fetching CodeForces stats:', error);
    throw new Error('Failed to fetch CodeForces stats');
  }
}

export async function fetchHackerRankStats(username: string): Promise<PlatformResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/hackerrank/${username}`);
    return {
      username,
      totalSolved: response.data.totalSolved,
      rating: response.data.score
    };
  } catch (error) {
    console.error('Error fetching HackerRank stats:', error);
    throw new Error('Failed to fetch HackerRank stats');
  }
}