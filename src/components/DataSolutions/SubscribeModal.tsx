'use client'
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import Tick from "@/svgs/Tick";
import SubscribeSuccess from "@/svgs/SubscribeSuccess";

interface SubscribeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {

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
                            <div className='bg-[#2F3D40] border w-full flex flex-col items-start border-[#00FEB54D] rounded-lg p-4'>
                                <SubscribeSuccess />
                                <h1 className='pt-2 text-2xl font-semibold text-secondary'>Thankyou! Subscription Successful</h1>
                                <p className='text-base text-[#C5C5C5] pt-2 leading-5'>
                                    Thankyou for your purchase, your Platinum Data Portal subscription is active now, your next payment will be deducted next year on this date unless you unsubscribe.
                                </p>
                                <p className='text-[#78CEF4] font-semibold text-base bg-[#3D5358] rounded px-2 py-0.5 flex items-center gap-x-2 mt-4'>
                                    <Tick className={"text-[#78CEF4]"} width={12} height={10} /><span className='w-full'>Your API Key is sent to the email address you used at the payment</span>
                                </p>
                            </div>
                            <p className='text-xl text-secondary font-semibold pt-8'>Now you can:</p>
                            <p className='text-base text-[#A2A2A2] pt-2 flex items-center gap-x-2 leading-5'><Tick className={"dark:text-primary text-darkGreen"} width={14} height={14} />
                                <span className='w-full'>VIX Index prices</span>
                            </p>
                            <p className='text-base text-[#A2A2A2] pt-2 flex items-center gap-x-2 leading-5'><Tick className={"dark:text-primary text-darkGreen"} width={14} height={14} />
                                <span className='w-full'>S&P500 Index prices</span>
                            </p>
                            <p className='text-base text-[#A2A2A2] pt-2 flex items-center gap-x-2 leading-5'><Tick className={"dark:text-primary text-darkGreen"} width={14} height={14} />
                                <span className='w-full'>VIX Future Contracts prices</span>
                            </p>
                        </div>
                        <div className='flex sm:flex-row flex-col gap-y-2 sm:items-center justify-between w-full bg-darkBg rounded-b-xl md:mt-10 mt-8 px-4 py-2'>
                            <p className='text-[#C5C5C5] text-base'>Use the API Key to access Platinum Data Portal every time</p>
                            <div className="bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] rounded-lg p-[1px] w-fit self-end">
                                <button className='text-primary rounded-lg bg-bg flex items-center gap-x-2 justify-center px-4 py-1.5 text-sm font-medium'>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubscribeModal;