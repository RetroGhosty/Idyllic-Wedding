import PrimaryButton from '@/Components/PrimaryButton'
import { Button, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'




export const CreatePlaceCategoryBody = ({initialRef, onClose, errors, data, setData}: any) => {
  return (
    <>
        <FormControl>
        {errors.name ? <div className='text-red-600'>{errors.name}</div> : null}
        <Input ref={initialRef} value={data['name']} onChange={(e) => setData('name', e.target.value)} placeholder='Place Category Name' />
        
        </FormControl>
    </>
  )
}

export const CreatePlaceCategoryFooter = ({onOpen, onClose, processing}: any) => {
    return (
        <>
            <PrimaryButton type='submit' className='me-3' disabled={processing}>
            Create category
            </PrimaryButton>
            <Button onClick={onClose}>Cancel</Button>
        </>
    )
}
