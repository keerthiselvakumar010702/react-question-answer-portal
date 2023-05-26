import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import Question from "./Question";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { SpecificAnswer } from "./SpecificAnswer";
import Display from "./Display";
import { Login } from "./Login";
import { useSelector } from "react-redux";
import { login } from "../Store/redux-store";
import { useDispatch } from "react-redux";

const listContext = React.createContext();  
const Main = () => {
  const [list, setList] = useState([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(false);
  const [showbookmark, setShowBookmark] = useState(false);
  const [viewList, setViewList] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answererror, setAnswerError] = useState(false);
  const email = useSelector((state) => state);
  console.log(email.email);
  const accesstoken = useSelector((state) => state);
  console.log(accesstoken.accesstoken);
  const Submit = async (navigate) => {
    console.log("sdfkbdsfn");
    const reqdata = await fetch("http://localhost:3001/answer/ans/create", {
      method: "POST",
      body: JSON.stringify({ question: question, user: email.email }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },  
    });
    console.log(reqdata);
    let res = await reqdata.json();
    console.log(res);

    navigate("/answer");
    handleViewAnswers();
  };
  const handleQuestionChange = (event) => {
    console.log(event.target.value);
    setQuestion(event.target.value);
    console.log(question);
  };
  const handlesetsort = (sortKey) => {
    const Array = [...viewList];
    if (sortKey === "vote") {
      Array.sort((a, b) => a.vote - b.vote);
    } else if (sortKey === "time") {
      Array.sort((a, b) => b.time.localeCompare(a.time));
      console.log(Array);
    }
    return Array;
  };
  const handleSort = (sortKey) => {
    const sorted = handlesetsort(sortKey);
    setViewList(sorted);
  };
  const handleSetBookmark = () => {
    setShowBookmark(!showbookmark);
    const newArray = list.filter((book) => book.bookmark == true);
    if (showbookmark) {
      console.log("inside if");
      setViewList(list);
    } else {
      console.log("inside else", newArray);
      setViewList(newArray);
    }
  };

  const handleIncreaseVote = (id) => {
    let newArray = viewList.map((item) => {
      console.log(viewList);
      if (item.id === id) {
        console.log(item);
        console.log(item.vote);
        return { ...item, vote: item.vote + 1 };
      } else {
        return item;
      }
    });
    return newArray;
  };
  const handleSetIncreaseVote = (id) => {
    const increase = handleIncreaseVote(id);
    setList(increase);
    setViewList(increase);
    console.log(viewList);
  };
  const handleDecreaseVote = (id) => {
    let newArray = viewList.map((item) => {
      if (item.id === id) {
        return { ...item, vote: item.vote - 1 };
      } else {
        return item;
      }
    });

    return newArray;
  };
  const handleSetDecreaseVote = (id) => {
    const decrease = handleDecreaseVote(id);
    setViewList(decrease);
  };
  const handleSave = (id) => {
    let book = viewList.map((item) => {
      if (item.id === id) {
        return { ...item, bookmark: (item.bookmark = !item.bookmark) };
      } else {
        return item;
      }
    });
    return book;
  };
  const handleSetSave = (id) => {
    const saved = handleSave(id);
    setViewList(saved);
  };

  const handleAnswerSubmit = async (id) => {
    let res =await fetch(`http://localhost:3001/answer/update/` + id, {
      method: "PUT",
      body: JSON.stringify({ answer: answer }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${accesstoken.accesstoken}`,
      },
    });
    let newArray = viewList.map((item) => {
      if (item.id == id) {
        item.answer = answer;
        return item;
      } else {
        return item;
      }
    });
    setViewList(newArray);
    console.log(viewList);
  };
  const handleSetDelete = async (id, user_email) => {
    console.log(email.email);
    console.log(user_email);
    if (user_email === email.email) {
      console.log("sdjgfvdsfhbdksjbf");
      let res = await fetch("http://localhost:3001/answer/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accesstoken.accesstoken}`,
        },
      });
      console.log(res);
      let resjson = await res.json();
      console.log(resjson);
      handleViewAnswers();
    }
    else{
      alert("Cannot delete");
    }
    // let removedList = viewList.filter((item) => item.id !== id);
    // setViewList(removedList);
  };
  const handleViewAnswers = async () => {
    console.log("inside fetch");
    const requestdata = await fetch("http://localhost:3001/answer/answer");
    const responsedata = await requestdata.json();
    setViewList(responsedata.data);
    console.log(responsedata.data);
  };
  return (
    <listContext.Provider
      value={{
        viewList,
        handleSetDelete,
        handleSetBookmark,
        handleSetSave,
        handleSort,
        handleSetIncreaseVote,
        handleSetDecreaseVote,
        handleAnswerSubmit,
        Submit,
        handleQuestionChange,
        handleViewAnswers,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route
              path="question"
              element={<Question error={error} question={question} />}
            />
            <Route
              path="answer"
              element={
                <Answer
                  answer={answer}
                  answererror={answererror}
                  setAnswer={setAnswer}
                />
              }
            />
            <Route path="answer/:id" element={<SpecificAnswer />} />
            {/* <Route path="display" element={<Display />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </listContext.Provider>
  );
};

export { listContext };
export { Main };
