export interface Repository {
  id: number;
  name: string;
  displayName?: string; 
  description: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
  };
}