import React, { createContext, useContext, useState } from 'react';
import { UserContext } from '../../App';
import AddProduct from '../AddProduct/AddProduct';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import ManageProduct from '../ManageProduct/ManageProduct';
import './Admin.css';


const Admin = () => {
    const [loggedInUser, setLoggedInUser, adminAddAction, setAdminAddAction] = useContext(UserContext);
    //console.log("From admin result: ",adminAddAction);
    return (
        <div className="adminArea">
            <div className="adminNavbar">
                <AdminNavbar></AdminNavbar>
            </div>

            <div className="actionArea">
                { adminAddAction?
                    <ManageProduct></ManageProduct> 
                    : <AddProduct></AddProduct>
                }
            </div>
        </div>
    );
};

export default Admin;