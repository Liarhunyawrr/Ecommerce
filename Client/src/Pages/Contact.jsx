import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../Stores/FirebaseStore/Firebase";
import { MdAddIcCall, MdEmail } from "react-icons/md";
const Contact = () => {
  const auth = getAuth(app);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        // User is signed out
        setUserEmail(null);
      }
    });

   
    return () => unsubscribe();
  }, [auth]);
  return (
    <div>
      <h1 className="text-center opacity-55"> Dummy Form</h1>
      <div className="contact   p-2 grid grid-cols-12 min-h-[80vh]">
        <div className="left lg:hidden px-6 py-9 border rounded-lg  col-span-3 flex flex-col justify-center m-1">
          <h1 className="capitalize text-xl font-bold  my-4 items-center   flex">
            {" "}
            <span className="mx-5 bg-[#fa0060]  rounded-full p-2  text-2xl">
              <MdAddIcCall />
            </span>{" "}
            call to us
          </h1>
          <p className="capitalize my-4">
            we are avaiable 24/7, 7 days a week{" "}
          </p>
          <p className="capitalize mb-6">
            <b>phone</b>: +923234567833
          </p>
          <hr />
          <h1 className="capitalize text-xl font-bold  my-6 items-center   flex">
            {" "}
            <span className="mx-5 bg-[#fa0060]  rounded-full p-2  text-2xl">
              <MdEmail />
            </span>{" "}
            Write to us
          </h1>
          <p className="capitalize mb-6">
            Fill out our form and we will contact you within 24 hours{" "}
          </p>
          <p>
            <b>Email</b>: customer@gmail.com
          </p>
          <p>
            <b>Email</b>: support@gmail.com
          </p>
        </div>
        <div className="right p-1 border rounded-lg lg:col-span-12 col-span-9 flex flex-col    m-1">
          <div className="one  p-2 m-1 grid grid-cols-12 ">
            <div className="div  m-1 mb:col-span-12 col-span-6 p-1">
              <input
                placeholder="Enter Your Name...."
                className="w-full border    h-10 rounded-lg px-3  my-[2px]"
                type="text"
              />
            </div>
            <div className="div  m-1 mb:col-span-12 col-span-6 p-1">
              <input
                placeholder="Enter Your Email...."
                className="w-full  border   h-10 rounded-lg px-3   my-[2px]"
                type="text"
              />
            </div>
          </div>
          <div className="two   p-2 m-1 ">
            <div className="texta ">
              <textarea
                placeholder="Enter Your Message...."
                className="w-full border py-2    rounded-lg px-3  my-[2px]"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="three  p-2 m-1 ">
            <button className="button px-3 float-right">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
