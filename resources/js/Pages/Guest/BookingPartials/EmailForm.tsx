import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import { router, useForm } from "@inertiajs/react"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { ClearProgressReload, CreateProgressReload } from "./FormHelper/ProgressHelper"
import { CircularProgress } from "@chakra-ui/react"

const EmailForm = ({increaseStep, decreaseStep, session}:any) => {


    const {data, setData, errors, setError, post, clearErrors} = useForm<any>({
        email: session ? session['email'] : ''
    })

    const [reloadState, setReloadState] = React.useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        router.post(route('booking.emailCheck'), data, {
            preserveScroll: true,
            onSuccess: () => increaseStep(),
            onError: (errors: any) => {
                setError(errors)
            },
            onStart: () => {CreateProgressReload(setReloadState), clearErrors()},
            onFinish: () => {ClearProgressReload(setReloadState)}
        })
    }

  return (
    <AnimatePresence>
        <motion.form onSubmit={handleSubmit} className='flex flex-col space-y-7 my-4'
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        >
            <div className='font-black text-2xl'>Contact Info</div>
            <div className='flex flex-col'>
                <InputLabel htmlFor="email" value='Email'/> 
                <TextInput autoComplete="off"  id='email' type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                {errors.email ? errors.email : null}
            </div>               
     
            <div className='flex flex-row  items-center md:flex-row space-y-3 md:space-y-0'>
                <div className='flex md:flex-row space-x-4 items-center'>
                  <PrimaryButton type='submit' disabled={reloadState ? true : false}>Next</PrimaryButton>
                  {reloadState ? <CircularProgress isIndeterminate color='blue.700' size="20px"/> : null}
                </div>
            </div>
        </motion.form>
    </AnimatePresence>
  )
}

export default EmailForm