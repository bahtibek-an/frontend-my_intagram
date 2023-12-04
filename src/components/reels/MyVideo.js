import likee from '../images/love.svg'
import comment from '../images/comment.png'
import share from '../images/share.svg'
import save from '../images/save.png'
import more from '../images/more.webp'
import userr from '../images/user.png'
import likeRed from '../images/like_red.png'
import unsave from '../images/save_black.png'
import sound_on from '../images/volum.png'
import sound_off from '../images/sound_off.png'
import hWhite from "../images/hWhite.jpg";
import cWhite from "../images/cWhite.jpg";
import sWhite from "../images/comW.jpg";
import plane from "../images/plane.jpg";
import images from "../images/images.png";
import saveWhite from "../images/sBlackW.jpg";
import Comment from './Comment'
import Share from './Share'
import ReactPlayer from 'react-player'
import { useState, useRef, useMemo, useEffect } from 'react'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const MyVideo = ({ url, urlType, open, likes, comments, user, userName, id, publ, publId, getUsers, liked, saved, addSave, subscribe, isSubscribe, muted, setMuted, users, currentUser, dark }) => {

  const [islike, setislike] = useState(liked)
  const [likess, setLikess] = useState(likes)
  const ref1 = useRef(null);
  const isInViewport1 = useIsInViewport(ref1);
  const [commentsWindow, setCommentsWindow] = useState(false)
  const [shareWindow, setShareWindow] = useState(false)

  useEffect(() => {
    const handleScroll = (event) => {
      setCommentsWindow(false)
      setShareWindow(false)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const unmuted = () => {
    muted ? setMuted(false) : setMuted(true)
  }

  const isliked = () => {
    islike ? setislike(false) : setislike(true)
    islike ? setLikess(likess - 1) : setLikess(likess + 1)
  }

  const addlike = () => {

    if (publ.likes.length === 0) {
      like()
    } else if (publ.likes.length === 1) {
      publ.likes[0].userId === id ? dislike() : like()
    } else if (publ.likes.length > 1) {
      const check = publ.likes.some((like) => {
        return like.userId === id
      })
      check ? dislike() : like()
    }
    isliked()
  }

  const like = async () => {
    const filteredPublications = user.publications.filter((publ) => {
      return publ.id !== publId
    })
    await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publ, likes: [...publ.likes, { from: userName, userId: id }] }] })
    getUsers()
  }

  const dislike = async () => {
    const filteredPublications = user.publications.filter((publ) => {
      return publ.id !== publId
    })
    const filteredlikes = publ.likes.filter((like) => {
      return like.userId !== id
    })
    await setDoc(doc(db, "users", `${user.id}`), { ...user, publications: [...filteredPublications, { ...publ, likes: [...filteredlikes] }] })
    getUsers()
  }



  const opentComments = () => {
    commentsWindow ? setCommentsWindow(false) : setCommentsWindow(true)
  }

  const openShare = () => {
    shareWindow ? setShareWindow(false) : setShareWindow(true)
  }

  function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) =>
          setIsIntersecting(entry.isIntersecting),
        ),
      [],
    );

    useEffect(() => {
      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }, [ref, observer]);

    return isIntersecting;
  }



  return (
    <>
      <div className='reel' key={publId}>
        <div className='reels_video' >
          <ReactPlayer
            width="100%"
            height="auto"
            playing={isInViewport1}
            url={url}
            muted={muted}
            loop
          />
          <img src={muted ? sound_off : sound_on} alt="sounds" className='sound'
            onClick={unmuted} />
          <img src={user.profile ? user.profile : userr} alt="user" className='user_round userr' />
          <p>{user.username}</p>
          <button onClick={() => subscribe(user.id, user)}>{isSubscribe ? "Unfollow" : 'Follow'}</button>
        </div>
        <div className='reels_icon'>
          <div className='icon_div'>
            {dark ?
            <img src={islike ? likeRed : hWhite} alt="like" width='24' height='24' className='like img' ref={ref1}
            onClick={addlike} /> :
            <img src={islike ? likeRed : likee} alt="like" width='24' height='24' className='like img' ref={ref1}
              onClick={addlike} />}
            <p><small>{likess ? likess : ""}</small></p>
          </div>

          <div className='icon_div' >
            {commentsWindow &&
              <div>
                <Comment
                  comments={comments}
                  user={user}
                  userName={userName}
                  id={id}
                  publ={publ}
                  publId={publId}
                  getUsers={getUsers}
                  dark={dark} />
              </div>}


            <img src={dark ? cWhite : comment} alt="comment" width='24' className='img'
              onClick={opentComments} />


            <p><small>{comments ? comments.length : ""}</small></p>
          </div>

          <div className='icon_div'>
            <img src={dark ? plane : share} alt="share" width='24' height="24" className='img' 
            onClick = {openShare}/>
            { shareWindow && 
              <Share 
              users={users}
              url={url}
              id={id}
              getUsers={getUsers}
              currentUser={currentUser}
              urlType={urlType}
              dark={dark}/>
            }
          </div>
          <div className='icon_div'>
            {dark ?
            <img src={saved ? saveWhite : sWhite} alt="save" width='18' height="20" className='img'
            onClick={() => {
              addSave(user.id, publ.url, publ)
            }} /> :
            <img src={saved ? unsave : save} alt="save" width='18' height="20" className='img'
              onClick={() => {
                addSave(user.id, publ.url, publ)
              }} />}
            <p></p>
          </div>
          <div className='icon_div'>
            <img src={dark ? images : more} alt="more" width='15' height="auto" className='img'
              onClick={open} />
            <p></p>
          </div>
          <div className='icon_div'>
            <img src={userr} alt="user" width="25" height="25" className='img user_round' />
          </div>
        </div>
      </div>
    </>
  );
}






export default MyVideo