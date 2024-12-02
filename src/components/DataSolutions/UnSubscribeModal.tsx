'use client'
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import Cancel from "@/svgs/Cancel";
import { GoDash } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

interface UnSubscribeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UnSubscribeModal: React.FC<UnSubscribeModalProps> = ({ isOpen, onClose }) => {

    return (
        <>
            {isOpen && (
                <div className="modal-overlay flex-col flex items-center justify-center fixed top-0 left-0 
                    pt-6 w-screen h-screen z-50 lg:px-0 md:px-6 sm:px-8 px-6 overflow-auto">
                    <div className="relative max-w-lg w-full modal flex flex-col bg-bg rounded-xl z-50 shadow-2xl shadow-[#00000066]">
                        <div className='w-full flex justify-end'>
                            <div className="md:w-6 w-5 md:h-6 h-5 rounded-full dark:bg-secondary bg-bg cursor-pointer flex items-center 
                                hover:rotate-180 transform transition-all duration-400 justify-center md:-mt-2.5 -mt-1.5 md:-mr-2.5 -mr-1.5"
                                onClick={onClose}>
                                <RxCross2 className='dark:text-bg text-secondary' size={16} />
                            </div>
                        </div>
                        <div className='w-full px-4 pt-1'>
                            <div className='bg-[#FF516633] border w-full flex flex-col items-start border-[#FF51664D] rounded-lg p-4'>
                                <Cancel className={'text-[#FF5166]'} />
                                <h1 className='pt-2 text-2xl font-semibold text-secondary'>How unsubscribing works?</h1>
                                <p className='text-base text-[#C5C5C5] pt-2 leading-5'>
                                    After clicking on unsubscribe button below, your subscription will be removed from our system and you{`'`}ll get a confirmation email within 24 hours.
                                </p>
                            </div>
                            <p className='text-base text-[#A2A2A2] pt-8 flex items-center gap-x-2 leading-5'><GoDash className='text-secondary' /><span className='w-full'> You will loose access to Platinum Data Portal and all its functionality from your upcoming billing cycle.</span></p>
                            <p className='text-base text-[#A2A2A2] pt-2 flex items-center gap-x-2 leading-5'><GoDash className='text-secondary' /><span className='w-full'> something about payment cutting and how billing works incase of unsubscription</span></p>
                            <p className='text-base text-[#A2A2A2] pt-2 flex items-center gap-x-2 leading-5'><GoDash className='text-secondary' /><span className='w-full'> some other thing</span></p>
                        </div>
                        <div className='flex sm:flex-row flex-col gap-y-2 sm:items-center justify-between w-full bg-darkBg rounded-b-xl md:mt-10 mt-8 px-4 py-2'>
                            <p className='text-[#C5C5C5]'>Are you sure you want to unsubscribe?</p>
                            <button className='text-[#FF5166] rounded-lg bg-bg flex items-center gap-x-2 justify-center px-4 py-2 self-end text-sm font-medium'>
                                unsubscribe <GoArrowRight className='text-[#FF5166]' /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UnSubscribeModal;