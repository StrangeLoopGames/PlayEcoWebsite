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
type User = types["schemas"]["StrangeUser"];
type MarketplaceTransaction = types["schemas"]["MarketplaceTransaction"];

function TransactionsCard({user}:{user: User}) {
    //const [data, setData] = useState(() => transactions);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })
    const userId = user.id;
    const { data, error, isLoading } = useGetUserTransactions(userId as string);
    
    const columns = useMemo<ColumnDef<MarketplaceTransaction>[]>(
        () => [
            {
                accessorKey: 'timeCompleted',
                header: () => <span>Date of Transaction</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'displayName',
                header: () => <span>Item Name</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'worldPurchasedOn',
                header: () => <span>World Purchased</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'quantity',
                header: () => <span>Item Quantity</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'spentTotal',
                header: () => <span>Spent Total</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'id',
                header: () => <span>Transaction ID</span>,
                cell: info => info.getValue(),
            },
    
        ],
        []
    );

    return (
        <div className="account-feature">
            <h2 className="title-medium-white account-feature-title">Transactions</h2>
            <div className="account-feature-description">
                Below is a summary of your recent transactions. If you have any questions or concerns, please contact us at
            </div>
            {
                isLoading ? (
                    <div className="text-left">Loading...</div>
                ) : error ? (
                    <div className="text-left text-danger">An error occurred</div>
                ) :
                data.length === 0 ? (
                    <div className="text-left py-2">You have no recent transactions</div>
                ) : 
                data.length > 0 ? (
                    <TransactionTable columns={columns} data={data} pagination={pagination} setPagination={setPagination} />
                ) : null
            }
        </div>
    )

}
function TransactionTable ({ columns, data, pagination, setPagination }) {
    const table = useReactTable({
        columns,
        data,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            pagination,
        },
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