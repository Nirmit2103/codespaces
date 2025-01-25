import { fetchGitHubProfile } from './githubProfile';
import { fetchLeetCodeProfile } from './leetcodeProfile';
import { fetchCodeforcesProfile } from './codeforcesProfile';

const usernameGitHub = 'Nirmit2103';
const usernameLeetCode = 'yourLeetCodeUsername';
const usernameCodeforces = 'yourCodeforcesUsername';

fetchGitHubProfile(usernameGitHub);
fetchLeetCodeProfile(usernameLeetCode);
fetchCodeforcesProfile(usernameCodeforces);
