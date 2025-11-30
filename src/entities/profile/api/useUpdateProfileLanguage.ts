import { useMutation } from "@apollo/client/react";
import {
    UPDATE_PROFILE_LANGUAGE,
    type UpdateProfileLanguageResponse,
    type UpdateProfileLanguageVariables,
} from "./updateProfileLanguage.ts";

export const useUpdateProfileLanguage = () => {
    return useMutation<UpdateProfileLanguageResponse, UpdateProfileLanguageVariables>(
        UPDATE_PROFILE_LANGUAGE,
    );
};

