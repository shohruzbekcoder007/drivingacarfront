import React, { useState, useEffect } from 'react'
import { Pagination, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { PaginationWrapper } from './styles'
import { condition_search } from '../../../utils/API_urls'
import axios from '../../../utils/baseUrl'

export default function Intoxication() {

    const [drunkUser, setDrunkUser] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)

    const handleChange = (_, p) => {
        setPage(p);
    }

    useEffect(() => {
        axios
            .get(`${condition_search}?page=${page}&status=1`, {
                headers: {
                    "x-auth-token": sessionStorage.getItem("x-auth-token"),
                },
            })
            .then((response) => {
                sessionStorage.setItem(
                    "x-auth-token",
                    response.headers["x-auth-token"]
                );
                setDrunkUser(response.data.conditions);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log({ errorMessage: error.toString() });
                console.error("There was an error!", error);
            });
    }, [page]);

    return (
        <>
            <Typography variant="h6" gutterBottom align='center' sx={{ mt: 1, mb: 2 }}>
                Drunk users
            </Typography>
            <TableContainer elevation={4} component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>User name</h3></TableCell>
                            <TableCell><h3>tel_number</h3></TableCell>
                            <TableCell><h3>date</h3></TableCell>
                            <TableCell><h3>status</h3></TableCell>
                            <TableCell align="right"><h3>Device number</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (drunkUser.length === 0) ?
                                <>
                                    <TableRow>
                                        <TableCell component="th" scope="row"><Skeleton animation="wave" /></TableCell>
                                        <TableCell component="th" align="right"><Skeleton animation="wave" /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row"><Skeleton animation="wave" /></TableCell>
                                        <TableCell component="th" align="right"><Skeleton animation="wave" /></TableCell>
                                    </TableRow>
                                </> :
                                drunkUser.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.user.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.user.tel_number}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {new Date(row.created_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <span style={{color: "red"}}>Intoxication has been detected</span>
                                        </TableCell>
                                        <TableCell component="th" align="right">{row.device_number}</TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationWrapper>
                <Pagination
                    count={totalPages}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                    onChange={handleChange}
                />
            </PaginationWrapper>
        </>
    )
}
