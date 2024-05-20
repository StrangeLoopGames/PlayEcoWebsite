import { useState } from "react";
import { Modal } from "../Modal";
import CorsTable from "../CorsTable";
import { useFetchUsers, userUpdateUserById } from "../../utils/api";
import { components as types } from '../../types/api'
import { AuthenticatedUser } from "../../utils/authentication";
type User = types["schemas"]["StrangeUser"];

export function UserEditor() {
    const [userTable, setUserTable] = useState([]);
    const userJWT = AuthenticatedUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const { data: users, error, isLoading, refetch } = useFetchUsers(1, 10, userJWT as string);
    // add userse to usertable if array is empty
    if (users && userTable.length == 0 && users) {
        setUserTable(users);
    }
    async function updateUserEvent(updatedUser: User) {
        const updatedUsers = users.map((user: User) => {
            if (updatedUser != null && user.id === updatedUser.id) {
                return updatedUser;
            }
            return user;
        });
        console.table(updatedUsers);
        setUserTable(updatedUsers);
        userUpdateUserById(userJWT as string, updatedUser).then((res) => {
            console.log(res);
            setIsUpdating(true);
            refetch();
        }
        ).catch((error) => {
            console.error('Error:', error);
        });
    }
    
    return (

        <>
            <h2 className="title-medium-white account-feature-title">User Editor</h2>
            <div className="table-wrap">
                {
                    userTable.length > 0 ? (
                        <CorsTable users={userTable} selectedKey={null} toggleModalEvent={null} updateUserEvent={updateUserEvent} />
                    ) : null
                }
            </div>
            {
                isLoading ? (
                    <Modal type="Loading" message="Fetching Users from the database." data={undefined} />
                ) :
                isUpdating ? (
                    <Modal type="Loading" message="Updating User in the database." data={undefined} />
                ) :
                error ? (
                    <Modal type="Error" message="There was an error." data={undefined} />
                ) : null
            }
        </>
    );
}