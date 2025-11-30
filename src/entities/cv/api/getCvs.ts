import { gql } from "@apollo/client";

export const GET_CVS = gql`
    query Cvs {
        cvs {
            id
            name
            education
            description
            user {
                email
            }
        }
    }
`;

export interface CvUser {
    email: string;
}

export interface CvListItem {
    id: string;
    name: string;
    education: string;
    description: string;
    user: CvUser | null;
}

export interface CvsResponse {
    cvs: CvListItem[];
}

