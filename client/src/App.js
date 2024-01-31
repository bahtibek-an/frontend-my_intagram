import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './Components/Forms/Register';
import { Login } from './Components/Forms/Login';
import Home from './Components/Home/Home';
import Me from './Components/Me';
import Create from './Components/Forms/Create';
import UserEdit from './Components/Forms/UserEdit'
import User from './Components/User';
import Search from './Components/Forms/Search';

function App() {
  
  return (
    <div className="App">
      <Routes>      
        <Route path='/:token' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/me/:token' element={<Me />} /> 
        <Route path='/user/:id/:token' element={<User />} /> 
        <Route path='/user/edit/:token' element={<UserEdit />} /> 
        <Route path='/user/search/:token' element={<Search />} /> 
        {/* <Route path='/post/:id' element={<Me />} />  */}
        <Route path='/post/create/:token' element={<Create />} /> 
      </Routes>
    </div>
  );
}

export default App;
