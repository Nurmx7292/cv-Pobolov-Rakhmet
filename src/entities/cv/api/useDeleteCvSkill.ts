import { useMutation } from "@apollo/client/react";
import {
    DELETE_CV_SKILL,
    type DeleteCvSkillResponse,
    type DeleteCvSkillVariables,
} from "./deleteCvSkill.ts";

export const useDeleteCvSkill = () => {
    return useMutation<DeleteCvSkillResponse, DeleteCvSkillVariables>(
        DELETE_CV_SKILL,
    );
};

