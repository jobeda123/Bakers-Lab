import Header from '../Header/Header';
import './CheckOut.css';
import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserContext } from '../../App';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

const CheckOut = () => {
    const [cake, setCake] = useState({});
    const [loggedInUser, setLoggedInUser, adminAddAction, setAdminAddAction] = useContext(UserContext);
    const { _id } = useParams();

    useEffect(() => {
        fetch('https://shielded-wildwood-39102.herokuapp.com/cake/'+_id)
            .then(res => res.json())
            .then(data => {
                console.log("Single cake..........",data[0]);
                setCake(data[0]);
            })
            .catch(err => {console.log("Error:",err)})
    }, [])

    console.log("Cake Data...", cake);
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
            minWidth: 500,
        },
    });

    const classes = useStyles();

    const handleCheckOut = () =>{
        console.log("checkout button click......");
        // console.log("User info: ",loggedInUser);
        // console.log("Cake info: ",cake);
        const time = new Date().toDateString('DD MMM, YYYY');
        //console.log("Date: ",time);
        const userOrder = {
            userName: loggedInUser.name,
            email: loggedInUser.email,
            cakeName: cake.name,
            cakeImg: cake.imageURL,
            price: cake.price,
            orderTime: time,
        };
        console.log("User order: ",userOrder);
        const url = `https://shielded-wildwood-39102.herokuapp.com/addOrder`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userOrder)
        })
            .then(res => {
                console.log("server side response for user order........", res);
            })

    }

    return (
        <div className="App">
            <Header />
            <div className="checkoutArea">
                <h1 id="userOrderTitle">CheckOut</h1>
                <TableContainer className="tableArea" component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow >
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">Price&nbsp;($)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={cake.name}>
                                <StyledTableCell component="th" scope="row">
                                    {cake.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">1</StyledTableCell>
                                <StyledTableCell align="right">{cake.price}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Link to="/home"> <button id="checkOutButton" onClick={()=>handleCheckOut()}>Check Out</button> </Link>
            </div>


        </div>
    );
};

export default CheckOut;