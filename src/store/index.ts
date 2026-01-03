import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';
import { type TypedUseSelectorHook, useDispatch as defaultUseDispath, useSelector as defaultUseSelector } from "react-redux";
import sse from "./sse";

const store = configureStore({
  reducer: combineReducers({
    sse,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = defaultUseDispath;
export const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;
export const persistor = persistStore(store);
