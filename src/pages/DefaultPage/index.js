import { Container, Typography } from '@mui/material';
import React from 'react'

export const DefaultPage = () => {
  return (
    <Container sx={{width: "75%", margin : "25vh auto" , padding: "40px" , textAlign:"center"}}>
      <Typography variant="h1">COMING SOON</Typography>
      <Typography variant="h3">Under Construction!</Typography>
    </Container>
  )
};