import LoginForm from "@/components/LoginForm";
import LoginImages from "@/components/LoginImages";
import Link from "next/link";

const SignIn = () => {
  return (
    <main className="max-w-[1260px] mx-auto mt-[14vh]">
      <div className="flex gap-[48px] justify-center items-center md:ml-28 ">
        <LoginImages />
        <div className="flex flex-col gap-[10px] w-[350px]">
          <LoginForm />
          <div className="flex gap-1 items-center justify-center text-center border border-borderColor py-[10px]">
            <span>{"Don't have an account?"}</span>
            <Link href="/signup" className="text-blue font-semibold	">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
