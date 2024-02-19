import FlashSale from "./FlashSale";
import Categories from "./Categories";
import Service from "./Service";
const Home = () => {
  return (
    <>
      <div className="main  overflow-hidden sm:justify-center  mx-auto flex justify-between container ">
        <div className="left sm:hidden w-[30%] flex flex-col items-center  justify-center  m-2">
          {" "}
          <ul className=" flex flex-col ">
            <li
              className=" cursor-default list-disc  m-1 items-center capitalize   "
              href=""
            >
              Men's Clothing
            </li>

            <li
              className=" cursor-default list-disc  m-1 items-center capitalize   "
              href=""
            >
              Electronics
            </li>
            <li
              className="list-disc cursor-default  m-1 items-center capitalize   "
              href=""
            >
              Women's Clothing
            </li>
            <li
              className="list-disc cursor-default   m-1 items-center capitalize   "
              href=""
            >
              Jewelry
            </li>
          </ul>
        </div>
        <div className="right w-[80%] flex  justify-center    m-2">
          <div className=" relative img">
            <div className="text-4xl sm:leading-[5vw] sm:text-[5vw] font-bold text-white top-[75%] lg:top-[65%] lg:text-3xl  px-3  absolute text">
              Explore our Latest <br /> Electronics
            </div>
            <img
              className="object-cover rounded-md  "
              src="https://images.unsplash.com/photo-1548611716-ad782502c9d2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFwdG9wfHx8fHx8MTcwNzc2NjgxNA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1400"
              alt=""
            />
          </div>
        </div>
      </div>
      <FlashSale />
      <Categories />
      <Service />
    </>
  );
};

export default Home;
