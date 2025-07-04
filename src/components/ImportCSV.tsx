import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../store/tableSlice";
import { Button } from "@mui/material";
import type { ParseResult } from "papaparse";
import type { TableRow } from "../types";
import Papa from "papaparse";

const requiredColumns = ["id", "name", "email", "age", "role"];

const ImportCSV: React.FC = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results: ParseResult<TableRow>) => {
                const parsedData = results.data as TableRow[];


                const columns = results.meta.fields;
                if (!columns || !requiredColumns.every((col) => columns.includes(col))) {
                    alert(
                        `Invalid CSV format. Required columns: ${requiredColumns.join(", ")}`
                    );
                    return;
                }


                dispatch(setData(parsedData));
                alert("CSV imported successfully!");
            },
            error: (error: Error) => {
                alert("Failed to parse CSV: " + error.message);
            },
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <>
            <input
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={() => fileInputRef.current?.click()}
                sx={{ ml: 2 }}
            >
                Import CSV
            </Button>
        </>
    );
};

export default ImportCSV;
