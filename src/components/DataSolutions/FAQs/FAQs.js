"use client";
import { useEffect, useState } from "react";
import { faqs } from "./data";
import AccordionItem from "./AccordionItem";
import YearlyBill from "@/svgs/YearlyBill"
import Lock from "@/svgs/Lock"
import { GoArrowRight } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import CalenderModal from "../CalenderModal";
import SubscribeModal from "../SubscribeModal";
import UnSubscribeModal from "../UnSubscribeModal";
import Link from "next/link";

const FAQs = ({ className }) => {
  const [messageModal, setMesageSentModal] = useState(false);
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [unSubscribeModal, setUnSubscribeModal] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const handleSubscriptionToggle = () => {
    if (isSubscribed) {
      setUnSubscribeModal(true);
    } else {
      setSubscribeModal(true);
    }
  };

  const openMessageModal = () => {
    setMesageSentModal(true);
  };

  const closeCalenderModal = () => {
    setMesageSentModal(false);
  };

  const closeSubscribeModal = () => {
    setSubscribeModal(false);
    setIsSubscribed(true);
  };

  const closeUnSubscribeModal = () => {
    setUnSubscribeModal(false);
    setIsSubscribed(false)
  };

  useEffect(() => {
    if (messageModal || subscribeModal || unSubscribeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [messageModal, subscribeModal, unSubscribeModal]);

  return (
    <>
      <ul className={`list-none flex items-center justify-center w-full flex-col py-10 ${className}`}>
        <div className="w-full">
          <div className='border-b border-b-[#8C9492] pb-4 mb-6'>
            <h1 className='dark:text-primary text-darkGreen text-2xl'>PLATINUM</h1>
            <div className="w-full flex sm:flex-row flex-col sm:items-center justify-between">
              <h3 className='dark:text-secondary text-bg font-semibold text-3xl flex flex-wrap items-end'>$149.99
                <span className='text-xl pl-1 font-normal'> /per user</span>
              </h3>
              <div className="flex flex-wrap justify-end items-center gap-2 sm:mt-0 mt-2">
                {isSubscribed && (
                  <p className="dark:bg-primary bg-bg dark:text-bg text-primary flex items-center font-semibold text-base gap-x-1 px-3 py-0.5 rounded-lg"><IoIosCheckmarkCircle /> Subscription Active</p>
                )}
                <p className="dark:bg-[#2E4853] bg-[#fff] text-[#78CEF4] dark:border-0 border border-[#D0D0D0] flex items-center font-semibold text-base gap-x-2 px-3 py-0.5 rounded-lg"><YearlyBill /> Billed Yearly</p>
              </div>
            </div>
          </div>
          {faqs.map((faq, index) => (
            <AccordionItem
              onToggle={() => handleToggle(index)}
              active={clicked === index}
              key={index}
              faq={faq}
            />
          ))}
          <div className="flex sm:flex-row flex-col items-center gap-4 w-full justify-between mt-10">
            <button className='w-full border dark:border-[#78CEF4] border-[#5DA0F7] text-base font-semibold rounded-xl py-2 flex flex-row 
            items-center gap-x-2 justify-center dark:text-[#78CEF4] text-[#5DA0F7] dark:hover:bg-[#3f464a60] hover:bg-[#fff]' onClick={openMessageModal}>Download Data Sample
              <LuDownload size={20} className='dark:text-[#78CEF4] text-[#5DA0F7]' />
            </button>
            <Link href={"/contact-us"} className='w-full border dark:border-secondary border-bg text-base font-semibold rounded-xl py-2 flex flex-row 
              items-center gap-x-2 justify-center dark:text-secondary text-bg dark:hover:bg-[#3f464a60] hover:bg-[#fff]'>Contact For Business
              <GoArrowRight size={16} className='dark:text-secondary text-bg' />
            </Link>
          </div>
          <div className={`${isSubscribed
            ? "bg-gradient-to-b dark:from-white from-bg dark:to-white to-bg"
            : "bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0]"} rounded-xl p-[1px] sm:mt-2 mt-4`}>
            <button type="button"
              onClick={handleSubscriptionToggle}
              className={`flex flex-row gap-x-2 ${isSubscribed ? 'dark:text-white text-bg dark:hover:bg-[#3f464a] hover:bg-[#fff]' : 'dark:text-primary text-[#00A475] dark:hover:bg-[#3f464a] hover:bg-[#fff]'} 
              text-base font-semibold py-2 justify-center items-center rounded-xl dark:bg-bg bg-[#fafafa] w-full`}>
              {isSubscribed ? 'Unsubscribe' : 'Get Access'}
              {isSubscribed ? <MdCancel className="dark:text-white text-bg mt-0.5" /> : <Lock className='dark:text-primary text-darkGreen' />}
            </button>
          </div>
          <p className='flex flex-row items-center gap-x-2 justify-end pt-2 text-sm dark:text-[#D4D4D4] text-bg'>Need help? Ask <GoArrowRight /></p>
        </div>
      </ul>
      <CalenderModal isOpen={messageModal} onClose={closeCalenderModal} />
      <SubscribeModal isOpen={subscribeModal} onClose={closeSubscribeModal} />
      <UnSubscribeModal isOpen={unSubscribeModal} onClose={closeUnSubscribeModal} />
    </>
  );
};

export default FAQs;
