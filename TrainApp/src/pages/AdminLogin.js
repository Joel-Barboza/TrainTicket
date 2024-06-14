import { useState, useContext } from "react";
import { AdminAuth } from "../services/AdminAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const [user, setUser] = useState("Joel");
  const [pswrd, setPswrd] = useState("");
  const navigate = useNavigate();
  const { adminLogged, setAdminLogged, setUsername } = useContext(AuthContext);
  const [incorrectLog, setIncorrectLog] = useState(false);

  const verifyAdmin = async () => {
    if (user !== "" && pswrd !== "") {
      let checkAdmin = await AdminAuth(user, pswrd);
      setAdminLogged(checkAdmin);
      if (checkAdmin) {
        setUsername(user);
        navigate("../admin");
      } else {
        setIncorrectLog(true);
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
      <h1>Sign in</h1>
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

        {incorrectLog && <h4>Incorrect username or password</h4>}
        <button id="LOGIN_BTN" type="button" onClick={verifyAdmin}>
          Log In
        </button>
      </form>
    </main>
  );
};

export default Login;
