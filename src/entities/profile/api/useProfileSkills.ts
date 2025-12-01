import { useQuery } from "@apollo/client/react";
import {
    GET_PROFILE_SKILLS,
    type ProfileSkillsResponse,
    type ProfileSkillsVariables,
} from "./getProfileSkills";

export const useProfileSkills = (userId?: string) => {
    return useQuery<ProfileSkillsResponse, ProfileSkillsVariables>(GET_PROFILE_SKILLS, {
        variables: { userId: userId ?? "" },
        skip: !userId,
    });
};


