import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Admin = () => {
  const { adminLogged } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleNotLoggedIn = () => {
    navigate("../admin-login");
  };

  return (
    <>
      <main>
        {adminLogged ? (
          <>
            <div className="admin-options-bar">
              <span>Admin options: </span>
              <Link to="/admin/add-route">Add Route</Link>

              <Link to="/admin/delete-route">Delete Route</Link>

              <Link to="/admin/modify-route">Modify Route</Link>
            </div>
            <main>
              <Outlet />
            </main>
          </>
        ) : (
          <main>
            <h1>You need to log in as admin first</h1>
            <button onClick={handleNotLoggedIn}>Go to Log In page</button>
          </main>
        )}
      </main>
    </>
  );
};

export { AuthContext };
export default Admin;


