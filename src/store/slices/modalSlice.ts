import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivosObjType, InstrumentObjType } from "../../types/types";

interface ModalState {
  visible: boolean;
  visiblePortfolio: boolean;
  content: InstrumentObjType | null;
}

const initialState: ModalState = {
  visible: false,
  visiblePortfolio: false,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<InstrumentObjType>) => {
      state.visible = true;
      state.content = action.payload;
    },
    hideModal: (state) => {
      state.visible = false;
      state.visiblePortfolio = false;
      state.content = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
