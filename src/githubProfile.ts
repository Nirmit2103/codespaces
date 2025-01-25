import axios from 'axios';

const fetchGitHubProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
  }
};

fetchGitHubProfile('Nirmit2103');