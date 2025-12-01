import { gql } from "@apollo/client";

export const DELETE_AVATAR_MUTATION = gql`
mutation DeleteAvatar($userId: ID!) {
  deleteAvatar(
    avatar: {
      userId: $userId
    }
  )
}

`;
