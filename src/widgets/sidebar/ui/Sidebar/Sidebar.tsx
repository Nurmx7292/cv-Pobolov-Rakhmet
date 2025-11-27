import { useState } from "react";
import { Box, Divider, useTheme } from "@mui/material";
import { NavList } from "./NavList/NavList";
import { ToggleButton } from "./ToggleButton/ToggleButton";
import { UserProfile } from "./UserProfile/UserProfile";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <Box
            className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}
            sx={{
                backgroundColor: theme.palette.background.paper,
                borderRight: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box className={styles.contentBox}>
                <NavList isCollapsed={isCollapsed} />
            </Box>

            <Divider />

            <UserProfile isCollapsed={isCollapsed} />

            <ToggleButton isCollapsed={isCollapsed} onToggle={handleToggle} />
        </Box>
    );
};

