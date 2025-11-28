import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import {
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Language as LanguageIcon,
    Description as DescriptionIcon,
} from "@mui/icons-material";
import { useActiveNavItem } from "@widgets/sidebar/lib/useActiveNavItem";
import styles from "./NavList.module.css";

interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
}

interface NavListProps {
    isCollapsed: boolean;
}

const activeBackground = (theme: Theme) =>
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";

const hoverBackground = (theme: Theme) =>
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";

const getCurrentUserId = () => {
    if (typeof window === "undefined") {
        return null;
    }
    return window.localStorage.getItem("currentUserId");
};

export const NavList = ({ isCollapsed }: NavListProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { isActive } = useActiveNavItem();
    const currentUserId = getCurrentUserId();

    const navItems: NavItem[] = [
        { to: "/", label: "Employees", icon: <PeopleIcon /> },
        {
            to: currentUserId ? `/users/${currentUserId}/skills` : "/skills",
            label: "Skills",
            icon: <BarChartIcon />,
        },
        { to: "/languages", label: "Languages", icon: <LanguageIcon /> },
        { to: "/cvs", label: "CVs", icon: <DescriptionIcon /> },
    ];

    return (
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
                            }`}
                            sx={{
                                borderRadius: isCollapsed ? "50%" : "0 200px 200px 0",
                                padding: isCollapsed ? "0.75rem" : "0.75rem 1rem",
                                height: "3.5rem",
                                gap: "1rem",
                                opacity: active ? 1 : 0.6,
                                "& .MuiListItemIcon-root": {
                                    minWidth: isCollapsed ? "auto" : "1.5rem",
                                },
                                "&.Mui-selected": {
                                    backgroundColor: activeBackground(theme),
                                    "&:hover": {
                                        backgroundColor: activeBackground(theme),
                                    },
                                },
                                "&:hover": {
                                    backgroundColor: hoverBackground(theme),
                                },
                            }}
                        >
                            <ListItemIcon
                                className={styles.listItemIcon}
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
                                    className={styles.listItemText}
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
    );
};

