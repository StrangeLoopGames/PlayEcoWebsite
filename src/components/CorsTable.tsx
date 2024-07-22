import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
} from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useMemo, useState } from 'react';
import { components as types } from '../types/api'
import { splitCamelCaseAndCapitalize } from '../utils/stringUtils';

import '../assets/table.scss';
import { EditModal } from './admin/EditModal';

type User = types["schemas"]["StrangeUser"];
interface Props {
    users: User[];
    selectedKey: string | null
    toggleModalEvent: (toggleModalEvent: void) => void | null;
    updateUserEvent: (updatedUser: User) => void;
    changePageEvent: (pageNumber: number) => void;
}
function generateColumns(data) {
    // Get keys from the first data object  
    const keys = Object.keys(data[0]);
    // Map keys to array of objects with required structure
    const arrayOfObjects: User[] = keys.map(key => ({
        id: key,
        accessorFn: row => `${row[key]}`, // Accessor function to get value by key
        header: () => <span>{splitCamelCaseAndCapitalize(key)}</span>, // Header cell
        cell: (info) => <span>{formatCell(key, info.getValue(), info)}</span>, // Data cell
    }));

    return arrayOfObjects;
}
const subTableColumns = ['achievements', 'items', 'icons'];
const copyButton = ['id'];
const booleanIcons: { true: JSX.Element, false: JSX.Element } = {
    true: <FontAwesomeIcon className="table-icon true" icon={faSquareCheck} />,
    false: <FontAwesomeIcon className="table-icon false" icon={faSquareXmark} />,
};
export function formatCell(key: string, cell: any, info: any) {
    if (subTableColumns.includes(key)) {
        return <button className={`${cell != "null" ? "enabled" : "disabled"}`}>View {key}</button>;
    } else if (copyButton.includes(key)) {
        return <button className={cell.index} onClick={() => { navigator.clipboard.writeText(cell) }}>Copy {key}</button>
    }
    else {
        return cell === "true" || cell === "false" ? booleanIcons[cell] : cell;
    }
}
export default function CorsTable({ users, selectedKey, toggleModalEvent, updateUserEvent, changePageEvent }: Props) {
    // Columns and data are defined in a stable reference, will not cause infinite loop!
    //const [data, setData] = useState(users)
    const [sorting, setSorting] = useState<SortingState>([])
    const [selectedUser, setSelectedUser] = useState<{ cell: string, user: User } | null>(null);
    const [toggleModal, setToggleModal] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 100, //default page size
    });
    const data = (selectedKey == null) ? users : users[selectedKey];

    const columns = generateColumns(data);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            //...
            pagination,
            sorting,
        },
    })

    useEffect(() => {
        const handleKeyDown = (event: { key: string; }) => {
            if (event.key === 'Escape' && toggleModal) {
                setToggleModal(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleModal]);
    function selectUser(user: User, cell: any) {
        return () => {
            if (user[cell].length > 0) {
                setSelectedUser({ cell: cell, user: user });
                setToggleModal(true);
            }
        }
    }
    function toggleEditModal() {
        setToggleModal(!toggleModal);
    }
    return (
        <div className="p-2 table-container">
            {
                sorting.length > 0 ? (
                    <div className="sorting">
                        <h5>Table is currently sorted by: <span className="fw-bold">{sorting[0].id}</span> in <span className="fw-bold">{sorting[0].desc ? 'descending' : 'ascending '} </span> order</h5>
                    </div>
                ) : null
            }
            <TablePagnation table={table} />
            <div className="table-container">
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} colSpan={header.colSpan} onClick={header.column.getToggleSortingHandler()}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? `cursor-pointer select-none`
                                                        : ''
                                                }
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                                ? 'Sort descending'
                                                                : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: <FontAwesomeIcon icon={faCaretUp} />,
                                                    desc: <FontAwesomeIcon icon={faCaretDown} />,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className={row.index}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className={cell.id} onDoubleClick={selectUser(row.original, cell.column.id)}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TablePagnation table={table} />
            {
                selectedUser != null && toggleModal == true ? (
                    <EditModal type="user" message="Edit User" data={selectedUser} toggleModalEvent={toggleEditModal} updateUserEvent={updateUserEvent} />
                ) : null
            }
        </div>
    );
}

function TablePagnation(props: any) {
    const { table } = props;
    return (
        <div className="flex items-center gap-2">
            <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                {'<<'}
            </button>
            <button
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                {'<'}
            </button>
            <button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                {'>'}
            </button>
            <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                {'>>'}
            </button>
            <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </strong>
            </span>
            <span className="flex items-center gap-1">
                | Go to page:
                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}
                    className="border p-1 rounded w-16"
                />
            </span>
            <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                    table.changePageEvent(Number(e.target.value));
                }}
            >
                {[5, 10, 20, 30, 40, 50, 100, 150, 200].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    )
}