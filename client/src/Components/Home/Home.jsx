import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import '../Home.css'
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import inputEmoji from 'react-input-emoji'
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import Send from '@mui/icons-material/Send';

function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const token = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)
  const [openComment, SetOpenComment] = useState(false)
  const [commentschema, setCommentSchema] = useState([]);
  const [comment, setComment] = useState("")
  const [liked, setLiked] = useState([])
  const [emoji, setEmoji] = useState("");
  const [postId, setPostId] = useState("");

  const headers = {
    Authorization: token.token
  };

  const [data, setData] = useState([])

  useEffect(() => {
    const headers = {
      Authorization: token.token
    };
    axios.get("https://instagram-api-3pzv.onrender.com/auth/me", { headers })
      .then((res) => {
        console.log("Client", res);
        setData(res.data);
      }).catch((e) => {
        console.log(e);
      })
  }, [token])

  useEffect(() => {
    axios.get("https://instagram-api-3pzv.onrender.com/post", { headers })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
        setLiked([res.data[1].like])
      }).catch((e) => {
        console.log(e);
      })
  }, [data]);

  const addComment = (id) => {
    try {
      axios
        .post(`https://instagram-api-3pzv.onrender.com/post/comment/${id}`, {
          comment: comment
        }, { headers })
        .then((res) => {
          alert("Succefful added comment")
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        })
    } catch (error) {
      console.log(error);
    }
  }


  const toggleComments = (postId) => {
    try {
      axios
        .get(`https://instagram-api-3pzv.onrender.com/post/comment/${postId}`, { headers })
        .then((data) => {
          console.log("Comments: ", data);
          setCommentSchema(data.data)
          console.log("PostId:", postId);
          setLoading(true)
        }).catch((e) => {
          console.log(e);
        }).finally(() => {
          SetOpenComment((prevOpenComments) => ({
            ...prevOpenComments,
            [postId]: !prevOpenComments[postId]
          }));
          setLoading(false)
        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get("https://instagram-api-3pzv.onrender.com/users", { headers })
      .then((res) => {
        console.log("users", res);
        setUsers(res.data)
      }).catch((e) => {
        console.log(e);
      })
  }, [postId])

  // const test = liked.map (i => i[0] === data._id  ?  "true" : "false");
  // console.log("Likeds :", test);x
  // console.log(test.map(i => i === true )) ;

  useEffect(() => { }, [loading])

  const like = (id) => [
    axios
      .post(`https://instagram-api-3pzv.onrender.com/post/like/${id}`, {}, { headers })
      .then((res) => {
        console.log("liked!", res);
        navigate(`/${token.token}`)
        window.location.reload();
      }).catch((e) => {
        console.log(e);
      })
  ]
  const unLike = (id) => {
    axios
      .post(`https://instagram-api-3pzv.onrender.com/post/Unlike/${id}`, {}, { headers })
      .then((data) => {
        navigate(`/${token.token}`)
        window.location.reload();
      }).catch((e) => {
        console.log(e);
      })
  }
  const f = (id) => {
    data._id === id ? navigate(`/me/${token.token}`) : navigate(`/user/${id}/${token.token}`)
  }
  const k = (id) => {
    data._id === id ? navigate(`/me/${token.token}`) : navigate(`/user/${id}/${token.token}`)
  }

  const subscribe = (id) => {
    console.log(id);
    axios
      .post(`https://instagram-api-3pzv.onrender.com/user/subscribe/${id}`, {}, { headers })
      .then((res) => {
        console.log('Subscribed!', res.data);
        window.location.reload();
      }).catch((e) => {
        console.log(e)
      })

  }

  return (
    <div className='wrappe'>
      <header className='header'>

        <Link className="logo-container" to={`/${token.token}`}>
          <img className='logo' src='data:image/png;base64,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' />
        </Link>

        <Link to={`/${token.token}`} className='link'>
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link className='link' to={`/user/search/${token.token}`}>
          <SearchIcon />
          <span>Search</span>
        </Link>
        <Link className='create_post link' to={`/post/create/${token.token}`}>
          <AddIcon className='' />
          <span>Create post</span>
        </Link>
        <Link className="client_block link" to={`/me/${token.token}`}>
          <PersonIcon />
          <span>
            Profile</span>
        </Link>
      </header>
      <main className='post_main'>
        <div className="posts_wrape">
          {
            posts.map((item) => {
              return (
                <div className='post'>
                  <div className="post_block" key={item._id}>
                    <div className='user_info'>
                      <img className='user_img' src={"https://instagram-api-3pzv.onrender.com" + item.user.avatar} alt="" onClick={() => f(item.user._id)} />
                      <b className="user_name" onClick={() => f(item.user._id)}>
                        {item.user.name}
                      </b>

                      {
                        item.user._id === data._id ? null : item.user.subscribers.find(i => i === data._id) ? null : <button className="g" onClick={() => subscribe(item.user._id)}>Folow</button>
                      }
                    </div>
                    <div className="post_media_wrapper">
                      <img src={"https://instagram-api-3pzv.onrender.com" + item.img} alt="" />
                    </div>
                    <div className="post_actions">
                      <div className="like_btn">
                        {

                          item.like.find((i) => i === data._id) ? <FavoriteIcon className={item.like.find((i) => i === data._id) ? "liked" : null} onClick={() => unLike(item._id)} /> : <FavoriteBorderIcon className={item.like === data._id ? null : "post_buttons"} onClick={() => like(item._id)} />
                        }
                        <span>{item.like.length} likes</span>
                      </div>
                      <div className="comment_btn">
                        <CommentIcon className='post_buttons' onClick={() => toggleComments(item._id)} />
                      </div>

                    </div>
                    <div className="post_title_wrapper">
                      <b className='title_user_name' onClick={() => k(item.user._id)}>{item.user.name}</b><p>{item.title}</p>
                    </div>
                    <span className='comment_view_span' onClick={() => toggleComments(item._id)}>View all {item.comments.length} comments</span>
                  </div>
                  {
                    openComment[item._id] && (
                      <div className={openComment === false ? "null_comment" : "comment_block"}>
                        <div className="comment_actions">
                          <div className="comments">
                            {
                              commentschema.map((i, index) => {
                                return (
                                  <div className="user_comment" key={index} onClick={()=> k(item.user._id)}>
                                    <Link to={`/user/${i._id}/${token.token}`} onClick={()=> k(item.user._id)} className="user_info">
                                      <img className="user_img" src={"https://instagram-api-3pzv.onrender.com" + i.user.avatar} onClick={()=> k(item.user._id)} />
                                      <p className='user_comment_name'>{i.user.name}</p>
                                    </Link>
                                    {
                                      loading === true ? <h4>Loading...</h4> : <b>{i.comment}</b>
                                    }

                                  </div>
                                )
                              })
                            }
                          </div>
                          <form className='comment_form'>
                            <div className="emoji_block">
                            <span className='emoji' onClick={() => setComment("😭")}>😭</span>
                            <span className='emoji' onClick={() => setComment("🤣")}>🤣</span>
                            <span className='emoji' onClick={() => setComment("💀")}>💀</span>
                            <span className='emoji' onClick={() => setComment("😅")}>😅</span>
                            <span className='emoji' onClick={() => setComment("😀")}>😀</span>
                            <span className='emoji' onClick={() => setComment("🤬")}>🤬</span>
                            <span className='emoji' onClick={() => setComment("😱")}>😱</span>
                            <span className='emoji' onClick={() => setComment("🔞")}>🔞</span>
                            <span className='emoji' onClick={() => setComment("💩")}>💩</span>
                            <span className='emoji' onClick={() => setComment("☕")}>☕</span>
                            </div>
                            <div className="form_block">
                              <input type="text" className='comment_input' placeholder='Add comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
                              <button className='form_block_btn' onClick={() => addComment(item._id)}>Send</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )
                  }
                </div>


              )
            })
          }

        </div>
      </main>
    </div>
  )
}

export default Home