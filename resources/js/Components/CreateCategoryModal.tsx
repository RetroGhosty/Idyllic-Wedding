import { CreatePlaceCategoryBody, CreatePlaceCategoryFooter } from '@/Pages/Admin/CreateCategoryPartials/CreatePlaceCategory'
import { CreateThemeCategoryFooter, CreateThemeCategoryBody } from '@/Pages/Admin/CreateCategoryPartials/CreateThemeCategory'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { router, useForm } from '@inertiajs/react'
import { motion, spring } from 'framer-motion'
import React from 'react'



const CreateCategoryModal = ({onOpen, isOpen, onClose, successReload}: any) => {
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const [currentCategoryBody, setCurrentCategoryBody] = React.useState('place')

    const {data, setData, post, wasSuccessful, reset, errors} = useForm({
        name: '',
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (currentCategoryBody === 'place'){
            post(route('admin.placeCategory.createPlaceCategory'))
        } else{
            post(route('admin.placeCategory.createThemeCategory'))
        }
    }

    React.useEffect(() => {
        if (wasSuccessful){
            onClose()
            reset()
            successReload()
        }
    }, [wasSuccessful])

    const categoryContentDecider = (isBody: boolean) => {
        if (isBody){
            if (currentCategoryBody === 'place'){
                return <CreatePlaceCategoryBody data={data} setData={setData} errors={errors} initialRef={initialRef} onClose={onClose}/>
            }
            if (currentCategoryBody === 'theme'){
                return <CreateThemeCategoryBody data={data} setData={setData} errors={errors} initialRef={initialRef} onClose={onClose}/>
            }
        } else{
            if (currentCategoryBody === 'place'){
                return <CreatePlaceCategoryFooter onOpen={onOpen} onClose={onClose}/>
            }
            if (currentCategoryBody === 'theme'){
                return <CreateThemeCategoryFooter onOpen={onOpen} onClose={onClose}/>
            }
        }
    }

    return (
      <>  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{currentCategoryBody === 'place' ? 'Create place category' : 'Create theme category'}</ModalHeader>
                <ModalCloseButton/>
                <form onSubmit={handleSubmit}>
                    <ModalBody pb={6}>
                        <div className='w-full flex flex-row mb-6'>
                            <div 
                            className={`transition duration-150 ease-out hover:ease-in cursor-pointer w-full flex flex-col text-center items-center py-1 ${currentCategoryBody === 'place' ? 'bg-[#3a0ca3] text-white' : 'bg-[#dee2e6]'}`}
                            onClick={() => setCurrentCategoryBody('place')}
                            >
                                Place
                            </div>
                            <div className={`transition duration-150 ease-out hover:ease-in cursor-pointer w-full flex flex-col text-center items-center py-1 ${currentCategoryBody === 'theme' ? 'bg-[#3a0ca3] text-white' : 'bg-[#dee2e6]'}`}
                            onClick={() => setCurrentCategoryBody('theme')}
                            >
                                Theme
                            </div>      
                        </div>
                        {categoryContentDecider(true)}
                    </ModalBody>

                    <ModalFooter>
                        {categoryContentDecider(false)}
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
      </>
    )
}

export default CreateCategoryModal