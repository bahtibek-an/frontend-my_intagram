import React from 'react'
import Navbar from '../components/Navbar'
import UploadPost from '../components/UploadPost'
import Users from "../components/Users"
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (

    <>
      <div className="container-fluid bg-white p-0 d-flex " style={{ height: "100vh", width: "100%" }}>
         {/* <Navbar /> */}
        <div className='p-0 position-relative col-4'>
          <Sidebar />
        </div>
        <div className='p-0 col-md-6 bg-white overflow-auto none-scroll'>
          <UploadPost />
        </div>
      </div>
    </>

    // <div className='bg-white p-0' style={{height:"100vh"}} >
    //   {/* <Navbar /> */}
    //   <div className="container-fluid p-0 m-0 d-flex">

    //   <div className="m-0 position-sticky top-0 h-100" style={{height:"100vh"}} >
    //       {/* <Users /> */}
    //       <Sidebar />
    //     </div>

    //     <div className="col-md-8">
    //       {/* <UploadPost /> */}
    //     </div>


    //   </div>
    // </div>
  )
}

export default Home;