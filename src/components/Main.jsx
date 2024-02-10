import Form from "./Form";
import { useEffect, useState } from "react";
import Table from "./Table";
import "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import HeaderLogo from './../img/header-logo.png';

const Main = ({ accountList, getAccountList }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");
  const currentEmail = getAuth().currentUser;
  // eslint-disable-next-line
  const userName = accountList.filter(
    (acc) => acc.email === currentEmail.email
  )[0]?.userName;

  const itemCollectionRef = collection(db, "restaurants");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        itemId: doc.itemId,
      }));

      setItemList(filteredData);
      setUserId(getAuth()?.currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountList();
    getItemList();
    // eslint-disable-next-line
  }, [accountList]);

  const logoutHandler = () => {
    signOut(getAuth());
  };

  return (
    <div className="mainBox">
      <div className="container mx-auto">
        <div className="flex justify- items-center py-2">
          <img src={HeaderLogo} alt="Logo" className="w-32" />
        </div>
        <div>
          <Form
            itemCollectionRef={itemCollectionRef}
            getItemList={getItemList}
          />
          <Table itemList={itemList} userId={userId} />
        </div>
        <div className="flex justify-center items-center py-2">
          <button
              onClick={logoutHandler}
              className="bg-blue-700 hover:bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;