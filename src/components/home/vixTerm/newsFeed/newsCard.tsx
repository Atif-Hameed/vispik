import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdArrowOutward } from 'react-icons/md';

interface NewsCardProps {
    image: string;
    date: string;
    title: string;
    category: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, date, title, category }) => {
    return (
        <div className="group bg-gradient-to-t dark:from-[#282d31] dark:hover:from-[#384146] dark:to-[#00FEB514] dark:hover:to-[#00FEB514] 
           hover:from-[#fff] hover:to-[#fff] border dark:border-0 border-[#D0D0D0] hover:border-[#fff] p-2 rounded-xl overflow-hidden 
            shadow-md dark:shadow-none relative">
            <Image src={image} alt={title} className="w-full h-48 rounded-lg object-cover" />
            <div className="p-4">
                <p className="text-sm xxl:text-base dark:text-[#979F9D] text-black">{date}</p>
                <h3 className=" lg:text-xl xxl:text-2xl text-lg text-black dark:text-secondary font-semibold">{title}</h3>
                <div className="flex items-center gap-3 flex-wrap justify-between pt-3">
                    <p className="text-base dark:text-[#979F9D] text-black">{category}</p>
                    <Link href={''} className="hidden group-hover:flex text-base font-medium gap-2 items-center dark:text-primary text-darkGreen">
                        Read more <MdArrowOutward className="dark:text-primary text-darkGreen text-lg" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;