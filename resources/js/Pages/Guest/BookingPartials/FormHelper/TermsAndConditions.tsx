import { Button, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, OrderedList, UnorderedList } from '@chakra-ui/react'
import React from 'react'

// isTermOpen={isTermOpen} onTermOpen={onTermOpen} onClose={onTermClose}
const TermsAndConditions = ({isTermOpen, onTermClose}: any) => {
  return (
    <Modal
        isCentered
        onClose={onTermClose}
        isOpen={isTermOpen}
        motionPreset='slideInBottom'
        size="xl"
    >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>
            <h1>Idyllic Reservation</h1>
            <h1>Venue Booking reservation terms of service</h1>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <div className='max-h-[65vh] overflow-y-scroll flex flex-col space-y-5'>
                <p>
                    Idyllic Weddings Terms of Agreement ("Agreement") is entered into between (Idyllic Weddings), here in after referred to as the <b>"Company,"</b> and the customer, here in after referred to as the <b>"User,"</b> for the use of our rental service.
                </p>
                <p>
                    By accessing or using our rental service, the User agrees to be bound by the terms and conditions set forth in this Agreement.
                </p>
                <OrderedList className='space-y-4'>
                    <ListItem>
                        <h2 className='font-black'>Booking Reservation</h2>
                        <UnorderedList>
                            <ListItem>
                                Users can book reservations for a period of one week only.
                            </ListItem>
                            
                            
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>Customer Service</h2>
                        <UnorderedList>
                            <ListItem>
                                In the event of any issues or concerns with the booking reservation, Users are required to contact our customer service team for assistance.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>Refund Policy</h2>
                        <UnorderedList>
                            <ListItem>
                                Refunds are only issued in exceptional circumstances and are subject to approval by the Company.
                            </ListItem>
                            <ListItem>
                                If a refund is approved, a 5% inconvenience fee will be deducted from the total payment.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>Payment</h2>
                        <UnorderedList>
                            <ListItem>
                                Users agree to pay the total amount specified for the reservation.
                            </ListItem>
                            <ListItem>
                                Payments are processed securely through our designated payment gateway.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>User Responsibility</h2>
                        <UnorderedList>
                            <ListItem>
                                Users are responsible for providing accurate information during the booking process.
                            </ListItem>
                            <ListItem>
                                Users are encouraged to review and verify their booking details before confirming the reservation.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>Intellectual Property</h2>
                        <UnorderedList>
                            <ListItem>
                                The Company is not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our rental service.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>Limitation of Liability</h2>
                        <UnorderedList>
                            <ListItem>
                                The Company reserves the right to terminate or suspend a User's access to our rental service at any time without notice.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>Termination</h2>
                        <UnorderedList>
                            <ListItem>
                                The Company reserves the right to terminate or suspend a User's access to our rental service at any time without notice.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <h2 className='font-black'>Changes to Terms</h2>
                        <UnorderedList>
                            <ListItem>
                                The Company reserves the right to update or modify these terms at any time. Users will be notified of any changes, and continued use of our rental service constitutes acceptance of the modified terms.
                            </ListItem>
                        </UnorderedList>
                    </ListItem>

                </OrderedList>
                <p>
                    By using our rental service, the User acknowledges that they have read, understood, and agreed to be bound by the terms and conditions of this Agreement.
                </p>
                <div>
                    <h2 className='font-black'>Idyllic Weddings,</h2>
                    <h2>December 8, 2022</h2>
                </div>

            </div>
            
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onTermClose}>
            I see
            </Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default TermsAndConditions