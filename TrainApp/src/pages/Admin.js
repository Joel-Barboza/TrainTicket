import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Login from "./CreateUser";
import { AuthContext } from "../contexts/AuthProvider";
import { GetTrainRoutes, AddTrainRoutes } from "../services/TrainRouteService";
// import AddRouteForm from '../components/AddRouteForm';
// import ModifyRoutes from '../components/ModifyRoutes';
// import ViewReservations from '../components/ViewReservations';

const Admin = () => {
  const { adminLogged } = useContext(AuthContext);

  const navigate = useNavigate();

  // if (!adminLogged) {
  //   navigate("./login");
  // }

  let places = [
    {
      cost: 1,
      distanceInKm: 1,
      start: "Cartago",
      end: "San Jose",
    },
    {
      cost: 1,
      distanceInKm: 1,
      start: "San Jose",
      end: "Heredia",
    },
    {
      cost: 5,
      distanceInKm: 55,
      start: "sddfsdfsdf",
      end: "ffff",
    },
    {
      cost: 5,
      distanceInKm: 55,
      start: "sddfsdfsdf",
      end: "ffff",
    },
    {
      cost: 5,
      distanceInKm: 55,
      start: "sddfsdfsdf",
      end: "ffff",
    },
    {
      cost: 5,
      distanceInKm: 55,
      start: "sddfsdfsdf",
      end: "ffff",
    },
  ];

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

// <main>

//   <main>
//     <h1>Train Routes</h1>
//     <form className="login-form">
//       <input
//         type="text"
//         name="start-place"
//         placeholder="Start place"
//         aria-label="Login"
//         autoComplete="start-place"
//         value={start}
//         onChange={(e) => setStart(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         name="end-place"
//         placeholder="End Place"
//         aria-label="end-place"
//         autoComplete="end-place"
//         value={end}
//         onChange={(e) => setEnd(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         name="distance"
//         placeholder="Distance in Km"
//         aria-label="distance"
//         autoComplete="distance"
//         value={distanceInKm}
//         onChange={(e) => {
//           setDistanceInKm(e.target.value);
//           setCost(distanceInKm * 25);
//         }}
//         required
//       />
//       <p>Cost will be ${distanceInKm * 25}</p>

//       <button type="button" onClick={loadData}>
//         Load Routes
//       </button>
//     </form>
//   </main>
// </main>
// {/* <main>

//    )  */}
