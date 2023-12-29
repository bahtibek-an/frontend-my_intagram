import React, { useRef } from "react";

const Image = React.lazy(() => import("./Image"));
const Footer = React.lazy(() => import("./Footer"));
const Header = React.lazy(() => import("./Header"));
const Actions = React.lazy(() => import("./Actions"));
const Comments = React.lazy(() => import("./Comments"));

const Post = ({ content }) => {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="card p-3 mb-5">
            <Header 
                username={content.username} 
                posted={content.dateCreated} 
                avatarSrc={content.avatarSrc}
            />
            <Image 
                src={content.imageSrc} 
                caption={content.caption}
            />
            <div className="card-body">
                <Actions
                    docId={content.docId}
                    totalLikes={content.likes.length}
                    likedPhoto={content.userLikedPhoto}
                    handleFocus={handleFocus}
                />
                <Footer 
                    caption={content.caption} 
                    username={content.username}
                />
                <Comments
                    docId={content.docId}
                    comments={content.comments}
                    commentInput={commentInput}
                />
            </div>
        </div>
    );
};

export default Post;