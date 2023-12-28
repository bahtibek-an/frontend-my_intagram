import React from 'react'
import Posts from '../../components/Posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Home.css"
import Users from '../../components/Users/Users'

const Home = () => {
  return (
    <>
      <div className="home">
          <div className="sidebar-home">
          <Sidebar />
          </div>
          <div className="posts-home">
          <Posts />
          </div>
          <div className="users-home">
          <Users />
          </div>
      </div>
    </>
  )
}

export default Home;