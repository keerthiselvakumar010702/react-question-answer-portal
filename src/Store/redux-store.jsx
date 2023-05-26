import { createStore } from "redux";

const initialState = {
  email: null,
  password: null,
  accesstoken: null,
};
const reducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    console.log("login");
    const { email, password, accesstoken } = action.payload;
    return { ...state, email, password, accesstoken };
  }
  else{
    return state;
  }
};
const store = createStore(reducer);
export default store;
