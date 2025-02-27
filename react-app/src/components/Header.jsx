import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";

import {
    ArrowBack as BackIcon,
    Add as AddIcon,
    Menu as MenuIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
    const { showForm, setShowForm, mode, setMode, setShowDrawer } = useApp();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {pathname == "/" ? (
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setShowDrawer(true);
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <BackIcon />
                        </IconButton>
                    )}

                    <Typography>App</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => {
                            setShowForm(!showForm);
                        }}
                    >
                        <AddIcon />
                    </IconButton>

                    {mode == "dark" ? (
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setMode("light");
                            }}
                        >
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setMode("dark");
                            }}
                        >
                            <DarkModeIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
