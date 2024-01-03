import React, { FormEvent, useState } from "react";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useMutation } from "@tanstack/react-query";
import { ClickAwayListener } from "@mui/material";
import Emoji from "@/assets/icons/Emoji.svg";
import { useAuthContext } from "@/contexts/AuthContext";
import { addComment } from "@/firebase/addComment";

const AddComment = ({
  postId,
  setPostedComment,
  refetch,
  commentRef,
}: {
  postId: string;
  setPostedComment?: (arg: string) => void;
  refetch?: () => void;
  commentRef?: React.Ref<HTMLInputElement>;
}) => {
  const { userData } = useAuthContext();
  const [comment, setComment] = useState("");
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["add-comment"],
    mutationFn: () =>
      addComment({
        postId: postId,
        userName: userData?.userName || "",
        comment: comment,
      }),
    onSuccess: () => {
      setComment("");
      setPostedComment && setPostedComment(comment);
      refetch && refetch();
    },
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLoading && userData && comment) mutate();
  };
  return (
    <form
      className={`flex items-center relative ${
        isLoading && "opacity-50 cursor-wait"
      }`}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Add a comment..."
        className="w-full p-1 focus:outline-0"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isLoading}
        ref={commentRef}
      />
      <div className="ml-auto" onClick={() => setIsEmojiPicker(true)}>
        <Emoji className="cursor-pointer hover:opacity-80 active:opacity-60 scale-75" />
      </div>
      {isEmojiPicker && (
        <ClickAwayListener
          onClickAway={() => {
            setIsEmojiPicker(false);
          }}
        >
          <div className="absolute left-11 z-20">
            <EmojiPicker
              emojiStyle={EmojiStyle.FACEBOOK}
              onEmojiClick={(emoji) => setComment(`${comment}${emoji.emoji}`)}
              theme={Theme.AUTO}
            />
          </div>
        </ClickAwayListener>
      )}
      <button
        type="submit"
        className="text-blue hover:text-sky-600 active:opacity-60 font-medium ml-1"
        hidden={!comment}
      >
        Post
      </button>
    </form>
  );
};

export default AddComment;
