// 'use client'
// import React, { useState } from 'react';
// import { RxCross2 } from "react-icons/rx";
// import Tick from "@/svgs/Tick";
// import APILockDark from "@/svgs/APILockDark";
// import APILockLight from "@/svgs/APILockLight";
// import { GoArrowRight } from "react-icons/go";

// interface EnterAPIModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const EnterAPIModal: React.FC<EnterAPIModalProps> = ({ isOpen, onClose }) => {
//     const [apiKey, setApiKey] = useState("");

//     return (
//         <>
//             {isOpen && (
//                 <div className="modal-overlay flex-col flex items-center justify-center fixed top-0 left-0 
//                     pt-6 w-screen h-screen z-50 lg:px-0 md:px-6 sm:px-8 px-6 overflow-auto">
//                     <div className="relative max-w-lg w-full modal flex flex-col dark:bg-bg bg-[#F5F5F5] rounded-xl z-50 shadow-2xl shadow-[#00000066]">
//                         <div className='w-full flex justify-end'>
//                             <div className="md:w-6 w-5 md:h-6 h-5 rounded-full dark:bg-secondary bg-bg cursor-pointer flex items-center justify-center md:-mt-2.5 -mt-1.5 md:-mr-2.5 -mr-1.5"
//                                 onClick={onClose}>
//                                 <RxCross2 className='dark:text-bg text-secondary' size={16} />
//                             </div>
//                         </div>
//                         <div className='w-full px-4 pt-1'>
//                             <div className='dark:bg-[#2F3D40] bg-[#00BF8826] border w-full flex flex-col items-start dark:border-[#00FEB54D] border-darkGreen rounded-lg p-4'>
//                                 <APILockDark />
//                                 <APILockLight />
//                                 <h1 className='pt-2 text-2xl font-semibold dark:text-secondary text-bg'>Enter your API key</h1>
//                                 <p className='text-base dark:text-[#C5C5C5] text-[#707070] pt-2 leading-5'>
//                                     Enter the API key from your subscription confirmation email to access the Platinum Data Portal.
//                                 </p>
//                                 <div className='flex sm:flex-row flex-col sm:items-center justify-between w-full gap-x-2 gap-y-4 mt-10'>
//                                     <input
//                                         name='API_KEY'
//                                         value={apiKey}
//                                         onChange={(e) => setApiKey(e.target.value)}
//                                         type="text"
//                                         placeholder="Enter API key here..."
//                                         className="w-full max-w-[22rem] dark:bg-darkBg bg-[#F5F5F5] border dark:border-secondary border-[#D4D4D4] dark:text-primary 
//                                         text-darkGreen text-sm rounded-xl px-3 h-11 outline-none dark:focus:border-primary focus:border-darkGreen"
//                                     />
//                                     <div className="w-fit bg-gradient-to-b dark:from-[#00FEB5] from-transparent dark:to-[#78CEF4] to-transparent dark:border-none border border-darkGreen rounded-xl p-[1px] self-end">
//                                         <button className='dark:text-primary text-darkGreen rounded-xl dark:bg-bg bg-transparent flex items-center gap-x-2 justify-center px-4 h-10 text-base font-semibold'>
//                                             Continue <GoArrowRight className='dark:text-primary text-darkGreen' />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                             <p className='text-xl dark:text-secondary text-bg font-semibold pt-8'>What is Platinum Data Portal?</p>
//                             <p className='text-base text-bg dark:text-[#A2A2A2] pt-2 flex gap-x-2 leading-5'>
//                                 <span className='mt-1'><Tick className={"dark:text-primary text-darkGreen"} width={14} height={14} /></span>
//                                 <span className='w-full'>Unlock exclusive access to the Platinum Data Portal, a subscription-based service offering the comprehensive VIXSpike database.</span>
//                             </p>
//                             <p className='text-base text-bg dark:text-[#A2A2A2] pt-2 flex gap-x-2 leading-5'>
//                                 <span className='mt-1'><Tick className={"dark:text-primary text-darkGreen"} width={14} height={14} /></span>
//                                 <span className='w-full'>Get real-time and historical data with an interactive platform and API connectivity for seamless integration.</span>
//                             </p>
//                             <div className='flex flex-row gap-y-2 items-center justify-between w-full dark:bg-[#4C778A80] bg-[#93B9EB80] border dark:border-[#78CEF480] border-[#93B9EB80] 
//                                 rounded-lg md:mt-10 mt-8 mb-4 px-4 py-1.5'>
//                                 <p className='dark:text-[#FFFFFF] text-bg text-base font-semibold'>Want to join?</p>
//                                 <button className='dark:text-[#78CEF4] text-[#5DA0F7] rounded-lg dark:bg-bg bg-[#F5F5F5] flex items-center gap-x-2 justify-center px-4 py-2 text-sm font-medium w-fit self-end'>
//                                     Learn More <GoArrowRight className='dark:text-[#78CEF4] text-[#5DA0F7]' />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default EnterAPIModal;

'use client'
import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Tick from "@/svgs/Tick";
import APILockDark from "@/svgs/APILockDark";
import APILockLight from "@/svgs/APILockLight";
import { GoArrowRight } from "react-icons/go";

interface EnterAPIModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EnterAPIModal: React.FC<EnterAPIModalProps> = ({ isOpen, onClose }) => {
    const [apiKey, setApiKey] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
        // Simulate API key validation
        if (apiKey !== "correct-api-key") {
            setError("This API key is incorrect, try again or");
        } else {
            setError("");
            // Proceed with valid API key
        }
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay flex-col flex items-center justify-center fixed top-0 left-0 
                    pt-6 w-screen h-screen z-50 lg:px-0 md:px-6 sm:px-8 px-6 overflow-auto">
                    <div className="relative max-w-lg w-full modal flex flex-col dark:bg-bg bg-[#F5F5F5] rounded-xl z-50 shadow-2xl shadow-[#00000066]">
                        <div className='w-full flex justify-end'>
                            <div className="md:w-6 w-5 md:h-6 h-5 rounded-full dark:bg-secondary bg-bg cursor-pointer flex items-center justify-center md:-mt-2.5 -mt-1.5 md:-mr-2.5 -mr-1.5"
                                onClick={onClose}>
                                <RxCross2 className='dark:text-bg text-secondary' size={16} />
                            </div>
                        </div>
                        <div className='w-full px-4 pt-1'>
                            <div className='dark:bg-[#2F3D40] bg-[#00BF8826] border w-full flex flex-col items-start dark:border-[#00FEB54D] border-darkGreen rounded-lg p-4'>
                                <APILockDark />
                                <APILockLight />
                                <h1 className='pt-2 text-2xl font-semibold dark:text-secondary text-bg'>Enter your API key</h1>
                                <p className='text-base dark:text-[#C5C5C5] text-[#707070] pt-2 leading-5'>
                                    Enter the API key from your subscription confirmation email to access the Platinum Data Portal.
                                </p>
                                <div className='flex sm:flex-row flex-col sm:items-center justify-between w-full gap-x-2 gap-y-4 mt-10'>
                                    <input
                                        name='API_KEY'
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        type="text"
                                        placeholder="Enter API key here..."
                                        className={`w-full max-w-[22rem] dark:bg-darkBg bg-[#F5F5F5] border ${error ? 'border-[#FF5166] text-[#FF5166]' : 'dark:border-secondary border-[#D4D4D4] dark:text-primary text-darkGreen'} text-sm rounded-xl px-3 h-11 outline-none dark:focus:border-primary focus:border-darkGreen`}
                                    />
                                    <div className="w-fit bg-gradient-to-b dark:from-[#00FEB5] from-transparent dark:to-[#78CEF4] to-transparent dark:border-none border border-darkGreen rounded-xl p-[1px] self-end">
                                        <button
                                            onClick={handleContinue}
                                            className='dark:text-primary text-darkGreen rounded-xl dark:bg-bg bg-transparent flex items-center gap-x-2 justify-center px-4 h-10 text-base font-semibold'
                                        >
                                            Continue <GoArrowRight className='dark:text-primary text-darkGreen' />
                                        </button>
                                    </div>
                                </div>
                                {error && (
                                    <p className='text-[#FF5166] text-xs mt-2'>{error}
                                        <span className='underline dark:text-[#D4D4D4] text-[#707070]'>contact us here</span></p>
                                )}
                            </div>
                            <p className='text-xl dark:text-secondary text-bg font-semibold pt-8'>What is Platinum Data Portal?</p>
                            <p className='text-base text-bg dark:text-[#A2A2A2] pt-2 flex gap-x-2 leading-5'>
                                <span className='mt-1'><Tick className={"dark:text-primary text-darkGreen"} width={14} height={14} /></span>
                                <span className='w-full'>Unlock exclusive access to the Platinum Data Portal, a subscription-based service offering the comprehensive VIXSpike database.</span>
                            </p>
                            <p className='text-base text-bg dark:text-[#A2A2A2] pt-2 flex gap-x-2 leading-5'>
                                <span className='mt-1'><Tick className={"dark:text-primary text-darkGreen"} width={14} height={14} /></span>
                                <span className='w-full'>Get real-time and historical data with an interactive platform and API connectivity for seamless integration.</span>
                            </p>
                            <div className='flex flex-row gap-y-2 items-center justify-between w-full dark:bg-[#4C778A80] bg-[#93B9EB80] border dark:border-[#78CEF480] border-[#93B9EB80] 
                                rounded-lg md:mt-10 mt-8 mb-4 px-4 py-1.5'>
                                <p className='dark:text-[#FFFFFF] text-bg text-base font-semibold'>Want to join?</p>
                                <button className='dark:text-[#78CEF4] text-[#5DA0F7] rounded-lg dark:bg-bg bg-[#F5F5F5] flex items-center gap-x-2 justify-center px-4 py-2 text-sm font-medium w-fit self-end'>
                                    Learn More <GoArrowRight className='dark:text-[#78CEF4] text-[#5DA0F7]' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EnterAPIModal;
