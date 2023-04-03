import React, { useState } from 'react'
import { Pagination, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { PaginationWrapper } from './styles'

export default function CarInTowTruck() {

    const [drunkUser, setDrunkUser] = useState([])

    return (
        <>
            <Typography variant="h6" gutterBottom align='center' sx={{ mt: 1, mb: 2 }}>
                Car is a tow truck
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Name</h3></TableCell>
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
                                            {row.name}
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
                    // count={totalPages}
                    count={1}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                    // onChange={handleChange}
                    onChange={()=> {}}
                />
            </PaginationWrapper>
        </>
    )
}
