"use client"
import React, { useState, useEffect } from 'react';
import { GoMoveToStart } from "react-icons/go";

const Upward = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='relative z-50'>
            {showScrollButton && (
                <div onClick={scrollToTop}
                    className='fixed bottom-28 right-6 bg-myBlue p-2 rounded shadow cursor-pointer button dark:bg-bg bg-white'>
                    <GoMoveToStart size={24} className='rotate-90' />
                </div>
            )}
        </div>
    );
}

export default Upward;
