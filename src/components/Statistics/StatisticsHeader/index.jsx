import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { users_count, done_conditions } from '../../../utils/API_urls'
import axios from '../../../utils/baseUrl';

export default function StatisticsHeader() {

    const [counts, setCounts] = useState({
        count1: 0,
        count2: 0,
        count3: 0
    })

    const [conditions, setConditions] = useState(0)

    useEffect(() => {
        axios
            .get(users_count, {
                headers: {
                    "x-auth-token": sessionStorage.getItem("x-auth-token"),
                },
            })
            .then((response) => {
                sessionStorage.setItem(
                    "x-auth-token",
                    response.headers["x-auth-token"]
                );
                setCounts(response.data)
            })
            .catch((error) => {
                console.log({ errorMessage: error.toString() });
                console.error("There was an error!", error);
            });

        axios
            .get(done_conditions, {
                headers: {
                    "x-auth-token": sessionStorage.getItem("x-auth-token"),
                },
            })
            .then((response) => {
                sessionStorage.setItem(
                    "x-auth-token",
                    response.headers["x-auth-token"]
                );
                setConditions(response.data.count)
            })
            .catch((error) => {
                console.log({ errorMessage: error.toString() });
                console.error("There was an error!", error);
            });
    },[])

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                    <div className="card" style={{transform: 'rotate(2.6517644204492026deg)'}}>
                        <img src="https://thumbs.dreamstime.com/b/composition-attractively-smiling-people-different-52547736.jpg"/>
                        <p>Users</p>
                        <h2>{counts.count3}</h2>
                    </div>
                </Grid>
                <Grid item xs={6} md={3}>
                    <div className="card" style={{transform: 'rotate(-1.34824deg)'}}>
                        <img src="https://cdn.windowsreport.com/wp-content/uploads/2020/05/Arduino-Port-1.jpg"/>
                        <p>Device</p>
                        <h2>00</h2>
                    </div>
                </Grid>
                <Grid item xs={6} md={3}>
                    <div className="card" style={{transform: 'rotate(2.6517644204492026deg)'}}>
                        <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81eD3yEaVlL._AC_SL1500_.jpg"/>
                        <p>Tow Truck</p>
                        <h2>{counts.count2}</h2>
                    </div>
                </Grid>
                <Grid item xs={6} md={3}>
                    <div className="card" style={{transform: 'rotate(2.6517644204492026deg)'}}>
                        <img src="https://thumbs.dreamstime.com/b/work-done-concept-vector-illustration-happy-businessman-sitting-his-desk-74459669.jpg"/>
                        <p>Work done</p>
                        <h2>{conditions}</h2>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}