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

