import { gql } from "@apollo/client";

export const UPDATE_PROFILE_LANGUAGE = gql`
    mutation UpdateProfileLanguage($userId: ID!, $name: String!, $proficiency: Proficiency!) {
        updateProfileLanguage(language: { userId: $userId, name: $name, proficiency: $proficiency }) {
            id
            full_name
            languages {
                name
                proficiency
            }
        }
    }
`;

export interface UpdateProfileLanguageResponse {
    updateProfileLanguage: {
        id: string;
        full_name: string | null;
        languages: {
            name: string;
            proficiency: string;
        }[];
    };
}

export interface UpdateProfileLanguageVariables {
    userId: string;
    name: string;
    proficiency: string;
}

