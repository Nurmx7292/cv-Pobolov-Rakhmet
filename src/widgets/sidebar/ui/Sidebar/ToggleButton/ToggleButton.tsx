import { IconButton } from "@mui/material";
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import type { Dispatch, SetStateAction } from "react";
import styles from "./ToggleButton.module.css";

interface ToggleButtonProps {
    isCollapsed: boolean;
    onChange: Dispatch<SetStateAction<boolean>>;
}

export const ToggleButton = ({ isCollapsed, onChange }: ToggleButtonProps) => {
    return (
        <IconButton
            className={styles.btn}
            size="small"
            onClick={() => onChange((prev) => !prev)}
            sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                "&:hover": {
                    backgroundColor: theme.palette.background.default,
                },
            })}
        >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
    );
};

