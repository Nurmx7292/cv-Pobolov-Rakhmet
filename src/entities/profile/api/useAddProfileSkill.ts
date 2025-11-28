import { useMutation } from "@apollo/client";
import { ADD_PROFILE_SKILL, type AddProfileSkillResponse, type AddProfileSkillVariables } from "./addProfileSkill";

export const useAddProfileSkill = () => {
    return useMutation<AddProfileSkillResponse, AddProfileSkillVariables>(ADD_PROFILE_SKILL);
};

