import { useState } from "react";
import { Controller, type Control, type FieldValues, type Path, type RegisterOptions, type FormState } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    rules?: RegisterOptions<T>;
    formState: FormState<T>;
    type?: string;
    showPasswordIcon?: boolean;
}

export const FormField = <T extends FieldValues>({
    control,
    name,
    label,
    rules,
    formState,
    type = "text",
    showPasswordIcon = false,
}: FormFieldProps<T>) => {
    const error = formState.errors[name];
    const errorMessage = error?.message as string | undefined;
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const displayType = isPasswordType && showPassword ? "text" : type;

    return (
        <FormControl fullWidth error={!!error}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={label}
                        variant="outlined"
                        type={displayType}
                        fullWidth
                        error={!!error}
                        sx={{
                            width: "100%",
                            maxWidth: "560px",
                        }}
                        InputProps={
                            isPasswordType && showPasswordIcon
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <IconButton onClick={togglePasswordVisibility} edge="end">
                                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                          </InputAdornment>
                                      ),
                                  }
                                : undefined
                        }
                    />
                )}
            />
            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

