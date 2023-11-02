import { IReservation } from '@/types'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import {parse, format} from 'date-fns'
const ReservationTable = ({reservations}: any) => {
    const changeStatus = (reservation_id, statusValue) => {
        const payload = {
            id:reservation_id,
            status: statusValue,
        }
        router.patch(route('admin.reservation.editStatus', {reservation_id: reservation_id}), payload, {preserveScroll: true})
    }

    const columnHelper = createColumnHelper<IReservation>()
    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: (info) => <div className='text-xs'>{info.getValue()}</div>,
        }),
        columnHelper.accessor('total_price', {
            header: 'Total Price',
            cell: (info) => <div>P{info.getValue()}.00</div>,
        }),
        columnHelper.accessor('payment_method', {
            header: 'Payment Method',
            cell: (info) => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('payment_proof', {
            header: 'Payment Proof',
            cell: (info) => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('event_date', {
            header: 'Event Date',
            cell: (info) => {return format(parse(info.getValue(), 'yyyy-MM-dd', new Date()), "MMM. dd, yyyy")}
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => 
            <select name="status" value={info.getValue()} onChange={(e) => changeStatus(info.row.original['id'], e.target.value)}>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="approved">Approved</option>
            </select>
        })
    ]

    const reactTable = useReactTable({
        columns,
        data: reservations,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className='p-6'>
            <h1 className='text-lg font-bold mb-2'>Reservations</h1>
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