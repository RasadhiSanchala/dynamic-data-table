import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { DataGrid } from "@mui/x-data-grid";

const DataTable: React.FC = () => {
    const { data, visibleColumns } = useSelector((state: RootState) => state.table);

  
    const columns = visibleColumns.map((col) => ({
        field: col,
        headerName: col.charAt(0).toUpperCase() + col.slice(1),
        flex: 1,
        editable: false, 
    }));

    return (
        <div style={{ height: 500, width: "100%" }}>
            <DataGrid
                rows={data}
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
    );
};

export default DataTable;
