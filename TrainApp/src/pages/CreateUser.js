import { useState, useContext } from "react";
import { AddUser, AdminAuth } from "../services/AdminAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const CreateUser = () => {
  const [user, setUser] = useState("");
  const [pswrd, setPswrd] = useState("");
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUsername, setAdminLogged } =
    useContext(AuthContext);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const verifyUser = async () => {
    if (user !== "" && pswrd !== "") {
      let checkUser = await AddUser(user, pswrd);
      let checkAdmin = await AdminAuth(user, pswrd);
      console.log(checkUser);
      if (checkUser[0] === "created") {
        setLoggedIn(checkUser);
        setUsername(user);
        navigate("../../");
      } else if (checkUser[0] === "exists" || checkAdmin) {
        setAlreadyExists(true);
      }
    }
  };

  const changePasswordVisibility = () => {
    var x = document.getElementById("PASSWORD_INPUT");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <main>
      <h1>Create user</h1>
      <form className="login-form">
        <input
          type="text"
          name="username"
          id="USERNAME_INPUT"
          placeholder="Username"
          aria-label="Login"
          autoComplete="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          id="PASSWORD_INPUT"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          value={pswrd}
          onChange={(e) => setPswrd(e.target.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            role="switch"
            onClick={changePasswordVisibility}
          />
          Show Password
        </label>

        {alreadyExists && <h4>User already exists</h4>}
        <button id="LOGIN_BTN" type="button" onClick={verifyUser}>
          Log In
        </button>
      </form>
    </main>
  );
};

export default CreateUser;
