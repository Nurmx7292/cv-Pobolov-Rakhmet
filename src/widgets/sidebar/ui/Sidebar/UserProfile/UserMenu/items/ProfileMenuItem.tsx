import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProfileMenuItemProps {
    onClose: () => void;
}

export const ProfileMenuItem = ({ onClose }: ProfileMenuItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/profile");
        onClose();
    };

    return <MenuItem onClick={handleClick}>Profile</MenuItem>;
};

