import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Stores/FirebaseStore/Firebase";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const Cart = () => {
  const auth = getAuth(app);
  const [userEmail, setUserEmail] = useState(null);
  const [userid, setuserid] = useState(null);
  const [cartdata, setcartdata] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loader, setloader] = useState(true);
  const deleteItem = (_id) => {
    axios
      .delete(`http://localhost:4000/cart/${userid}/${_id}`)
      .then((response) => {
        if (response.status === 200) {
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== _id)
          );
          toast.success(`Product deleted successfully from the cart!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log("Product deleted successfully");
        } else {
          console.log("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const [val, setval] = useState(1);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/loginuser/${userEmail}`
        );
        setuserid(response.data._id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    if (userEmail) fetchUserId();
  }, [userEmail]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetailsPromises = cartdata.map(async (item) => {
        const response = await axios.get(
          `http://localhost:4000/product/${item.productId}`
        );
        return response.data;
      });

      const productDetails = await Promise.all(productDetailsPromises);
      setCartItems(productDetails);
      setloader(false);
    };

    fetchProductDetails();
  }, [cartdata]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/cart/${userid}`
        );
        setcartdata(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (userid) fetchCartData();
  }, [userid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="border  min-h-[80vh] capitalize p-2">
      {userEmail ? (
        loader ? (
          <p>Loading...</p>
        ) : cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="item my-9 flex  md:flex-col md:items-start mb:mx-4 md:mx-8 gap-3 justify-evenly items-center p-2 px-8 border"
            >
              <div className="img overflow-hidden border p-2 border-[#fa0060] w-[100px]  rounded-[50%] h-[100px]">
                <img
                  src={item.img}
                  className="w-[100%] h-[100%] object-contain"
                  alt=""
                />
              </div>
              <div className="dets  md:mt-5">
                <h1 className="text-[#fa0060] font-semibold">title</h1>
                <h1 className="max-w-[300px] my-2 text-base font-medium">
                  {item.title}
                </h1>
              </div>
              <div className="quan">
                <h1 className="text-[#fa0060] font-semibold">Quantity</h1>
                <input
                  className=" border my-2 h-10  w-16 border-gray-700 rounded-lg px-3 py-1"
                  value={val}
                  onChange={(e) => {
                    if (e.target.value >= 1 && e.target.value < 6) {
                      setval(e.target.value);
                    }
                  }}
                  type="number"
                />
              </div>
              <div className="price">
                <h1 className="text-[#fa0060] font-semibold">Subtotal</h1>
                <h1 className="my-2">${item.price * val}</h1>
              </div>

              <div
                onClick={() => {
                  deleteItem(item._id);
                }}
                className="del  cursor-pointer border border-[#fa0060] p-2 rounded-full"
              >
                <span className="text-2xl  cursor-pointer">
                  <RiDeleteBin6Line />
                </span>
              </div>
              <button
                disabled
                className=" red px-3 py-1 bg-[#fa0060] text-white opacity-40 rounded-lg capitalize cursor-pointer"
              >
                Order
              </button>
            </div>
          ))
          ) : (
            <p className="text-center my-6">Your cart is empty....</p>
        )
      ) : (
        <p className="text-center my-6">Login to view Cart page </p>
      )}
    </div>
  );
};

export default Cart;
