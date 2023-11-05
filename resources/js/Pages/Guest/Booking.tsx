import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import NavBar from './Partial/NavBar'
import Footer from './Partial/Footer'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import PrimaryButton from '@/Components/PrimaryButton'

type Props = {}

const Booking = ({auth}: PageProps) => {
  const steps = [
    {title: 'Step 1', description: 'Contact Info'},
    {title: 'Step 2', description: 'Book a venue'},
    {title: 'Step 3', description: 'Payment'},
  ]

  const {activeStep} = useSteps({
    index: 0,
    count: steps.length,
  })


  const [localActiveStep, setLocalActiveStep] = React.useState(0)
  
  const increaseStep = () => {
    if (localActiveStep > (steps.length - 1)){
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo suscipit animi eius iste laboriosam laborum blanditiis magni adipisci aspernatur vero?
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