import { HiOutlineShare } from "react-icons/hi2"
import { useDisclosure } from "@nextui-org/react"
import ModalShare from "./ModalShare";

function ButtonShare({ currentPageUrl, title }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <button
            name='button search'
            aria-label='button search'
            onClick={onOpen}>
            <ModalShare isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} currentPageUrl={currentPageUrl} title={title} />
            <HiOutlineShare size={30} className='cursor-pointer hover:-translate-y-1 transition' />
        </button>

    )
}

export default ButtonShare