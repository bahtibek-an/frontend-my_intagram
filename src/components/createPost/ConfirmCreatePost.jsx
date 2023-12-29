import "./style.css";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import { storage } from "../../lib/firebase";
import { EMOJISCHAR } from "../../helpers/Emojis";
import { addPostToFirestore } from "../../services/firebase";

const ConfirmCreatePost = ({ image }) => {
  const {
    user: { username, userId },
  } = useUser();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(0);
  const imageSrc = URL.createObjectURL(image);

  const handleSubmit = () => {
    const imageId = uuidv4();
    const pathImage = `/images/users/${username}/${imageId}.jpg`;
    const uploadImage = storage.ref(pathImage).put(image);

    uploadImage.on(
      "state-changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading((prev) => progress);
      },
      () => {},
      async () => {
        const imageUrl = await uploadImage.snapshot.ref
          .getDownloadURL()
          .then(async (url) => {
            const photo = await addPostToFirestore(
              caption,
              url,
              userId,
              imageId
            );
            setLoading(0);
            alert("image succesfully uploaded");
            window.location.reload();
            console.clear(imageUrl);
            console.clear(photo);
          });
      }
    );
  };

  return (
    <>
      <div className="mt-4">
        <div className="posts-img d-flex justify-content-center align-items-center overflow-y-scroll">
          <img src={imageSrc} alt="..." className="img-fluid w-75" style={{borderRadius: "40px"}} />
        </div>
            
        <div className="posts-comment fixed-bottom mb-2">
          <div className="btn-group dropup d-flex justify-content-around align-items-center p-4">
            <button className="btn btn-outline-primary dropdown-toggle me-2 mt-4" style={{width: "100px", height: "80px"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <ion-icon name="happy-outline"></ion-icon>
            </button>
            <ul className="dropdown-menu container-fluid text-center">
              <div className="row row-cols-12 p-2">
                {EMOJISCHAR.map(emoji => (
                  <div className="col" onClick={() => setCaption(`${caption}${emoji}`)}>
                    <span role="button">{ emoji }</span>
                  </div>
                ))}
              </div>
            </ul>
            <div class="form-floating w-75 mt-4">
              <textarea value={caption} onChange={(e) => setCaption(e.target.value)} style={{width: "100%", height: "80px"}} class="form-control bg-light bg-opacity-25 text-light" placeholder="Leave a comment here" id="floatingTextarea2" required></textarea>
              <label for="floatingTextarea2">Post Caption</label>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              {loading ? (
                <>
                  <button class="btn btn-primary ms-2" type="button" style={{width: "100px", height: "80px"}} disabled>
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span class="visually-hidden" role="status">Loading...</span>
                  </button>
                </>
                ) : (
                  <>
                    <button type="submit" className="btn btn-primary ms-2" style={{width: "100px", height: "80px"}} onClick={handleSubmit}>Post</button>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmCreatePost;