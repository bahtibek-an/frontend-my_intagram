// Импорт необходимых зависимостей и компонентов из React и других библиотек
import React, { useState } from "react";
import "./PostCard.css";
import { FiHeart, FiSend, FiSmile } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { db, auth } from '../../context/FirebaseConfig';
import { Link } from "react-router-dom";




// Список эмодзи, которые можно использовать в комментариях
const emojiList = ['😄' , '😁' , '🤣', '😅' , '😂' , '🙂' , '🙃' , '🫠' , '😉' , '😊' , '😇' , '🥰' , '😍' , '🤩', '👋' , '👏' , '🖕' , '👍' , '👎' , ];

// Функциональный компонент для отображения карточки поста
const PostCard = ({ post, postId, setAlertMessage , }) => {
  // Состояния для управления количеством лайков, комментариями и состоянием интерфейса
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comments, setComments] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [isOpenedEmoji, setIsOpenedEmoji] = useState(false);

  // Функция для открытия выбора эмодзи
  const openEmoji = () => {
    setIsOpenedEmoji(prev => !prev);
  };


      const isAuthor = auth.currentUser.displayName === post.username;
  // Проверка, поставил ли текущий пользователь лайк на пост
  const isLiked = post.likes.filter(
    (value) => auth.currentUser.displayName === value.username
  );

  // Функция для обработки лайков поста
  const handleLikes = async () => {
    setIsClick(true);

    try {
      // Если уже поставлен лайк, то убрать лайк при клике
      if (isLiked.length !== 0) {
        setLikesCount(likesCount - 1);
        await updateDoc(doc(db, "posts", postId), {
          likes: arrayRemove({
            username: auth.currentUser.displayName,
          }),
        });
      }
      // Если лайка еще нет, то добавить лайк при клике
      else {
        setLikesCount(likesCount + 1);
        await updateDoc(doc(db, "posts", postId), {
          likes: arrayUnion({
            username: auth.currentUser.displayName,
          }),
        });
      }
    } catch (error) {
      console.log(error);
      setAlertMessage(error.message);
    }

    // Сбросить состояние клика через 1 секунду
    setTimeout(() => {
      setIsClick(false);
    }, 1000);
  };

  // Функция для добавления комментария к посту
  const handlePostComments = async () => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion({
          username: auth.currentUser.displayName,
          comment: comments,
        }),
      });
      setComments("");
    } catch (error) {
      console.log(error);
      setAlertMessage(error.message);
      setComments("");
    }
  };


  // JSX структура для отображения карточки поста
  return (
    <div className="card-container">
      {/* Секция заголовка с информацией о профиле пользователя */}
      <div className="card-wrapper">
        <div className="card-header align-center ">
          <div className="image-wrapper absolute-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user-profile"
            />
          </div>
          <Link to={`/profile/${post.username}`}>
            <div className="profile-username cur-point">{post.username}</div>
          </Link>
        </div>

        {/* Основная секция с содержанием поста */}
        <div
          className="post-wrapper absolute-center cur-point"
          onDoubleClick={handleLikes}
        >
          <img src={post.imageUrl} alt="post" />
          <div
            className="large-like-icon"
            style={{ display: isClick ? "block" : "none" }}
          >
            <FiHeart
              style={{
                width: "100%",
                height: "100%",
                fill: "red",
                color: "red",
              }}
            />
          </div>
        </div>

        {/* Секция снизу с иконками лайков, комментариев и шаринга */}
        <div className="card-bottom">
          <div className="post-like-comments-wrapper align-center">
            <div className="like-icon absolute-center">
              {/* Кнопка лайка с иконкой сердца */}
              <button
                type="button"
                title="like"
                onClick={handleLikes}
                className="like-btn cur-point"
              >
                <FiHeart
                  style={{
                    width: "100%",
                    height: "100%",
                    fill: isLiked.length > 0 && "red",
                    color: isLiked.length > 0 && "red",
                  }}
                />
              </button>
            </div>

            {/* Иконка комментария */}
            <div className="comments-icon absolute-center">
              <FaRegComment style={{ width: "100%", height: "100%" }} />
            </div>

            {/* Иконка шаринга */}
            <div
              className="share-icon absolute-center cur-point"
              // onClick={() => handleShare(post.username, post.caption)}
            >
              <FiSend style={{ width: "100%", height: "100%" }} />
            </div>
          </div>

          {/* Отображение количества лайков и даты поста */}
          <div className="like-count-wrapper ">{post.likes.length} Лайков</div>
          <div className="post-date-wrapper">
            {post.datePostedOn.toDate().toDateString()}
          </div>

          {/* Отображение имени пользователя и подписи к посту */}
          <div className="username-caption-wrapper align-center ">
            <div className="profile-username">{post.username}</div>
            <div className="caption-wrapper">{post.caption}</div>
          </div>

          {/* Отображение комментариев к посту */}
          {post.comments?.map((data, index) => (
            <div className="comments-display-section align-center" key={index}>
              <p className="profile-username">{data.username}</p>
              <p className="comments-wrapper caption-wrapper">{data.comment}</p>
            </div>
          ))}
        </div>

        {/* Секция для добавления комментариев и эмодзи */}
        <div className="post-comments-wrapper align-center">
          <div className="smile-icon">
            <div className="ffr">
              {/* Иконка выбора эмодзи */}
              <FiSmile
                onClick={openEmoji}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              
              {/* Выбор эмодзи */}
              {isOpenedEmoji && (
                
                <ul >
                  {emojiList.map((emoji, idx) => (
                    <li 
                      onClick={() => setComments(comments + emoji)}
                      key={idx}
                    >{ emoji }</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <input
            type="text"
            className="comments-input"
            placeholder="Добавьте комментарий"
            onChange={(e) => setComments(e.target.value)}
            value={comments ?? ""}
            min={1}
            maxLength={50}
          />

          <button
            disabled={comments.length <= 0}
            onClick={handlePostComments}
            type="button"
            className="comments-post-btn cur-point"
            style={{ opacity: comments.length <= 0 && "0.5" }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default PostCard;
