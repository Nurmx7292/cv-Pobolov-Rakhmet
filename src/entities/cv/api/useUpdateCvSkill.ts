import { useMutation } from "@apollo/client/react";
import {
    UPDATE_CV_SKILL,
    type UpdateCvSkillResponse,
    type UpdateCvSkillVariables,
} from "./updateCvSkill.ts";

export const useUpdateCvSkill = () => {
    return useMutation<UpdateCvSkillResponse, UpdateCvSkillVariables>(
        UPDATE_CV_SKILL,
    );
};

