import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <main className="max-w-[1260px] mx-auto mt-3">
      <div className="flex flex-col mx-auto gap-[10px] w-[350px]">
        <div className="flex flex-col items-center mg-b[12px] border border-borderColor px-[40px] py-[10px]">
          <Image
            src="/logo-inline.png"
            width={400}
            height={400}
            alt="instagram-logo-inline"
            priority={true}
            className="w-[175px] mt-[18px] "
          />
          <h2 className="text-center text-[17px] leading-[20px] text-[#737373] font-[arial] font-bold">
            Sign up to see photos and videos from your friends.
          </h2>
          <SignUpForm />
        </div>
        <div className="flex gap-1 items-center justify-center text-center border border-borderColor py-6">
          <span>Have an account?</span>
          <Link href="/signin" className="text-blue font-light">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
