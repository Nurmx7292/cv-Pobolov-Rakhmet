import { useState } from "react";
import {
    Box,
    Divider,
    Avatar,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { NavList } from "./NavList/NavList";
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

            <Box
                className={`${styles.profileBox} ${
                    isCollapsed ? styles.profileBoxCollapsed : ""
                }`}
            >
                <Avatar
                    className={`${styles.avatar} ${isCollapsed ? styles.avatarCollapsed : ""}`}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                    }}
                >
                    T
                </Avatar>
                {!isCollapsed && (
                    <Box className={styles.emailBox}>
                        <Typography
                            variant="body2"
                            className={styles.emailText}
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                        >
                            testacc5@gmail.com
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box
                className={`${styles.toggleBox} ${isCollapsed ? styles.toggleBoxCollapsed : ""}`}
            >
                <IconButton
                    onClick={handleToggle}
                    size="small"
                    className={styles.iconButton}
                >
                    {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>
        </Box>
    );
};

