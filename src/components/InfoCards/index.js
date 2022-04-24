import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function InfoCards(props) {
  return (
    <Card>
      <CardHeader title={props.title} subheader="March, 30 2022"/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {props.body}
        </Typography>
      </CardContent>
    </Card>
  );
}