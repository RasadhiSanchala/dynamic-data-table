import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TableRow } from "../types";
import { nanoid } from "@reduxjs/toolkit";

interface TableState {
  data: TableRow[];
  visibleColumns: string[];
  allColumns: string[];
}

const initialState: TableState = {
  data: [],
  visibleColumns: ["id", "name", "email", "age", "role"],
  allColumns: ["id", "name", "email", "age", "role"],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableRow[]>) => {
      // Enforce string id and uniqueness
      const seen = new Set<string>();
      state.data = action.payload.map((row) => {
        let id = (row.id ?? "").toString().trim();
        if (!id || seen.has(id)) {
          id = nanoid();
        }
        seen.add(id);
        return { ...row, id };
      });
    },
    setVisibleColumns: (state, action: PayloadAction<string[]>) => {
      // Always keep "id" in visible columns
      state.visibleColumns = Array.from(new Set(["id", ...action.payload]));
    },
    addColumn: (state, action: PayloadAction<string>) => {
      if (!state.allColumns.includes(action.payload)) {
        state.allColumns.push(action.payload);
      }
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      let id = (action.payload.id ?? "").toString().trim();
      if (!id || state.data.some((row) => row.id === id)) {
        id = nanoid();
      }
      state.data.push({ ...action.payload, id });
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const id = (action.payload.id ?? "").toString().trim();
      const index = state.data.findIndex((row) => row.id === id);
      if (index !== -1) {
        state.data[index] = { ...action.payload, id };
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