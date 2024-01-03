import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import { Post } from "@/types";
const fetchPosts = async () => {
  const postsRef = collection(db, "posts");
  const fetch = await getDocs(postsRef);
  const posts: Post[] = [];
  fetch.forEach((post) => posts.push(post.data() as Post));
  return posts;
};

export default fetchPosts;
