import React, { useEffect, useState, useRef } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import axios from '../../utils/baseUrl'
import Skeleton from '@mui/material/Skeleton'
import { driver_create, driver_search } from '../../utils/API_urls'
import { PaginationWrapper } from './styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Device() {

  const [devices, setDevices] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const inputDeviceName = useRef()
  const inputDeviceNumber = useRef()
  const [newDevice, setNewDevice] = useState(null)
  const inputSearchName = useRef()
  const inputSearchNumber = useRef()

  const handleChange = (_, p) => {
    setPage(p);
  }

  const searchDevice = () => {
    setPage(1)
    axios
      .get(`${driver_search}?page=${page}&device_number=${inputSearchNumber.current.value}&name=${inputSearchName.current.value}`, {
        headers: {
          "x-auth-token": sessionStorage.getItem("x-auth-token"),
        },
      })
      .then((response) => {
        sessionStorage.setItem(
          "x-auth-token",
          response.headers["x-auth-token"]
        );
        setDevices(response.data.devices);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }

  const addDevice = () => {
    axios
      .post(`${driver_create}`, {
        name: inputDeviceName.current.value,
        device_number: inputDeviceNumber.current.value
      }, {
        headers: {
          "x-auth-token": sessionStorage.getItem("x-auth-token"),
        }
      }
      )
      .then((response) => {
        sessionStorage.setItem(
          "x-auth-token",
          response.headers["x-auth-token"]
        );
        setNewDevice(response.data)
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
        alert("There was an error!", error)
      });
  }

  useEffect(() => {
    axios
      .get(`${driver_search}?page=${page}&device_number=${inputSearchNumber.current.value}&name=${inputSearchName.current.value}`, {
        headers: {
          "x-auth-token": sessionStorage.getItem("x-auth-token"),
        },
      })
      .then((response) => {
        sessionStorage.setItem(
          "x-auth-token",
          response.headers["x-auth-token"]
        );
        setDevices(response.data.devices);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }, [page, newDevice]);

  return (
    <Container>
      <Typography variant="h6" gutterBottom align='center' sx={{mb: 2}}>
        Devices available in the system
      </Typography>
      <Paper elevation={4} sx={{ margin: "15px 0", p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom >
              Add
            </Typography>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                borderRight: "2px solid #000",
                gap: "15px"
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="standard-basic" label="Name" variant="standard" inputRef={inputDeviceName} />
              <TextField id="standard-basic" label="Device number" variant="standard" inputRef={inputDeviceNumber} />
              <Button variant="contained" sx={{marginTop: '20px', width: 2}} onClick={addDevice}>Add</Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Search
            </Typography>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px"
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="standard-basic1" label="Name" variant="standard" inputRef={inputSearchName}/>
              <TextField id="standard-basic1" label="Device number" variant="standard" inputRef={inputSearchNumber}/>
              <Button variant="contained" sx={{marginTop: '20px'}} onClick={searchDevice}>Search</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer elevation={4} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><h3>Name</h3></TableCell>
              <TableCell align="right"><h3>Device number</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (devices.length === 0) ?
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
                devices.map((row) => (
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
          count={totalPages}
          variant="outlined"
          color="primary"
          shape="rounded"
          onChange={handleChange}
        />
      </PaginationWrapper>
    </Container>
  );
}