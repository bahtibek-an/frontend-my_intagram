"use client";
import Emoji from "@/assets/icons/Emoji.svg";
import { Message } from "@/types";
import { CircularProgress, ClickAwayListener } from "@mui/material";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Timestamp } from "firebase/firestore";
import React, { FormEvent, useState } from "react";
import UploadImg from "@/assets/icons/UploadImage.svg";
import Heart from "@/assets/icons/Lİke.svg";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/firebase/startConversation";
import { useAuthContext } from "@/contexts/AuthContext";
const SendMessage = ({ roomId }: { roomId: string }) => {
  const { userData } = useAuthContext();
  const [message, setMessage] = useState<Message>({
    content: "",
    sender: userData?.userId || "",
    time: Timestamp.now(),
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: (msg: Message) => sendMessage({ roomId: roomId, message: msg }),
    onSuccess: () => {
      setMessage({
        content: "",
        sender: userData?.userId || "",
        time: Timestamp.now(),
      });
    },
  });
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.content || isLoading) return;
    mutate({
      ...message,
      time: Timestamp.now(),
    });
  };
  return (
    <form
      className="mt-auto mb-2 mx-4 border dark:border-neutral-800 p-2 rounded-3xl flex items-center relative"
      onSubmit={handleSubmit}
    >
      <div onClick={() => setIsEmojiPicker(true)}>
        <Emoji className="cursor-pointer hover:opacity-80 active:opacity-60" />
      </div>
      <input
        type="text"
        name="message"
        id="message"
        onChange={(e) =>
          setMessage((prevState) => {
            return {
              ...prevState,
              content: e.target.value,
            };
          })
        }
        value={message.content}
        className="border-none outline-none px-2 w-full"
        placeholder="Message ..."
      />
      {!message.content && (
        <div className="flex items-center gap-2 px-2">
          <label htmlFor="imgs" className="cursor-pointer">
            <UploadImg />
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              name="imgs"
              id="imgs"
            />
          </label>
          <Heart
            className="stroke-black dark:stroke-white cursor-pointer"
            onClick={() =>
              mutate({ ...message, time: Timestamp.now(), content: "❤️" })
            }
          />
        </div>
      )}
      {message.content && !isLoading && (
        <button
          type="submit"
          className="px-2 text-blue hover:text-white active:text-blue active:opacity-90 font-medium"
        >
          Send
        </button>
      )}
      {isLoading && <CircularProgress size={16} />}
      {isEmojiPicker && (
        <ClickAwayListener
          onClickAway={() => {
            setIsEmojiPicker(false);
          }}
        >
          <div className="absolute top-[-452px] z-20">
            <EmojiPicker
              emojiStyle={EmojiStyle.FACEBOOK}
              onEmojiClick={(emoji) =>
                setMessage((prevState) => ({
                  ...prevState,
                  content: `${message.content}${emoji.emoji}`,
                }))
              }
              theme={Theme.AUTO}
              width="auto"
            />
          </div>
        </ClickAwayListener>
      )}
    </form>
  );
};

export default SendMessage;
