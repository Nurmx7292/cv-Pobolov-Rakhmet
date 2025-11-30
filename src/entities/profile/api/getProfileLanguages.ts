import { gql } from "@apollo/client";

export const GET_PROFILE_LANGUAGES = gql`
    query ProfileLanguages($userId: ID!) {
        profile(userId: $userId) {
            id
            full_name
            languages {
                name
                proficiency
            }
        }
    }
`;

export interface LanguageProficiency {
    name: string;
    proficiency: string;
}

export interface ProfileLanguagesResponse {
    profile: {
        id: string;
        full_name: string | null;
        languages: LanguageProficiency[];
    };
}

export interface ProfileLanguagesVariables {
    userId: string;
}

