import { UserCard, useUsersQuery } from "@entities/user";

export const UserList = () => {
    const { data, loading, error } = useUsersQuery();

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Failed to load users: {error.message}</p>;
    }

    return (
        <div>
            <h2>Users</h2>
           {/*<div> columns names  </div>*/}
           {/* <div>show info about logged in user</div>*/}
            <div>
                {data?.users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

