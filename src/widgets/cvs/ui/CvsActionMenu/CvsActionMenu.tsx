import { useState, MouseEvent } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import type { CvListItem } from "@entities/cv";

interface CvsActionMenuProps {
    cv: CvListItem;
    onDelete: (cv: CvListItem) => void;
}

export const CvsActionMenu = ({ cv, onDelete }: CvsActionMenuProps) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDetails = () => {
        navigate(`/cvs/${cv.id}/details`);
        handleMenuClose();
    };

    const handleDelete = () => {
        onDelete(cv);
        handleMenuClose();
    };

    return (
        <>
            <Button
                sx={{
                    textTransform: "none",
                    fontWeight: "400",
                    fontSize: "1rem",
                    minWidth: "auto",
                    padding: "4px",
                }}
                onClick={handleMenuOpen}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDetails}>Details</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

