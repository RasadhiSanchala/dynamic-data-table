import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { setVisibleColumns, addColumn } from "../store/tableSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ManageColumnsModal: React.FC<Props> = ({ open, onClose }) => {
  // Must use Redux state, not static array!
  const allColumns = useSelector((state: RootState) => state.table.allColumns ?? []);
  const visibleColumns = useSelector((state: RootState) => state.table.visibleColumns ?? []);
  const dispatch = useDispatch();
  const [newCol, setNewCol] = useState("");

  const handleCheckboxChange = (column: string) => {
    let updated = visibleColumns.includes(column)
      ? visibleColumns.filter((col) => col !== column && col !== "id")
      : [...visibleColumns, column];
    dispatch(setVisibleColumns(updated));
  };

const handleAddColumn = () => {
  const col = newCol.trim();
  if (col && !allColumns.includes(col)) {
    dispatch(addColumn(col));
    // Make it visible immediately
    dispatch(setVisibleColumns([...visibleColumns, col]));
    setNewCol("");
  }
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <TextField
            label="Add new column"
            value={newCol}
            size="small"
            onChange={e => setNewCol(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAddColumn(); }}
            autoFocus
          />
          <Button variant="contained" onClick={handleAddColumn} disabled={!newCol.trim()}>
            Add
          </Button>
        </Stack>
        <FormGroup>
          {allColumns.map((col) => (
            <FormControlLabel
              key={col}
              control={
                <Checkbox
                  checked={visibleColumns.includes(col)}
                  onChange={() => handleCheckboxChange(col)}
                  disabled={col === "id"}
                />
              }
              label={col.charAt(0).toUpperCase() + col.slice(1)}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageColumnsModal;