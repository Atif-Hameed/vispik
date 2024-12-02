'use client'
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import Excel from "@/svgs/Excel";
import { LuDownload } from "react-icons/lu";
import { useSearchParams } from 'next/navigation';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: any
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, type }) => {

    // const param = useSearchParams();
    // const type = param.get('type')
    console.log("type:", type)

    return (
        <>
            {isOpen && (
                <div className="modal-overlay flex-col flex items-center justify-center fixed top-0 left-0 
                    pt-6 w-screen h-screen z-50 lg:px-0 md:px-6 sm:px-8 px-6 overflow-auto">
                    <div className="pb-4 relative max-w-lg w-full modal flex flex-col bg-bg rounded-lg z-50 shadow-2xl shadow-[#00000066]">
                        <div className='w-full flex justify-end'>
                            <div className="md:w-6 w-5 md:h-6 h-5 rounded-full dark:bg-secondary bg-bg cursor-pointer flex items-center 
                                justify-center md:-mt-2.5 -mt-1.5 md:-mr-2.5 -mr-1.5 hover:rotate-180 transform transition-all duration-400"
                                onClick={onClose}>
                                <RxCross2 className='dark:text-bg text-secondary' size={16} />
                            </div>
                        </div>
                        <div className='w-full px-4 pt-1'>
                            <div className='bg-[#2F3D40] border w-full flex flex-col items-start border-[#00FEB54D] rounded-lg p-4'>
                                <Excel />
                                <h1 className='pt-2 text-2xl font-semibold text-secondary'>Payment Successful!</h1>
                                <p className='text-base text-[#C5C5C5] pt-2 leading-5'>
                                    You can now download your VIXSpike <span className='capitalize' >{type}</span> Data collection by clicking the button below. If you encounter any issues, feel free to reach out to our support team.
                                </p>
                            </div>
                            <div className="mt-8 bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] rounded-lg p-[1px] w-full">
                                <button className='text-primary w-full rounded-lg bg-bg hover:bg-bg/90 flex items-center gap-x-2 justify-center px-4 py-2 text-base font-semibold'>
                                    Download Now <LuDownload size={22} className={``} />
                                    <span className='bg-[#2E4853] text-base text-[#78CEF4] px-2.5 py-0.5 rounded-md'>.csv</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DownloadModal;