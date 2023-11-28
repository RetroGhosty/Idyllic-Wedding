import { ITransaction } from '@/types'
import { Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import {parse, format} from 'date-fns'
import DangerButton from '../DangerButton'
import React from 'react'
import PrimaryButton from '../PrimaryButton'
const ReservationTable = ({transactions, tableHeight, className}: any) => {

    const refundTransaction = (transaction_id) => {
        router.post(route('admin.transaction.requestRefund', {transaction_id: transaction_id}))
    }

    const viewTransaction = (transaction_id:any ) => {
        console.log(transaction_id)
        router.get(route('admin.transaction.viewTransaction', transaction_id))
    }

    const columnHelper = createColumnHelper<ITransaction>()
    const [rowSelection, setRowSelection] = React.useState<any>({})
    const [sorting, setSorting] = React.useState<any>([])
    const [filtering, setFiltering] = React.useState<any>('')
    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: (info) => <div className='text-xs'>{info.getValue()}</div>,
        }),
        columnHelper.accessor('transaction_amount', {
            header: 'Total Price',
            cell: (info) => <div>P{info.getValue()}.00</div>,
        }),
        columnHelper.accessor('payment_method', {
            header: 'Payment Method',
            cell: (info) => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('start_date', {
            header: 'Start Date',
            cell: (info) => {return <div>{format(parse(info.getValue(), 'yyyy-MM-dd', new Date()), "MMM. dd, yyyy")}</div>}
        }),
        columnHelper.accessor('end_date', {
            header: 'End Date',
            cell: (info) => {return <div>{format(parse(info.getValue(), 'yyyy-MM-dd', new Date()), "MMM. dd, yyyy")}</div>}
        }),
        columnHelper.accessor('transaction_status', {
            header: 'Status',
            cell: (info) => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('status', {
            header: 'Actions',
            cell: (info) => 
            <PrimaryButton onClick={() => viewTransaction(info.row.original['id'])}>EDIT</PrimaryButton>
            // <DangerButton onClick={() => refundTransaction(info.row.original['id'])}>Refund</DangerButton>
        })
    ]

    const reactTable = useReactTable({
        data: transactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            rowSelection: rowSelection
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        
    })

    return (
        <div className={className}>
            <h1 className='text-[#e56b6f] text-lg font-bold mb-2'>Transactions</h1>
            <TableContainer w="100%" className='flex flex-col space-y-5 p-2'>
                <div className='w-full flex flex-col items-start'>
                    <Input type="text" value={filtering} placeholder='Search' onChange={(e) => setFiltering(e.target.value)} id='searchBar' className='w-full'/>
                </div>
                <div className={`min-h-[${tableHeight}]`}>
                    <Table variant='simple' size='sm'>
                        <Thead>
                            {reactTable.getHeaderGroups().map((headerGroup)=> (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th key={header.id} 
                                        onClick={header.column.getToggleSortingHandler()}
                                        cursor='pointer'
                                        >

                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody>
                        {reactTable.getRowModel().rows.map(row => (
                            <Tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <Td key={cell.id} >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </div>
                <div className='flex flex-row space-x-5'>
                <div className="flex flex-row items-center justify-between w-full">
                    <div className='flex flex-row space-x-6'>
                        <span className="flex items-center gap-1">
                        Go to page:
                        <input
                            type="number"
                            defaultValue={reactTable.getState().pagination.pageIndex + 1}
                            onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            reactTable.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-24"
                        />
                        </span>
                        <Select
                        value={reactTable.getState().pagination.pageSize}
                        onChange={e => {
                            reactTable.setPageSize(Number(e.target.value))
                        }}
                        >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                        </Select>
                        <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {reactTable.getState().pagination.pageIndex + 1} of{' '}
                            {reactTable.getPageCount()}
                        </strong>
                        </span>
                    </div>
                    <div className='flex flex-row space-x-4'>
                        <button
                        className="border rounded p-1"
                        onClick={() => reactTable.setPageIndex(0)}
                        disabled={!reactTable.getCanPreviousPage()}
                        >
                        {'<<'}
                        </button>
                        <button
                        className="border rounded p-1"
                        onClick={() => reactTable.previousPage()}
                        disabled={!reactTable.getCanPreviousPage()}
                        >
                        {'<'}
                        </button>
                        <button
                        className="border rounded p-1"
                        onClick={() => reactTable.nextPage()}
                        disabled={!reactTable.getCanNextPage()}
                        >
                        {'>'}
                        </button>
                        <button
                        className="border rounded p-1"
                        onClick={() => reactTable.setPageIndex(reactTable.getPageCount() - 1)}
                        disabled={!reactTable.getCanNextPage()}
                        >
                        {'>>'}
                        </button>
                    </div>
                </div>
                </div>
            </TableContainer>
        </div>
    )
}

export default ReservationTable