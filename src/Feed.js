import React, { useState, useEffect, useRef } from "react";
import TweetBox from "./TweetBox";
import "./Feed.css";
import FlipMove from "react-flip-move";
import "./constant"
import { currentUser } from "./constant";
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
import FeedItems from "./FeedItems";

function Feed() {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(-1);
  const [items, setItems] = useState([]);
  const [lastList, setLastList] = useState(false);
  const [seenPages, setSeenPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("making requests for page: " + currPage)
      const response = await axios.get(
        `http://localhost:8000/tweets/user/${currentUser.id}/page/${currPage}/page_size/20`
      );
      
      if (!response.data.items.length) {
        setLastList(true);
        return;
      }
      setSeenPages([...seenPages, currPage -1])
      setPrevPage(currPage);
      setItems([...items, ...response.data.items]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, items]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if ((scrollTop + clientHeight) == scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  function updateTweetLike(id) {
    // Create a new copy of the users array with the updated user
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        // Return a new object with the updated name
        const likes = !!item.num_likes ? item.num_likes : 0
        return { ...item, num_likes: likes+1, user_liked: true};
      }
      // Return the original object if no updates are needed
      return item;
    });

    // Set the state with the updated users array
    setItems(updatedItems);
  }

  function updateData(response) {
    setItems([response, ...items])
  }

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox setItems={updateData} />

      <FlipMove>
        <FeedItems
          onScroll={onScroll}
          listInnerRef={listInnerRef}
          items={items}
          updateTweetLike={updateTweetLike}
        />
      </FlipMove>
    </div>
  );
}

export default Feed;
