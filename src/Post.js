import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import {currentUser} from "./constant";

const Post = forwardRef((
    { key, tweetId, displayName, username, verified, text, timestamp, num_likes,
        user_liked, updateTweetLike, num_retweets, user_retweeted, storeRetweet,
        num_replies
    }, ref
    ) => {
    let like_color = user_liked > 0 ? '#ff0000' : '#808080'

    const retweetTweet = async (e) => {
      console.log("retweeting tweet" + tweetId);
      e.preventDefault();

      const response = await axios.post(
          "http://localhost:8000/create_tweet",
          {
              "user_id": currentUser.id,
              "body": `RT ${username}:` + text,
              "retweet_id": tweetId,
              "reply_tweet_id": null,
          },
      );

      storeRetweet()
    };

    const likeTweet = async (e) => {
      console.log("liking tweet" + tweetId);
      e.preventDefault();

      const response = await axios.post(
          "http://localhost:8000/like_tweet",
          {
              "user_id": currentUser.id,
              "tweet_id": tweetId,
          },
      );

      updateTweetLike(tweetId)
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Felonmusk&psig=AOvVaw1Qk8CVxxGOA8KYbwjoHyiT&ust=1673406528063000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPjTwJ-DvPwCFQAAAAAdAAAAABAD"} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}

                  <span style={{marginLeft: 5}}>{timestamp}</span>
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {/* <img src={image} alt="" /> */}
          <div className="post__footer">

            <div style={{display: "flex", alignItems: "center", cursor: "pointer", marginRight: "30px"}}>
                <ChatBubbleOutlineIcon style={{ cursor: "pointer", color: "gray"}} fontSize="small" onClick={() => console.log("working")}/>
                <p style={{ marginLeft: "10px", fontSize: "15px", color: "gray"}}>{num_replies}</p>
            </div>
            <div style={{display: "flex", alignItems: "center", cursor: "pointer", marginRight: "30px"}}>
                {user_retweeted ?
                    <RepeatIcon style={{ cursor: "pointer", color: "green"}} fontSize="small" onClick={retweetTweet}/> :
                    <RepeatIcon style={{ cursor: "pointer", color: "gray"}} fontSize="small" onClick={retweetTweet}/>
                }

                <p style={{ marginLeft: "10px", fontSize: "15px", color: "gray"}}>{num_retweets}</p>
            </div>
            <div style={{display: "flex", alignItems: "center", cursor: "pointer", marginRight: "30px"}}>
              {user_liked ?
                  <FavoriteIcon style={{ color: like_color}} fontSize="small"/> :
                  <FavoriteBorderIcon style={{ color: like_color}} onClick={likeTweet} fontSize="small"/>
              }
              <p style={{ marginLeft: "10px", fontSize: "15px", color: "gray"}}>{num_likes}</p>
            </div>
            {/* <PublishIcon style={{ cursor: "pointer", color: "gray"}} fontSize="small" /> */}
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
