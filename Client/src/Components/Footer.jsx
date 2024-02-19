import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer my-16">
      <hr />
      <p className="my-5 text-xl font-semibold text-center">
        Created With ♥ By{" "}
        <Link
          target="_blank"
          to="https://liar-lio.netlify.app/"
          className="texty"
        >
          {" "}
          LiarLio{" "}
        </Link>{" "}
      </p>
      <hr />
      
    </div>
  );
};

export default Footer;
