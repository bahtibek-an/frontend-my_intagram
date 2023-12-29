import React from "react";

const Create = () => {
  return (
    <>
      <div className="container w-100 h-100">
        <div className="profile p-5">
          <h3>Create Post</h3>
            <form>
              <div className="d-flex justify-content-center align-items-center mt-4" {...getRootProps()}>
                <button type="button" className="btn btn-outline-primary" style={{width: "200px", height: "150px"}}><input {...getInputProps()} /><span className="fs-4"><ion-icon name="file-tray-outline"></ion-icon> </span> <br /> Drop file or Click button </button>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <div class="form-floating w-75">
                  <textarea style={{width: "100%", height: "150px"}} class="form-control bg-transparent text-light" placeholder="Leave a comment here" id="floatingTextarea2" required></textarea>
                  <label for="floatingTextarea2">Post Caption</label>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <button type="submit" className="btn btn-primary w-50">Post</button>
              </div>
            </form>
          </div>  
      </div>
    </>
  );
};

export default Create;