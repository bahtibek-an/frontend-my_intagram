import React, { useEffect } from "react";
import appstore from "../../imgs/ggStore.png";
import mircoS from "../../imgs/Microsoft.png";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/input/Input";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const FormLogin = () => {
  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter the correct format of your Email")
      .required("Please enter your Email address"),
    password: yup
      .string()
      .min(8, "Your password must contain at least 8 characters")
      .required("Please enter your password"),
  });

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const handleSignIn = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Logged in successfully!!!");
      navigate("/HomePage");
    } catch (error) {
      if (error.message.includes("wrong-password"))
        toast.error("It looks like your password is wrong");
      else if (error.message.includes("user-not-found"))
        toast.error("Your email account name was not found");
    }
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
    <div className="mt-4">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-[350px] h-[400px] p-8 shadow shadow-slate-300 flex flex-col ss:border border-[#dcdedf] items-center text-center"
      >
        <p alt="" className="w-[220px] text-4xl font-bold pb-5 mb-10">
          Instagarm
        </p>
        <Input
          type="email"
          placeholder="Phone number or email"
          name="email"
          control={control}
        ></Input>
        <Input
          type="password"
          name="password"
          control={control}
          placeholder="Password"
        ></Input>
        <button className=" bg-[#4cb5f9] w-full rounded-md h-8 text-white font-bold text-sm mt-2">
        Log in
        </button>
        <p className="mt-5 mb-5 text-sm">Get the app.</p>
        <div className="flex">
          <img className="w-[134px] h-10 mr-2" src={appstore} alt="" />
          <img className="w-[134px] h-10" src={mircoS} alt="" />
        </div>
      </form>
      <div className="shadow shadow-slate-300 flex items-center justify-center w-full h-16 mt-4 text-center border-[#dcdedf] ss:border">
        <p className="text-sm">
        You don't have an account yet?{" "}
          <Link className="text-[#4cb5f9]" to="/signup">
          Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
