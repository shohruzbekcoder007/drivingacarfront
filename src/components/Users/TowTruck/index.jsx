import React, { useEffect, useState, useRef } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import axios from '../../../utils/baseUrl'
import { user_list } from '../../../utils/API_urls'
import Pagination from '@mui/material/Pagination'
import { PaginationWrapper } from './styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

export default function TowTruck() {

    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)

    const userName = useRef()
    const userEmail = useRef()
    const userTelNumber = useRef()

    const handleChange = (_, p) => {
        setPage(p);
    }

    const searchDevice = () => {
        setPage(1)
        axios
            .get(`${user_list}?status=2&name=${userName.current.value}&email=${userEmail.current.value}&tel_number=${userTelNumber.current.value}`, {
                headers: {
                    "x-auth-token": sessionStorage.getItem("x-auth-token"),
                },
            })
            .then((response) => {
                sessionStorage.setItem(
                    "x-auth-token",
                    response.headers["x-auth-token"]
                );
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log({ errorMessage: error.toString() });
                console.error("There was an error!", error);
            });
    }

    useEffect(() => {
        axios
            .get(`${user_list}?status=2&page=${page}`, {
                headers: {
                    "x-auth-token": sessionStorage.getItem("x-auth-token"),
                },
            })
            .then((response) => {
                sessionStorage.setItem(
                    "x-auth-token",
                    response.headers["x-auth-token"]
                );
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log({ errorMessage: error.toString() });
                console.error("There was an error!", error);
            });
    }, [page]);

    return (
        <>
            <Typography variant="h6" gutterBottom align='center' sx={{mt: 1, mb: 2}}>
                Tow trucks available in the system
            </Typography>
            <Paper elevation={2} sx={{ margin: "15px 0", p: 2 }}>
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Name" variant="standard" inputRef={userName} />
                    <TextField id="standard-basic1" label="Email" variant="standard" inputRef={userEmail} />
                    <TextField id="standard-basic2" label="Tel number" variant="standard" inputRef={userTelNumber} />
                    <Button variant="contained" sx={{marginTop: 2}} onClick={searchDevice}>Search</Button>
                </Box>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Name</h3></TableCell>
                            <TableCell align="right"><h3>email</h3></TableCell>
                            <TableCell align="right"><h3>tel_number</h3></TableCell>
                            {/* <TableCell align="right"><h3>device_number</h3></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (users.length === 0) ?
                                <>
                                    <TableRow>
                                        <TableCell component="th" scope="row"><Skeleton animation="wave" /></TableCell>
                                        <TableCell component="th" align="right"><Skeleton animation="wave" /></TableCell>
                                        <TableCell component="th" align="right"><Skeleton animation="wave" /></TableCell>
                                        {/* <TableCell component="th" align="right"><Skeleton animation="wave" /></TableCell> */}
                                    </TableRow>
                                </> :
                                users.map(elem => {
                                    return (
                                        <TableRow key={elem._id}>
                                            <TableCell component="th" scope="row">{elem.name}</TableCell>
                                            <TableCell component="th" align="right">{elem.email}</TableCell>
                                            <TableCell component="th" align="right">{elem.tel_number}</TableCell>
                                            {/* <TableCell component="th" align="right">{elem.device_number}</TableCell> */}
                                        </TableRow>
                                    )
                                })
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
