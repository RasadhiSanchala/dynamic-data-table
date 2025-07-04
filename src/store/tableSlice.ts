import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TableRow } from "../types";

interface TableState {
  data: TableRow[];
  visibleColumns: string[];
}

const initialState: TableState = {
  data: [],
  visibleColumns: ["name", "email", "age", "role"],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableRow[]>) => {
      state.data = action.payload;
    },
    setVisibleColumns: (state, action: PayloadAction<string[]>) => {
      state.visibleColumns = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const index = state.data.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(row => row.id !== action.payload);
    },
  },
});

export const {
  setData,
  setVisibleColumns,
  addRow,
  updateRow,
  deleteRow,
} = tableSlice.actions;

export default tableSlice.reducer;
