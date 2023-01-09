import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import useFetchData from './axiosFetch'
import FlipMove from "react-flip-move";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import "./constant"
import { currentUser } from "./constant";

TimeAgo.addDefaultLocale(en)

function Feed() {
  const {
    data,
    loading,
    setData
  } = useFetchData(`http://localhost:8000/tweets/user/${currentUser.id}/page/0/page_size/20`);

  const timeAgo = new TimeAgo('en-US')
  const posts = data.items || [];

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox setData={updateData} />

      <FlipMove>
        {posts.map((post) => {
          var utcSeconds = post.created_at;
          var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
          if (!!utcSeconds) {
            d.setUTCSeconds(utcSeconds);
          } else {
            d.setUTCSeconds(1000000);
          }
          
          const timestamp = timeAgo.format(d)
          return (
          <Post
            key={post.id}
            displayName={post.display_name}
            username={post.username}
            verified={true}
            text={post.body}
            timestamp={timestamp}
          />)
        })}
      </FlipMove>
    </div>
  );

  function updateData(response) {
    setData([response, ...data])
  }
}

export default Feed;
