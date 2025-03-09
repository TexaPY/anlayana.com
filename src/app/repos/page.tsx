"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Grid, CardActionArea } from "@mui/material"; 
import { baseURL } from "@/app/resources";
import { repos, person } from "@/app/resources/content";
import { fetchRepos } from "./fetchRepos";
import { Repository } from "./types";

const marqueeHover = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  animation: 'marqueeHover 10s linear infinite',
  '@keyframes marqueeHover': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' },
  },
};

export default function Repos() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    async function getRepos() {
      try {
        const repos = await fetchRepos();
        setRepositories(repos);
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      }
    }

    getRepos();
  }, []);

  return (
    <Container maxWidth="lg">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "repos",
            headline: repos.title,
            description: repos.description,
            url: `https://${baseURL}/repos`,
            image: `${baseURL}/og?title=${encodeURIComponent(repos.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        {repos.title}
      </Typography>
      <Grid container spacing={2}>
        {repositories.map((repo) => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <Card
              variant="outlined"
              sx={{
                marginBottom: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: 'rgba(43, 42, 42, 0.18)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                },
                height: '100%', 
                padding: '16px', 
                minHeight: '150px', 
              }}
            >
              <CardActionArea component="a" href={`https://github.com/${repo.owner.login}/${repo.name}`} target="_blank">
                <CardContent>
                  <Typography variant="h5" component="h2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', '&:hover': marqueeHover }}>
                    {repo.displayName}
                  </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap sx={{ color: '#a64ca6' }}>
                    {repo.description}
                    </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ color: '#f6c6ea' }}>
                    ⭐{repo.stargazers_count} | 🍴{repo.forks_count}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}