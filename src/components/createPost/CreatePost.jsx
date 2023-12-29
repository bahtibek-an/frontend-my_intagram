import React, { useRef, useState } from "react";

const UploadImage = React.lazy(() => import("./UploadImage"));
const ConfirmCreatePost = React.lazy(() => import("./ConfirmCreatePost"));

const CreatePost = () => {
    const postRef = useRef(null);
    const imageInput = useRef(null);
    const [image, setImage] = useState(null);
    const [ confirmModal, setConfirmModal ] = useState(false);

    const handleUpload = (event) => {
        setImage(event.target.files[0]);
        setConfirmModal(true);
    };

    return (
      <>
        <div className="container w-100 h-100">
          <div className="create profile p-5">
            {confirmModal && (<> </>)}
            <h3>Create post</h3>
            <div ref={postRef}>
              {!confirmModal ? (
                <UploadImage imageInput={imageInput} handleUpload={handleUpload}/>
              ) : (
                <ConfirmCreatePost image={image}/>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default CreatePost;