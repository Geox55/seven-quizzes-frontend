import { createSlice } from "@reduxjs/toolkit";

export type ModalOpenStateType = {
  openModal: boolean;
}

const initialState: ModalOpenStateType = {
  openModal: false
};

export const modalOpen = createSlice({
  name: "modalOpen",
  initialState,
  reducers: {
    UPDATE_MODAL: (state, action) => {
      console.log(state.openModal);
      state.openModal = action.payload;
    }
  }
});

export const { UPDATE_MODAL } = modalOpen.actions;
export default modalOpen.reducer;
