import React, { useContext,useState } from 'react'
import { listContext } from "./Main";
import "./style.css";
const Question = () => {
    const{Submit,error,handleQuestionChange,question}=useContext(listContext)  ;
  // const [date, setDate] = useState();
  // const [time, setTime] = useState();

  return (
    <div>
        <div>
      <div className="question">
        <div>
          <h1>ASK QUESTION</h1>
        </div>
        <div>
          <textarea value={question} onChange={handleQuestionChange}></textarea>
          {error && question.length <= 0 ? (
            <p className="warning">*Question can't be empty</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <button className="question-submit-button" onClick={Submit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Question
