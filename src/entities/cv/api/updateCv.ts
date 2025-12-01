import { gql } from "@apollo/client";

export const UPDATE_CV = gql`
    mutation UpdateCv($cv: UpdateCvInput!) {
        updateCv(cv: $cv) {
            id
            name
            education
            description
        }
    }
`;

export interface UpdateCvResponse {
    updateCv: {
        id: string;
        name: string;
        education: string;
        description: string;
    };
}

export interface UpdateCvVariables {
    cv: {
        cvId: string;
        name: string;
        education: string;
        description: string;
    };
}

