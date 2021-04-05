import './Login.css';
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import Header from '../Header/Header';
import logo from '../../images/logo.jpg';
import googleIcon from '../../icons/googleIcon.png';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedInUser: false,
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSignInWithGoogle = () => {
        //console.log('clicking....');
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then(res => {
                // The signed-in user info.
                console.log(res.user);
                console.log("Sign in with google----", res.user.displayName);
                const newUserInfo = { ...user };
                newUserInfo.error = '';
                newUserInfo.success = true;
                newUserInfo.name = res.user.displayName;
                newUserInfo.email = res.user.email;
                newUserInfo.isSignedInUser = true;
                updateUserName(newUserInfo.name);
                setUser(newUserInfo);
                //var user = res.user;
                setLoggedInUser(newUserInfo);
                console.log("Sign in with google and user info----", newUserInfo);
                history.replace(from);
            })
            .catch(error => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
    }



    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(() => {
            // Update successful.
            console.log("User Name Updated Successfully");
        }).catch(error => {
            // An error happened.
            console.log(error);
        });

    }


    return (
        <div className="header">
            <img className="imgStyle" src={logo} alt=""></img>

            <div className="SignIn">
                <h2>__________Sign In__________</h2>
                <button onClick={handleSignInWithGoogle}> <span> <img id="googleIcon" src={googleIcon} alt="/"></img> </span>   Continue With Google</button>
            </div>

        </div>
    );
};

export default Login;