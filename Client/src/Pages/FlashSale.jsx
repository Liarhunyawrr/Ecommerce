import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Style.css";

import { EffectCoverflow, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import Rating from "../Components/Rating";
const FlashSale = () => {
  const navigate = useNavigate();
  const calculateTimeRemaining = () => {
    const now = new Date();
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const timeRemaining = endOfToday - now;

    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [sale, setsale] = useState([]);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const generateRatingStars = (rating) => {
    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i}>
          {" "}
          <FaStar />
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star">
          <FaRegStarHalfStroke />
        </span>
      );
    }

    const remainingStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`}>
          {" "}
          <FaRegStar />
        </span>
      );
    }

    return stars;
  };

  const rating = 4.5;
  const ratingStars = generateRatingStars(rating);

  useEffect(() => {
    axios
      .get("http://localhost:4000/check")
      .then((response) => {
        const allProducts = response.data;
        const featuredProducts = allProducts.filter(
          (product) => product.feature === true
        );
        setsale(featuredProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const redi = (_id) => {
    navigate(`/product/${_id}`);
  };
  let pri = [100, 14, 17, 1850, 52];
  return (
    <>
      <div className=" my-10 p-3  min-h-[110vh]">
        <hr />
        <div className="sale flex sm:flex-col sm:items-start items-center gap-x-16 my-5 ">
          <h1 className="text-4xl sm:text-3xl mb-3  font-semibold">
            Flash sale
          </h1>
          <div className="time flex capitalize  items-center gap-6 ">
            <span className="hour ">
              <h1>hours</h1>
              <h1 className="text-3xl sm:text-2xl font-medium">
                {timeRemaining.hours}
              </h1>
            </span>{" "}
            <b>:</b>
            <span className="minute ">
              {" "}
              <h1>Minutes</h1>
              <h1 className="text-3xl sm:text-2xl font-medium">
                {timeRemaining.minutes}
              </h1>
            </span>{" "}
            <b>:</b>
            <span className="second ">
              {" "}
              <h1>Seconds</h1>
              <h1 className="text-3xl sm:text-2xl font-medium">
                {timeRemaining.seconds}
              </h1>
            </span>
          </div>
        </div>

        <hr />
        <div className="imges my-9    p-2">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper "
          >
            {sale.map((e, index) => (
              <SwiperSlide key={e._id}>
                <p className="absolute  -z-[1] top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2">
                  {" "}
                  <InfinitySpin
                    visible={true}
                    width="100"
                    color="#fa2577"
                    ariaLabel="infinity-spin-loading"
                  />
                </p>
                <img loading="lazy" src={e.img} />
                <div
                  onClick={() => {
                    redi(e._id);
                  }}
                  className="text cursor-pointer p-2 sm:px-6  border"
                >
                  <p className="text-sm my-1 font-medium">{e.title}</p>
                  <p className="texty">
                    ${e.price}{" "}
                    <span className="line-through text-xs font-light mx-1">
                      ${pri[index]}
                    </span>
                  </p>
                  <p className="flex mt-3">
                    {" "}
                    <Rating ratingg={e.rating.rate} />{" "}
                    <span className="text-xs texty ">({e.rating.count})</span>{" "}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FlashSale;
