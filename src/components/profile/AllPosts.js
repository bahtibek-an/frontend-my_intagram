import { useState } from "react"
import { NavLink } from "react-router-dom"
import Main from "../messages/Main.js"
import cleare from "../images/cleare.png"
import "./Profile.css"

const AllPosts = ({ userName, currentUser }) => {

    const posts = currentUser && currentUser.saved
    const [url, setUrl] = useState()
    const [urlType, setUrlType] = useState()
    const [commentsWindow, setCommentsWindow] = useState(false)

    return (
        <div className="all-posts">
            <NavLink to={`/${userName}/saved`}>{"< Saved "}</NavLink>

            {posts && posts.length !== 0 &&
                <div className='flex posts'>
                    {posts && posts.map((post) => (
                        post.type === "image/jpeg" ?
                            <div className='interesting_img' key={post.id}
                            onClick={()=>{
                                setUrl(post.url)
                                setUrlType(post.type)
                                setCommentsWindow(true)
                                console.log("click")
                            }}>
                                <div><img src={post.url} alt="post" /></div>
                            </div> :
                            <div className='interesting_img' key={post.id}
                            onClick={()=>{
                                setUrl(post.url)
                                setUrlType(post.type)
                                setCommentsWindow(true)
                                console.log("click")
                            }}>
                                <div className='video_div'>
                                    <video
                                        src={post.url}
                                        width="320px"
                                        height="320px"
                                    />
                                </div>
                            </div>
                    ))}
                </div>
            }

            {commentsWindow &&
                <div className="Comments">
                    <img src={cleare} alt="cleare"
                        onClick={() => setCommentsWindow(false)} />
                    <Main url={url} urlType={urlType} />
                </div>}

        </div>
    )
}
export default AllPosts