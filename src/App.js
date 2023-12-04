import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './components/homePage/HomePage';
import Main from './components/mainContent/Main';
import LoginPage from './components/loginPage/LoginPage';
import Interesting from './components/interesting/Interesting';
import Reels from './components/reels/Reels';
import Profile from './components/profile/Profile';
import Publications from './components/profile/Publications';
import Saved from './components/profile/Saved';
import Marks from './components/profile/Marks';
import Messages from './components/messages/Messages';
import Notification from './components/notifications/Notification';
import { useState, useEffect } from 'react';
import { db } from '../src/firebase'
import {
  collection,
  getDocs
} from "firebase/firestore";
import Inbox from './components/messages/Inbox';
import Direct from './components/messages/Direct';
import FollowingWindow from './components/profile/FollowingWindows';
import FollowesWindow from './components/profile/FollowersWindow';
import Profiles from './components/anotherProfile/Profile';
import Posts from './components/anotherProfile/Publications';
import Tagged from './components/anotherProfile/Marks';
import FollowingWindows from './components/anotherProfile/FollowingWindows';
import FollowersWindow from './components/anotherProfile/FollowersWindow';
import AllPosts from './components/profile/AllPosts';
import Edit from './components/profile/Edit';



function App() {


  const [login, setLogin] = useState(localStorage.getItem("login"))
  const Login = () => {
    setLogin(true)
    localStorage.setItem("login", true)
  }
  const [newPublication, setNewPublication] = useState(null)

  const [open, setOpen] = useState(false)

  const loginOut = () => {
    setLogin("false")
    localStorage.setItem("login", "false")
    localStorage.setItem("userId", false)
    localStorage.setItem("userName", false)
  }



  const [id, setId] = useState(localStorage.getItem("userId") || localStorage.getItem("userId") === false ? localStorage.getItem("userId") : "FtC3pV46sjhtdAZQAaRfTi2Nn7Z2")
  const [userName, setUserName] = useState(localStorage.getItem("userName"))
  const [username, setUsername] = useState()
  const [currentuser, setCurrentuser] = useState()
  const [currentUser, setCurrentUser] = useState()



  const [dark, setDark] = useState(localStorage.getItem("dark") === "false" ? false : true)

  const setdark = () => {
    dark ? setDark(false) : setDark(true)
    localStorage.setItem("dark" , dark ? false : true) 
    dark ? document.body.style.backgroundColor = "#fff" : document.body.style.backgroundColor = "#000"
  }

  !dark ? document.body.style.backgroundColor = "#fff" : document.body.style.backgroundColor = "#000"

  const setUserId = (id) => {
    setId(id)
    localStorage.setItem("userId", id)
  }

  const [users, setUsers] = useState(false);
  const usersCollectionRef = collection(db, "users");



  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setUsers(users);
    users.forEach((user) => {
      if (user.id === id) {
        setCurrentUser(user)
      }
    })
  }

  useEffect(() => {
  
    getUsers();

  }, [id]);

  console.log(id)

  const chattingUsers = currentUser && Object.keys(currentUser.messages) ? Object.keys(currentUser.messages) : []

  const getUsername = (idu, usern) => {
    if (usern !== "") {
      setUserName(usern)
      localStorage.setItem("userName", usern)
    } else {
      users.forEach((user) => {
        if (user.id === idu && usern === "") {
          setUserName(user.username)
          localStorage.setItem("userName", user.username)
        }
      })
    }
  }



  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<HomePage loginOut={loginOut} getUsers={getUsers} users={users} id={id} setNewPublication={setNewPublication} currentUser={currentUser} setOpen={setOpen} open={open} userName={userName} 
      setdark={setdark} dark={dark} setCurrentuser={setCurrentuser} setUsername={setUsername}/>}>
        <Route index element={!login || login === "false" ? <LoginPage setLogin={Login} setId={setUserId} getUser={getUsername} getUsers={getUsers} login={login}/> :
        <Main users={users} id={id} userName={userName} getUsers={getUsers} currentUser={currentUser} newPublication={newPublication} dark={dark} setCurrentuser= {setCurrentuser} setUsername={setUsername}/> } />
        <Route path='interesting' element={<Interesting users={users} getUsers={getUsers} userName={userName} id={id} currentUser={currentUser} dark={dark}/>} />
        <Route path='reels' element={<Reels users={users} getUsers={getUsers} userName={userName} id={id} currentUser={currentUser} dark={dark}/>} />
        <Route path='messages/' element={<Messages users={users} chattingUsers={chattingUsers} dark={dark}/>}>
          <Route path={`/messages/`} index element={<Inbox users={users} getUsers={getUsers} id={id} currentUser={currentUser} userName={userName} dark={dark}/>} />
          <Route path=":id" element={<Direct users={users} getUsers={getUsers} iD={id} currentUser={currentUser} userName={userName} dark={dark} setCurrentuser={setCurrentuser} setUsername={setUsername} />} />
        </Route>
        <Route path="notifications" element={<Notification users={users} currentUser={currentUser} getUsers={getUsers} id={id} dark={dark} />} />
        <Route path={`${userName}`} element={<Profile currentUser={currentUser} getUsers={getUsers} userName={userName} dark={dark}/>}>
          <Route path={`/${userName}`} index element={<Publications setOpen={setOpen} currentUser={currentUser} users={users} userName={userName} getUsers={getUsers} id={id} dark={dark} />} />
          <Route path="saved" element={<Saved currentUser={currentUser} userName={userName} />} />
          <Route path="marks" element={<Marks />} />
          <Route path="following" element={<FollowingWindow getUsers={getUsers} id={id} setUsername={setUsername} setCurrentuser={setCurrentuser} users={users} currentUser={currentUser} userName={userName} username={username} dark={dark} />} />
          <Route path="followers" element={<FollowesWindow getUsers={getUsers} id={id} setUsername={setUsername} setCurrentuser={setCurrentuser} users={users} currentUser={currentUser} userName={userName} username={username} dark={dark}/>} />
        </Route>
        <Route path={`${userName}/saved/all-posts`} element={<AllPosts userName={userName} currentUser={currentUser}/>}/>
        <Route path={`${userName}/edit`} element={<Edit currentUser={currentUser} dark={dark} id={id} getUsers={getUsers}/>}/>
        <Route path={`:${username}`} element={<Profiles currentUser={currentuser} userName={username} dark={dark}/>}>
          <Route path={`/:${username}`} index element={<Posts currentUser={currentuser} users={users} userName={userName} getUsers={getUsers} id={id} dark={dark}/>} />
          <Route path="marks" element={<Tagged />} />
          <Route path="following" element={<FollowingWindows getUsers={getUsers} id={id} setUsername={setUsername} setCurrentuser={setCurrentuser} users={users} currentuser={currentuser} currentUser={currentUser} userName={userName} username={username} dark={dark}/>} />
          <Route path="followers" element={<FollowersWindow getUsers={getUsers} id={id} setUsername={setUsername} setCurrentuser={setCurrentuser} users={users} currentuser={currentuser} currentUser={currentUser} userName={userName} username={username} dark={dark}/>} />
        </Route>
        <Route />
      </Route>

    )
  )

  return (
    <div className="App" style={{backgroundColor: dark ? "#" : "#fff"}}>

      <RouterProvider router={routes} />

    </div>
  );
}

export default App;
