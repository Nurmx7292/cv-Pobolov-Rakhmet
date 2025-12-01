import { Menu, Divider } from "@mui/material";
import { ProfileMenuItem } from "./items/ProfileMenuItem";
import { SettingsMenuItem } from "./items/SettingsMenuItem";
import { LogoutMenuItem } from "./items/LogoutMenuItem";

interface UserMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
}

export const UserMenu = ({ anchorEl, open, onClose }: UserMenuProps) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <ProfileMenuItem onClose={onClose} />
            <SettingsMenuItem onClose={onClose} />
            <Divider />
            <LogoutMenuItem />
        </Menu>
    );
};

