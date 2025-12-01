import { gql } from "@apollo/client";

export const GET_USER_BY_ID_QUERY = gql`
query GetUserById($id: ID!) {
  user(userId: $id) {
    id
    email
    created_at
    is_verified
    role
    department_name
    position_name

    profile {
      first_name
      last_name
      avatar
    }
    
  }
}
`;