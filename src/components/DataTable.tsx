import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import type { GridRowModel, GridEventListener } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data, visibleColumns } = useSelector((state: RootState) => state.table);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRows, setEditRows] = useState<{ [id: string]: GridRowModel }>({});

  const columns = visibleColumns.map((col) => ({
    field: col,
    headerName: col.charAt(0).toUpperCase() + col.slice(1),
    flex: 1,
    editable: true,
  }));

  const filteredRows = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      visibleColumns.some((col) =>
        String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, visibleColumns]);

  const displayedRows = filteredRows.map((row) =>
    editRows[row.id] ? { ...row, ...editRows[row.id] } : row
  );

  const handleCellEditStop: GridEventListener<"cellEditStop"> = (params) => {
    if (!params) return;
    const { id, field, value } = params;
    if (!id || !field) return;

    setEditRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveAll = () => {
    
    for (const rowEdits of Object.values(editRows)) {
      if ("age" in rowEdits && isNaN(Number(rowEdits.age))) {
        alert("Age must be a valid number.");
        return;
      }
    }

    const newData = data.map((row) =>
      editRows[row.id] ? { ...row, ...editRows[row.id] } : row
    );

    dispatch({ type: "table/setData", payload: newData });
    setEditRows({});
    alert("Changes saved!");
  };

  const handleCancelAll = () => {
    setEditRows({});
    alert("All edits canceled.");
  };

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleSaveAll}
          disabled={Object.keys(editRows).length === 0}
        >
          Save All
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleCancelAll}
          disabled={Object.keys(editRows).length === 0}
        >
          Cancel All
        </Button>
      </Box>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={displayedRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          onCellEditStop={handleCellEditStop}
        />
      </div>
    </Box>
  );
};

export default DataTable;
