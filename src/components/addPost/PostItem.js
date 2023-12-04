import LoadingPost from "components/loading/LoadingPost";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BiCommentDetail, BiShare } from "react-icons/bi"
import { GiSaveArrow } from "react-icons/gi"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostItem = ({ data }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", data.userId);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    }
    fetchUser();
  }, [data.userId]);

  let timeString = moment(data.createAt.seconds * 1000).fromNow();
  if (moment().diff(moment(data.createAt.seconds * 1000), "days") > 7) {
    timeString = moment(data.createAt.seconds * 1000).format(
      "DD/MM/YYYY HH:mm:ss"
    );
  }

  const [like, setLike] = useState(false);
  const [likeData, setLikeData] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "likesPost");
      const querys = query(
        colRef,
        where("idPost", "==", data.id),
        where("userId", "==", userInfo.uid)
      );
      const querySnapshot = await getDocs(querys);
      const tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });
      setLikeData(tempData);
      setLike(tempData.length > 0);
    };
    fetchData();
  }, [data, userInfo, updateFlag]);
  const [likeDataAllUsers, setLikeDataAllUsers] = useState([]);
  useEffect(() => {
    const fetchDataLikesAllUsers = async () => {
      const colRef = collection(db, "likesPost");
      const querys = query(colRef, where("idPost", "==", data.id));
      const querySnapshot = await getDocs(querys);
      const tempData = [];
      querySnapshot.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });
      setLikeDataAllUsers(tempData);
    };
    fetchDataLikesAllUsers();
  }, [data]);
  const totalLikes = likeDataAllUsers.length;
  const handleLikePost = async () => {
    if (likeData.length > 0) {
      const docRef = await getDoc(doc(db, "likesPost", likeData[0].id));
      await deleteDoc(docRef.ref);
      setUpdateFlag(!updateFlag);
      setLike(false);
      localStorage.setItem(`like-${data.id}`, false);
    } else {
      const colRef = collection(db, "likesPost");
      await addDoc(colRef, {
        idPost: data.id,
        userId: userInfo.uid,
        commentNameUser: userInfo.displayName,
      });
      setUpdateFlag(!updateFlag);
      setLike(true);
      localStorage.setItem(`like-${data.id}`, true);
    }
    const colRef = collection(db, "likesPost");
    const querys = query(colRef, where("idPost", "==", data.id));
    const querySnapshot = await getDocs(querys);
    const tempData = [];
    querySnapshot.forEach((doc) => {
      tempData.push({ id: doc.id, ...doc.data() });
    });
    setLikeDataAllUsers(tempData);
  };

  const [comment, setComment] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "commentPost");
    const qs = query(colRef, where("idPost", "==", data.id));
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
  }, [data.id]);
  const commentTotal = comment.length;
  const [loading, setLoading] = useState(true);

  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <div className="max-w-[528px] mx-5 h-auto mt-5 ">
      <div className="flex items-center justify-between pt-3 drop-shadow-sm">
        <div
          onClick={() => navigate(`/Personal?userName=${user.username}`)}
          className=" flex items-center cursor-pointer"
        >
          <img
            src={
              user.avatar ||
              "https://w7.pngwing.com/pngs/86/421/png-transparent-computer-icons-user-profile-set-of-abstract-icon-miscellaneous-monochrome-computer-wallpaper.png"
            }
            alt=""
            className="avater-p object-cover w-10 h-10 border border-gray-500 rounded-full drop-shadow-sm"
          />
          {user.status === 2 ? (
            <p className="flex items-center px-2 font-semibold text-md drop-shadow-sm">
              {user?.username || user.fullname}{" "}
              <i className="text-blue-500 bx bxs-brightness"></i>{" "}
            </p>
          ) : (
            <p className="px-2 font-medium text-md drop-shadow-sm">
              {user?.username || user.fullname}
            </p>
          )}

          <p className="text-xs">{timeString}</p>
        </div>
        <i
          onClick={() => navigate(`/PostAbout?id=${data.id} `)}
          className="mt-2 text-xl cursor-pointer bx bx-grid-alt"
        ></i>
      </div>
      <div className="">
        <div className="w-full sm:w-[528px] h-auto bg-gray-100 justify-center items-center flex mt-2">
          {loading && <LoadingPost />}
          <img
            src={data.image}
            alt=""
            className="object-cover h-full ss:w-auto sm:max-h-[600px] cursor-pointer "
            onClick={() => navigate(`/PostAbout?id=${data.id} `)}
            onLoad={handleImageLoad}
          />
        </div>

        <div className="flex items-start justify-between ">
          <div className="lik">
            {like ? (
              <i
                className="text-3xl text-red-500 cursor-pointer bx bxs-heart "
                onClick={handleLikePost}
              > <AiFillHeart/></i>
            ) : (
              <i
                className="text-3xl cursor-pointer bx bx-heart"
                onClick={handleLikePost}
              > <AiOutlineHeart/></i>
            )}
            <i
              onClick={() => navigate(`/PostAbout?id=${data.id} `)}
              className="mx-4 my-2 text-3xl cursor-pointer bx bx-comment-detail "
            > <BiCommentDetail/></i>
            <i className="text-3xl bx bx-share"><BiShare/></i>
          </div>
          <i className="text-3xl bx bx-label"><GiSaveArrow/></i>
        </div>
        <p className="font-bold ">{totalLikes} likes</p>
        <div className="flex">
          <p className="font-bold ">{user?.username || user.fullname} : </p>
          <p className="px-2 ">{data.stt}</p>
        </div>
        <div
          className="cursor-pointer "
          onClick={() => navigate(`/PostAbout?id=${data.id} `)}
        >
          {commentTotal ? (
            <p>
              {" "}
              <span className="font-bold">{commentTotal}</span> Comment
            </p>
          ) : (
            <i></i>
          )}
        </div>
        <input
          type="text"
          className="add-com w-full outline-none cursor-pointer focus:border-none"
          placeholder="Add comments"
          onClick={() => navigate(`/PostAbout?id=${data.id}`)}
        />
      </div>
    </div>
  );
};

export default PostItem;
