import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TableRow } from "../types";

interface TableState {
  data: TableRow[];
  visibleColumns: string[];
  allColumns: string[]; // ADD THIS LINE
}

const initialState: TableState = {
  data: [],
  visibleColumns: ["id","name", "email", "age", "role"],
  allColumns: ["id","name", "email", "age", "role"], // ADD THIS LINE
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
    addColumn: (state, action: PayloadAction<string>) => {
      state.allColumns.push(action.payload);
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
  addColumn,
  addRow,
  updateRow,
  deleteRow,
} = tableSlice.actions;

export default tableSlice.reducer;
