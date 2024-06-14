import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import user from "../images/user.png";
import admin from "../images/admin.png";

const Header = () => {
  const { loggedIn, setLoggedIn, adminLogged, setAdminLogged, username, setUsername, setRedirected } =
    useContext(AuthContext);

  return (
    <header>
      <nav className="header">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/routes">Routes</Link>
          </li>
          <li>
            <Link to="/buy-tickets">Buy Tickets</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        {adminLogged ? (
          <ul className="profile-options">
            <li>
              {username}
              <img src={admin} alt="admin icon" />
            </li>
            <li>
              <button onClick={() => setAdminLogged(false)}>Log Out</button>
            </li>
          </ul>
        ) : (
          <ul className="profile-options">
            <li className="profile">
              {username}
              <img src={user} alt="user icon" />
            </li>
            <li>
              {!adminLogged && !loggedIn ? (
                <button onClick={() => setRedirected(false)}>
                  <Link to="/login">Log In</Link>
                </button>
              ) : (
                <button onClick={() => {setLoggedIn(false);setUsername("")}}>Log out</button>
              )}
            </li>
          </ul>
        )}
      </nav>
      <Outlet />
    </header>
  );
};

export default Header;
