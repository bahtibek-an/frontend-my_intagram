
import "./Suggestions.css"
import user from "../images/user.png"
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';

const Suggestions = ({ users, currentUser, id, dark, getUsers }) => {

    const recusers = users && currentUser.following.length !== 0 ? users.filter(function (array_el) {
        return currentUser.following.filter(function (anotherOne_el) {
            return anotherOne_el.userId !== array_el.id;
        }).length !== 0
    }) : users

    
    const recUsers = recusers && recusers.filter((user)=>{
        return user.id !== id
    })

    const following = async (userId) => {
        await setDoc(doc(db, "users", `${id}`), { ...currentUser, following: [...currentUser.following, { userId: userId }] })
        getUsers()
      }


    return (
        <div className='suggestions'>
            {currentUser && <div className='suggestion_user'>
                <img className='user_round' src={currentUser.profile ? currentUser.profile : user} width="50px" height="50px" />
                <div className='recomendation'>
                    <p><b>{currentUser.username}</b></p>
                    <p className='grey'>{currentUser.fullname}</p>
                </div>
                <button style={{ backgroundColor: dark ? "#000" : "#fff" }}>Switch</button>
            </div>}


            <h4><span className='grey'>Suggestions for you</span> <span style={{ float: "right" }}>All</span></h4>

            {
                recUsers &&
                recUsers.map((usr) => (
                    <div className='suggestion_user'>
                        <img className='user_round' src={usr.profile ? usr.profile : user} width="50px" height="50px" />
                        <div className='recomendation'>
                            <p><b>{usr.username}</b></p>
                            <p className='grey'><small>Recommendsations for you</small></p>
                        </div>
                        <button
                        style={{ backgroundColor: dark ? "#000" : "#fff" }}
                        onClick={()=>{following(usr.id)}}
                        >Follow</button>
                    </div>
                ))
            }

        </div>
    )
}

export default Suggestions
