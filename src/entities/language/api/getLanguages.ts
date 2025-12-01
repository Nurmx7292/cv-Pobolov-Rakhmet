import { gql } from "@apollo/client";

export const GET_LANGUAGES = gql`
    query Languages {
        languages {
            id
            created_at
            iso2
            name
            native_name
        }
    }
`;

export interface Language {
    id: string;
    created_at: string;
    iso2: string;
    name: string;
    native_name: string | null;
}

export interface LanguagesResponse {
    languages: Language[];
}

