import {gql} from "@apollo/client";

export const GET_DEPARTMENTS_QUERY = gql`
query GetDepartments {
  departments {
    id
    name
  }
}
`;