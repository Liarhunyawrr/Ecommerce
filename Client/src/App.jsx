import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";

const locomotiveScroll = new LocomotiveScroll();
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/join" element={<Signup />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
