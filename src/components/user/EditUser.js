import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "components/input/Input";
import ImageUpload from "components/image/ImageUpload";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";

const EditUser = () => {
  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {},
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      reset(docSnap.data());
    }
    fetchUser();
  }, [userId, reset]);
  const handleUpdateUser = async (values) => {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: image,
      email: values.email,
      username: values.username,
      password: values.password,
    });
    toast.success("Update successful !!!");
    navigate(`/HomePage`);
  };
  const [image, setImage] = useState("");

  const onSeletecImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  const [progress, setProgress] = useState(0);
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Notthing");
        }
      },
      (error) => {
        console.log("error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(imageRef)
      .then(() => {
        console.log("Deleted successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("not smooth");
      });
  };

  return (
    <form
      className="flex flex-wrap items-center justify-center"
      onSubmit={handleSubmit(handleUpdateUser)}
    >
      <div className="flex items-center justify-center w-full h-80">
        <ImageUpload
          onChange={onSeletecImage}
          className="w-auto object-cover max-w-[300px] min-h-[100px] max-h-[250px] rounded-full"
          handleDeleteImage={handleDeleteImage}
          name="image"
          progress={progress}
          image={image}
        ></ImageUpload>
      </div>

      <div className="flex flex-wrap px-10">
        <label htmlFor="">Email: </label>
        <Input
          type="email"
          name="email"
          control={control}
          placeholder="Phone number or email"
          className="w-full my-5 input"
        ></Input>
        <label htmlFor="">User name: </label>
        <Input
          type="text"
          name="username"
          control={control}
          placeholder="User name"
          className="w-full my-5 input "
        ></Input>
        <label htmlFor="">Password: </label>
        <Input
          type="password"
          name="password"
          control={control}
          placeholder="Password"
          className="w-full my-5 input "
        ></Input>
        <button
          type="submit"
          className=" bg-[#4cb5f9] w-full rounded-md h-8 text-white font-bold text-sm "
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditUser;
