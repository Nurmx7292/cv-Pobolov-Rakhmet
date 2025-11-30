import { gql } from "@apollo/client";

export const CREATE_CV = gql`
    mutation CreateCv($cv: CreateCvInput!) {
        createCv(cv: $cv) {
            id
            name
        }
    }
`;

export interface CreateCvResponse {
    createCv: {
        id: string;
        name: string;
    };
}

export interface CreateCvVariables {
    cv: {
        userId: string;
        name: string;
        education: string;
        description: string;
    };
}

