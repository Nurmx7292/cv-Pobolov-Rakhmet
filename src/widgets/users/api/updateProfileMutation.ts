import { gql } from "@apollo/client";

export const UPDATE_PROFILE_MUTATION = gql`
mutation UpdateProfile($profile: UpdateProfileInput!) {
  updateProfile(profile: $profile) {
    id
    first_name
    last_name
  }
}

`;
