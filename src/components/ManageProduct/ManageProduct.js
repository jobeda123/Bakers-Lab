import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import remove from '../../icons/remove.png';
import './ManageProduct.css';
import { UserContext } from '../../App';
import './ManageProduct.css';



const ManageProduct = () => {
    const [cakes, setCakes] = useState([]);
    const [loggedInUser, setLoggedInUser, adminAddAction, setAdminAddAction] = useContext(UserContext);

    useEffect(() => {
        const email = loggedInUser.email; 
        console.log("User Email::::::",email);
        console.log("manage product clicking......", loggedInUser);
        fetch('https://shielded-wildwood-39102.herokuapp.com/adminCakes?email='+email)
            .then(res => res.json())
            .then(data => setCakes(data))
            .catch(error=>console.log(error))
    }, [])


    console.log("manage cake from client: ", cakes);
    const handleCakeRemove = (id) => {
        console.log("Remove Clicking.......", id);
        fetch(`https://shielded-wildwood-39102.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(result => {
            console.log('Result---->', result);
            // if (result) {
            //     event.target.parentNode.style.display = 'none';
            //     }
            })
        .catch(error=>console.log(error))    

        
    }

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
            minWidth: 200,
        },
    });

    const classes = useStyles();

    return (

        <div className="manageProductArea">
            <h1 id="manageTitle">Manage Product</h1>
            <TableContainer className="tableAreaManage" component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell>Product Name</StyledTableCell>
                            <StyledTableCell align="right">Price&nbsp;($)</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cakes.map(cake => (
                            <StyledTableRow key={cake.name}>
                                <StyledTableCell component="th" scope="row">
                                    {cake.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{cake.price}</StyledTableCell>
                                <StyledTableCell align="right"><button onClick={() => handleCakeRemove(cake._id)} id="removeBtn"><img style={{ width: '30px' }} src={remove} alt="/"></img></button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageProduct;