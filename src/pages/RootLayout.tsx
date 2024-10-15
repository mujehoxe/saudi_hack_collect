import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function RootLayout() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
