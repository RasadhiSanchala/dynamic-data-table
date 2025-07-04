import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const App: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Data Table Manager
      </Typography>
     
     
    </Container>
  );
};

export default App;