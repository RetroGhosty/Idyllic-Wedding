import DangerButton from '@/Components/DangerButton'
import Dropdown from '@/Components/Dropdown'
import { IndeterminateCheckbox } from '@/Components/IndeterminateCheckbox'
import PrimaryButton from '@/Components/PrimaryButton'
import { ICustomers } from '@/types'
import { Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import React from 'react'


const CustomerSection = ({className, customers, tableHeight}: any) => {
    const columnHelper = createColumnHelper<ICustomers>()

    const [rowSelection, setRowSelection] = React.useState<any>({})
    const [sorting, setSorting] = React.useState<any>([])
    const [filtering, setFiltering] = React.useState<any>('')
    const columns = [
        {
            id: 'select',
            header: ({ table }) => (
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
            ),
            cell: ({ row }) => (
                <IndeterminateCheckbox
                  {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
            ),
          },
        columnHelper.accessor('id', {
            header: 'ID',
            cell: (info) => <div className='text-sm'>{info.getValue()}</div>,
        }),
        columnHelper.accessor('fullName',{
            header: 'Name',
            cell: (info) => <div className='text-sm'>{info.getValue()}</div>,
            
            
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => <div className='text-sm'>{info.getValue()}</div>
        }),
        columnHelper.accessor('phone_number', {
            header: 'Phone #',
            cell: (info) => <div className='text-sm'>{info.getValue()}</div>
        }),
        columnHelper.accessor('created_at', {
            header: 'Created At',
            cell: (info) => {return <div className='text-sm'>{format(parseISO(info.getValue()), "MMM. dd yyyy").toString()}</div>}
            // cell: (info) => {return <div>{format(parseISO(info.getValue()), "MMM. dd yyyy | h:mm a").toString()}</div>}
        }),
        columnHelper.display({
            header: 'Actions',
            cell: (info) => 
            <PrimaryButton onClick={() => router.get(route('admin.customer.viewCustomer', info.row.original['id']))}>
                Edit
            </PrimaryButton>
        })
    ]
    const reactTable = useReactTable({
        data: customers,
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



    const deleteFunction = (tableRows) => {
    
        let ids: Array<any> = []
        tableRows.forEach((row: any) => {
            ids.push(row.original.id)
        })
        router.delete(route('admin.customer.deleteBatch', {ids: ids}), {
            preserveScroll: true,
            onSuccess: () => {
                reactTable.resetRowSelection()
            }
        })
    }

    const isRowSelectionEmpty = () => {
        if (Object.keys(rowSelection).length === 0){
            return true
        } else{
            return false
        }
    }
  return (
    <div className={className}>
        <h1 className='text-[#e56b6f] text-lg font-bold mb-2'>Customer Details</h1>
       
        <TableContainer w="100%" className='flex flex-col space-y-3 p-2'>
            <div className='w-full flex flex-col items-start'>
                <label htmlFor="searchBar">Search</label> 
                <Input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} id='searchBar' className='w-full'/>
            </div>
            <div className='w-full flex flex-col items-start'>
                <DangerButton onClick={() => deleteFunction(reactTable.getSelectedRowModel().flatRows)}  disabled={isRowSelectionEmpty()}>Delete</DangerButton>
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

export default CustomerSection