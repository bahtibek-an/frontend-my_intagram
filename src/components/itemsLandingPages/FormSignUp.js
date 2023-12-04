import React, { useEffect } from "react";
import appstore from "../../imgs/ggStore.png";
import mircoS from "../../imgs/Microsoft.png";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import Input from "components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import slugify from "slugify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const FormSignUp = () => {
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter the correct format of your Email")
      .required("Please enter your Email address"),
    fullname: yup.string().required("Enter your username"),
    password: yup
      .string()
      .min(8, "Please enter your password")
      .required("Please enter your password"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      status: 1,
      avatar: "",
    });
    toast.success("Account registration successful!!!");
    navigate("/HomePage");
  };

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <div className="flex flex-col items-center mt-5">
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="shadow shadow-slate-300 w-[350px] h-auto p-9 flex flex-col border border-[#dcdedf] items-center text-center"
      >
        <p alt="" className="w-[220px] text-4xl font-bold pb-5 ">
          Instagarm
        </p>
        <p
          alt=""
          className="w-full leading-5 text-[17px] font-bold pb-5 text-[#737384]"
        >
          Sign up to see photos and videos from friends.
        </p>
        <Input
          type="email"
          name="email"
          control={control}
          placeholder="Enter the Email you want to register"
        ></Input>
        <Input
          type="text"
          name="fullname"
          control={control}
          placeholder="User name"
        ></Input>
        <Input
          type="password"
          name="password"
          control={control}
          placeholder="Password"
        ></Input>

        <p className="text-xs text-[#858a8f] ">
        Users of our services may have uploaded your contact information to Instagram.
          <span className="text-[#4cb5f9]">Find out more</span>{" "}
        </p>
        <p className="text-xs text-[#858a8f] mt-4 mb-5">
        By registering, you agree to the{" "}
          <span className="text-[#4cb5f9]">Rules</span> ,{" "}
          <span className="text-[#4cb5f9]">Privacy policy</span> and
          <span className="text-[#4cb5f9]">Cookie policy</span> ours.
        </p>
        {/* /////////////////////// */}
        <button
          type="submit"
          className=" bg-[#4cb5f9] w-full rounded-md h-8 text-white font-bold text-sm "
        >
          Register
        </button>
      </form>
      <div className=" shadow shadow-slate-300 items-center justify-center w-[350px] h-auto p-5 mt-4 text-center border border-[#dcdedf]">
        <p className="text-sm ">
        Do you already have an account?{" "}
          <Link className="text-[#4cb5f9]" to="/">
          Log in.
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-[350px] h-auto p-5 mt-4 text-center ">
        <p className="mb-5 text-sm ">Get the app.</p>
        <div className="flex">
          <img className="w-[134px] h-10 mr-2" src={appstore} alt="" />
          <img className="w-[134px] h-10" src={mircoS} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FormSignUp;
