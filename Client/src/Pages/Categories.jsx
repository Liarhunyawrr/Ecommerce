import { LiaLaptopSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { TiCancel } from "react-icons/ti";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from "../Components/Rating";
import { InfinitySpin } from "react-loader-spinner";
const Categories = () => {
  const naivigate = useNavigate();
  const getitem = (_id) => {
    axios.get(`http://localhost:4000/product/${_id}`).then(() => {
      naivigate(`/product/${_id}`);
    });
  };
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [posts, setposts] = useState([]);
  const [vis, setvis] = useState(6);
  const shouldShowButton = vis < posts.length;
  useEffect(() => {
    axios.get("http://localhost:4000/check").then((e) => {
      const shuffledPosts = shuffleArray(e.data);
      setposts(shuffledPosts);
    });
  }, []);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const showmore = () => {
    setvis(vis + 6);
  };

  return (
    <>
      <div className="categories min-h-[100vh]  p-2">
        <h1 className="text-4xl sm:text-3xl mb:text-2xl   my-6 font-semibold">
          Browse by categories
        </h1>
        <hr />
        <div className="caticons container flex-wrap sm:gap-4 items-center  flex justify-center gap-6 mx-auto  p-2">
          <div
            onClick={() => handleCategoryClick("men's clothing")}
            className={`icon w-[100px] ${
              selectedCategory === "men's clothing" ? "bgg" : ""
            } flex flex-col cursor-pointer  capitalize justify-center items-center sm:h-[80px]  sm:w-[80px] h-[100px] m-2 sm:m-0  border`}
          >
            <span className=" text-3xl">
              <LiaLaptopSolid />
            </span>
            <p>men </p>
          </div>
          <div
            onClick={() => handleCategoryClick("women's clothing")}
            className={`icon w-[100px] flex flex-col cursor-pointer capitalize justify-center  ${
              selectedCategory === "women's clothing" ? "bgg" : ""
            } items-center sm:h-[80px] sm:w-[80px] h-[100px] m-2 sm:m-0  border`}
          >
            <span className=" text-3xl">
              <LiaLaptopSolid />
            </span>
            <p>women </p>
          </div>
          <div
            onClick={() => handleCategoryClick("electronics")}
            className={`icon w-[100px] ${
              selectedCategory === "electronics" ? "bgg" : ""
            } flex flex-col cursor-pointer capitalize justify-center items-center sm:h-[80px] sm:w-[80px] h-[100px] m-2 sm:m-0  border`}
          >
            <span className=" text-3xl">
              <LiaLaptopSolid />
            </span>
            <p>electronics </p>
          </div>
          <div
            onClick={() => handleCategoryClick("jewelery")}
            className={`icon w-[100px] ${
              selectedCategory === "jewelery" ? "bgg" : ""
            } flex flex-col cursor-pointer capitalize justify-center items-center sm:h-[80px] sm:w-[80px] h-[100px] m-2 sm:m-0  border`}
          >
            <span className=" text-3xl">
              <LiaLaptopSolid />
            </span>
            <p>jewelry </p>
          </div>
          <p
            className="text-2xl cursor-pointer "
            onClick={() => {
              setSelectedCategory(null);
            }}
          >
            <TiCancel />
          </p>
        </div>
        <hr />
        <div className="products justify-center  flex gap-20 md:gap-10 my-10  flex-wrap  ">
          {selectedCategory === null
            ? posts.slice(0, vis).map((e) => (
                <div
                  onClick={() => getitem(e._id)}
                  key={e._id}
                  className="pro cursor-pointer p-3 my-4"
                >
                  <div className="imgp relative">
                    <p
                      id="load"
                      className="absolute z-[-1] top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2"
                    >
                      <InfinitySpin
                        visible={true}
                        width="100"
                        color="#fa2577"
                        ariaLabel="infinity-spin-loading"
                      />
                    </p>
                    <img className="border " loading="lazy" src={e.img} />
                  </div>
                  <div className="text py-4 px-2 max-w-[300px]  border-2 ">
                    <p className="w-[auto] text-sm font-medium">{e.title}.</p>
                    <p className="texty my-1">${e.price}</p>
                    <p className="flex items-center gap-1">
                      {" "}
                      <Rating ratingg={e.rating.rate} />{" "}
                      <span className="text-xs texty"> ({e.rating.count})</span>
                    </p>
                  </div>
                </div>
              ))
            : posts
                .filter((e) => e.category === selectedCategory)
                .map((e) => (
                  <div
                    onClick={() => getitem(e._id)}
                    key={e._id}
                    className="pro cursor-pointer p-3 my-4"
                  >
                    <div className="imgp relative">
                      <p
                        id="load"
                        className="absolute z-[-1] top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2"
                      >
                        <InfinitySpin
                          visible={true}
                          width="100"
                          color="#fa2577"
                          ariaLabel="infinity-spin-loading"
                        />
                      </p>
                      <img className="border" loading="lazy" src={e.img} />
                    </div>
                    <div className="text py-4 px-2 max-w-[300px]  border-2 ">
                      <p className="w-[auto] text-sm font-medium">{e.title}.</p>
                      <p className="texty my-1">${e.price}</p>
                      <p className="flex items-center gap-1">
                        {" "}
                        <Rating ratingg={e.rating.rate} />{" "}
                        <span className="text-xs texty">
                          {" "}
                          ({e.rating.count})
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
        </div>
        <hr />
        {shouldShowButton && selectedCategory === null && (
          <p
            onClick={showmore}
            className="text-center text-xl hover:font-bold transition-all duration-100 ease-in-out  cursor-pointer mx-auto my-3 texty font-semibold  "
          >
            Show more
          </p>
        )}
        <hr />
      </div>
    </>
  );
};

export default Categories;
