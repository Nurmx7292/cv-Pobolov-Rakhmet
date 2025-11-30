import { useState, MouseEvent } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { CvListItem } from "@entities/cv";

interface CvsActionMenuProps {
    cv: CvListItem;
    onEdit: (cv: CvListItem) => void;
    onDelete: (cv: CvListItem) => void;
}

export const CvsActionMenu = ({ cv, onEdit, onDelete }: CvsActionMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        onEdit(cv);
        handleMenuClose();
    };

    const handleDelete = () => {
        onDelete(cv);
        handleMenuClose();
    };

    return (
        <>
            <IconButton
                size="small"
                onClick={handleMenuOpen}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

