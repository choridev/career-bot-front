import { configureStore } from "@reduxjs/toolkit";
import questions from "../slices/questions";

const store = configureStore({
  reducer: {
    questions,
  },
});

export default store;
