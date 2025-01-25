import axios from 'axios';

interface PlatformData {
  leetcode?: any;
  codeforces?: any;
  hackerrank?: any;
}

interface LeetCodeResponse {
  data?: {
    data?: {
      matchedUser?: {
        username: string;
        submitStats: {
          acSubmissionNum: Array<{
            difficulty: string;
            count: number;
            submissions: number;
          }>;
        };
        profile: {
          ranking: number;
          reputation: number;
          starRating: number;
        };
      };
    };
  };
}

interface CodeforcesResponse {
  data?: {
    result?: Array<{
      handle: string;
      rating?: number;
      rank?: string;
    }>;
  };
}

interface HackerrankResponse {
  data?: {
    models?: Array<{ name: string }>;
    total?: number;
  };
}

const CLIST_API_BASE = 'https://clist.by/api/v4';
const API_KEY = import.meta.env.VITE_CLIST_API_KEY;
const USERNAME = import.meta.env.VITE_CLIST_USERNAME;

// Common headers and params for all requests
const config = {
  headers: {
    'Authorization': `ApiKey ${USERNAME}:${API_KEY}`
  },
  params: {
    username: USERNAME
  }
};

export const fetchUserData = async (platform: string, username: string) => {
  switch (platform.toLowerCase()) {
    case 'leetcode':
      return fetchLeetCodeData(username);
    case 'codeforces':
      return fetchCodeforcesData(username);
    case 'hackerrank':
      return fetchHackerrankData(username);
    default:
      throw new Error('Unsupported platform');
  }
};

const fetchLeetCodeData = async (username: string) => {
  try {
    const response: LeetCodeResponse = await axios.post('https://leetcode.com/graphql', {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              reputation
              starRating
            }
          }
        }
      `,
      variables: { username }
    });

    if (!response.data?.data?.matchedUser) {
      throw new Error('User not found on LeetCode');
    }

    return response.data.data.matchedUser;
  } catch (error) {
    throw new Error('Failed to fetch LeetCode data');
  }
};

const fetchCodeforcesData = async (handle: string) => {
  try {
    const response: CodeforcesResponse = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    if (!response.data?.result?.[0]) {
      throw new Error('Codeforces user not found');
    }

    return response.data.result[0];
  } catch (error) {
    throw new Error('Invalid Codeforces handle');
  }
};

const fetchHackerrankData = async (username: string) => {
  try {
    const response: HackerrankResponse = await axios.get(
      `https://www.hackerrank.com/rest/hackers/${username}/recent_challenges?limit=100`
    );

    if (!response.data?.models || !response.data?.total) {
      throw new Error('HackerRank data not found');
    }

    return {
      username,
      challenges: response.data.models,
      total_challenges: response.data.total
    };
  } catch (error) {
    throw new Error('Failed to fetch HackerRank data');
  }
};

// Contest Endpoints
export const fetchContests = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/contest/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching contests:', error);
    throw new Error('Failed to fetch contests');
  }
};

export const fetchContest = async (id: string) => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/contest/${id}/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching contest:', error);
    throw new Error('Failed to fetch contest');
  }
};

// Coder Endpoints
export const fetchCoderProfile = async (id: string) => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/coder/${id}/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching coder profile:', error);
    throw new Error('Failed to fetch coder profile');
  }
};

export const fetchMyProfile = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/coder/me/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching your profile:', error);
    throw new Error('Failed to fetch your profile');
  }
};

// Other Endpoints
export const fetchResources = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/resource/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw new Error('Failed to fetch resources');
  }
};

export const fetchProblems = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/problem/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw new Error('Failed to fetch problems');
  }
};

export const fetchStatistics = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/statistics/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};

// Test function
export const testApiConnection = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/contest/`, config);
    return response.status === 200;
  } catch (error) {
    throw new Error('API connection failed');
  }
};

// Add this function to fetch contests
export const fetchAllContests = async () => {
  try {
    // Using cors-anywhere as a proxy
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://codeforces.com/api/contest.list';
    
    const response = await axios.get(proxyUrl + targetUrl, {
      headers: {
        'Origin': 'https://codeforces.com'
      }
    });

    if (!response.data || !response.data.result) {
      throw new Error('Invalid response format');
    }

    const contests = response.data.result;
    
    return contests
      .filter((contest: any) => 
        contest.phase === 'BEFORE' || 
        contest.phase === 'CODING'
      )
      .slice(0, 10) // Limit to 10 contests to avoid overwhelming the UI
      .map((contest: any) => ({
        id: contest.id.toString(),
        title: contest.name,
        platform: 'Codeforces',
        startDate: new Date(contest.startTimeSeconds * 1000),
        endDate: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000),
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
        type: 'Competition',
        participantCount: 0,
        phase: contest.phase,
        description: 'Codeforces competitive programming contest'
      }));
  } catch (error) {
    console.error('Error fetching contests:', error);
    return []; // Return empty array instead of throwing
  }
}; 