'use client'
import React from 'react'
import logo from "/public/assets/logo.svg";
import Image from 'next/image';
import Link from 'next/link';
import LinkedIn from "@/svgs/Linkedin"
import Twitter from "@/svgs/Twitter"

const menuItems = [
    { label: "Vix Term Months", url: "/" },
    { label: "VIX Historical Prices", url: "/historical-prices" },
    { label: "Data Solutions", url: "/data-solutions" },
    { label: "Contact Us", url: "/contact-us" },
];

const Footer = () => {
    return (
        <div className="w-full bg-bg py-2">
            <footer className={`xl:px-32 lg:px-16 md:px-20 px-5 flex md:flex-row flex-col justify-between md:items-center mx-auto py-2 relative w-full z-20 gap-y-6`}>
                <Link href="/">
                    <Image src={logo} alt="logo" className="hover:scale-105 duration-300 transition-all w-28" />
                </Link>
                <div className='flex sm:flex-row flex-col lg:gap-6 gap-5'>
                    {menuItems.map((item) => (
                        <Link key={item.label} href={item.url}
                            className={`hover:scale-105 hover:text-primary duration-300 transition-all text-secondary text-sm`}>
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className='flex gap-[14px] items-center'>
                    <LinkedIn />
                    <Twitter />
                </div>
            </footer>
        </div>
    )
}

export default Footer