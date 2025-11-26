import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import {
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Language as LanguageIcon,
    Description as DescriptionIcon,
} from "@mui/icons-material";
import { useActiveNavItem } from "../../lib/useActiveNavItem";
import styles from "./NavList.module.css";

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

interface NavListProps {
    isCollapsed: boolean;
}

export const NavList = ({ isCollapsed }: NavListProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { isActive } = useActiveNavItem();

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
    );
};

