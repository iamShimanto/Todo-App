import React from "react";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Error from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Reset from "./pages/Reset.jsx";
import Layout from "./layout/index.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
