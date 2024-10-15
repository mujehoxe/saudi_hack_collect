import { NavLink } from "react-router-dom";
import { isLoggedIn } from "../router/router";

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-32 py-3">
      <div className="flex flex-row-reverse gap-x-10 md:gap-x-24 font-medium text-lg">
        <NavLink to={"/about"}>حول</NavLink>
        <NavLink to={"/"}>الرئيسية</NavLink>
        {!isLoggedIn() && <NavLink to={"/register"}>تسجيل</NavLink>}
      </div>
      <div className="h-12 w-12">
        <img src="/assets/quran.png" alt="" />
      </div>
    </nav>
  );
}

export default NavBar;
