import React, { useContext } from "react";
import { listContext } from "./Main";
import "./style.css";

const Sort = () => {
  const { handleSort,handleSetBookmark} = useContext(listContext);

  const Bookmark = () => {
    handleSetBookmark();
  };
  const Sort = (sortKey) => {
    handleSort(sortKey);
  };
  return (
    <div>
      <div className="Sort">
        <div className="sorting">
          <h2>SORT</h2>

          <input
            type="radio"
            id="radio"
            onChange={() => Sort("vote")}
            value="vote"
            name="filter"
          />
          <label>VOTE</label>

          <input
            type="radio"
            id="radio"
            onChange={() => Sort("time")}
            value="time"
            name="filter"
          />
          <label>TIME</label>
        </div>
        <button className="bookmark-button" onClick={() => Bookmark()} >
          BOOK MARK
        </button>
      </div>
    </div>
  );
};
export { Sort };
