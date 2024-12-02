import React from 'react'

const Star = ({ width, height, className }) => {
    const defaultWidth = width ? width : 24
    const defaultHeight = height ? height : 24

    return (
        <svg width={defaultWidth} height={defaultHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
            <path d="M12 1C12 1 10.3594 5.64064 8 8C5.64064 10.3594 1 12 1 12C1 12 5.64064 13.6406 8 16C10.3594 18.3594 12 23 12 23C12 23 13.6406 18.3594 16 16C18.3594 13.6406 23 12 23 12C23 12 18.3594 10.3594 16 8C13.6406 5.64064 12 1 12 1Z" fill="currentColor" />
        </svg>
    )
}

export default Star