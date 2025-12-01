export interface UserProfile {
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
}

export interface User {
    id: string;
    email: string;
    role: string;
    department_name: string | null;
    position_name: string | null;
    profile: UserProfile | null;
}

