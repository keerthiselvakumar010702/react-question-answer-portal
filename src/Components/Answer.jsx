import React,{useContext} from "react";
import { listContext } from "./Main";
import { Icon } from '@iconify/react';
import "./style.css";
const Answer = () => {
  const{list,answer,
    answererror,handleSetDelete,handleSetIncreaseVote,handleSetSave,handleSetDecreaseVote,handleAnswerSubmit,handleAnswerChange }=useContext(listContext)  ;
  const IncreaseVote = (id) => {
    handleSetIncreaseVote(id);
  };
  const DecreaseVote = (id) => {
    handleSetDecreaseVote(id);
  };
  const Submit=(id)=>{
    handleAnswerSubmit(id);
  }
  const Change=(event)=>{
    handleAnswerChange(event);
  } 
  const Save = (id) => {
    handleSetSave(id);
  };
  const Delete = (id) => () => {
    handleSetDelete(id);
  };
  return (
    <div className="scroll">
      {list.map((question) => {
        return (
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
                />   </div>
            </div>
            <div className="qa">
              <h3>{question.question}</h3>
              <div>
                {question.disable ? (
                  <textarea
                    className="answer-textarea"
                    disabled
                    onChange={Change}
                  ></textarea>
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
                  color="gray"
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
              {/* <button onClick={() => Save(question.id)}>save</button> */}
              {!question.disable ? (
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
                onClick={Delete(question.id)}
              />
              <div className="date-time">
                {question.date}&nbsp;{question.time}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Answer;
