import { useGetUserTransactions } from "../../utils/api";
import { components as types } from '../../types/api';
import {
    Column,
    ColumnDef,
    PaginationState,
    Table,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthenticatedUser } from "../../utils/authentication";
type User = types["schemas"]["StrangeUser"];
type UserNotifications = types["schemas"]["UserNotification"];

function TransactionsCard({user}:{user: User}) {
    const [clearing, setClearing] = useState<boolean>(false);
    const columns = useMemo<ColumnDef<UserNotifications>[]>(
        () => [
            {
                accessorKey: 'time',
                header: () => <span>Date</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'message',
                header: () => <span>Information</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'amount',
                header: () => <span>Amount</span>,
                cell: info => info.getValue(),
            },
    
        ],
        []
    );
    async function clearNotificationsMutate () {
        const url = `${import.meta.env.VITE_CLOUD_API_URL}UserAccount/ClearNotifications`;
        setClearing(true);
        const response = fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthenticatedUser()}`,
                },
            }
        );

        if (!(await response).ok) {
            throw new Error('Network response was not ok');
        }
        setClearing(false);
    }

    return (
        <div className="account-feature">
            <h2 className="title-medium-white account-feature-title">Notifications</h2>
            <div className="account-feature-description">
                Below is a summary of notifications. If you have any questions or concerns, please <a href="mailto:support@strangeloopgames.com">contact us</a>.
            </div>
            <div className="btn-corner">
                <button onClick={clearNotificationsMutate} className="btn btn-small">{ clearing ? "Clearing" : "Clear Nofications"}</button>
                </div>
            <div className="transactions-wrap">
                <div className="transaction-body">
                {
                user.notifications == null ? (
                    <div className="text-left py-2">You have no notifications</div>
                ) : 
                user.notifications != null && user.notifications.length > 0 ? (
                    <TransactionTable columns={columns} data={user.notifications} />
                ) : null
            }
                </div>
            </div>
        </div>
    )

}
function TransactionTable ({ columns, data}) {
    const table = useReactTable({
        columns,
        data,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(), 
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    })
    return (
        <table className="table table-striped table-bordered w-100 table-sm">
        <thead className="table-secondary">
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                        return (
                            <th key={header.id} colSpan={header.colSpan}>
                                <div
                                    {...{
                                        className: header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : '',
                                        onClick: header.column.getToggleSortingHandler(),
                                    }}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {{
                                        asc: ' 🔼',
                                        desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
                                </div>
                            </th>
                        )
                    })}
                </tr>
            ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map(row => {
                return (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => {
                            return (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    </table>
    )
}
export default TransactionsCard