'use client'
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

interface MessageSentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MessageSentModal: React.FC<MessageSentModalProps> = ({ isOpen, onClose }) => {

    return (
        <>
            {isOpen && (
                <div className="modal-overlay pb-6 flex-col flex items-center justify-center fixed top-0 left-0 
                    pt-6 w-screen h-screen z-50 lg:px-0 md:px-6 px-10 overflow-auto text-center">
                    <div className="relative border border-secondary dark:border-[#707070] max-w-md w-full modal items-center 
                        flex flex-col dark:bg-bg bg-white rounded-3xl z-50 shadow-2xl shadow-[#00000026] dark:shadow-[#00000066]">
                        <div className='w-full flex justify-end'>
                            <div className="md:w-7 w-6 md:h-7 h-6 rounded-full dark:bg-secondary bg-bg cursor-pointer flex 
                                items-center justify-center md:-mt-2 -mt-1.5 md:-mr-2 -mr-1.5 hover:rotate-180 transform transition-all duration-400"
                                onClick={onClose}>
                                <RxCross2 className='dark:text-bg text-secondary' size={20} />
                            </div>
                        </div>
                        <div className='-z-10 overflow-hidden w-full h-16 flex absolute rounded-t-3xl'>
                            <div className="top-0 left-0 h-1 w-full dark:bg-primary bg-darkGreen absolute blur-[1.4rem]" />
                        </div>
                        <h1 className='px-4 dark:text-primary text-[#00BF88] text-3xl font-medium pt-4 flex items-center gap-x-2'>
                            <span className='dark:bg-primary bg-[#00BF88] flex items-center justify-center p-1 rounded'>
                                <FaCheck className='dark:text-bg text-white' size={16} /></span>
                            Sent!
                        </h1>
                        <h1 className='px-4 dark:text-secondary text-bg text-base pt-2'>Your message has been sent successfully.</h1>
                        <h1 className='px-4 dark:text-secondary text-bg text-base'>The team will get back to you as soon as possible.</h1>
                        <h1 className='px-4 dark:text-secondary text-[#707070] text-base pt-4 pb-8'>Thank-you for contacting
                            <span className='font-semibold'> VIXSpike.</span>
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageSentModal;