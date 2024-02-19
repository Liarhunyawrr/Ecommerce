import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
const Service = () => {
  return (
    <>
      <div className="min-h-[40vh] my-14 justify-center gap-7 flex md:flex-col md:gap-0 items-center p-2 border capitalize   service">
        <div className="fd cursor-default flex flex-col items-center justify-center w-[300px] h-[300px]   m-2">
          <span className="seric w-[100px] h-[100px]  text-4xl my-3 rounded-[50%] flex items-center justify-center  ">
            <TbTruckDelivery />
          </span>
          <p  className="text-center">Free and fast delivery.</p>
          <p  className="text-center">free delivery for all orders over $140.</p>
        </div>
        <div className="cs flex flex-col items-center justify-center w-[300px] h-[300px]    m-2">
          <span className="w-[100px] seric h-[100px] rounded-[50%] my-3 text-4xl flex items-center  justify-center  ">
            <BiSupport />
          </span>
          <p className="text-center">24/7 customer service.</p>
          <p className="text-center">friendly 24/7 customer support </p>
        </div>
        <div className="mb flex flex-col items-center justify-center w-[300px] h-[300px]  m-2">
          <span className="w-[100px] h-[100px] rounded-[50%] my-3  text-4xl flex items-center justify-center  seric">
            <IoShieldCheckmarkSharp />
          </span>
          <p  className="text-center">money back guarantee</p>
          <p  className="text-center">return money within 14 days </p>
        </div>
      </div>
    </>
  );
};

export default Service;
