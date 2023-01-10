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
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [items, setItems] = useState([]);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/tweets/user/${currentUser.id}/page/${currPage - 1}/page_size/20`
      );
      console.log("request")
      if (!response.data.items.length) {
        setLastList(true);
        return;
      }
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
      console.log(scrollTop)
      console.log(scrollHeight)
      console.log(clientHeight)
      if ((scrollTop + clientHeight) + 100 >= scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

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
        />
      </FlipMove>
    </div>
  );
}

export default Feed;
