import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import CorsTable from "../CorsTable";
import { useFetchUsers, userUpdateUserById, useSearchUser } from "../../utils/api";
import { components as types } from '../../types/api'
import { AuthenticatedUser, removeToken } from "../../utils/authentication";
type User = types["schemas"]["StrangeUser"];

export function UserEditor() {
    const [userTable, setUserTable] = useState([]);
    const userJWT = AuthenticatedUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data: users, error, isLoading, refetch } = useFetchUsers(pageNumber, pageSize, userJWT as string);
    const [search, setSearch] = useState<string | null>(null);
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
    const handleSearch = () => {
        const searchString = (document.querySelector('.search-input') as HTMLInputElement).value;
        setSearch(searchString);
    };

    const { data: userSearch, error: searchError , isLoading: searchIsLoading } = useSearchUser(pageNumber, pageSize, search);

    useEffect(() => {
        if (search && search != null && search != "") {

            if (userSearch) {
                setUserTable(userSearch);
            }
        }
    }, [search, userSearch, searchError, searchIsLoading]);

    function searchReset() {
        setSearch(null);
        setUserTable(users);
    }
    return (

        <>
            <h2 className="title-medium-white account-feature-title">User Editor</h2>
            <div className="table-wrap">
                Search: {search}
                <div className="user-search">
                    <input className="search-input" name="search" type="text" placeholder="Search the database" />
                    <button className="button" onClick={handleSearch}>Search</button>
                    <button className="button reset" onClick={searchReset}>Reset</button>
                </div>
                {
                    userTable.length > 0 ? (
                        <CorsTable users={userTable} selectedKey={null} toggleModalEvent={null} updateUserEvent={updateUserEvent} />
                    ) : null
                }
            </div>
            {
                isLoading || searchIsLoading ? (
                    <Modal type="Loading" message="Fetching Users from the database." data={undefined} />
                ) :
                    isUpdating ? (
                        <Modal type="Loading" message="Updating User in the database." data={undefined} />
                    ) :
                        error || searchError ? (
                            <Modal type="Error" message={"There was an error, please try again"} data={undefined} />
                        ) : null
            }
        </>
    );
}