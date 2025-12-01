import { useState, useEffect } from "react";
import { useForm, type RegisterOptions } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { FormField } from "@shared/ui/form/FormField";
import { useForgotPassword } from "../../api/useForgotPassword";

interface FormData {
    email: string;
}

const emailRules: RegisterOptions<FormData> = {
    required: "Email is required",
    pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email address",
    },
};

export const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSent, setIsSent] = useState(false);
    const [resetPassword, { loading, error }] = useForgotPassword();
    const { handleSubmit, control, formState } = useForm<FormData>({
        mode: "onSubmit",
    });

    useEffect(() => {
        if (isSent) {
            navigate("/auth/login");
        }
    }, [isSent, navigate]);

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message || "Unknown error occurred");
        }
    }, [error]);

    const onSubmit = async (formData: FormData) => {
        setErrorMessage("");
        try {
            await resetPassword({
                variables: {
                    auth: formData,
                },
            });
            setIsSent(true);
        } catch (err) {
            const errorMessage = err && typeof err === "object" && "message" in err 
                ? String(err.message) 
                : "Unknown error occurred";
            setErrorMessage(errorMessage);
        }
    };

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
                name="email"
                label="Email"
                rules={emailRules}
                formState={formState}
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
                    {loading ? "Loading..." : "Reset Password"}
                </Button>
                <Button
                    component={Link}
                    to="/auth/login"
                    variant="text"
                    color="secondary"
                    sx={{ width: "220px" }}
                >
                    Cancel
                </Button>
            </Stack>
        </Stack>
    );
};

