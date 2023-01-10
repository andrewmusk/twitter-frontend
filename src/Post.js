import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import {currentUser} from "./constant";

const Post = forwardRef(
  ({ key, tweetId, displayName, username, verified, text, timestamp, num_likes, is_liked}, ref) => {
    let like_color = is_liked > 0 ? '#ff0000' : '#808080'

    const retweetTweet = async (e) => {
      console.log("retweeting tweet" + tweetId);
      e.preventDefault();

      const response = await axios.post(
          "http://localhost:8000/create_tweet",
          {
              "user_id": currentUser.id,
              "body": text,
              "retweet_id": tweetId,
              "reply_tweet_id": null,
          },
      );
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
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={"elon_profile.jpeg"} />
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

            
  
            <ChatBubbleOutlineIcon style={{ cursor: "pointer", color: "gray"}} fontSize="small" onClick={() => console.log("working")}/>
            <RepeatIcon style={{ cursor: "pointer", color: "gray"}} fontSize="small" onClick={retweetTweet}/>
            <div style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
            <FavoriteBorderIcon style={{ color: like_color}} onClick={likeTweet} fontSize="small"/>
            <p style={{ marginLeft: "10px", fontSize: "15px", color: "gray"}}>{num_likes}</p>
            </div>
            <PublishIcon style={{ cursor: "pointer", color: "gray"}} fontSize="small" />

          </div>
        </div>
      </div>
    );
  }
);

export default Post;
