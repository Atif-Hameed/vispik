import React from 'react'
import LiveDataSvg from "@/svgs/LiveDataSvg"
import DarkLiveDataSvg from "@/svgs/DarkLiveDataSvg"
import FAQs from '@/components/DataSolutions/FAQs/FAQs'
import { useTheme } from "next-themes";

const LiveData = () => {
    const { theme } = useTheme();

    return (
        <section className={`flex items-center justify-center xl:px-32 lg:px-10 md:px-20 px-5 dark:mb-16 dark:pb-10 pb-20 ${theme === "dark" && "dataSolutionShadow"}`}>
            <div className='xl:w-4/5 lg:w-[90%] w-full mt-10 rounded-[20px] border dark:border-[#00FEB533] border-[#00A47580] sm:px-10 px-6
                flex lg:flex-row flex-col-reverse gap-x-6 bg-gradient-to-b dark:from-[#00FEB50D] from-[#fafafa] 
                dark:to-[#282d31] to-[#fafafa] relative shadow-xl lg:max-w-full max-w-2xl'>
                <div className='lg:w-[46%] w-full flex lg:mt-24 justify-center sm:my-4 mb-4'>
                    <LiveDataSvg />
                    <DarkLiveDataSvg />
                </div>
                <div className='lg:w-[54%] w-full'>
                    <FAQs className={''} />
                </div>
            </div>
        </section>
    )
}

export default LiveData