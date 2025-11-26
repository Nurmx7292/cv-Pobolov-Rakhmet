import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import {
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Language as LanguageIcon,
    Description as DescriptionIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import styles from "./Sidebar.module.css";

interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { to: "/", label: "Employees", icon: <PeopleIcon /> },
    { to: "/skills", label: "Skills", icon: <BarChartIcon /> },
    { to: "/languages", label: "Languages", icon: <LanguageIcon /> },
    { to: "/cvs", label: "CVs", icon: <DescriptionIcon /> },
];

export const Sidebar = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

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
                <List className={styles.list}>
                    {navItems.map((item) => {
                        const active = isActive(item.to);
                        return (
                            <ListItem key={item.to} disablePadding className={styles.listItem}>
                                <ListItemButton
                                    onClick={() => navigate(item.to)}
                                    selected={active}
                                    className={`${styles.listItemButton} ${
                                        isCollapsed ? styles.listItemButtonCollapsed : ""
                                    } ${active ? styles.listItemButtonActive : ""}`}
                                >
                                    <ListItemIcon
                                        className={`${styles.listItemIcon} ${
                                            isCollapsed ? styles.listItemIconCollapsed : ""
                                        }`}
                                        sx={{
                                            color: active
                                                ? theme.palette.primary.main
                                                : theme.palette.text.secondary,
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {!isCollapsed && (
                                        <ListItemText
                                            primary={item.label}
                                            className={`${styles.listItemText} ${
                                                active ? styles.listItemTextActive : ""
                                            }`}
                                            sx={{
                                                color: active
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.primary,
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
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

