import React from 'react';
import UploadPost from '../components/UploadPost';
import Users from '../components/Users';
import Sidebar from '../components/Sidebar';

// Home component represents the main page of the application
const Home = () => {
  return (
    <div className="container-fluid bg-white p-0 d-flex" style={{ height: "100vh", width: "100%" }}>
      {/* Sidebar component for navigation and user information */}
      <div className="p-0 position-relative col-4">
        <Sidebar />
      </div>
      {/* UploadPost component for allowing users to upload posts */}
      <div className="p-0 col-md-6 bg-white overflow-auto none-scroll">
        <UploadPost />
      </div>
    </div>
  );
};

export default Home;
