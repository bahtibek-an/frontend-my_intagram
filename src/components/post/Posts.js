import React, { useRef, useState, useEffect } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { addDoc, doc, updateDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { useDispatch } from "react-redux";
import { setAddPostModal } from "../../Slice";
import Spinner from "react-spinkit";
import "../post/Posts.css"

function AddPost() {
  const [user] = useAuthState(auth);
  const filePickerRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modalContentRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!modalContentRef.current.contains(event.target)) {
        dispatch(
          setAddPostModal({
            addPostIsOpen: false,
          })
        );
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.displayName,
      userId: user.uid,
      caption: caption,
      profileImg: user.photoURL,
      timestamp: serverTimestamp(),
    });
    setCaption("");
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    dispatch(
      setAddPostModal({
        addPostIsOpen: false,
      })
    );
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div className="AddPostWrapper">
      <div className="ModalContentWrapper" ref={modalContentRef}>
        <div className="ContentContainer">
          {selectedFile ? (
            <img
              src={selectedFile}
              alt=""
              style={{
                objectFit: "contain",
                cursor: "pointer",
                maxHeight: 200,
                width: "100%",
                borderRadius: 5,
              }}
            />
          ) : (
            <CameraIcon
              onClick={() => filePickerRef.current.click()}
              style={{
                color: "#e53e3e",
                padding: 15,
                borderRadius: 9999,
                background: "#fed7d7",
                cursor: "pointer",
                height: 30,
              }}
            />
          )}

          {/* add photo */}
          <p
            style={{
              padding: 5,
              fontSize: 20,
              fontWeight: 800,
              color: "rgb(38 38 38)",
              textAlign: "center",
              border: 0,
            }}
          >
            Select a photo
          </p>
          {/* caption */}
          <input
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{
              padding: 5,
              color: "#4a5568",
              textAlign: "center",
              border: 0,
              fontSize: 15,
            }}
          />
          {/* hidden Input */}
          <input
            ref={filePickerRef}
            type="file"
            hidden
            onChange={addImageToPost}
          />
          {/* FINAL SUBMIT BUTTON */}

          {loading ? (
            <Spinner
              name="ball-spin-fade-loader"
              color="purple"
              fadeIn="none"
            />
          ) : (
            <button
              type="submit"
              disabled={!selectedFile}
              onClick={uploadPost}
              className={selectedFile ? "selected" : "notSelected"}
            >
              POST
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPost;