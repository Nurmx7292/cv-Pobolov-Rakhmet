import { useMutation } from "@apollo/client/react";
import {
    ADD_CV_SKILL,
    type AddCvSkillResponse,
    type AddCvSkillVariables,
} from "./addCvSkill.ts";

export const useAddCvSkill = () => {
    return useMutation<AddCvSkillResponse, AddCvSkillVariables>(
        ADD_CV_SKILL,
    );
};

