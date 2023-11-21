import { ITransaction } from '@/types'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import {parse, format} from 'date-fns'
import DangerButton from '../DangerButton'
const ReservationTable = ({transactions}: any) => {
    const refundTransaction = (transaction_id) => {
        router.post(route('admin.transaction.requestRefund', {transaction_id: transaction_id}), {preserveScroll: true})
    }

    const columnHelper = createColumnHelper<ITransaction>()
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
        columnHelper.accessor('event_date', {
            header: 'Event Date',
            cell: (info) => {return <div>{format(parse(info.getValue(), 'yyyy-MM-dd', new Date()), "MMM. dd, yyyy")}</div>}
        }),
        columnHelper.accessor('transaction_status', {
            header: 'Status',
            cell: (info) => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('status', {
            header: 'Actions',
            cell: (info) => 
            <DangerButton onClick={() => refundTransaction(info.row.original['id'])}>Refund</DangerButton>
        })
    ]

    const reactTable = useReactTable({
        columns,
        data: transactions,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className='p-6'>
            <h1 className='text-lg font-bold mb-2'>Transactions</h1>
            <TableContainer w="100%">
                <Table variant='striped' size='sm'>
                    <Thead>
                        {reactTable.getHeaderGroups().map((headerGroup)=> (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}
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
            </TableContainer>
      
        </div>
    )
}

export default ReservationTable