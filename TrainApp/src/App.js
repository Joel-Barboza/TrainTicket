import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RoutesPage from "./pages/RoutesPage";
import BuyTickets from "./pages/BuyTickets";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import AddRoute from "./pages/AddRoute";
import DeleteRoute from "./pages/DeleteRoute";
import ModifyRoute from "./pages/ModifyRoute";
import AdminLogin from "./pages/AdminLogin";
import { AuthProvider } from "./contexts/AuthProvider";
import CreateUser from "./pages/CreateUser";
import ExistingUserLogin from "./pages/ExistingUserLogin";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Header />}>
            <Route index element={<Home />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="buy-tickets" element={<BuyTickets />} />
            <Route path="admin" element={<Admin />}>
              <Route path="add-route" element={<AddRoute />}/>
              <Route path="delete-route" element={<DeleteRoute />}/>
              <Route path="modify-route" element={<ModifyRoute />}/>
            </Route>
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="login" element={<Login />}>
             <Route path="create-user" element={<CreateUser />}/>
             <Route path="existing-user" element={<ExistingUserLogin />}/>
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import { GetTrainRoutes } from './services/TrainRouteService';
// import { useEffect, useState } from 'react';

// function App() {
//   const [routes, setRoutes] = useState([]);
//   const [currentTime, setCurrentTime] = useState(Date().toLocaleString());

//   useEffect(() => {
//     async function loadData() {
//       let routes = await GetTrainRoutes();
//       setRoutes(routes);
//     }

//     setInterval(() => {
//       setCurrentTime(Date().toLocaleString());
//     }, 1000)

//     // setInterval(() => {
//     //   loadData();
//     // }, 5000)
//   }, []);

//   return (
//     <div className="App">
//       {currentTime}
//       <table>
//         <thead>
//           <tr>
//             <th>Start</th>
//             <th>End</th>
//             <th>Cost</th>
//             <th>Distance</th>
//           </tr>
//         </thead>
//       {routes.map((element, index) =>
//         <tr id={index}>
//           <td>{element.start}</td>
//           <td>{element.end}</td>
//           <td>{element.cost}</td>
//           <td>{element.distanceInKm}</td>
//         </tr>
//       )}
//       </table>
//     </div>
//   );
// }

// export default App;
