import React from 'react'

const Minimize = ({ className }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M13 13L19 19M13 13V17.8M13 13H17.8M7 17.8V13M7 13H2.2M7 13L1 19M13 2.2V7M13 7H17.8M13 7L19 1M7 2.2V7M7 7H2.2M7 7L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default Minimize