import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./instituteSlice";

const store = configureStore({
  reducer: {
    institutes: instituteReducer,
  },
});

export default store;
