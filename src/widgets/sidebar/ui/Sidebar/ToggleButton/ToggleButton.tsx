import { IconButton } from "@mui/material";
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import styles from "./ToggleButton.module.css";

interface ToggleButtonProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export const ToggleButton = ({ isCollapsed, onToggle }: ToggleButtonProps) => {
    return (
        <div
            className={`${styles.toggleBox} ${isCollapsed ? styles.toggleBoxCollapsed : ""}`}
        >
            <IconButton onClick={onToggle} size="small" className={styles.iconButton}>
                {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        </div>
    );
};

