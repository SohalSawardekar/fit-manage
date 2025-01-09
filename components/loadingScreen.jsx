import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const loadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5", 
      }}
    >
      <CircularProgress size={60} color="primary" />
    </Box>
  )
}

export default loadingScreen
