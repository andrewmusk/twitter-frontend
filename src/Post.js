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
                </span>
              </h3>
              <div>{timestamp}</div>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {/* <img src={image} alt="" /> */}
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" onClick={() => console.log("working")}/>
            <RepeatIcon fontSize="small" onClick={retweetTweet}/>
            <FavoriteBorderIcon style={{ color: like_color}} fontSize="small"/>
            {num_likes}
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
