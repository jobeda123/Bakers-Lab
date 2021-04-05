import React from 'react';
import './AdminNavbar.css';
import logo from '../../images/logo.jpg';
import { Link } from 'react-router-dom';
import managePic from '../../icons/manage.png';
import addPic from '../../icons/add.png';
import homePic from '../../icons/home.png';
import backPic from '../../icons/back.jpg';
import home1Pic from '../../icons/home1.jpg';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';





const AdminNavbar = () => {
    const [loggedInUser, setLoggedInUser, adminAddAction, setAdminAddAction] = useContext(UserContext);
    return (
        <div className="adminNavbarArea">
            <img id="logoImg" src={logo} alt="" />
            <h1>{loggedInUser.name}</h1>
            <div className="navButton" ><img src={managePic} alt="/" />
                <button onClick={()=>{
                    //console.log("Manage product");
                    setAdminAddAction(true);
                    }}>Manage Product</button>
            </div>
            <div className="navButton"><img src={addPic} alt="" />
                <button onClick={()=>{
                    console.log("add product");
                    setAdminAddAction(false);
                    }}>Add Product</button>
            </div>

            <div className="navButton"><FontAwesomeIcon style={{ color:"white", fontSize:"27px", paddingLeft:"24px", paddingTop:"4px", paddingRight:"18px" }} icon={faBackward} />
                <Link to='/home'> <button >Back To Home</button></Link>
            </div>

        </div>
    );
};

export default AdminNavbar;