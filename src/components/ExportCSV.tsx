import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";

const ExportCSV: React.FC = () => {
  const { data, visibleColumns } = useSelector((state: RootState) => state.table);

  const exportToCSV = () => {
    const header = visibleColumns.join(",");
    const rows = data.map((row) =>
      visibleColumns.map((col) => `"${row[col] ?? ""}"`).join(",")
    );
    const csvContent = [header, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "table_data.csv");
  };

  return (
    <Button variant="contained" color="primary" onClick={exportToCSV} sx={{ ml: 2 }}>
      Export CSV
    </Button>
  );
};

export default ExportCSV;
