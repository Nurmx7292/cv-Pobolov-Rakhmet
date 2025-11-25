import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query GetUsers {
        users {
            id
            email
            role
            department_name
            position_name
            profile {
                first_name
                last_name
            }
        }
    }
`;

