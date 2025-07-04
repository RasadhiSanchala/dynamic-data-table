import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DataTable from "./components/DataTable";
import { useDispatch } from "react-redux";
import { setData } from "./store/tableSlice";
import type { TableRow } from "./types";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const sampleData: TableRow[] = [
      { id: "1", name: "Alice", email: "alice@example.com", age: 25, role: "Admin" },
      { id: "2", name: "Bob", email: "bob@example.com", age: 30, role: "Editor" },
      { id: "3", name: "Charlie", email: "charlie@example.com", age: 22, role: "Viewer" },
    ];
    dispatch(setData(sampleData));
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Data Table Manager
      </Typography>
      <DataTable />
    </Container>
  );
};

export default App;
