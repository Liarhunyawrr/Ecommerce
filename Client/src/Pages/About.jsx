import img from "../assets/aboutimg.png";
import { BsBagCheckFill } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
const About = () => {
  return (
    <>
      <div className="about md:flex-row-reverse grid grid-cols-12 p-2">
        <div className="left  border min-h-20 md:order-last flex flex-col px-9 mb:px-3 sm:my-9 justify-center md:col-span-12  col-span-6 rounded-lg m-2">
          <h1 className="text-4xl my-8 font-bold  ">OUR STORY</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus optio eos qui voluptate officiis aperiam id voluptatum,
            nisi assumenda at rem consequatur perspiciatis?Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Eveniet rerum veniam soluta
            odit!
          </p>{" "}
          <br />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
            quidem! Eveniet cupiditate porro nihil fuga officiis possimus, quos
            vel maxime beatae dolorem accusamus.
          </p>
        </div>
        <div className="right  max-h-[80vh] flex justify-center min-h-20   md:col-span-12  col-span-6 m-2">
          <img className="h-full object-cover  rounded-lg" src={img} alt="" />
        </div>
      </div>
      <div className="icons  p-2 my-20">
        <div className="min-h-[40vh] my-14 justify-center gap-7 flex md:flex-col md:gap-0 items-center p-2 border capitalize   service">
          <div className="fd cursor-default flex flex-col items-center justify-center w-[300px] h-[300px]   m-2">
            <span className="seric w-[100px] h-[100px]  text-4xl my-3 rounded-[50%] flex items-center justify-center  ">
              <AiOutlineShop />
            </span>
            <p className="text-center font-bold text-2xl">10.5k</p>
            <p className="text-center">sellers active on our site</p>
          </div>
          <div className="cs flex flex-col items-center justify-center w-[300px] h-[300px]    m-2">
            <span className="w-[100px] seric h-[100px] rounded-[50%] my-3 text-4xl flex items-center  justify-center  ">
              <BsCoin />
            </span>
            <p className="text-center  font-bold text-2xl">33k</p>
            <p className="text-center">monthly products sale </p>
          </div>
          <div className="mb flex flex-col items-center justify-center w-[300px] h-[300px]  m-2">
            <span className="w-[100px] h-[100px] rounded-[50%] my-3  text-4xl flex items-center justify-center  seric">
              <BsBagCheckFill />
            </span>
            <p className="text-center  font-bold text-2xl">25K</p>
            <p className="text-center">Anual gross sale in our site </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
