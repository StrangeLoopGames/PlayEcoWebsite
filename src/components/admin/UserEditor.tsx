import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import CorsTable from "../CorsTable";
import { useFetchCrud, crudUpdateById, useSearchCrud } from "../../utils/api";
import { AuthenticatedUser } from "../../utils/authentication";
import { splitCamelCaseAndCapitalize } from "../../utils/stringUtils";
import { components as types } from '../../types/api';
import { Link } from "@tanstack/react-router";
import { generateInputTypes } from "../../utils/table";
type User = types["schemas"]["StrangeUser"];

const menuItems = {
    "User Editor": 'UserAccount',
    "World Editor": 'Worlds',
    "Transaction Editor": 'Transactions',
    "Flags Editor": 'Flags',
};

export function UserEditor() {
    const userJWT = AuthenticatedUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [crudType, setCrudType] = useState("UserAccount");
    const [search, setSearch] = useState<string | null>(null);

    const { data: users, error, isLoading, refetch } = useFetchCrud(crudType, pageNumber, pageSize, userJWT as string);
    const { data: userSearch, error: searchError, isLoading: searchIsLoading } = useSearchCrud(crudType, pageNumber, pageSize, search as string);

    const [userTable, setUserTable] = useState<User[]>([]);

    useEffect(() => {
        if (search && search !== "") {
            if (userSearch) {
                setUserTable(userSearch);
            }
        } else {
            setUserTable(users || []);
        }
    }, [users, userSearch, search]);

    const updateUserEvent = async (updatedUser: User) => {
        const updatedUsers = users?.map((user: User) =>
            user.id === updatedUser.id ? updatedUser : user
        ) || [];

        setUserTable(updatedUsers);
        setIsUpdating(true);

        try {
            const res = await crudUpdateById(crudType, userJWT as string, updatedUser);
            console.log(res);
            refetch();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSearch = () => {
        const searchString = (document.querySelector('.search-input') as HTMLInputElement).value;
        setSearch(searchString);
    };

    const searchReset = () => {
        setSearch(null);
    };

    const handleCrudTypeChange = (newCrudType: string) => {
        setCrudType(newCrudType);
        setPageNumber(1); // Reset page number when crudType changes
    };

    return (
        <>
        <Link className="accounts-back btn btn-small" to="/account">Go Back</Link>
            <h2 className="title-medium-white account-feature-title">
                {splitCamelCaseAndCapitalize(crudType)} Editor
            </h2>
            <div className="d-flex flex-row">
                {Object.entries(menuItems).map(([label, type]) => (
                    <button
                        key={type}
                        onClick={() => handleCrudTypeChange(type)}
                        className={`mx-1 ${crudType === type ? 'active' : ''}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="table-wrap">
            <div className="instructions">
                <details>
                    <summary className="fs-6 p-2">Instructions</summary>
                    <p className="fs-6 m-0">Double click on a cell to edit it</p>
                    <p className="fs-6 m-0">Click on the column header to sort by that column</p>
                    <p className="fs-6 m-0">Use the search bar to filter the results</p>
                    <p className="fs-6 m-0">To change data types click on the buttons above</p>
                </details>
                </div>
                <div className="user-search">
                    <input className="search-input" name="search" type="text" placeholder="Search the database" />
                    <button className="button" onClick={handleSearch}>Search</button>
                    <button className="button reset" onClick={searchReset}>Reset</button>
                </div>
                <div className="results-info">
                {search && ( 
                        <p>Search results for: {search}</p>
                    )}
                </div>
                {userTable.length > 0 && (
                    <CorsTable
                        users={userTable}
                        selectedKey={null}
                        toggleModalEvent={null}
                        updateUserEvent={updateUserEvent}
                        changePageEvent={setPageSize}
                    />
                )}
            </div>
            {(isLoading || searchIsLoading) && (
                <Modal type="Loading" message="Fetching Users from the database." data={undefined} />
            )}
            {isUpdating && (
                <Modal type="Loading" message="Updating User in the database." data={undefined} />
            )}
            {(error || searchError) && (
                <Modal type="Error" message="There was an error, please try again" data={undefined} />
            )}
        </>
    );
}
