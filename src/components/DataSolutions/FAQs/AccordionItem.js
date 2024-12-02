import React, { useRef, useEffect, useState } from "react";
import styles from "./faq.module.css";
import { IoChevronUpOutline } from "react-icons/io5";

const AccordionItem = ({ faq, active, onToggle }) => {
  const { question, answer } = faq;

  const contentEl = useRef();
  const [contentHeight, setContentHeight] = useState("0px");

  useEffect(() => {
    setContentHeight(active ? `${contentEl.current?.scrollHeight}px` : "0px");
  }, [active]);

  return (
    <li className={`w-full my-2`}>
      <button onClick={onToggle}
        className="dark:bg-[#2a3d40] bg-[#ffffff] rounded-lg px-2.5 text-lg font-semibold dark:text-secondary text-bg flex w-full justify-between outline-none gap-x-4 text-start 
        items-center py-1.5 cursor-pointer dark:border-0 border border-[#D0D0D0]">
        {question}
        <span>{active
          ? <IoChevronUpOutline className={`dark:text-secondary`} />
          : <IoChevronUpOutline className={`rotate-180 dark:text-secondary`} />}
        </span>
      </button>
      <div ref={contentEl} className={`${styles.answer_wrapper}`}
        style={{ height: contentHeight }}
      >
        <div className="pt-3 text-base dark:text-[#C5C5C5] text-[#707070] pl-4">
          {answer}
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;