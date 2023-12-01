import CreateCategoryModal from '@/Components/CreateCategoryModal'
import DangerButton from '@/Components/DangerButton'
import PrimaryButton from '@/Components/PrimaryButton'
import { ICategories, IVenues } from '@/types'
import { Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { router } from '@inertiajs/react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import React from 'react'


const CategorySection = ({className, theme_categories, place_categories, tableHeight}: any) => {

  const [recentlySuccessful, setRecentlySuccessful] = React.useState(false)
  const navigateTo = (venue_id: any) => {
      router.get(route('admin.venue.view', {venue_id:venue_id}), {preserveScroll: true})
  }
  
  const [currentTableCategoryData, setCurrentTableCategoryData] = React.useState<any>(
    "place"
  )


  const [categoryTempData, setCategoryTempData] = React.useState<any>(place_categories)
  const changeCategoryData = (stateCategory: string) => {
    if (stateCategory === 'place'){
      setCategoryTempData(place_categories)
      setCurrentTableCategoryData(stateCategory)
    } else{
        setCategoryTempData(theme_categories)
        setCurrentTableCategoryData(stateCategory)
    }
  }



  const reloadData = () => {
    router.reload()
    if (currentTableCategoryData === 'place'){
      setCategoryTempData(place_categories)
    } else{
      setCategoryTempData(theme_categories)
    }
    console.log('data should be reloaded')
    console.log(place_categories)
    console.log(categoryTempData)
  }

  const columnHelper = createColumnHelper<ICategories>()
  const [rowSelection, setRowSelection] = React.useState<any>({})
  const [sorting, setSorting] = React.useState<any>([])
  const [filtering, setFiltering] = React.useState<any>('')
  const columns = [
      columnHelper.accessor('id', {
          header: 'ID',
          cell: (info) => <div className='text-xs'>{info.getValue()}</div>,
      }),
      columnHelper.accessor('name', {
          header: 'Name',
          cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor('updated_at', {
          header: 'Updated at',
          cell: (info) => {return <div className='text-sm'>{format(parseISO(info.getValue()), "MMM. dd yyyy").toString()}</div>}
      }),

      columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: (info) => {return <div className='text-sm'>{format(parseISO(info.getValue()), "MMM. dd yyyy").toString()}</div>}
      }),
      columnHelper.display({
          header: 'Actions',
          cell: (info) => 
          <div className='flex flex-row space-x-1'>
            <PrimaryButton type='button' onClick={() => navigateTo(info.row.original['id'])} className='pe-3 m-0'>Edit</PrimaryButton>
            <DangerButton type='button' onClick={() => deleteFunction(info.row.original['id'])}>Delete</DangerButton>
          </div>
      })
  ]
  const reactTable = useReactTable({
    data: categoryTempData,
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

  const {isOpen, onOpen, onClose} = useDisclosure()
  

  React.useEffect(() => {
    if (recentlySuccessful){
        onClose()
        reloadData()
    }
    return setRecentlySuccessful(false)
  }, [recentlySuccessful])
  const deleteFunction = (category_id: any) => {
    if (currentTableCategoryData === 'place'){
      router.delete(route('admin.placeCategory.deletePlaceCategory'), {
        data: {category_id:category_id},
        preserveScroll: true,
        onSuccess: () => {
          setRecentlySuccessful(true)
          reactTable.resetRowSelection()
        },
        onFinish: () => {
          reloadData()
        }
      })
    } else{
      router.delete(route('admin.placeCategory.deleteThemeCategory'), {
        data: {category_id:category_id},
        preserveScroll: true,
        onSuccess: () => {
          setRecentlySuccessful(true)
          reactTable.resetRowSelection()
        },
        onFinish: () => {
          reloadData()
        }
      })
    }
  }

  return (
    <div className={className}>
      <div className='flex flex-row items-center justify-between mb-4'>
        <h1 className="text-[#e56b6f] text-xl font-bold">Categories</h1>
        <PrimaryButton onClick={onOpen}>Create Category</PrimaryButton>
      </div>
      <div className='grid grid-cols-6 gap-x-2'>
        <div className='flex flex-col col-span-1'>
            <div className={`font-bold border-s-4 p-4 cursor-pointer text-[0.9rem] ${currentTableCategoryData === 'place' ? 'border-blue-600 ' : null}`} onClick={() => changeCategoryData('place')}>
                Place categories
            </div>
            <div className={`font-bold border-s-4 p-4 cursor-pointer text-[0.9rem] ${currentTableCategoryData === 'theme' ? 'border-blue-600' : 'border-none'}`} onClick={() => changeCategoryData('theme')}>
                Theme categories
            </div>

        </div>
        <TableContainer w="100%" className='col-span-5 flex flex-col space-y-5 p-2 '>
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
      <CreateCategoryModal successReload={() => reloadData()} isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
    </div>
  )
}

export default CategorySection