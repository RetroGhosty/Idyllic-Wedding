import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import { router, useForm } from "@inertiajs/react"
import { AnimatePresence, motion } from "framer-motion"

const EmailForm = ({increaseStep, decreaseStep, session}:any) => {


    const {data, setData, errors, setError, post} = useForm<any>({
        email: session ? session['email'] : ''
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        router.post(route('booking.emailCheck'), data, {
            preserveScroll: true,
            onSuccess: () => increaseStep(),
            onError: (errors: any) => {
                setError(errors)
            }
        })
    }

  return (
    <AnimatePresence>
        <motion.form onSubmit={handleSubmit} className='flex flex-col space-y-7'
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
     
            <div className='flex flex-row justify-end'>
                <PrimaryButton type='submit'>Next</PrimaryButton>
            </div>
        </motion.form>
    </AnimatePresence>
  )
}

export default EmailForm