// // import React from 'react'
// import React, { useState,useContext,useEffect} from "react";
//  import { listContext } from './Main';

// const Display = () => {
//  // const [message, setMessage] = useState("");
//   const{viewList,setViewList}=useContext(listContext)  ;
// const [data,setData]=useState([])
//     const getData = async () => {
//         const reqdata = await fetch("http://localhost:3005/answer");
//         const resdata = await reqdata.json();
//         setViewList(resdata);
//         console.log(resdata);
//       };
//       useEffect(() => {
//         getData();
//       }, []);
//   return (
//     <div>
//          <p>Hellloolsdjbcbswicf</p>
        
//       {viewList.map((val)=>(
//         <div key={val.id}>
//             {/* {console.log(val.id)} */}
//         <p>{val.id}</p>       
//         <p>{val.question}</p>
//         <p>{val.answer}</p>
//         <p>{val.bookmark}</p>
//         <p>{val.vote}</p>
//         <p>{val.disable}</p>
//         <p>{val.date_time}</p>
        
//         </div>
        
//       ))

//       }
//     </div>
//   )
// }

// export default Display
