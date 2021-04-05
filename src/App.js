import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { createContext, useState } from 'react';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CheckOut from './components/CheckOut/CheckOut';
import Deals from './components/Deals/Deals';


export const UserContext = createContext();
export const AdminContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [adminAddAction, setAdminAddAction] = useState(null);
  //console.log("From App:", adminAddAction);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, adminAddAction, setAdminAddAction]}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>

            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>

            <PrivateRoute path="/checkout/:_id">
              <CheckOut />
            </PrivateRoute>


            <PrivateRoute path="/deals">
              <Deals></Deals>
            </PrivateRoute>


            <Route path="/login">
              <Login />
            </Route>

          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;

