"use client";
import { useState, FormEvent, useEffect } from "react";
import signIn from "@/firebase/auth/signIn";
import React from "react";
import AuthInput from "@/components/ui/AuthInput";
import { useMutation } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { AuthErrorCodes } from "firebase/auth";
import { z } from "zod";
import { useRouter } from "next/navigation";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);
const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const emailResult = emailSchema.safeParse(email);
    const passwordResult = passwordSchema.safeParse(password);
    if (emailResult.success && passwordResult.success) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password]);
  const mutate = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onError: (error: any) => {
      if (error.code === AuthErrorCodes.USER_DISABLED) {
        setErr("User account is disabled.");
      } else if (
        error.code === AuthErrorCodes.USER_DELETED ||
        error.code === AuthErrorCodes.INVALID_PASSWORD
      ) {
        setErr(
          "Sorry, your password was incorrect. Please double-check your password.",
        );
      } else {
        setErr(`An error occurred:, ${(error.code, error.message)}`);
      }
    },
    onSuccess: () => router.push("/feed"),
  });
  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
    mutate.mutate({ email, password });
  };
  return (
    <form
      onSubmit={handleForm}
      className="flex flex-col items-center mt-[36px] mg-b[12px] border border-borderColor px-[40px] py-[10px]"
    >
      <Image
        src="/logo-inline.png"
        width={400}
        height={400}
        alt="instagram-logo-inline"
        priority={true}
        className="w-[175px] mt-[24px] mb-[18px] "
      />
      <AuthInput
        setter={setEmail}
        type={"email"}
        inputId={"email"}
        labelTxt={"Phone number, username, or email"}
        required
      />
      <AuthInput
        setter={setPassword}
        type={"password"}
        inputId={"password"}
        labelTxt={"Password"}
        required
      />

      <button
        type="submit"
        disabled={!isFormValid || mutate.isLoading}
        className="relative my-[8px] bg-blue w-full text-white py-1 transition-opacity delay-200 rounded-md hover:bg-sky-600 disabled:opacity-70 disabled:hover:bg-blue  "
      >
        {mutate.isLoading && (
          <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <CircularProgress size={20} color="inherit" />
          </span>
        )}
        Log in
      </button>
      {err && (
        <div className="my-3 text-red-500 text-[15px]">
          <p className="leading-[18px] text-center">{err}</p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
