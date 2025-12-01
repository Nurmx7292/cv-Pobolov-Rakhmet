import { gql } from "@apollo/client";

export const ADD_PROFILE_LANGUAGE = gql`
    mutation AddProfileLanguage($userId: ID!, $name: String!, $proficiency: Proficiency!) {
        addProfileLanguage(language: { userId: $userId, name: $name, proficiency: $proficiency }) {
            id
            full_name
            languages {
                name
                proficiency
            }
        }
    }
`;

export interface AddProfileLanguageResponse {
    addProfileLanguage: {
        id: string;
        full_name: string | null;
        languages: {
            name: string;
            proficiency: string;
        }[];
    };
}

export interface AddProfileLanguageVariables {
    userId: string;
    name: string;
    proficiency: string;
}

