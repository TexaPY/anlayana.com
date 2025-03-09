"use client";

import React from "react";
import { Grid, Card, CardContent, Typography, Avatar } from "@mui/material";
import styles from "./Gallery.module.scss";
import { servers } from "@/app/resources/content";

interface User {
  id: string;
  name: string;
  avatar: string;
  activity: string;
}

interface MasonryGridProps {
  users: User[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ users }) => {
  return (
    <Grid container spacing={2}>
      {users.length > 0 ? (
        users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 56, height: 56 }} />
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">{user.activity}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">No users available</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default MasonryGrid;
