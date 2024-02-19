import { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../Stores/FirebaseStore/Firebase";
import { Link, useNavigate } from "react-router-dom";
import SideImage from "../assets/SideImage.png";
import axios from "axios";
import context from "../Stores/ContextStore/Context";
import { toast } from "react-toastify";

const Signup = () => {
  const naivigate = useNavigate();
  const auth = getAuth(app);
  const { setUser, setlogid } = useContext(context);

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const getdata = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const firebaseUser = userCredential.user;
        console.log(firebaseUser);
        return axios.post("http://localhost:4000/user", data);
      })
      .then((response) => {
        const createdUser = response.data.user;

        setlogid(createdUser._id);

        setUser(true);

        toast.success(`SignUp Successfully`, {
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
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to create user");
        toast.error(`SignUp Failed`, {
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
      <div className="join capitalize  p-2 flex  min-h-[80vh]">
        <div className="left md:hidden  w-full  p-2">
          <div className="img h-[100%] flex  ">
            <img className="rounded-lg max-h-[80vh]" src={SideImage} alt="" />
          </div>
        </div>

        <div className="right flex items-center  justify-center  w-full p-2">
          <form className=" mx-4 border-2  px-7  rounded-xl" onSubmit={getdata}>
            <h1 className=" my-8 text-center text-4xl font-bold">Join Here</h1>
            <h5 className="mt-10">Username:</h5>
            <input
              className="border w-72   h-10 rounded-lg px-3  my-[2px] "
              required
              type="text"
            />
            <h5 className="mt-3">Email:</h5>
            <input
              required
              name="email"
              className="border w-72   h-10 rounded-lg px-3   my-[2px]"
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
              type="email"
            />
            <h5 className="mt-3">Password: </h5>
            <input
              required
              name="password"
              className="border w-72   my-[2px]  h-10 rounded-lg px-3"
              value={data.password}
              onChange={(e) => setdata({ ...data, password: e.target.value })}
              type="password"
            />{" "}
            <br />{" "}
            <Link
              className="underline text-sm texty inline-block my-"
              to="/login"
            >
              Already Have Account..?
            </Link>
            <button className="button mb-9 my-5" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
