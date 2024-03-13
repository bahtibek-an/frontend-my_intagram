import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase_api";
import useShowToast from "./showNotifications";
import useAuthStore from "../dataManager/authCollector";

const useLogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
	const showToast = useShowToast();
	const logoutUser = useAuthStore((state) => state.logout);

	const handleLogout = async () => {
		try {
			await signOut();
			localStorage.removeItem("user-info");
			logoutUser();
		} catch (error) {
			showToast("Error", 'Something went wrong', "error");
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;