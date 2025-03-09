import { Repository } from "./types";

const selectedRepos = [
  { owner: "Mid0aria", name: "owofarmbot_stable", displayName: "Owo Farm Bot Stable" },
  { owner: "Mid0aria", name: "discord-log-bot", displayName: "Discord Log Bot" },
  { owner: "Mid0aria", name: "owo-blackjack-bot", displayName: "Owo Blackjack Bot" },
  { owner: "Mid0aria", name: "MMDL", displayName: "Minecraf Mod Downloader" },
  { owner: "TexaPY", name: "My-OpenCV-Projects", displayName: "Texa's OpenCV Projects" }
]; 
export async function fetchRepos(): Promise<Repository[]> {
  const repos: Repository[] = [];

  for (const repo of selectedRepos) {
    const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch repo: ${repo.name}`);
    }
    const repoData: Repository = await response.json();
    repoData.displayName = repo.displayName; 
    repos.push(repoData);
  }

  return repos;
}