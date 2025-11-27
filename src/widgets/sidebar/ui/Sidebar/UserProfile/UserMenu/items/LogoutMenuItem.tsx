import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "@shared/lib/tokenStorage";

export const LogoutMenuItem = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        tokenStorage.clearTokens();
        navigate("/login");
    };

    return <MenuItem onClick={handleClick}>Logout</MenuItem>;
};

