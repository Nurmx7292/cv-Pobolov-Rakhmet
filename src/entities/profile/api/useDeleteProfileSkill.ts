import { useMutation } from "@apollo/client/react";
import {
    DELETE_PROFILE_SKILL,
    type DeleteProfileSkillResponse,
    type DeleteProfileSkillVariables,
} from "./deleteProfileSkill";

export const useDeleteProfileSkill = () => {
    return useMutation<DeleteProfileSkillResponse, DeleteProfileSkillVariables>(DELETE_PROFILE_SKILL);
};

