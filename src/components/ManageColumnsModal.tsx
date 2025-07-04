import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  DialogActions,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { setVisibleColumns } from "../store/tableSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

const allPossibleColumns = ["name", "email", "age", "role", "department", "location"];

const ManageColumnsModal: React.FC<Props> = ({ open, onClose }) => {
  const visibleColumns = useSelector((state: RootState) => state.table.visibleColumns);
  const dispatch = useDispatch();

  const handleCheckboxChange = (column: string) => {
    const updated = visibleColumns.includes(column)
      ? visibleColumns.filter((col) => col !== column)
      : [...visibleColumns, column];

    dispatch(setVisibleColumns(updated));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {allPossibleColumns.map((col) => (
            <FormControlLabel
              key={col}
              control={
                <Checkbox
                  checked={visibleColumns.includes(col)}
                  onChange={() => handleCheckboxChange(col)}
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
