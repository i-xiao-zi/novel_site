import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';
import { type TypedUseSelectorHook, useDispatch as defaultUseDispath, useSelector as defaultUseSelector } from "react-redux";
import search from "./search";
import player from "./player";
import book from "./book";

const store = configureStore({
  reducer: combineReducers({
    search,
    player,
    book,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = defaultUseDispath;
export const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;
export const persistor = persistStore(store);
