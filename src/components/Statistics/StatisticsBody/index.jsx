import React, { useEffect, useState } from 'react'
import DateTime from '../../DateTime'
import { Button, Container, Paper, Typography } from '@mui/material'
// import CustomizedMenus from './CustomizedMenus'
import { result_time } from '../../../utils/API_urls'
import axios from '../../../utils/baseUrl';
import InformationCard from './InformationCard';

export default function StatisticsBody() {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [result, setResult] = useState(null)

  // const [status, setStatus] = React.useState(1)

  const resultHendler = () => {
      axios
        .get(`${result_time}?begin=${startDate}&end=${endDate}`, {
            headers: {
                "x-auth-token": sessionStorage.getItem("x-auth-token"),
            },
        })
        .then((response) => {
            sessionStorage.setItem(
                "x-auth-token",
                response.headers["x-auth-token"]
            );
            setResult(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log({ errorMessage: error.toString() });
            console.error("There was an error!", error);
        });
  }

  return (
    <>
      <Container>
        <Typography variant="h5" gutterBottom align="center" sx={{padding: 3}}>
          Results
        </Typography>
        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
          <DateTime getDate={setStartDate} title="Begin"/>
          <DateTime getDate={setEndDate} title="End"/>
          {/* <CustomizedMenus getStatus={setStatus}/> */}
          <Button variant="contained" onClick={resultHendler}>Result</Button>
        </div>
        {
          result?<Paper elevation={4} sx={{my: 3, p: 2}}><InformationCard startDate={startDate} endDate={endDate} result={result}/></Paper>:<></>
        }
      </Container>

    </>
  )
}
