import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header';
import './Orders.css';

const Orders = () => {
    const [loggedInUser, setLoggedInUser, adminAddAction, setAdminAddAction] = useContext(UserContext);
    const [userAllOrders, setUserAllOrders] = useState([]);
    
    useEffect(() => {
        fetch('https://shielded-wildwood-39102.herokuapp.com/orders?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserAllOrders(data);
            })
    }, [])

    // for table
    const StyledTableCell = withStyles(() => ({
        head: {
            backgroundColor: 'green',
            color: 'white',
        },
        body: {
            fontSize: 14,
            fontWeight: 'bold',
        },
    }))(TableCell);


    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);


    const useStyles = makeStyles({
        table: {
            minWidth: 400,
        },
    });

    const classes = useStyles();
    

    return (
        <div className="App">
            <Header></Header>
            {/* <h1>Hello from Orders......{loggedInUser.name}</h1> */}
            <div className="manageProductArea">
            <h1 id="userOrderTitle">User Order Details</h1>
            <TableContainer className="tableArea" component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell>Cake Name</StyledTableCell>
                            <StyledTableCell align="right">Price&nbsp;($)</StyledTableCell>
                            <StyledTableCell align="right">Order Date</StyledTableCell>
                            <StyledTableCell align="right">Order By</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userAllOrders.map(order => (
                            <StyledTableRow key={order.email}>
                                <StyledTableCell component="th" scope="row">
                                    {order.cakeName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{order.price}</StyledTableCell>
                                <StyledTableCell align="right">{order.orderTime}</StyledTableCell>
                                <StyledTableCell align="right">{order.email}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </div>
    );
};

export default Orders;