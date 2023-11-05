import InputLabel from '@/Components/InputLabel'
import { Select } from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'
import { motion } from 'framer-motion'



const PaymentForm = () => {

    interface IPayment{
        venue_id: string,
        payment_method: string,
        payment_type: string,
        payment_proof?: File | undefined
    }

    const {data, setData, errors} = useForm<any>({
        venue_id: '',
        payment_method: '',
        payment_type: '',
        payment_proof: undefined
    })
    const handleFile = (e: React.FormEvent<HTMLInputElement>, formModel: keyof IPayment, fileType: string) => {
        const file = e.target as HTMLInputElement & {files: FileList}
        if (fileType !== 'FileList' && fileType !== 'File') throw new Error('fileType must be File or FileList')
        setData(formModel, file.files[0])
    }
  return (
    <motion.form className='flex flex-col space-y-7'
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -200 }}>
        <div className='font-black text-2xl'>Venue Booking</div>
        <div className='flex flex-col'>
            <InputLabel htmlFor="payment_method" value='Payment Method'/> 
            <Select autoComplete="off" placeholder='Select Payment Method' id='payment_method' value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)}>
                <option value="cash_on_deliverty">Cash on Delivery</option>
                <option value="gcash">Gcash</option>
            </Select>
            {errors.payment_method ? errors.payment_method : null}
        </div>
        <div className='flex flex-col'>
            <InputLabel htmlFor="payment_type" value='Payment Type'/> 
            <Select autoComplete="off" placeholder='Select Payment Type' id='payment_type' value={data.payment_type} onChange={(e) => setData('payment_type', e.target.value)}>
                <option value="partial">Partial</option>
                <option value="full_payment">Full payment</option>
            </Select>
            {errors.payment_type ? errors.payment_type : null}
        </div>
        <div className='flex flex-col'>
             <InputLabel htmlFor="payment_proof">Payment Proof</InputLabel>
            <input autoComplete="off"  id='payment_proof' type="file" onChange={(e) => handleFile(e, 'payment_proof', 'File')} accept='image/jpeg, image/png, image/jpg'/>
            {errors.payment_proof ? errors.payment_proof : null}
        </div>
                      
    </motion.form>
  )
}

export default PaymentForm