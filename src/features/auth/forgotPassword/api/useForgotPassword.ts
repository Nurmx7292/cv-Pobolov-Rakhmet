import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD_MUTATION, type ForgotPasswordVariables } from "./forgotPasswordMutation";

export const useForgotPassword = () => {
    return useMutation<void, ForgotPasswordVariables>(FORGOT_PASSWORD_MUTATION);
};

