import React, { useEffect, useState } from 'react'
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
import { driver_list } from '../../utils/API_urls'
import { PaginationWrapper } from './styles'

export default function Device() {

  const [devices, setDevices] = useState([])

  useEffect(() => {
    axios
      .get(driver_list)
      .then((response) => {
        sessionStorage.setItem(
          "x-auth-token",
          response.headers["x-auth-token"]
        );
        setDevices(response.data);
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <Container>
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
                  <TableRow>
                    <TableCell component="th" scope="row"><Skeleton animation="wave" /></TableCell>
                    <TableCell component="th" align="right"><Skeleton animation="wave" /></TableCell>
                  </TableRow>
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
        <Pagination count={3} variant="outlined" color="primary" />
      </PaginationWrapper>
    </Container>
  );
}