import { gql } from "@apollo/client";

export const DELETE_CV = gql`
    mutation DeleteCv($cv: DeleteCvInput!) {
        deleteCv(cv: $cv) {
            affected
        }
    }
`;

export interface DeleteCvResponse {
    deleteCv: {
        affected: number;
    };
}

export interface DeleteCvVariables {
    cv: {
        cvId: string;
    };
}

