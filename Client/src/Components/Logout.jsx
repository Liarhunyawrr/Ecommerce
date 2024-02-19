import { getAuth, signOut } from "firebase/auth";
import { app } from "../Stores/FirebaseStore/Firebase";
import context from "../Stores/ContextStore/Context";
import { useContext } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const { setUser } = useContext(context);
  const auth = getAuth(app);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success(`Logout Successfully`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUser(false);
      // You can redirect the user or perform additional actions after logout
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <div className="button" onClick={handleLogout}>
        Logout
      </div>
    
    </>
  );
};

export default Logout;
