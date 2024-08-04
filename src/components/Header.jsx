import React from "react";
import { Box } from "@mui/material";

function Header() {
    return (
    <Box  className="App-header" position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <span>RDV</span>
    </Box>
    )
}


export default Header;