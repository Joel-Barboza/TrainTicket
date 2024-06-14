import { useState, useContext } from "react";
import { AdminAuth, UserAuth } from "../services/AdminAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const {redirected, setRedirected} = useContext(AuthContext);

  return (
    <main>
      {!redirected ? (
        <main role="group">
        <div>

          <label>Don't have a user?</label>
          <button
            onClick={() => {
              navigate("./create-user");
              setRedirected(true);
            }}
          >
            Create user
          </button>
        </div>
        <div>

          <label>Already have an user?</label>
          <button
            onClick={() => {
              navigate("./existing-user");
              setRedirected(true);
            }}
          >
            Log in
          </button>
        </div>
        </main>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default Login;
