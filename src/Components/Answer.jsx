import React, { useContext, useState } from "react";
import { listContext } from "./Main";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const Answer = ({ answer, setAnswer, answererror }) => {
  const {
    viewList,
    handleSort,
    handleSetDelete,
    handleSetBookmark,
    handleSetIncreaseVote,
    handleSetSave,
    handleSetDecreaseVote,
    handleAnswerSubmit,
  } = useContext(listContext);

  const IncreaseVote = (id) => {
    handleSetIncreaseVote(id);
  };
  const DecreaseVote = (id) => {
    handleSetDecreaseVote(id);
  };
  const Submit = (id) => {
    handleAnswerSubmit(id);
  };
  const handleAnswerChange = (event) => {
    console.log(event.target.value);
    setAnswer(event.target.value);
    console.log(answer);
  };
  const Change = (event) => {
    handleAnswerChange(event);
  };
  const Save = (id) => {
    handleSetSave(id);
  };
  const Delete = (id,email) => () => {
    console.log(email);
    handleSetDelete(id,email);
  };
  const Sort = (sortKey) => {
    handleSort(sortKey);
  };

  const Bookmark = () => {
    handleSetBookmark();
  };
  return (
    <>
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
        <button className="bookmark-button" onClick={() => Bookmark()}>
          BOOK MARK
        </button>
      </div>
      <div className="scroll">
        {viewList.map((question) => (
         
          <div className="Answer" key={question.id}>
            <div className="vote">
              <div className="number">{question.vote}</div>
              <div>
                <Icon
                  className="arrow-icon"
                  icon="ic:round-arrow-drop-up"
                  onClick={() => IncreaseVote(question.id)}
                />
                <Icon
                  className="arrow-icon"
                  icon="ic:round-arrow-drop-down"
                  onClick={() => DecreaseVote(question.id)}
                />{" "}
              </div>
            </div>
            <div className="qa">
              <Link to={`/answer/${question.id}`}>
                <h3>{question.question}</h3>
              </Link>
              <div>
                {question.answer ? (
                  <textarea
                    className="answer-textarea"
                    disabled
                    onChange={Change}
                  >
                    {question.answer}
                  </textarea>
                ) : (
                  <textarea
                    className="answer-textarea"
                    onChange={Change}
                  ></textarea>
                )}
                {answererror && answer.length <= 0 ? (
                  <p className="warning">*Answer can't be empty</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="right">
              {question.bookmark ? (
                <Icon
                  icon="ri:bookmark-fill"
                  className="bookmark-icon"
                  color="#003552"
                  onClick={() => Save(question.id)}
                />
              ) : (
                <Icon
                  icon="ri:bookmark-fill"
                  color="white"
                  className="bookmark-icon"
                  onClick={() => Save(question.id)}
                />
              )}
              {!question.answer ? (
                <button
                  onClick={() => Submit(question.id)}
                  className="answer-submit-button"
                >
                  SUBMIT
                </button>
              ) : (
                <></>
              )}

              <Icon
                icon="ic:baseline-delete"
                className="delete"
                onClick={Delete(question.id,question.user)}
              />
              <div>{question.user}</div>
              <div className="date-time">{question.date_time}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Answer;
