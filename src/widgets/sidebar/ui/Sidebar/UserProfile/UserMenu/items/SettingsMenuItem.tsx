import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SettingsMenuItemProps {
    onClose: () => void;
}

export const SettingsMenuItem = ({ onClose }: SettingsMenuItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/settings");
        onClose();
    };

    return <MenuItem onClick={handleClick}>Settings</MenuItem>;
};

