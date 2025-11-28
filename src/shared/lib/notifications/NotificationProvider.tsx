import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

type Severity = "success" | "info" | "warning" | "error";

interface NotificationContextValue {
    notify: (message: string, severity?: Severity) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<Severity>("success");

    const notify = useCallback((text: string, level: Severity = "success") => {
        setMessage(text);
        setSeverity(level);
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert severity={severity} onClose={handleClose} variant="filled" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within NotificationProvider");
    }
    return context.notify;
};


