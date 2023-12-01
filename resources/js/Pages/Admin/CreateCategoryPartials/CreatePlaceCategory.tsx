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

export const CreatePlaceCategoryFooter = ({onOpen, onClose}: any) => {
    return (
        <>
            <Button type='submit' colorScheme='blue' mr={3}>
            Create Place Category
            </Button>
            <Button onClick={onClose}>Cancel</Button>
        </>
    )
}
