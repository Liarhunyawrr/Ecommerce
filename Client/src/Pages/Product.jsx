import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../Stores/FirebaseStore/Firebase";
import Rating from "../Components/Rating";
import { toast } from "react-toastify";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const [load, setload] = useState(true);
  const auth = getAuth(app);
  const [userEmail, setUserEmail] = useState(null);
  const [userid, setuserid] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/loginuser/${userEmail}`).then((e) => {
      setuserid(e.data._id);
    });
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });

    return () => unsubscribe();
  }, [auth]);

  const { id } = useParams();
  const [itemData, setitemData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:4000/product/${id}`).then((e) => {
      setitemData(e.data);
      setload(false);
    });
  }, [id]);

  const addToCart = () => {
    axios
      .post(`http://localhost:4000/cart/${userid}`, {
        productId: id,
        quan: 1,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Product added to the cart!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (response.status === 250) {
          toast.error(`Product is already in the cart!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
const joi=()=>{
  toast.info(`Join To Add Items In Cart`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
  return (
    <>
      {load ? (
        <p>load</p>
      ) : (
        <div className="itemdets  container p-2 mt-10 ">
          <div className="dets border justify-center gap-7 flex md:flex-col items-center ">
            <div className="imgs max-w-[40%] md:max-w-full  m-2 p-2  ">
              <div className="img border p-2 rounded-lg ">
                <img className="max-h-[60vh]" src={itemData.img} alt="" />
              </div>
            </div>

            <div className="details w-auto max-w-[50%] md:max-w-full m-2 p-4 rounded-lg border">
              <h1 className="text-lg font-semibold my-2">{itemData.title}</h1>
              <h1>
                <p className="flex text-xs items-center gap-1">
                  {" "}
                  <Rating ratingg={itemData.rating.rate} />{" "}
                  <span className="text-xs texty">
                    {" "}
                    ({itemData.rating.count})
                  </span>
                  | {itemData.rating.rate}/5{" "}
                </p>
              </h1>
              <h1 className="texty font-semibold my-2">${itemData.price} </h1>
              <p className="text-base my-4">{itemData.description}</p>
              <hr />

              {userEmail? <button
                onClick={addToCart}
                className="border button border-red-300 capitalize px-4 mx-5 my-7"
              >
                add to cart
              </button>: <button
              onClick={joi}
                className="border poiwnter-events-none  button border-red-300 capitalize px-4 mx-5 my-7"
              >
                add to cart
              </button>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
