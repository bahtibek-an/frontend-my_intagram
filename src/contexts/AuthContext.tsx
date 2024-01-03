"use client";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, getAuth, User, Unsubscribe } from "firebase/auth";
import firebaseApp from "../firebase/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { fetchUserData } from "@/firebase/fetchUserData";
import { UserData } from "@/types";
import { useRouter } from "next/navigation";
const auth = getAuth(firebaseApp);
type AuthContextProps = {
  user: User | null;
  loading: boolean;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  userData: null,
  setUserData: () => {},
});
const queryClient = new QueryClient();

export const useAuthContext = (): AuthContextProps => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setUserData((await fetchUserData(user.uid)) || null);
      } else {
        setUser(null);
        router.push("/signin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const value = {
    user,
    setUserData,
    userData,
    loading,
  };

  if (loading) return <Loading />;
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
};
