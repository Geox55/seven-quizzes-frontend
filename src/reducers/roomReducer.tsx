import { createSlice } from "@reduxjs/toolkit";

export type RoomState = {
  currentRoom: string,
}

const initialState: RoomState = {
  currentRoom: ""
};

export const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    UPDATE_CURRENT_ROOM: (state, action) => {
      state.currentRoom = action.payload;
    },
    NEW_GAME_IN_NEW_ROOM: (state) => {
      state.currentRoom = "";
    }
  }
});

export const { UPDATE_CURRENT_ROOM, NEW_GAME_IN_NEW_ROOM } = room.actions;
export default room.reducer;
