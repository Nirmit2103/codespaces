import axios from 'axios';

const fetchLeetCodeProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://leetcode.com/api/user_profile/${username}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching LeetCode profile:', error);
  }
};

fetchLeetCodeProfile('yourLeetCodeUsername');