import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./showNotifications";
import { auth, firestore } from "../firebase/firebase_api";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../dataManager/authCollector";

const useLogin = () => {
	const showToast = useShowToast();
	const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (inputs) => {
		try {
			const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
				loginUser(docSnap.data());
			}
		} catch (error) {
			showToast("Error", "Something went wrong", "error");
		}
	};

	return { loading, error, login };
};

export default useLogin;