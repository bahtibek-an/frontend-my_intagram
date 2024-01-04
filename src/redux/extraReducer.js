/** @format */
// thisssss dapsdjao[ifhufhsafg]

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, firestore, storage } from "../Api/firebase";
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import { errorMessage } from "./loginSlice/loginSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
export const createUser = createAsyncThunk(
  "user/createUserAndProfile",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const usersData = {
        userPhoto: data.photo,
        userName: data.name,
        userEmail: data.email,
      };
      const usersRef = collection(firestore, "Users");
      await addDoc(usersRef, usersData);
      await updateProfile(auth.currentUser, {
        // thisssss dapsdjao[ifhufhsafg]
        displayName: data.name,
        photoURL: data.photo,
        phoneNumber: data.phone,
        followers: [],
      });

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
      // thisssss dapsdjao[ifhufhsafg]
    }
  }
);

export const UserLogin = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const user = await signInWithEmailAndPassword(
      // thisssss dapsdjao[ifhufhsafg]
      auth,
      data.email,
      data.password
    );
    return user;
  } catch (error) {
    // dispatch(errorMessage(error))
    console.log(error);
  }
});
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const userRef = collection(firestore, "Users");
  const q = query(userRef, orderBy("userPhoto", "asc"));

  return new Promise((resolve, reject) => {
    onSnapshot(
      q,
      (snapshot) => {
        const usersR = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        resolve(usersR);
      },
      reject
    );
  });
});
// thisssss dapsdjao[ifhufhsafg]
export const publishPosts = createAsyncThunk(
  "posts/publish",
  async (data, thunkAPI) => {
    const {  imageUpload, user, description } = data;
    // thisssss dapsdjao[ifhufhsafg]
    try {
      const storageRef = ref(
        storage,
        `/images/${Date.now()}${imageUpload?.name}`
        // thisssss dapsdjao[ifhufhsafg]
      );

      const uploadImage = uploadBytesResumable(storageRef, imageUpload);
      // Await the uploadImage to complete
      // thisssss dapsdjao[ifhufhsafg]
      await uploadImage;

      const url = await getDownloadURL(uploadImage.snapshot.ref);

      const articleData = {
        description: description,
        // thisssss dapsdjao[ifhufhsafg]
        imageUrl: url,
        createdAt: Timestamp.now().toDate(),
        createdUserPhoto: user?.photoURL,
        createdBy: user?.displayName,
        userId: user?.uid,
        likes: [],
        comments: [],
      };

      const articleRef = collection(firestore, "Posts");
      // thisssss dapsdjao[ifhufhsafg]
      await addDoc(articleRef, articleData);

      return {}; // You can return data if needed
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDisplayNameAsync = createAsyncThunk(
  "user/updateDisplayName",
  // thisssss dapsdjao[ifhufhsafg]
  async (newDisplayName, { rejectWithValue }) => {
    console.log(newDisplayName);
    try {
      await auth.currentUser.updateProfile({
        displayName: newDisplayName,
        // thisssss dapsdjao[ifhufhsafg]
      });

      return newDisplayName;
      // thisssss dapsdjao[ifhufhsafg]
    } catch (error) {
      // Handle errors here and reject the promise with an error message
      return rejectWithValue("Failed to update displayName");
    }
  }
);

export const chaneg = createAsyncThunk(
  "user/changeProfile",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.username,
        photoURL: data.img,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserPost = createAsyncThunk(
  "folders/get",
  async (userId, { rejectWithValue }) => {
    try {
      const filesRef = collection(firestore, "Posts");
      const userFolder = query(filesRef, where("userId", "==", userId));
      const snapshot = await getDocs(userFolder);
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(posts)
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deletePost = createAsyncThunk("Delete", async (payload) => {
  console.log(payload);

  // const storageRef = ref(storage, payload.name);

  // Check if the file exists before attempting to delete it
  try {
  
    await deleteDoc(doc(firestore, "Posts", payload.id));

    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting file or document:", error);
  }
});