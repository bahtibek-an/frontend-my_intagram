import React from "react";

const UploadImage = ({ imageInput, handleUpload }) => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <div class="input-group mb-3 w-75">
                    <input type="file" class="form-control" ref={imageInput} onChange={handleUpload} />
                    <label role="button" onClick={() => imageInput.current.click()} class="input-group-text">Upload</label>
                </div>
            </div>
        </>
    );
};

export default UploadImage;