import { UserCard, useUsersQuery } from "@entities/user";

export const UserList = () => {
    const { data, loading, error } = useUsersQuery();

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Failed to load users: {error.message}</p>;

    const users = data.users.map(user=>{
        return {
            id: user.id,
            email: user.email ? user.email : "",
            role: user.role,
            department_name: user.department_name,
            position_name: user.position_name,
            first_name: user.profile.first_name ? user.profile.first_name : "",
            last_name: user.profile.last_name ? user.profile.last_name : "",
            avatar: user.profile.avatar
        }
    });

    return (
        <div>
            <h2>Users</h2>
            <div>
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};
