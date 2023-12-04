import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/auth-context";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useForm } from "react-hook-form";
import Input from "./Input";

const InputTextComment = ({ data }) => {
  const { userInfo } = useAuth();
  const { handleSubmit, control, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      commentPost: "",
    },
  });
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      if (userInfo && userInfo.uid) {
        const colRel = doc(db, "users", userInfo.uid);
        const docSnap = await getDoc(colRel);
        setUser(docSnap.data());
      }
    }
    fetchUser();
  }, [userInfo]);
  

  const handleCommentPost = async (values) => {
    const cloneValues = { ...values };
    const colRef = collection(db, "commentPost");
    await addDoc(colRef, {
      ...cloneValues,
      idPost: data,
      userId: userInfo.uid,
      commentNameUser: userInfo.displayName,
      createAt: serverTimestamp(),
      avatar: user.avatar,
    });
    setValue("commentPost");
  };

  return (
    <form
      className="flex justify-between w-full p-5 pl-2 bg-white border border-t-black"
      onSubmit={handleSubmit(handleCommentPost)}
    >
      <div className="flex w-full">
        <img src={user.avatar ||
              "https://st.quantrimang.com/photos/image/2022/09/13/Meo-khoc-1.jpg"} alt="" className="object-cover w-8 h-8 mr-2 rounded-full" />
        <Input
          name="commentPost"
          type="text"
          control={control}
          placeholder="Thêm bình luận"
        ></Input>
      </div>

      <button className="text-black">Send</button>
    </form>
  );
};

export default InputTextComment;
