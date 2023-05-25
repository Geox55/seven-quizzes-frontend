import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { game } from "../reducers/gameReducer";
import { modalOpen } from "../reducers/modalReducer";
import { room } from "../reducers/roomReducer";
import { roomsApi } from "../serviceApi/roomsApi";
import { ruleApi } from "../serviceApi/ruleApi";
import { questionsApi } from "../serviceApi/questionApi";
import { authReducer } from "../reducers/authReducer";
import { authApi } from "../serviceApi/authApi";

export const store = configureStore({
  reducer: {
    authReducer: authReducer.reducer,
    game: game.reducer,
    modalOpen: modalOpen.reducer,
    room: room.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [ruleApi.reducerPath]: ruleApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(roomsApi.middleware)
    .concat(ruleApi.middleware)
    .concat(questionsApi.middleware)
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>
