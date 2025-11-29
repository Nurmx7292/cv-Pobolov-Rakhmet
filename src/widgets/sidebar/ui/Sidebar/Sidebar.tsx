import { useState } from "react";
import { Drawer, Divider, useTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import { NavList } from "./NavList/NavList";
import { ToggleButton } from "./ToggleButton/ToggleButton";
import { UserProfileNav } from "./UserProfile/UserProfileNav.tsx";
import styles from "./Sidebar.module.css";

const expandedWidth = 200;
const collapsedWidth = 56;

const mapWidthStyles = (expanded: boolean, theme: Theme) => ({
    width: expanded ? expandedWidth : collapsedWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: expanded
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.leavingScreen,
    }),
});

export const Sidebar = () => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(true);
    const isCollapsed = !isExpanded;

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={isExpanded}
            className={styles.drawer}
            sx={{
                ...mapWidthStyles(isExpanded, theme),
                "& .MuiDrawer-paper": {
                    ...mapWidthStyles(isExpanded, theme),
                    borderRight: "none",
                    backgroundColor: theme.palette.background.default,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    position: "sticky",
                    height: "100vh",
                    top: 0,
                },
            }}
        >
            <div className={styles.inner}>
                <div className={styles.navSection}>
                    <NavList isCollapsed={isCollapsed} />
                </div>
                <div className={styles.footer}>
                    <Divider />
                    <UserProfileNav isCollapsed={isCollapsed} />
                </div>
            </div>
            <ToggleButton isCollapsed={isCollapsed} onChange={setIsExpanded} />
        </Drawer>
    );
};

