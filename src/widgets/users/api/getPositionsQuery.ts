import { gql } from "@apollo/client";

export const GET_POSITIONS_QUERY = gql`
query GetPositions {
  positions {
    id
    name
  }
}
`;