import { useState, useEffect } from "react";
import { useForm, type RegisterOptions } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { FormField } from "@shared/ui/form/FormField";
import { useResetPassword } from "../../api/useResetPassword";

interface FormData {
    password: string;
}

const passwordRules: RegisterOptions<FormData> = {
    required: "Password is required",
    minLength: {
        value: 6,
        message: "Password must contain at least 6 characters",
    },
};

interface ResetPasswordFormProps {
    token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [resetPassword, { loading, error }] = useResetPassword();
    const { handleSubmit, control, formState } = useForm<FormData>({
        mode: "onSubmit",
    });

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message || "Unknown error occurred");
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate("/auth/login");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    const onSubmit = async (formData: FormData) => {
        setErrorMessage("");
        try {
            await resetPassword({
                variables: {
                    auth: {
                        newPassword: formData.password,
                    },
                },
                context: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });
            setIsSuccess(true);
        } catch (err) {
            const errorMsg = err && typeof err === "object" && "message" in err 
                ? String(err.message) 
                : "Unknown error occurred";
            setErrorMessage(errorMsg);
        }
    };

    if (isSuccess) {
        return (
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    width: "100%",
                    maxWidth: "560px",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 2,
                }}
            >
                <Typography component="p" variant="body1" color="success.main">
                    Password has been reset successfully!
                </Typography>
                <Typography component="p" variant="body2" color="text.secondary">
                    Redirecting to login page...
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack
            component="form"
            direction="column"
            spacing={2}
            sx={{
                width: "100%",
                maxWidth: "560px",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 2,
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            <FormField
                control={control}
                name="password"
                label="Enter new password"
                type="password"
                rules={passwordRules}
                formState={formState}
                showPasswordIcon
            />
            <Stack
                direction="column"
                rowGap={1}
                sx={{
                    paddingTop: 5,
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ width: "220px" }}
                >
                    {loading ? "Loading..." : "Submit"}
                </Button>
                <Button
                    component={Link}
                    to="/auth/login"
                    variant="text"
                    color="secondary"
                    sx={{ width: "220px" }}
                >
                    Back to login
                </Button>
            </Stack>
        </Stack>
    );
};

