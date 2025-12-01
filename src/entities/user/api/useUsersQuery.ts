import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "./getUsers.ts";
import type { User } from "../model/types.ts";

interface UsersResponse {
    users: User[];
}

export const useUsersQuery = () => {
    return useQuery<UsersResponse>(GET_USERS);
};

