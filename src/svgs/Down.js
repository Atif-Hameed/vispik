import React from 'react'

const Down = ({ className, onClick }) => {

    return (
        <svg width={'12'} height={'7'} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`} onClick={onClick}>
            <path d="M1 1L6 6L11 1" stroke={'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default Down