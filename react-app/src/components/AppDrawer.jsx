import {
    Box,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
} from "@mui/material";

import {
    Home as HomeIcon,
    Person as ProfileIcon,
    PersonAdd as RegisterIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";
import { green } from "@mui/material/colors";

export default function AppDrawer() {
    const { showDrawer, setShowDrawer, auth, setAuth } = useApp();
    const navigate = useNavigate();

    const toggleDrawer = newOpen => () => {
        setShowDrawer(newOpen);
    };

    const DrawerList = (
        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <Box
                sx={{
                    height: 200,
                    padding: 2,
                    display: "flex",
                    alignItems: "flex-end",
                }}
            >
                {auth && (
                    <>
                        <Avatar
                            sx={{
                                height: 128,
                                width: 128,
                                background: green[500],
                            }}
                        >
                            {auth.name[0]}
                        </Avatar>
                    </>
                )}
            </Box>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            {auth && (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/Profile")}>
                            <ListItemIcon>
                                <ProfileIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                setAuth(null);
                                localStorage.removeItem("token");
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            )}

            {!auth && (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/Register")}>
                            <ListItemIcon>
                                <RegisterIcon />
                            </ListItemIcon>
                            <ListItemText primary="Register" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/Login")}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
                </List>
            )}
        </Box>
    );

    return (
        <div>
            <Drawer open={showDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
