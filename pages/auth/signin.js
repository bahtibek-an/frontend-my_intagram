import Header from "@/components/Header";
import { getProviders, signIn } from "next-auth/react";
export default function Signin({ providers }) {
  return (
    <div>
      <Header />
      <div className=" flex justify-center space-x-7 mt-20">
        <img
          className=" hidden object-cover rotate-6 md:inline-flex md:w-48"
          src="https://cdn-hfccj.nitrocdn.com/ZcdvpPrOuqiIRmmNafzktyViRdxlsNrE/assets/images/optimized/rev-2aeed87/wp-content/uploads/2021/08/PngItem_2998371.png"
          alt="instagram img"
        />
        <div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className=" flex flex-col items-center">
              <img
                className=" w-32 object-cover"
                src="https://techstory.in/wp-content/uploads/2021/12/instagram-logo-2-1-768x745.png"
                alt="img"
              />
              <p className=" text-sm italic my-10 text-center">
                This app is created for educational purposes
              </p>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
