import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProfileMenuItemProps {
    onClose: () => void;
}

export const ProfileMenuItem = ({ onClose }: ProfileMenuItemProps) => {
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('currentUserId');
    const handleClick = () => {
        navigate(`/users/${currentUserId}`);
        onClose();
    };

    return <MenuItem onClick={handleClick}>Profile</MenuItem>;
};

