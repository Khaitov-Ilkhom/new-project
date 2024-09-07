import { configureStore } from "@reduxjs/toolkit";
import { reducer as likedReducer } from "@/app/redux/slice/likeSlice";

const store = configureStore({
  reducer: {
    like: likedReducer,
  },
});

export default store;
