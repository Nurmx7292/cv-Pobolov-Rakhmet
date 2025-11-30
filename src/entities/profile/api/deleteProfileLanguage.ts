import { gql } from "@apollo/client";

export const DELETE_PROFILE_LANGUAGE = gql`
    mutation DeleteProfileLanguage($userId: ID!, $name: [String!]!) {
        deleteProfileLanguage(language: { userId: $userId, name: $name }) {
            id
            full_name
            languages {
                name
                proficiency
            }
        }
    }
`;

export interface DeleteProfileLanguageResponse {
    deleteProfileLanguage: {
        id: string;
        full_name: string | null;
        languages: {
            name: string;
            proficiency: string;
        }[];
    };
}

export interface DeleteProfileLanguageVariables {
    userId: string;
    name: string[];
}

