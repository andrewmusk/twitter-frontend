import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import axios from 'axios';
import "./constant"
import { currentUser } from "./constant";

function TweetBox(setItems) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8000/create_tweet",
      {
        "user_id": currentUser.id,
        "body": tweetMessage,
        "retweet_id": null,
        "reply_tweet_id": null,
      },
    );

    setTweetMessage("");
    setTweetImage("");
    setItems.setItems({...response.data, username: currentUser.username, display_name: currentUser.displayName});
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={""} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
