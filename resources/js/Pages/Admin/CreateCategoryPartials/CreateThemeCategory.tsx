import PrimaryButton from '@/Components/PrimaryButton'
import { Button, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import { useDropzone, FileWithPath } from 'react-dropzone'




export const CreateThemeCategoryBody = ({initialRef, onClose, errors, data, setData}: any) => {

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
    <>
        <FormControl className='space-y-6'>
        {errors.name ? <div className='text-red-600'>{errors.name}</div> : null}
        <Input ref={initialRef} value={data['name']} onChange={(e) => setData('name', e.target.value)} placeholder='Theme Category Name' />

        <div className="col-span-full">
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

        
        
        </FormControl>
    </>
  )
}

export const CreateThemeCategoryFooter = ({onOpen, onClose, processing}: any) => {
    return (
        <>
            <PrimaryButton type='submit' className='me-3' disabled={processing}>
            Create Theme Category
            </PrimaryButton>
            <Button onClick={onClose}>Cancel</Button>
        </>
    )
}
