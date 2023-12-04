import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useAuth } from "contexts/auth-context";
import Input from "components/input/Input";
import ImageUpload from "components/image/ImageUpload";

const AddNewPost = () => {
  const { userInfo } = useAuth();
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { control, handleSubmit, setValue, getValues } = useForm({ mode: "onChange" });
  const formRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (showForm && formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => document.removeEventListener("mousedown", handleClickOutsideModal);
  }, [showForm]);

  useEffect(() => {
    const fetchUser = async () => {
      if (userInfo && userInfo.uid) {
        const docRef = doc(db, "users", userInfo.uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data());
      }
    };

    fetchUser();
  }, [userInfo]);

  const handleButtonClick = () => setShowForm(true);

  const onSeletecImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image_name", file.name);
      handleUploadImage(file);
    }
  };

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => console.error("Error uploading image:", error),
      async () => setImage(await getDownloadURL(uploadTask.snapshot.ref))
    );
  };

  const handleDeleteImage = async () => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${getValues("image_name")}`);
      await deleteObject(imageRef);
      console.log("Xóa thành công");
      setImage("");
      setProgress(0);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleAddPost = async (values) => {
    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...values,
        image,
        userId: userInfo.uid,
        PostNameId: user.username,
        createAt: serverTimestamp(),
        username: user.username,
        likePost: 0,
        commentPost: 0,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div>
      <div
        onClick={handleButtonClick}
        className="sidebar-icon flex items-center px-5 mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200"
      >
        <i className="text-3xl bx bx-message-alt-add"><AiOutlinePlusCircle /></i>
        <p className="hidden ml-3 text-base lg:block">Create</p>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] z-99">
          <form
            className="w-full h-auto px-5 py-5 mx-2 bg-white sm:w-1/2 lg:w-4/12 rounded-2xl"
            ref={formRef}
            onSubmit={handleSubmit(handleAddPost)}
          >
            <h2 className="w-full h-auto border-b-black">Create new reels</h2>
            <div className="flex flex-col ">
              <Input
                className="outline-none border-b-2 border-b-[#ccc] focus:border-b-fuchsia-600 my-custom-class"
                name="stt"
                type="text"
                placeholder="Please write a status for the post"
                control={control}
              />
              <div>
                <ImageUpload
                  onChange={onSeletecImage}
                  className="h-[350px] my-custom-class"
                  handleDeleteImage={handleDeleteImage}
                  name="image"
                  progress={progress}
                  image={image}
                />
              </div>
            </div>
            <button className="bg-[#4cb5f9] w-full rounded-md h-8 text-white font-bold text-sm mt-2">
              Done
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNewPost;
