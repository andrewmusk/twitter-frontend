import React  from "react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Post from "./Post";

TimeAgo.addDefaultLocale(en)

function FeedItems({ onScroll, listInnerRef, items }) {
    const timeAgo = new TimeAgo('en-US');

  return (
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        {items.map((post, index) => {
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
                num_likes={post.num_likes}
                is_liked={post.user_liked}
            />)
        })}
      </div>
  );
}

export default FeedItems;
