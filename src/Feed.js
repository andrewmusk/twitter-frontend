import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import useFetchData from './axiosFetch'
import FlipMove from "react-flip-move";

function Feed() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   db.collection("posts").onSnapshot((snapshot) =>
  //     setPosts(snapshot.docs.map((doc) => doc.data()))
  //   );
  // }, []);

  const {
    data,
    loading,
  } = useFetchData("http://localhost:8000/tweets/user/0/page/0");

  const posts = data.items || [];
  console.log(posts);
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home Test and more</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={"testDisplayName"}
            username={"test_username"}
            verified={true}
            text={post.body}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
