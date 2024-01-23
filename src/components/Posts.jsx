import React, { Component } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { storage, db } from "../firebase";

class Posts extends Component {
  constructor(props) {
    super(props);

    const { post } = this.props;
    const { id, imageUrl, comment, userName, like } = post;

    this.state = {
      id,
      imageUrl,
      comment,
      userName,
      likeCount: like,
      newComment: "",
      comments: [],
    };
  }

  handleLikeClick = async () => {
    const { id, likeCount } = this.state;
    const postRef = doc(db, "images", id);

    try {
      await updateDoc(postRef, {
        like: likeCount + 1,
      });

      this.setState({ likeCount: likeCount + 1 });
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  handlePostComment = async () => {
    const { id, newComment, comments } = this.state;
    const postRef = doc(db, "images", id);

    try {
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
      this.setState({
        comments: [...comments, newComment],
        newComment: "",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  render() {
    const { userName, imageUrl, likeCount, comment, comments, newComment } =
      this.state;

    return (
      <div className="card post mb-2 shadow">
        <div className="card-header">{userName}</div>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title d-flex">
            <div className="">
              <a
                onClick={this.handleLikeClick}
                className="fs-3 m-2 text-dark"
              >
                <ion-icon name="heart-outline" style={{ color: "red" }}></ion-icon>
              </a>
            </div>{" "}
            {likeCount}
            <div className="">
              <a href="/" className="fs-3 m-3 text-dark">
                <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
              </a>
            </div>
          </h5>
          <p className="card-text">{comment}</p>
          <p className="card-text">
            {comments
              .slice(Math.max(comments.length - 2, 0))
              .map((c, index) => (
                <p key={index}>{c}</p>
              ))}
          </p>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              😊
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Comments ..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={newComment}
              onChange={(e) => this.setState({ newComment: e.target.value })}
            />
            <a
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={this.handlePostComment}
            >
              Post
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;