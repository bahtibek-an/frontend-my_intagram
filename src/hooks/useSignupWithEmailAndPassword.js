import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

export const useSignupWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user,  loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast()
  const loginUser = useAuthStore(state => state.login)

  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullname
    ) {
      showToast('Error', 'Please fill all the fields', 'error')
      return;
    }

    const usersRef = collection(firestore, 'users')
    const q = query(usersRef, where('username', '==', inputs.username))

    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      showToast('Error', 'Username already exists', 'error')
      return
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        showToast('Error', error.message, 'error')
        return;
      }
      if (newUser) {
        const userDocument = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullname: inputs.fullname,
          bio: "",
          profilePicUrl: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
        localStorage.setItem("user-info", JSON.stringify(userDocument));
        loginUser(userDocument)
      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  };

  return { loading, error, signup };
};

export default useSignupWithEmailAndPassword;
