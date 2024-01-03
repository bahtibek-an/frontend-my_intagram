import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Cheked from "@/assets/icons/Checked.svg";
import Wrong from "@/assets/icons/Wrong.svg";
import CircularProgress from "@mui/material/CircularProgress";

type AuthInputProps = {
  setter?: React.Dispatch<React.SetStateAction<string>>;
  inputId: string;
  labelTxt: string;
  error?: boolean;
  loading?: boolean;
  type: string;
  register?: UseFormRegister<any>;
} & React.InputHTMLAttributes<HTMLInputElement>;
function AuthInput({
  setter,
  inputId,
  labelTxt,
  register,
  error,
  type,
  loading,
  ...props // Collect any additional props in the restProps object
}: AuthInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { onChange, onBlur, name, ref }: any = register
    ? register(inputId)
    : {};
  const [currentType, setCurrentType] = useState(type);
  return (
    <div
      className={`relative h-[37px] w-full sm:w-[268px] border  ${
        isFocused ? "border-neutral-400" : "border-neutral-300"
      }
      bg-neutral-100 rounded-[3px] px-[8px] mb-[6px] overflow-hidden flex items-center`}
    >
      <div className="w-full">
        <label
          htmlFor={inputId}
          className={`absolute text-neutral-600 top-[50%] cursor-text select-none w-full transition duration-300 break-keep whitespace-nowrap	 ${
            inputValue
              ? "text-xs translate-y-[-110%]"
              : "text-sm translate-y-[-50%]"
          }`}
        >
          {labelTxt}
        </label>
        <input
          onChange={(e) => {
            setter && setter(e.target.value);
            setInputValue(e.target.value);
            register && onChange(e);
          }}
          onBlur={(e) => {
            register && onBlur(e);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          name={name}
          ref={ref}
          type={currentType}
          className={`w-full h-full outline-none bg-transparent text-sm ${
            inputValue && "pt-[8px]"
          }`}
          id={inputId}
          {...props}
        />
      </div>
      {register && (
        <span className="flex h-full items-center ">
          {!loading && inputValue && !error && (
            <Cheked className="stroke-[#A6A8AB]" />
          )}
          {!loading && error && !isFocused && (
            <Wrong className="stroke-[#ee2d3e] fill-transparent" />
          )}
          {loading && (
            <span>
              <CircularProgress size={20} color="inherit" />
            </span>
          )}
        </span>
      )}
      {inputId === "password" && inputValue && (
        <span
          className="flex select-none ml-1 text-sm font-bold cursor-pointer hover:opacity-60"
          onClick={() =>
            setCurrentType(currentType === "password" ? "text" : "password")
          }
        >
          {currentType === "password" ? "Show" : "Hide"}
        </span>
      )}
    </div>
  );
}

export default AuthInput;
