import './Main.css'
import MainPage from '../mainPage/MainPage'
import Suggestions from '../suggestions/Suggestions'

const Main = ({users, id, userName, getUsers, currentUser, newPublication, dark, setCurrentuser, setUsername}) => {

   

    return (
        <>
            <div className='mainContent'>
                <MainPage users={users} id={id} userName={userName} getUsers={getUsers} currentUser={currentUser} 
                newPublication={newPublication} dark={dark} setCurrentuser= {setCurrentuser} setUsername={setUsername}/>
            </div>
            <div className='suggestions_section'>
                <Suggestions id={id} currentUser={currentUser} users={users} dark={dark} getUsers={getUsers}/>
            </div>
        </>
    )
}

export default Main
