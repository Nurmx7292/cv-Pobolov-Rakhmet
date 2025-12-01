import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "@features/auth/resetPassword";

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        return (
            <Stack
                direction="column"
                sx={{
                    height: "100vh",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                spacing={3}
            >
                <Typography component="h1" variant="h4" color="error">
                    Invalid or expired token
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack
            direction="column"
            sx={{
                height: "100vh",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            spacing={3}
        >
            <Typography component="h1" variant="h4">
                Reset Password
            </Typography>
            <Typography component="p" variant="body1">
                Enter your new password
            </Typography>
            <ResetPasswordForm token={token} />
        </Stack>
    );
};

