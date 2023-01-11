import React  from "react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Post from "./Post";
import "./Feed.css";

TimeAgo.addDefaultLocale(en)

function FeedItems({ onScroll, listInnerRef, items, updateTweetLike, storeRetweet }) {
    const timeAgo = new TimeAgo('en-US');

  return (
      <div
        className="feed_items"
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
    
            const timestamp = timeAgo.format(d, 'mini')
            return (
            <Post
                key={post.id}
                tweetId={post.id}
                displayName={post.display_name}
                username={post.username}
                verified={true}
                text={post.body}
                timestamp={timestamp}
                num_likes={post.num_likes}
                user_liked={post.user_liked}
                updateTweetLike={updateTweetLike}
                num_retweets={post.num_retweets}
                user_retweeted={post.user_retweeted}
                storeRetweet={storeRetweet}
                num_replies={post.num_replies}
            />)
        })}
      </div>
  );
}

export default FeedItems;
