import DangerButton from '@/Components/DangerButton'
import Dropdown from '@/Components/Dropdown'
import PrimaryButton from '@/Components/PrimaryButton'
import { IVenues } from '@/types'
import { Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'

const VenueSection = ({className, venues, tableHeight}: any) => {
  const [recentlySuccessful, setRecentlySuccessful] = React.useState(false)
    const navigateTo = (venue_id: any) => {
        router.get(route('admin.venue.view', {venue_id:venue_id}), {preserveScroll: true})
    }

    const deleteFunction = (venue_id: any) => {
      router.delete(route('admin.venue.delete', {venue_id:venue_id}), {
        preserveScroll: true,
        onSuccess: () => {
          setRecentlySuccessful(true)
        
        }
      })
    }

  const columnHelper = createColumnHelper<IVenues>()
  const [rowSelection, setRowSelection] = React.useState<any>({})
  const [sorting, setSorting] = React.useState<any>([])
  const [filtering, setFiltering] = React.useState<any>('')
  const columns = [
      columnHelper.accessor('id', {
          header: 'ID',
          cell: (info) => <div className='text-xs'>{info.getValue()}</div>,
      }),
      columnHelper.accessor('venue_name', {
          header: 'Venue Name',
          cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor('place_name', {
          header: 'Place category',
          cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor('theme_name', {
          header: 'Theme category',
          cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor('limit', {
          header: 'Head Capacity',
          cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor('price', {
          header: 'Price',
          cell: (info) => <div>P {info.getValue()}.00</div>,
      }),
      columnHelper.display({
          header: 'Actions',
          cell: (info) => 
          <div className='flex flex-row space-x-1'>
            <PrimaryButton onClick={() => navigateTo(info.row.original['id'])} className='pe-3 m-0'>Edit</PrimaryButton>
            <DangerButton onClick={() => deleteFunction(info.row.original['id'])}>Delete</DangerButton>
          </div>
      })
  ]
  const reactTable = useReactTable({

    data: venues,
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
      <div className='flex flex-row items-center justify-between mb-4'>
        <h1 className="text-[#e56b6f] text-xl font-bold">Venues</h1>
        <PrimaryButton onClick={() => {router.get(route('admin.venue.createView'))}}>Create Venue</PrimaryButton>
      </div>
      <TableContainer w="100%" className='flex flex-col space-y-5 p-2 '>
            <div className='w-full flex flex-col items-start'>
                <Input type="text" placeholder='Search' value={filtering} onChange={(e) => setFiltering(e.target.value)} id='searchBar' className='w-full'/>
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

export default VenueSection