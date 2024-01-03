import { Timestamp } from "firebase/firestore";
export type UserData = {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  profileImage: string;
  bio?: string;
  followers?: string[];
  following: string[];
  posts?: string[];
  createdAt: Timestamp;
};
export type Post = {
  postId: string;
  userId: string;
  images: string[];
  videos?: string[];
  caption: string;
  likes?: string[];
  comments?: Comment[];
  createdAt: Timestamp;
};

export type Comment = {
  commentId: string;
  userName: string;
  comment: string;
  createdAt: Date;
};

export type Like = {
  postId: string;
  userId: string;
  createdAt: Timestamp;
};

export type Message = {
  sender: string;
  content: string;
  image?: File | string;
  time: Timestamp;
};

export type Activity = {
  user_id: string;
  activity_type: "like" | "comment" | "follow";
  activity_data: string;
  createdAt: Timestamp;
};

export type ExplorePosts = {
  postIds: string[];
};

export type Room = { roomId: string; users: string[] };
export type MessagingRoom = {
  roomId: string;
  users: UserData[];
  lastMessage: Message;
};
