import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($user: UpdateUserInput!) {
  updateUser(user: $user) {
    id
    department {
      id
      name
    }
    department_name
    position_name
  }
}
`;
