import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import userReducer from "./slices/user/userSlice";

const reducer = () =>
  combineReducers({
    user: userReducer,
  });

const store = configureStore({
  reducer: reducer(),
  middleware: [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  ],
});

export default store;