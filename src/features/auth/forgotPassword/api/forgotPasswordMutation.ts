import { gql } from "@apollo/client";

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation ForgotPassword($auth: ForgotPasswordInput!) {
        forgotPassword(auth: $auth)
    }
`;

export interface ForgotPasswordInput {
    email: string;
}

export interface ForgotPasswordVariables {
    auth: ForgotPasswordInput;
}

