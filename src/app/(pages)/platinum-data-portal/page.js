import Section from '@/components/shared/common/section'
import Dashboard from '@/svgs/Dashboard'
import React from 'react'

const page = () => {
    return (
        <Section>
            <div className='bg-bg border border-[#4E5357] shadow-xl rounded-xl px-6 py-4 mt-10 mb-10'>
                <div className='flex flex-row items-center gap-x-2'>
                    <Dashboard />
                    <h1 className='text-[40px] font-semibold bg-gradient-to-l from-[#00FEB5] to-[#78CEF4] bg-clip-text text-transparent'>PLATINUM DATA PORTAL</h1>
                </div>
                <p className='text-[#C5C5C5] text-base -mt-2'>
                    Select the desired data type, date, and frequency to generate and download a customized data file.
                </p>
                <div>
                    <div className='bg-darkBg rounded-xl border border-[#495056]'>
                        <div className='bg-[#495056] px-3 py-2'>
                            <p className='text-secondary text-2xl font-semibold'>Data Type</p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default page