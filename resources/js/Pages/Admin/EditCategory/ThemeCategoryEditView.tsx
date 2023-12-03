import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Input } from '@chakra-ui/react'
import { Head, useForm } from '@inertiajs/react'
import { FileWithPath, useDropzone } from 'react-dropzone'

const ThemeCategoryEditView = ({auth, themeCategory}: any) => {

    const {data, setData, post, processing, errors} = useForm<any>({
        name: themeCategory['name'],
        image: null
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        post(route('admin.themeCategory.editThemeCategory', themeCategory['id']))
    } 

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        multiple: false,
        accept: {
          'image/png': ['.png'],
          'image/jpg': ['.jpg'],
          'image/jpeg': ['.jpeg']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles: FileWithPath[]) => {
          setData('image', acceptedFiles[0])
        }
      })
    
      const files = acceptedFiles.map((file: FileWithPath)  => (
        <div key={file.path}>
          {file.path}
        </div>
      ));

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{themeCategory ? `Edit > Place Category > [ ID: ${themeCategory['id']} ] ${themeCategory['name']}` : "Category not found"}</h2>}>
        <Head title="Admin | Edit Category" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-10">
                            <div className="col-span-2 space-y-4">
                                <div className="grid grid-cols-3 grid-rows-2 w-full justify-between border-t-2 py-5 border-slate-500">
                                    <InputLabel htmlFor="name">Category Name</InputLabel>
                                    <div className='col-span-2'>
                                        <input autoComplete="off" className='w-full rounded-lg' id='name' type="text" onChange={(e) => setData('name', e.target.value)} value={data.name}/>
                                        {errors.name ? <div className='text-red-600 col-span-3'>{errors.name}</div> : null}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 grid-rows-2 w-full justify-between border-t-2 py-5 border-slate-500">
                                    <div className='col-span-full h-[300px] mb-5 rounded-2xl'>
                                        <img src={`/storage/${themeCategory['image']}`} className="w-full h-full object-cover shadow-md rounded-2xl" loading="lazy"/>
                                    </div>    
                                    <InputLabel htmlFor="name" className='font-black'>Cover photo</InputLabel>
                                    <div className="col-span-2">
                                        <div {...getRootProps({className:"mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"})}>
                                            <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                            </svg>
                                            <div className='flex flex-col items-center justify-center'>
                                                <div className="mt-4 flex text-xs leading-6 text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input {...getInputProps()}/>
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                                </div>
                                                {files.length > 0 ? <p className="text-sm font-black leading-5 text-gray-600 overflow-hidden">{files}</p> : <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>}
                                            </div>
                                            </div>
                                        </div>
                                    </div>     
                       
                                </div>

                        
                                <div>
                                    <PrimaryButton type='submit' disabled={processing}>Submit</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}

export default ThemeCategoryEditView