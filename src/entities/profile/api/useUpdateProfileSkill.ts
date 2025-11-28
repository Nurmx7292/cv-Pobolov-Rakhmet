import { useMutation } from "@apollo/client";
import {
    UPDATE_PROFILE_SKILL,
    type UpdateProfileSkillResponse,
    type UpdateProfileSkillVariables,
} from "./updateProfileSkill";

export const useUpdateProfileSkill = () => {
    return useMutation<UpdateProfileSkillResponse, UpdateProfileSkillVariables>(UPDATE_PROFILE_SKILL);
};

