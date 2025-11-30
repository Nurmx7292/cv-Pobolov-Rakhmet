import { useQuery } from "@apollo/client/react";
import {
    GET_PROFILE_LANGUAGES,
    type ProfileLanguagesResponse,
    type ProfileLanguagesVariables,
} from "./getProfileLanguages.ts";

export const useProfileLanguages = (userId: string | undefined) => {
    return useQuery<ProfileLanguagesResponse, ProfileLanguagesVariables>(
        GET_PROFILE_LANGUAGES,
        {
            variables: { userId: userId! },
            skip: !userId,
        },
    );
};

