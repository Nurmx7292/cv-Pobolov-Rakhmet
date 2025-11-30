import { useMutation } from "@apollo/client/react";
import {
    ADD_PROFILE_LANGUAGE,
    type AddProfileLanguageResponse,
    type AddProfileLanguageVariables,
} from "./addProfileLanguage.ts";

export const useAddProfileLanguage = () => {
    return useMutation<AddProfileLanguageResponse, AddProfileLanguageVariables>(
        ADD_PROFILE_LANGUAGE,
    );
};

