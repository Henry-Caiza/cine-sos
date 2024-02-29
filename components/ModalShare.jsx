import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    PinterestShareButton,
    RedditShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    VKShareButton,
    WhatsappShareButton,

    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    VKIcon,
    WhatsappIcon,
    XIcon,
} from "react-share";


function ModalShare({ isOpen, onOpenChange, onClose, currentPageUrl, title }) {

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            placement='auto'
            isDismissable={true}
            classNames={{
                header: "border-b-[1px] border-[#292f46]",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex gap-1 font-normal">Share <span className='font-bold'>{title} </span> </ModalHeader>
                        <ModalBody className='py-4'>
                            <div className='flex gap-4 flex-wrap items-center justify-center'>
                                <FacebookShareButton
                                    url={currentPageUrl}
                                    hashtag='#OnlyInCINESOS'
                                >
                                    <FacebookIcon className='rounded-full' size={40} />
                                </FacebookShareButton>
                                <FacebookMessengerShareButton
                                    url={currentPageUrl}
                                    appId=''
                                >
                                    <FacebookMessengerIcon className='rounded-full' size={40} />
                                </FacebookMessengerShareButton>
                                <WhatsappShareButton
                                    url={currentPageUrl}
                                >
                                    <WhatsappIcon className='rounded-full' size={40} />
                                </WhatsappShareButton>
                                <TelegramShareButton
                                    url={currentPageUrl}
                                >
                                    <TelegramIcon className='rounded-full' size={40} />
                                </TelegramShareButton>
                                <TwitterShareButton
                                    url={currentPageUrl}
                                    hashtag='#OnlyInCINESOS'
                                >
                                    <XIcon className='rounded-full' size={40} />
                                </TwitterShareButton>
                                <RedditShareButton
                                    url={currentPageUrl}
                                    hashtag='#OnlyInCINESOS'
                                >
                                    <RedditIcon className='rounded-full' size={40} />
                                </RedditShareButton>

                                <LinkedinShareButton
                                    url={currentPageUrl}
                                >
                                    <LinkedinIcon className='rounded-full' size={40} />
                                </LinkedinShareButton>

                                <PinterestShareButton
                                    url={currentPageUrl}
                                    hashtag='#OnlyInCINESOS'
                                >
                                    <PinterestIcon className='rounded-full' size={40} />
                                </PinterestShareButton>
                                <VKShareButton
                                    url={currentPageUrl}
                                    hashtag='#OnlyInCINESOS'
                                >
                                    <VKIcon className='rounded-full' size={40} />
                                </VKShareButton>
                            </div>


                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalShare