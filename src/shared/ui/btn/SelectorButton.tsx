import { Button } from "@mui/material";
import type { ReactNode } from "react";

interface SelectorButtonProps {
    onClick: () => void;
    children: ReactNode;
    isSelected?: boolean;
}

export const SelectorButton = ({ onClick, children, isSelected = false }: SelectorButtonProps) => {
    return (
        <Button
            variant="text"
            onClick={onClick}
            fullWidth
            sx={{
                textTransform: "none",
                fontWeight: 400,
                justifyContent: "flex-start",
                fontSize: "1rem",
                color: isSelected ? "primary.main" : "text.primary",
                borderRadius: 2,
            }}
        >
            {children}
        </Button>
    );
};


