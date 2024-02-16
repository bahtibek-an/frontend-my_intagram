import { useEffect, useRef } from "react";
import usePostComment from "../hooks/usePostComment";
import Comment from "./Comment";

const CommentModal = ({ isOpen, onClose, post }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const commentRef = useRef(null);
  const commenntContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commenntContainerRef.current.scrollTop =
        commenntContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-gray-300 shadow-lg border-1 max-w-400 rounded">
            <div className="p-4">
              <h2 className="text-gray text-lg font-semibold mb-4">Comments</h2>
              <button
                className="absolute top-2 right-2 text-white"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="mb-4 h-48 overflow-y-auto" ref={commenntContainerRef}>
                {post.comments.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))}
              </div>
              <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
                <input
                  className="mt-1 p-2 w-64 bg-white border border-gray-600 rounded"
                  placeholder="Comment"
                  size="sm"
                  ref={commentRef}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                  >
                  Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;