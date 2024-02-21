import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Forms/Login';
import Register from './Components/Forms/Register';
import Dashboard  from './Components/Dahsboard/Dashboard'
import Profile from './Components/Dahsboard/Profile/Profile';
import UserProfile from './Components/Dahsboard/Profile/UserProfile';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard/:token' element={<Dashboard/>} />
        <Route path='/user/:token'/>
        <Route path='/user/edit/:token'/>
        <Route path='/user/profile/:token' element={<Profile/>}/>
        <Route path='/users/profile/:token/:id' element={<UserProfile/>}/>
        <Route path='/dashboard/post/create/:token'/>
        <Route path='/dashboard/post/edit/:token'/>
      </Routes>
    </div>
  );
}

export default App;
