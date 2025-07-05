import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import type { GridRowModel, GridEventListener } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ManageColumnsModal from "./ManageColumnsModal";
import InlineEditRow from "./InlineEditRow";
import ExportCSV from "./ExportCSV";
import ImportCSV from "./ImportCSV";
import type { TableRow } from "../types";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { data, visibleColumns } = useSelector((state: RootState) => state.table);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRows, setEditRows] = useState<{ [id: string]: GridRowModel }>({});
  const [selectedEditRow, setSelectedEditRow] = useState<TableRow | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Columns generated from visibleColumns with custom header and cell rendering
  const columns = visibleColumns.map((col) => ({
    field: col,
    headerName: col.charAt(0).toUpperCase() + col.slice(1),
    flex: 1,
    editable: true,
    renderCell: (params: any) => {
      const value = String(params.value ?? "");
      if (!searchTerm) return value;
      const lower = value.toLowerCase();
      const idx = lower.indexOf(searchTerm.toLowerCase());
      if (idx === -1) return value;
      return (
        <span>
          {value.substring(0, idx)}
          <span
            style={{
              background: theme.palette.mode === "dark" ? "#ffb300" : "#1976d2",
              color: theme.palette.mode === "dark" ? "#000" : "#fff",
              borderRadius: 3,
              padding: "0 2px",
              transition: "background 0.3s",
            }}
          >
            {value.substring(idx, idx + searchTerm.length)}
          </span>
          {value.substring(idx + searchTerm.length)}
        </span>
      );
    },
    headerClassName: "mui-gradient-header",
  }));

  // Filter data based on search term across visible columns
  const filteredRows = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      visibleColumns.some((col) =>
        String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, visibleColumns]);

  // Merge edited data in editRows with original rows for display
  const displayedRows = filteredRows.map((row) =>
    editRows[row.id] ? { ...row, ...editRows[row.id] } : row
  );

  // Handle inline cell edits for "Save All" batch editing
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

  // Save all inline edits after validation
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
    // Use a Snackbar or toast for better UX
  };

  // Cancel all inline edits
  const handleCancelAll = () => {
    setEditRows({});
    // Use a Snackbar or toast for better UX
  };

  // Open inline edit row for a specific row
  const handleRowEditClick = (row: TableRow) => {
    setSelectedEditRow(row);
  };

  // Save from InlineEditRow component
  const handleInlineSave = (updatedRow: TableRow) => {
    dispatch({ type: "table/updateRow", payload: updatedRow });
    setSelectedEditRow(null);
    // Use a Snackbar or toast for better UX
  };

  // Cancel inline row editing
  const handleInlineCancel = () => {
    setSelectedEditRow(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: theme.palette.mode === "dark" ? "#101922" : "#f7fafc",
        borderRadius: 3,
        boxShadow: 3,
        p: { xs: 1, md: 3 },
        minHeight: 600,
        transition: "background 0.3s",
      }}
    >
      {/* Top bar with stats and theme toggle */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2} sx={{ flexWrap: "wrap" }}>
        <TableViewIcon color="primary" />
        <Typography variant="h6" component="span" fontWeight="bold">
          {filteredRows.length} Rows
        </Typography>
        <Chip
          icon={<ViewColumnIcon />}
          label={`${visibleColumns.length} Visible Columns`}
          color="info"
          variant="outlined"
        />
        <Box flex={1} />
        {/* Theme toggle (for illustration, wire to app theme context in real app) */}
        <Tooltip title="Toggle light/dark mode">
          <Fab
            size="small"
            color="secondary"
            onClick={() => setDarkMode((prev) => !prev)}
            sx={{ ml: 2 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </Fab>
        </Tooltip>
        {/* Import/Export hint */}
        <Tooltip title="Import/Export CSV">
          <Fab color="primary" size="small" sx={{ ml: 2 }}>
            <ImportExportIcon />
          </Fab>
        </Tooltip>
      </Stack>

      {/* Search and Actions */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon color="primary" />,
            sx: { bgcolor: "#fff", borderRadius: 2 }
          }}
        />
        <Tooltip title="Manage columns">
          <Fab color="info" size="small" onClick={() => setOpenModal(true)}>
            <ViewColumnIcon />
          </Fab>
        </Tooltip>
        <ManageColumnsModal open={openModal} onClose={() => setOpenModal(false)} />

        <ExportCSV />
        <ImportCSV />

        <Tooltip title="Save all changes">
          <span>
            <Fab
              color="success"
              size="small"
              onClick={handleSaveAll}
              disabled={Object.keys(editRows).length === 0}
              sx={{ ml: 1 }}
            >
              <SaveIcon />
            </Fab>
          </span>
        </Tooltip>
        <Tooltip title="Cancel all edits">
          <span>
            <Fab
              color="error"
              size="small"
              onClick={handleCancelAll}
              disabled={Object.keys(editRows).length === 0}
              sx={{ ml: 1 }}
            >
              <CancelIcon />
            </Fab>
          </span>
        </Tooltip>
        <Tooltip title="Edit first row inline">
          <Fab
            color="primary"
            size="small"
            onClick={() => {
              if (displayedRows.length) handleRowEditClick(displayedRows[0]);
            }}
            sx={{ ml: 1 }}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* DataGrid with custom styles */}
      <Box
        sx={{
          height: { xs: 400, md: 500 },
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: 2,
          "& .mui-gradient-header": {
            background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.05rem",
            letterSpacing: 1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
          "& .MuiDataGrid-row:hover": {
            background: theme.palette.mode === "dark" ? "#1e2738" : "#e3f2fd",
            transition: "background 0.2s",
          },
          transition: "background 0.3s",
        }}
      >
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
          sx={{
            border: "none",
            fontFamily: "inherit",
            "& .MuiDataGrid-cell": {
              py: 1.2,
              fontSize: "1rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              minHeight: 52,
              maxHeight: 52,
            },
            "& .MuiDataGrid-virtualScroller": {
              background: "transparent",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              bgcolor: "#b3e5fc",
            },
            "& .MuiDataGrid-cell--editing": {
              bgcolor: "#fffde7",
              animation: "pulse 1s infinite alternate",
              "@keyframes pulse": {
                from: { boxShadow: "0 0 0 0 #ffeb3b77" },
                to: { boxShadow: "0 0 10px 2px #ffeb3b" },
              },
            },
          }}
        />
      </Box>

      {/* Animated inline edit slide-in */}
      <Slide direction="up" in={!!selectedEditRow} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: { xs: "98%", sm: 500 },
            zIndex: 1500,
            p: 2,
            borderRadius: 3,
            bgcolor: "#fff",
            boxShadow: 6,
            transition: "all 0.4s cubic-bezier(.5,-0.5,.3,1.5)",
          }}
        >
          <InlineEditRow
            row={selectedEditRow!}
            columns={visibleColumns}
            onSave={handleInlineSave}
            onCancel={handleInlineCancel}
          />
        </Paper>
      </Slide>
    </Box>
  );
};

export default DataTable;