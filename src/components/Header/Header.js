import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.jpg';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log(loggedInUser.name);

    return (
        <Container className="header App">
            <img className="imgStyle" src={logo} alt=""></img>
            <nav className="navBar">
                <Link className="nav" to="/home">Home</Link>
                <Link className="nav" to="/orders">Orders</Link>
                <Link className="nav" to="/admin">Admin</Link>
                <Link className="nav" to="/deals">Deals</Link>
            </nav>
                { !loggedInUser.success? 
                    <Link to='/login'> <Button className="logInBtn" variant="primary">LOG IN</Button> </Link>
                    : <p className="userNameTitle">{loggedInUser.name}</p>
                }
            
        </Container>
    
    );
};


export default Header;