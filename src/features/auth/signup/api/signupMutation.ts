import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
    mutation Signup($email: String!, $password: String!) {
        signup(auth: { email: $email, password: $password }) {
            access_token
            refresh_token
            user {
                id
                email
                role
            }
        }
    }
`;

