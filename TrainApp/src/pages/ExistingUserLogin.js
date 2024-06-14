import { useState, useContext } from "react";
import { UserAuth } from "../services/AdminAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const CreateUser = () => {
  const [user, setUser] = useState("");
  const [pswrd, setPswrd] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn, setUsername, setAdminLogged } =
    useContext(AuthContext);
  const [incorrectLog, setIncorrectLog] = useState(false);
  const [nonExistingUser, setNonExistingUser] = useState(false);
  const [noFile, setNoFile] = useState(false);
  const [noUsers, setNoUsers] = useState(false);

  const verifyUser = async () => {
    if (user !== "" && pswrd !== "") {
      let checkUser = await UserAuth(user, pswrd);

      setIncorrectLog(false);
      setNonExistingUser(false);
      setNoFile(false);
      setNoUsers(false);
      if (checkUser[0] === "admin") {
        setAdminLogged(checkUser[0]);
        setUsername(user);
        navigate("../admin");
      } else if (checkUser[0] === "success") {
        setLoggedIn(checkUser);
        setUsername(user);
        navigate("../../");
      } else if (checkUser[0] === "incorrect") {
        setIncorrectLog(true);
      } else if (checkUser[0] === "non-existent") {
        setNonExistingUser(true);
      } else if (checkUser[0] === "no-file") {
        setNoFile(true);
      } else if (checkUser[0] === "no-users") {
        setNoUsers(true);
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
      <h1>Log in with existing user</h1>
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

        {incorrectLog && <h4>Incorrect password</h4>}
        {nonExistingUser && <h4>User doesn't exist</h4>}
        {noUsers && <h4>There aren't registered users</h4>}
        {noFile && <h4>No users file found</h4>}
        <button id="LOGIN_BTN" type="button" onClick={verifyUser}>
          Log In
        </button>
      </form>
    </main>
  );
};

export default CreateUser;
