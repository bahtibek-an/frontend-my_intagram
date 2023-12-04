
import './Saved.css'
import save from "../images/save.png"
import { NavLink } from 'react-router-dom'

const Saved = ({ currentUser, userName }) => {

  const saved = currentUser && currentUser.saved

  return (
    <>
      <div className='saved'>
        <div className='s_desc'>
          <p><small className='grey'>The saved list is visible only to you</small></p>
          <button>+ New selections</button>
        </div>
        {saved.length === 0 ?
          <>
            <div className='s_img'>
              <img src={save} alt="save" />
            </div>
            <h1>Save</h1>
            <div className='s_info'>Save photos and videos you want to watch again. No one will receive notifications about this, and only you can see the saved objects.</div>
          </> :
          <div className='savedd'>
            <div className="all_saved">
            {saved[0] &&
                <div>
                  {saved[0].type === "image/jpeg" ?
                    <img src={saved[0].url} />
                    :
                    <video src={saved[0].url} />}
                </div>}
              {saved[1] &&
                <div>
                  {saved[1].type === "image/jpeg" ?
                    <img src={saved[1].url} />
                    :
                    <video src={saved[1].url} />}
                </div>}
              {saved[2] &&
                <div>
                  {saved[2].type === "image/jpeg" ?
                    <img src={saved[2].url} />
                    :
                    <video src={saved[2].url} />}
                </div>}
              <NavLink to={`/${userName}/saved/all-posts`}>All Posts</NavLink>

              {saved[3] &&
                <div>
                  {saved[3].type === "image/jpeg" ?
                    <img src={saved[3].url} />
                    :
                    <video src={saved[3].url} />}
                </div>}

            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Saved

