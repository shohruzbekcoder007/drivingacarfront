import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChartUsers from '../../ChartUsers';
import { Grid } from '@mui/material';

export default function InformationCard({ startDate, endDate, result }) {
  return (
    <div >
    <Card sx={{ maxWidth: 800, boxShadow: "none", margin: "0 auto" }}>
      <CardContent>
        <Typography variant="h4" component="div">
            Information
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`${startDate.toLocaleString()}`} <b>-</b> {`${endDate.toLocaleString()}`}
        </Typography>
        <Typography variant="h6">
            The number of cases of drunkenness - <b>{result.condition1}</b>
        </Typography>
        <Typography variant="h6">
            The number of pickups by the tow truck - <b>{result.condition2}</b>
        </Typography>
        <Typography variant="h6">
            The number of cars evacuated to a special place - <b>{result.condition3}</b>
        </Typography>
        <Typography variant="h6">
            Number of new users - <b>{result.user1}</b>
        </Typography>
        <Typography variant="h6">
            Number of new tow trucks - <b>{result.user2}</b>
        </Typography>
        <Typography variant="h6">
            Number of new created devices - <b>{result.device}</b>
        </Typography>
      </CardContent>
    </Card>
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <ChartUsers data={[
                    {x: `tow truck (${result.condition2})`, y: result.condition2},
                    {x: `drunkenness (${result.condition1})`, y: result.condition1},
                    {x: `evacuated (${result.condition3})`, y: result.condition3},
                ]}
                label="Condition"
            />
        </Grid>
        <Grid item xs={6}>
            <ChartUsers data={[
                    {x: `users (${result.user1})`, y: result.user1},
                    {x: `tow trucks (${result.user2})`, y: result.user2},
                ]}
                label="New Users"
            />
        </Grid>
        </Grid>
    </div>
  );
}