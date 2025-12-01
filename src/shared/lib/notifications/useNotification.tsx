import { useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type NotificationSeverity = "success" | "error" | "warning" | "info";

interface NotificationState {
    open: boolean;
    message: string;
    severity: NotificationSeverity;
}

export const useNotification = () => {
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: "",
        severity: "info",
    });

    const showNotification = useCallback(
        (message: string, severity: NotificationSeverity = "info") => {
            setNotification({
                open: true,
                message,
                severity,
            });
        },
        [],
    );

    const handleClose = useCallback(() => {
        setNotification((prev) => ({ ...prev, open: false }));
    }, []);

    const NotificationComponent = () => (
        <Snackbar
            open={notification.open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert
                onClose={handleClose}
                severity={notification.severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );

    return {
        showNotification,
        NotificationComponent,
    };
};

