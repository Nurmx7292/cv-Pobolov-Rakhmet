import { useMutation } from "@apollo/client/react";
import {
    DELETE_PROFILE_LANGUAGE,
    type DeleteProfileLanguageResponse,
    type DeleteProfileLanguageVariables,
} from "./deleteProfileLanguage.ts";

export const useDeleteProfileLanguage = () => {
    return useMutation<DeleteProfileLanguageResponse, DeleteProfileLanguageVariables>(
        DELETE_PROFILE_LANGUAGE,
    );
};

