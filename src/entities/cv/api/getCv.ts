import { gql } from "@apollo/client";

export const GET_CV = gql`
    query Cv($cvId: ID!) {
        cv(cvId: $cvId) {
            id
            name
            education
            description
            user {
                id
                position_name
                profile {
                    full_name
                }
            }
            languages {
                name
                proficiency
            }
            projects {
                id
                name
                start_date
                end_date
                description
                environment
                roles
                responsibilities
                domain
                project {
                    id
                }
            }
            skills {
                name
                categoryId
                mastery
            }
        }
    }
`;

export interface CvUserProfile {
    full_name: string | null;
}

export interface CvUser {
    id: string;
    position_name: string | null;
    profile: CvUserProfile;
}

export interface CvLanguage {
    name: string;
    proficiency: string;
}

export interface CvProject {
    id: string;
    name: string;
    start_date: string;
    end_date: string | null;
    description: string;
    environment: string[];
    roles: string[];
    responsibilities: string[];
    domain: string;
    project: {
        id: string;
    };
}

export interface CvSkill {
    name: string;
    categoryId: string | null;
    mastery: string;
}

export interface Cv {
    id: string;
    name: string;
    education: string;
    description: string;
    user: CvUser | null;
    languages: CvLanguage[];
    projects: CvProject[];
    skills: CvSkill[];
}

export interface CvResponse {
    cv: Cv;
}

export interface CvVariables {
    cvId: string;
}

