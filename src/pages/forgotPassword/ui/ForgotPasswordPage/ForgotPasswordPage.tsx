import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ForgotPasswordForm } from "@features/auth/forgotPassword";

export const ForgotPasswordPage = () => {
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
                Forgot Password
            </Typography>
            <Typography component="p" variant="body1">
                We will send you an email with further instructions
            </Typography>
            <ForgotPasswordForm />
        </Stack>
    );
};

