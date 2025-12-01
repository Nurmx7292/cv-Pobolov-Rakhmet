import { useMutation } from "@apollo/client/react";
import { RESET_PASSWORD_MUTATION, type ResetPasswordVariables } from "./resetPasswordMutation";

export const useResetPassword = () => {
    return useMutation<void, ResetPasswordVariables>(RESET_PASSWORD_MUTATION);
};

