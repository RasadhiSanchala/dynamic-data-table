import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ManageColumnsModal from "./ManageColumnsModal";
import ExportCSV from "./ExportCSV";


const DataTable: React.FC = () => {
    const { data, visibleColumns } = useSelector((state: RootState) => state.table);
    const [searchTerm, setSearchTerm] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const columns = visibleColumns.map((col) => ({
        field: col,
        headerName: col.charAt(0).toUpperCase() + col.slice(1),
        flex: 1,
        editable: false,
    }));

    // Filter rows based on search term
    const filteredRows = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((row) =>
            visibleColumns.some((col) =>
                String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, data, visibleColumns]);

    return (
        <Box>
            <Button
                variant="outlined"
                onClick={() => setOpenModal(true)}
                sx={{ mb: 2 }}
            >
                Manage Columns
            </Button>
  <ExportCSV />
            <ManageColumnsModal open={openModal} onClose={() => setOpenModal(false)} />
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </div>


        </Box>
    );
};

export default DataTable;
