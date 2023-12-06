import { motion } from "framer-motion"

const AwaitingConfirm = () => {
  
  return (
    <motion.form
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -200 }}
    >
      Awaiting Confirmation
    </motion.form>
  )
}

export default AwaitingConfirm