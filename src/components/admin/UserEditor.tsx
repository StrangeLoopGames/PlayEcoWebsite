import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import CorsTable from "../CorsTable";
import { useFetchCrud, crudUpdateById, useSearchCrud, putNewCrud } from "../../utils/api";
import { AuthenticatedUser, useIsUserAdmin } from "../../utils/authentication";
import { splitCamelCaseAndCapitalize } from "../../utils/stringUtils";
import { components as types } from '../../types/api';
import { Link } from "@tanstack/react-router";
import { SortingState } from "@tanstack/react-table";
import ModalWrapper from "../ModalWrapper";

type User = types["schemas"]["StrangeUser"];

const menuItems = {
    "User Editor": 'UserAccount',
    "World Editor": 'Worlds',
    "Transaction Editor": 'Transactions',
    "Flags Editor": 'Flags',
    "Flag Report": 'FlagReports',
    "Mods Report": 'Mods',
};

export function UserEditor() {
    const isAdmin = useIsUserAdmin(AuthenticatedUser() as string);
    if (!AuthenticatedUser() && !isAdmin) {
        location.href = '/login?error=authenication_error';
    }
    const userJWT = AuthenticatedUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [crudType, setCrudType] = useState("UserAccount");
    const [search, setSearch] = useState<string | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [crudAction, setCrudAction] = useState<string | null>(null);

    const { data: users, error, isLoading, refetch } = useFetchCrud(crudType, pageNumber, pageSize, userJWT as string);
    const { data: userSearch, error: searchError, isLoading: searchIsLoading, refetch: searchRefetch } = useSearchCrud(
        crudType,
        search || "",
        pageNumber,
        pageSize,
        userJWT as string,
        {
            enabled: !!search,
        },
        sorting && sorting[0]?.id ? sorting[0].id : "",
        sorting && sorting[0]?.desc !== undefined ? sorting[0].desc : true
    );
    const [userTable, setUserTable] = useState<User[]>([]);

    useEffect(() => {
        if (search && search !== "") {
            if (userSearch) {
                setUserTable(userSearch);
            }
        } else {
            setUserTable(users || []);
        }
    }, [users, userSearch, search, sorting]);

    const updateUserEvent = async (updatedUser: User, property: string) => {
        setIsUpdating(true);
        try {
            await crudUpdateById(crudType, userJWT as string, property, updatedUser);
            refetch();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsUpdating(false);
        }
    };
    const handleSortingChange = (newSorting: SortingState) => {
        setSorting(newSorting);
        console.log('Sorting changed to:', newSorting);
    };
    const handleSearch = () => {
        const searchString = (document.querySelector('.search-input') as HTMLInputElement).value;
        setSearch(searchString);
        if (searchString) {
            searchRefetch();
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const toggleModal = (setState: React.Dispatch<React.SetStateAction<any>>) => {
        setState(null);
    };
    const handleCrudTypeChange = (newCrudType: string) => {
        setCrudType(newCrudType);
        setPageNumber(1); // Reset page number when crudType changes
        setSearch(null);  // Reset search when crudType changes
        refetch();        // Refetch data for the new CRUD type
    };

    const addNewMod = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const mod: types["schemas"]["StrangeMod"] = {
            owner: form.owner.value,
            name: form.name.value,
            displayName: form.displayName.value,
            description: form.description.value,
            percentCut: Number(form.percentCut.value),
            totalTransactionsCollected: 0,
            totalCreditsCollectedForOwner: 0,
        };
        setIsUpdating(true);       
        putNewCrud("Mods", userJWT as string, mod);
        refetch();
        setIsUpdating(false);
        toggleModal(setCrudAction);
    }

    useEffect(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
            searchInput.addEventListener('keypress', handleKeyPress);
        }
        return () => {
            if (searchInput) {
                searchInput.removeEventListener('keypress', handleKeyPress);
            }
        };
    }, []);

    useEffect(() => {
        // When `search` changes to null, we should ensure userTable is reset
        if (search === null) {
            setUserTable(users || []);
        }
    }, [search, users]);

    return (
        <>
            <Link className="accounts-back btn btn-small" to="/account" title="Go Back">Go Back</Link>
            <h2 className="title-medium-white account-feature-title">
                {splitCamelCaseAndCapitalize(crudType)} Editor
            </h2>
            <div className="d-flex flex-row">
                {Object.entries(menuItems).map(([label, type]) => (
                    <button
                        key={type}
                        onClick={() => handleCrudTypeChange(type)}
                        className={`mx-1 admin-menu btn btn-small ${crudType === type ? 'active' : ''}`}
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
                    <input className="search-input" name="search" type="text" placeholder="ENTER SEARCH HERE" />
                    <button className="button" onClick={handleSearch}>Lookup</button>
                </div>
                {
                    crudType === "Mods" ? (
                    <div className="crud-actions d-flex flex-row justify-content-center">
                        <button className="btn btn-small" onClick={ () => setCrudAction("add")}>Add New Mod</button>
                    </div>
                    ) : null
                }
                <div className="results-info">
                    {search && (
                        <p>Search results for: {search}</p>
                    )}
                </div>
                <CorsTable
                    users={userTable}
                    selectedKey={null}
                    toggleModalEvent={null}
                    updateUserEvent={updateUserEvent}
                    changePageEvent={setPageSize}
                    sortingEvent={handleSortingChange}
                />
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
            {
                (crudAction != null) ? (
                    <ModalWrapper toggleModal={()=> toggleModal(setCrudAction)} dismissable={true}>
                        <div className="d-flex flex-column w-100">
                            <h2>Add a new {splitCamelCaseAndCapitalize(crudType)} record</h2>
                            <form onSubmit={addNewMod} className="crud-add py-3 m-0 w-100 gap-3">
                            <label className="d-flex flex-column" htmlFor="owner">
                                Owner
                            <input className="d-flex flex-column" type="text" name="owner" id="onwer" />
                            </label>
                            <label className="d-flex flex-column" htmlFor="name">
                                Name
                            <input type="text" name="name" id="name" />
                            </label>
                            <label className="d-flex flex-column" htmlFor="displayName">
                                Display Name
                            <input type="text" name="displayName" id="displayName" />
                            </label>
                            <label className="d-flex flex-column" htmlFor="description">
                                Description
                                <textarea name="description" id="description"></textarea>
                            </label>
                            <label className="d-flex flex-column" htmlFor="percentCut">
                                Percent Cut
                            <input type="number" name="percentCut" id="percentCut" />
                            </label>
                            <div className="btn-wrap d-flex flex-row justify-content-between w-100 gap-2 py-2">
                            <button className="btn btn-small bg-danger text-white" onClick={() => setCrudAction(null)}>Cancel</button>
                            <button className="btn btn-small bg-success text-white" type="submit">Submit</button>
                            </div>
                            </form>
                        </div>
                    </ModalWrapper>
                ) : null

            }
        </>
    );
}
