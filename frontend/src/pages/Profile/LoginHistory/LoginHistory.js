import { Box, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import * as React from 'react';
import './loginhistory.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

export default function LoginHistory ({user}){
    const [open, setOpen] = React.useState(false);
    const [history, setHistory] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowPerPage] = React.useState(5);

    React.useEffect(() =>{
        const fetchHistory = async () =>{
            await axios.get(`http://localhost:5000/api/login/userlogin?email=${user?.email}`)
            .then(response => {
                setHistory(response.data);
                console.log(history);                
            })
            .catch(err =>{
                console.log(err.response ? err.response.data : 'Error occurred');
            });
        };
        fetchHistory();
    }, [user?.email]);

    const handlePageChange = (event, newPage) =>{
        setPage(newPage);
    };

    const handleRowsPerPage = (event) =>{
        setRowPerPage(+event.target.value);
        setPage(0);
    };

    const style={
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '600px',
        bgcolor: 'background.paper',
        boxShadow: '24',
        borderRadius: 8,
    };
    return(
        <div>
            <button className='login-history-btn' onClick={()=> setOpen(true)}>Login History</button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='modal'>
                    <div className='head'>
                        <IconButton onClick={() => {setOpen(false)}}><CloseIcon /></IconButton>
                        <h1 className='head-title'>Login History</h1>
                    </div>
                    <Paper sx={{width: '90%', marginLeft: '5%'}}>
                        <TableContainer width= '90%' margin= 'auto'>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{backgroundColor: 'black', color: 'white'}}>Time</TableCell>
                                        <TableCell style={{backgroundColor: 'black', color: 'white'}}>Ip Address</TableCell>
                                        <TableCell style={{backgroundColor: 'black', color: 'white'}}>Browser</TableCell>
                                        <TableCell style={{backgroundColor: 'black', color: 'white'}}>OS</TableCell>
                                        <TableCell style={{backgroundColor: 'black', color: 'white'}}>Device</TableCell>
                                        <TableCell style={{backgroundColor: 'black', color: 'white'}}>Mobile</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history && history
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((entry, i)=>(
                                        <TableRow key={i}>
                                            <TableCell>{entry.createdAt}</TableCell>
                                            <TableCell>{entry.ipAddress}</TableCell>
                                            <TableCell>{entry.browser}</TableCell>
                                            <TableCell>{entry.os}</TableCell>
                                            <TableCell>{entry.device}</TableCell>
                                            <TableCell>{entry.mobile}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={5}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            count={history.length}
                            component='div'
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPage}
                        >
                        </TablePagination>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
};