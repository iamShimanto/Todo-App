import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const Layout = () => {
  const userInfo = useSelector((state) => state.userData.value);

  if (!userInfo) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
