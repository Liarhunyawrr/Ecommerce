import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SideImage from "../assets/SideImage.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Stores/FirebaseStore/Firebase";
import context from "../Stores/ContextStore/Context";
import { toast } from "react-toastify";

const Login = () => {
  const naivigate = useNavigate();
  const auth = getAuth(app);
  const { setUser } = useContext(context);

  const [data, setdata] = useState({
    email: "",

    password: "",
  });
  const { email, password } = data;
  const getdata = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUser(true);
        toast.success(`Login Successfully`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        naivigate("/");
      })
      .catch(() => {
        toast.error(`Login Failed. Check Email or Password.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <>
 

      <div className="join capitalize  p-2 flex h-[80vh]">
        <div className="left  md:hidden  w-full  p-2">
          <div className="img h-[100%] flex  ">
            <img className="rounded-lg" src={SideImage} alt="" />
          </div>
        </div>

        <div className="right flex justify-center items-center  w-full p-2">
          <form className=" mx-4 border-2   px-7 rounded-xl" onSubmit={getdata}>
            <h1 className=" my-8 text-center text-4xl font-bold">Login Here</h1>
            <h5 className="mt-10">Email:</h5>
            <input
              required
              className="border w-72   h-10 rounded-lg px-3   my-[2px]"
              value={data.email}
              onChange={(e) => {
                setdata({ ...data, email: e.target.value });
              }}
              type="email"
            />
            <h5 className="mt-3">Password: </h5>
            <input
              required
              className="border w-72   my-[2px]  h-10 rounded-lg px-3"
              value={data.password}
              onChange={(e) => {
                setdata({ ...data, password: e.target.value });
              }}
              type="password"
            />
            <br />{" "}
            <Link
              className="underline text-sm texty inline-block my-"
              to="/join  "
            >
              New here..?
            </Link>
            <button className="button mb-12 my-5" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
