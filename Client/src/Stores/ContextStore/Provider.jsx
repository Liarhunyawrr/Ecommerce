import { useEffect, useState } from "react";
import context from "./Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../FirebaseStore/Firebase";
import { InfinitySpin } from "react-loader-spinner";
const Provider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [logid, setlogid] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(!!user);
      setIsAuthResolved(true);
    });

    return () => unsubscribe();
  }, [auth]);

  if (!isAuthResolved) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%] ">
        <InfinitySpin
          visible={true}
          width="200"
          color="#fa2577"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <context.Provider value={{ logid, setlogid, user, setUser }}>
      {children}
    </context.Provider>
  );
};

export default Provider;
