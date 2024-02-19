import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Fixed from "./Fixed";
import Logout from "./Logout";
import context from "../Stores/ContextStore/Context";
const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(context);
  const [active, setactive] = useState(false);

  const menu = () => {
    setactive(!active);
  };
  return (
    <>
      <div className="main">
        <nav className="navbar z-[12] bg-[rgba(248,248,248,.7)] bg-opacity-70 backdrop-blur-10 rounded-b-xl fixed w-full flex justify-between items-center border px-6 py-4">
          <div className="texty logo">
            <Link to="/" className="text-2xl font-bold uppercase">
              logo
            </Link>
            <ul
              className={` transition-all duration-1000 ease-in-out w-full flex flex-col items-start gap-4  absolute bg-white right-0  ${
                active ? "top-[100%]" : "top-[-300%]" 
              } z-[1]  p-3    capitalize`}
            >
              <Link
                className="hover:transform   hover:translate-y-[-4px] transition-transform"
                to="/"
              >
                {" "}
                Home{" "}
              </Link>
              <Link
                className="hover:transform   hover:translate-y-[-4px] transition-transform"
                to="/about"
              >
                {" "}
                About{" "}
              </Link>
              <Link
                className="hover:transform   hover:translate-y-[-4px] transition-transform"
                to="/contact"
              >
                {" "}
                Contact{" "}
              </Link>
              {user ? (
                <div>
                  <Logout />
                </div>
              ) : (
                <Link className="button" to="/join">
                  {" "}
                  join{" "}
                </Link>
              )}
            </ul>
          </div>

          <ul className="flex sm:hidden items-center  capitalize gap-7">
            <Link
              className={`hover:transform ${
                location.pathname === "/" ? "active" : ""
              } hover:translate-y-[-4px] transition-transform`}
              to="/"
            >
              {" "}
              Home{" "}
            </Link>
            <Link
              className={`hover:transform ${
                location.pathname === "/about" ? "active" : ""
              } hover:translate-y-[-4px] transition-transform`}
              to="/about"
            >
              {" "}
              About{" "}
            </Link>
            <Link
              className={`hover:transform ${
                location.pathname === "/contact" ? "active" : ""
              } hover:translate-y-[-4px] transition-transform`}
              to="/contact"
            >
              {" "}
              Contact{" "}
            </Link>

            {user ? (
              <div>
                <Logout />
              </div>
            ) : (
              <Link className="button" to="/join">
                {" "}
                join{" "}
              </Link>
            )}
          </ul>

          <Link to="/cart" className="btns cursor-pointer text-3xl">
            <IoCartOutline />
          </Link>
          <div
            onClick={menu}
            className="btns hidden sm:block cursor-pointer text-3xl"
          >
            {active ? <RxCross2 /> : <IoMdMenu />}
          </div>
        </nav>
      </div>
      <Fixed />
    </>
  );
};

export default Navbar;
