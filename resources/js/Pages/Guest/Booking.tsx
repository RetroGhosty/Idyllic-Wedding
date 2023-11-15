import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import Footer from './Partial/Footer'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import PrimaryButton from '@/Components/PrimaryButton'
import VenueBookingForm from './BookingPartials/VenueBookingForm'
import PaymentForm from './BookingPartials/PaymentForm'
import AwaitingConfirm from './BookingPartials/AwaitingConfirm'
import ContactInfoForm from './BookingPartials/ContactInfoForm'
import EmailForm from './BookingPartials/EmailForm'

const Booking = ({auth, venues, session, transactions}: PageProps) => {
  const [steps, setSteps] = React.useState<any>([
    {title: 'Step 1', description: 'Email'},
    {title: 'Step 2', description: 'Contact Info'},
    {title: 'Step 3', description: 'Book a venue'}
  ])

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

  const stepComponenets = [
    {title: 'Step 1', description: 'Email', component: <EmailForm session={session} increaseStep={increaseStep} decreaseStep={decreaseStep}/>},
    {title: 'Step 2', description: 'Contact Info', component: <ContactInfoForm venues={venues} session={session} increaseStep={increaseStep} decreaseStep={decreaseStep}/>},
    {title: 'Step 3', description: 'Book a venue', component: <VenueBookingForm venues={venues} session={session} transactions={transactions} increaseStep={increaseStep} decreaseStep={decreaseStep}/>}
  ]

  const handleFormSteps = (stepIntent: string) => {

    if (stepIntent === 'next'){
      // return stepComponenets[3].component
      return stepComponenets[(activeStep + localActiveStep)].component
    }
    if (stepIntent === 'back'){
      return stepComponenets[activeStep + localActiveStep].component
    }
  }  



  return (
    <>
        <Head title="Booking" />
        <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-[#f4f3ee] dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
            
            <NavBar user={auth.user}/>
            <div className='min-h-screen max-w-7xl pt-4 w-full md:py-9 mx-auto px-4 sm:px-6 lg:px-8l flex flex-col space-y-10'>
              <div className='md:hidden'>
                <Stepper size='lg' orientation='vertical' index={activeStep + localActiveStep}>
                {steps.map((step: any, index: number) => (
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
              <div className='hidden md:inline'>
                <Stepper size='lg' index={activeStep + localActiveStep}>
                {steps.map((step: any, index: number) => (
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
                {handleFormSteps('next')}
              </div>
              
            </div>
            <Footer/>
        </div>
    </>
  )
}


export default Booking