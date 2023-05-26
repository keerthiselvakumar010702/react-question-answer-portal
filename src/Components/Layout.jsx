 import React,{useContext} from "react";
import { Outlet, Link } from "react-router-dom";
 import { listContext } from "./Main";
import "./style.css";
const Layout = () => {
  const{setViewList,handleViewAnswers}=useContext(listContext)  ;
const ViewAnswers=()=>{
handleViewAnswers();
}
  return (
    <div>
      <nav>
        <center>
          {" "}
          <img src="./icon.png" alt="" />
        </center>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/answer" onClick={ViewAnswers}>Answers</Link>
        </li>

      {/* <li>  <Link to="/display">Post</Link></li> */}
      </nav>

      <Outlet />
      <footer>@React Routes</footer>
    </div>
  );
};

export default Layout;
