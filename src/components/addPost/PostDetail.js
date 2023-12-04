import Comment from "components/comment/Comment";
import InputTextComment from "components/input/InputTextComment";
import PostEdit from "components/menuPost/PostEdit";
import { Link } from "react-router-dom";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PostDetail = () => {
  const { userInfo } = useAuth();
  const [params] = useSearchParams();
  const postId = params.get("id");

  const [post, setPost] = useState({});

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "posts", postId);
      const docSnapShot = await getDoc(docRef);
      setPost(docSnapShot.data());
    }
    fetchData();
  }, [postId]);

  const timePost = {
    ...post.createAt,
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (post && post.userId) {
        const colRel = doc(db, "users", post.userId);
        const docSnap = await getDoc(colRel);
        setUser(docSnap.data());
      }
    };
    fetchData();
  }, [post]);

  let timeString = moment(timePost.seconds * 1000).fromNow();
  if (moment().diff(moment(timePost.seconds * 1000), "days") > 7) {
    timeString = moment(timePost.seconds * 1000).format("DD/MM/YYYY HH:mm:ss");
  }
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "commentPost");
    const qs = query(colRef, where("idPost", "==", postId));
    onSnapshot(qs, (snapshot) => {
      const results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      results.sort((a, b) => b.createAt - a.createAt);
      setComment(results);
    });
  }, [postId]);

  return (
    <div className="flex mt-40 ml-60">
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)] z-0"></div>
      
      
      <div className="z-10 justify-end hidden w-1/2 h-full sm:flex"><Link className="ex mr-10" to="/HomePage">❌</Link>
        <img
          src={post.image}
          alt=""
          className="w-auto max-h-[500px] object-cover"
        />
      </div>
      <div className="w-full relative sm:w-1/2 h-[550px] sm:h-auto lg:w-[30%] justify-center z-10 bg-white ">
        {/* STT */}
        <div className="flex justify-between w-auto h-20 pt-2 pl-5 border border-b-black">
        
          <div className="flex flex-wrap items-center ">
            <img
              src={
                user.avatar ||
                "https://st.quantrimang.com/photos/image/2022/09/13/Meo-khoc-1.jpg"
              }
              alt=""
              className="object-cover rounded-full w-9 h-9"
            />
            <p className="px-2 font-bold">{post.PostNameId}</p>
            <p className="text-xs">{timeString}</p>
            <p className=" ml-24">{post.stt}</p>
          </div>
          {post.userId === userInfo.uid && (
            <PostEdit postId={postId} user={user} post={post}></PostEdit>
          )}
        </div>

        <div className="pl-5 mt-10">
          {/* COMMENT */}
          {comment.map((post) => (
            <Comment key={post.id} post={post}></Comment>
          ))}
        </div>

        <div className="absolute bottom-0 z-20 w-full h-auto">
          <InputTextComment data={postId}></InputTextComment>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
