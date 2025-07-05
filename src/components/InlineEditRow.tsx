import React, { useState } from "react";
import type { TableRow } from "../types";
import { Box, TextField, Button } from "@mui/material";

interface InlineEditRowProps {
  row: TableRow;
  columns: string[];
  onSave: (updatedRow: TableRow) => void;
  onCancel: () => void;
}

const InlineEditRow: React.FC<InlineEditRowProps> = ({ row, columns, onSave, onCancel }) => {
  const [editedRow, setEditedRow] = useState<TableRow>({ ...row });

  const handleChange = (field: string, value: string) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: field === "age" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (isNaN(Number(editedRow.age))) {
      alert("Age must be a valid number");
      return;
    }
    onSave(editedRow);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2} flexWrap="wrap">
      {columns.map((col) => (
        <TextField
          key={col}
          label={col.charAt(0).toUpperCase() + col.slice(1)}
          value={editedRow[col] ?? ""}
          onChange={(e) => handleChange(col, e.target.value)}
          size="small"
          type={col === "age" ? "number" : "text"}
          sx={{ minWidth: 120 }}
        />
      ))}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" color="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default InlineEditRow;
