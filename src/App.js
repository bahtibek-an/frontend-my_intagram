import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import "./firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  // State variables to manage user authentication status and account data
  const [isLogged, setIsLogged] = useState(true);
  const [accountList, setAccountList] = useState([]);
  let auth = getAuth();

  const itemCollectionAccount = collection(db, "accounts");

  const getAccountList = async () => {
    try {
      const dataAcc = await getDocs(itemCollectionAccount);
      const filteredDataAcc = dataAcc.docs.map((doc) => ({
        ...doc.data()
      }));
      setAccountList(filteredDataAcc)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return findOut;
  }, [auth]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={isLogged ? <Navigate to={"/"} replace /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={isLogged ? <Navigate to={"/"} replace /> : <Register itemCollectionAccount={itemCollectionAccount} />}
        ></Route>
        <Route
          path="/"
          element={
            isLogged ? (
              <Main accountList={accountList} getAccountList={getAccountList} />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
