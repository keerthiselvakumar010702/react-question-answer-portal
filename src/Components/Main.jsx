import React, { useState } from "react";
import Answer from "./Answer";
import Question from "./Question";
import { Sort } from "./Sort";
import "./style.css";
const listContext = React.createContext();
const Main = () => {
  const [list, setList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(false);
  const [answererror, setAnswerError] = useState(false);
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState(0);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [showbookmark, setShowBookmark] = useState(false);

  // const [viewList,setViewList]=useState([list])
  const handlesetsort = (sortKey) => {
    const Array = [...list];
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
    setList(sorted);
    setViewList(sorted);
  };
  const handleIncreaseVote = (id) => {
    let newArray = [...list].map((item) => {
      console.log(id);
      if (item.id === id) {
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
  };
  const handleDecreaseVote = (id) => {
    let newArray = [...list].map((item) => {
      console.log(id);
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

    setList(decrease);
    setViewList(decrease);
  };
  // const handleBookmark = () => {
  //   //   setBookmark(!bookmark)
  //   //  const newArray=list.filter((book)=>book.bookmark==true)
  //   setShowBookmark(!showbookmark);
  //   const newArray = list.filter((book) => book.bookmark == true);
  //   if (showbookmark) {
  //     console.log("inside if");
  //     //setList(list);
  //     return list;
  //   } else {
  //     console.log("inside else", newArray);
  //    // setList(newArray);
  //    return newArray
  //   }
  // };
  const handleSetBookmark = () => {
    // const bookamrked = handleBookmark();
    // setList(bookamrked);
    // setShowBookmark(!showbookmark);
    // console.log(showbookmark);
    // const showList = showbookmark
    // ? list.filter((item) => item.bookmark)
    // : list;
    // console.log(showList);
    // setList(showList);
    // setShowBookmark(!showbookmark);
    // console.log(showbookmark);
    // if(showbookmark){
    //   console.log("should print entire list");
    //   setList(list);
    //   console.log(list);
    // }
    // else{
    //   console.log("should print bookmarked");
    //   const showList = viewList.filter((item) => item.bookmark);
    // console.log(showList);
    // setList(showList);

    // }
    // const newArray = list.filter((book) => book.bookmark == true);
    // if (showbookmark) {
    //   console.log("inside if");
    //   setList(viewList);
    // } else {
    //   console.log("inside else", newArray);
    //   setList(newArray);
    // }
    setShowBookmark(!showbookmark);

    const newArray = list.filter((book) => book.bookmark == true);
    console.log(showbookmark);
    if (showbookmark) {
      console.log("entire list", viewList);
      setList(viewList);

      // return list;
    } else {
      console.log("should show only book marked", newArray);
      setList(newArray);
      // return newArray
    }
  };
  const handleSave = (id) => {
    //   let book = [...list];
    // let newArray=book.map((item) => {
    //     if (item.id === id) {
    //       return (item.bookmark = !item.bookmark);
    //     } else {
    //       return item;
    //     }
    //   });
    //   return newArray;
    const book = list.map((item) => {
      if (item.id === id) {
        return { ...item, bookmark: !item.bookmark };
      } else {
        return item;
      }
    });
    return book;
  };
  const handleSetSave = (id) => {
    const saved = handleSave(id);
    console.log(saved);
    setList(saved);
    setViewList(saved);
  };

  const handleAnswerChange = (event) => {
    console.log(event.target.value);
    setAnswer(event.target.value);
    console.log(answer);
  };
  const handleAnswerSubmit = (id) => {
    if (answer.length == 0) {
      setAnswerError(true);
      console.log(answererror);
      return;
    } else {
      let showSubmit = [...list];
      showSubmit.map((item) => {
        if (item.id === id) {
          return (item.disable = !item.disable);
        } else {
          return item;
        }
      });
      setList(showSubmit);
      setViewList(showSubmit);
    }
  };
  // };
  const Submit = () => {
    let showdate = new Date();
    let displaydate =
      showdate.getDate() +
      "/" +
      (showdate.getMonth() + 1) +
      "/" +
      showdate.getFullYear();
    let displaytime =
      showdate.getHours() +
      ":" +
      showdate.getMinutes() +
      ":" +
      showdate.getSeconds();
    // console.log(displaydate,displaytime);
    setDate(displaydate);
    setTime(displaytime);
    let details = {
      id: id,
      question: question,
      answer: "",
      bookmark: false,
      vote: 0,
      disable: false,
      date: displaydate,
      time: displaytime,
    };
    //console.log(time);
    //e.preventDefault();

    if (question.length == 0) {
      setError(true);
      console.log(error);
      return;
    }
    setId(id + 1);
    setList((prev) => [...prev, details]);
    setViewList((prev) => [...prev, details]);
    console.log(viewList);
  };
  const handleQuestionChange = (event) => {
    console.log(event.target.value);
    setQuestion(event.target.value);
    console.log(question);
  };
  const handleDelete = (id) => {
    let removedList = list.filter((item) => item.id !== id);
    return removedList;
  };
  const handleSetDelete = (id) => {
    const removed = handleDelete(id);
    setList(removed);
    //setViewList(removed);
  };
  return (
    <listContext.Provider
      value={{
        list,
        setList,
        error,
        answer,
        answererror,
        question,
        handleSetDelete,
        handleSetBookmark,
        handleSetSave,
        handleSort,
        handleAnswerChange,
        handleSetIncreaseVote,
        handleSetDecreaseVote,
        handleAnswerSubmit,
        Submit,
        handleQuestionChange,
      }}
    >
      <Question />
      <Sort />
      <Answer />
    </listContext.Provider>
  );
};

export { listContext };
export { Main };
