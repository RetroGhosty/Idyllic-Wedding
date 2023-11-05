import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import Footer from './Partial/Footer'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import PrimaryButton from '@/Components/PrimaryButton'
import ContactInfoForm from './BookingPartials/ContactInfoForm'
import VenueBookingForm from './BookingPartials/VenueBookingForm'
import PaymentForm from './BookingPartials/PaymentForm'
import AwaitingConfirm from './BookingPartials/AwaitingConfirm'

type Props = {}

const Booking = ({auth, venues}: PageProps) => {
  const steps = [
    {title: 'Step 1', description: 'Contact Info', component: <ContactInfoForm/>},
    {title: 'Step 2', description: 'Book a venue', component: <VenueBookingForm venues={venues}/>},
    {title: 'Step 3', description: 'Payment', component: <PaymentForm/>},
    {title: 'Step 4', description: 'Awaiting for confirmation', component: <AwaitingConfirm/>},
  ]

  const {activeStep} = useSteps({
    index: 0,
    count: steps.length,
  })


  const [localActiveStep, setLocalActiveStep] = React.useState(0)
  
  const increaseStep = () => {
    if (localActiveStep > (steps.length - 2)){
      
      return false
    }
    setLocalActiveStep(localActiveStep + 1)
  }
  const decreaseStep = () => {
    if (localActiveStep <= 0){
      return false
    }
    setLocalActiveStep(localActiveStep - 1)
  }

  const handleFormSteps = () => {
    if ((activeStep + localActiveStep) < 0 || (activeStep + localActiveStep) > (steps.length - 1)){
      return steps[(activeStep + localActiveStep) - 1].component
    } else{
      return steps[activeStep + localActiveStep].component
    }
  }
  return (
    <>
        <Head title="Booking" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <NavBar user={auth.user}/>
            <div className='min-h-screen max-w-7xl pt-4 w-full md:py-9 mx-auto px-4 sm:px-6 lg:px-8l flex flex-col space-y-10'>
              <div>
                <Stepper size='lg' index={activeStep + localActiveStep}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink='0'>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              </div>
              <div>
                {handleFormSteps()}
              </div>
              
              <div className='flex flex-row justify-between'>
                <PrimaryButton onClick={() => {decreaseStep()}}>Back</PrimaryButton>
                <PrimaryButton onClick={() => {increaseStep()}}>Next</PrimaryButton>
              </div>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Booking