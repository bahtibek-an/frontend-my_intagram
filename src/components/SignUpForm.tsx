"use client";
import React, { useState, useEffect } from "react";
import AuthInput from "@/components/ui/AuthInput";
import { useMutation } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthErrorCodes } from "firebase/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import signIn from "@/firebase/auth/signIn";
import signUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import checkUserName from "@/firebase/checkUserName";

type IFormInput = {
  email: string;
  name: string;
  username: string;
  password: string;
};
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(22),
  username: z
    .string()
    .min(2)
    .max(22)
    .regex(/^[a-zA-Z0-9._]{1,30}$/),
  password: z.string().min(6),
});

const SignUpForm = () => {
  const [err, setErr] = useState<string>("");
  const [emailUsed, setEmailUsed] = useState<boolean>(false);
  const [usernameUsed, setUsernameUsed] = useState<boolean>(false);
  const router = useRouter();

  //signUp requast function
  const signUpMutation = useMutation({
    mutationFn: ({
      email,
      password,
      fullName,
      username,
    }: {
      email: string;
      password: string;
      fullName: string;
      username: string;
    }) => signUp({ email, password, fullName, username }),
    onSuccess: () => router.push("/"),
    onError: (error: any) =>
      setErr(`An error occurred:, ${(error.code, error.message)}`),
  });

  const {
    register,
    handleSubmit,
    formState,
    watch,
    getFieldState,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  //function to check if the username is used
  const checkIfUserNameUsed = useMutation({
    mutationFn: (username: string) => checkUserName(username),
    onSuccess: (data: boolean) => {
      setUsernameUsed(data);
      console.log(data);
    },
  });
  //function to check if the email is used
  const checkIfEmailUsed = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onError: (error: any) => {
      if (error.code === AuthErrorCodes.USER_DELETED) {
        setEmailUsed(false);
      } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
        setEmailUsed(true);
      }
    },
  });
  //send request to check if the email and username is used
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const invalideEmail = getFieldState("email").invalid;
      if (name === "email" && !invalideEmail && value.email) {
        checkIfEmailUsed.mutate({
          email: value.email,
          password: "DUMMY_PASSWORD",
        });
      }
      const invalideUsername = getFieldState("username").invalid;
      if (name === "username" && !invalideUsername && value.username) {
        checkIfUserNameUsed.mutate(value.username);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getFieldState, checkIfEmailUsed, checkIfUserNameUsed]);

  const handleForm: SubmitHandler<IFormInput> = ({
    email,
    name,
    password,
    username,
  }) => {
    signUpMutation.mutate({
      email,
      password,
      fullName: name,
      username,
    });
  };
  return (
    <form onSubmit={handleSubmit(handleForm)} className="mt-5 mb-5">
      <AuthInput
        type={"email"}
        inputId={"email"}
        labelTxt={"Mobile Number or Email"}
        register={register}
        error={!!errors.email || emailUsed}
        loading={checkIfEmailUsed.isLoading}
      />
      <AuthInput
        type={"text"}
        inputId={"name"}
        labelTxt={"Full Name"}
        register={register}
        error={!!errors.name}
      />
      <AuthInput
        type={"text"}
        inputId={"username"}
        labelTxt={"Username"}
        register={register}
        error={!!errors.username || usernameUsed}
        loading={checkIfUserNameUsed.isLoading}
      />
      <AuthInput
        type={"password"}
        inputId={"password"}
        labelTxt={"Password"}
        register={register}
        error={!!errors.password}
      />
      <p className="flex flex-col gap-3">
        <span className="text-[#737373] text-center text-[12px]">
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <a href="#" className="text-[#00376B] active:opacity-60">
            Learn More
          </a>
        </span>
        <span className="text-[#737373] text-center text-[12px]">
          By signing up, you agree to our Terms ,{" "}
          <a href="#" className="text-[#00376B] active:opacity-60">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#00376B] active:opacity-60">
            Cookies Policy .
          </a>
        </span>
      </p>
      <button
        type="submit"
        className="relative mt-2 my-[8px] bg-blue w-full text-white py-1 transition-opacity delay-200 rounded-md hover:bg-sky-600 disabled:opacity-70 disabled:hover:bg-blue  "
        disabled={
          !formState.isValid ||
          formState.isSubmitting ||
          signUpMutation.isLoading ||
          checkIfEmailUsed.isLoading ||
          checkIfUserNameUsed.isLoading ||
          emailUsed ||
          usernameUsed
        }
      >
        {signUpMutation.isLoading && (
          <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <CircularProgress size={20} color="inherit" />
          </span>
        )}
        Sign up
      </button>
      {err && (
        <div className="my-3 text-red-500 text-[15px]">
          <p className="leading-[18px] text-center">{err}</p>
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
