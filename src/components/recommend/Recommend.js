import './Recommend.css'
import clear from '../images/cleare.png'
import user from '../images/user.png'

const Recommend = ({ dark, users, currentUser, id, subscribe }) => {

    const recusers = users && currentUser.following.length !== 0 ? users.filter(function (array_el) {
        return currentUser.following.filter(function (anotherOne_el) {
            return anotherOne_el.userId !== array_el.id;
        }).length !== 0
    }) : users

    
    const recUsers = recusers && recusers.filter((user)=>{
        return user.id !== id
    })

    return (
        <div className='recommendations'>
            <div className='header_rec'>
                <h3>Suggestions for you</h3>
            </div>
            <div className='users'>

                {recUsers &&
                    recUsers.map((usr) => (
                        <div className='user_container'
                            style={{ backgroundColor: dark ? "#111" : "" }}>
                            <img src={clear} alt="clear" width="15" className='clear_btn' />
                            <img src={usr.profile ? usr.profile : user} alt="user" className='user_round' width="60px" height="60px" />
                            <h4>{usr.username}</h4>
                            <br/>
                            <p style={{ color: "#737373" }}>suggestion for you</p>
                            <button
                                onClick={()=>{subscribe(usr.id)}}
                                style={{ backgroundColor: dark ? "#111" : "#fff" }}>Follow</button>
                        </div>
                    ))}
                    

            </div>
        </div>
    )
}

export default Recommend
