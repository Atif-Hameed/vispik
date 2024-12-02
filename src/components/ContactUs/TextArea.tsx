import React, { useState } from 'react';

interface TextAreaProps {
    placeholder: string;
    name: string;
    value: string;
    rows: number;
    cols: number;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ placeholder, name, value, onChange, rows, cols, error }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div className="relative w-full mt-[1.2rem] py-2 flex flex-col overflow-hidden">
            <div className='flex flex-row overflow-hidden'>
                <textarea
                    name={name}
                    id={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    rows={rows}
                    cols={cols}
                    className={`block py-2.5 px-0 w-full lg:text-xl text-lg text-textGrey bg-transparent border-0 border-b-2 appearance-none 
                    focus:outline-none focus:ring-0 dark:focus:!border-primary peer focus:!border-[#00BF88] resize-none
                    ${error ? 'dark:border-b-[#FF5166] border-b-[#FF5166]' : 'dark:border-b-secondary border-b-[#707070]'}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isFocused && (
                    <div className="bottom-8 left-0 ml-4 h-0.5 w-full dark:bg-primary bg-darkGreen absolute blur-[1rem]" />
                )}
            </div>
            {error && <p className="text-[#FF5166] text-xs pl-2 pt-1 z-20 relative">Please complete this required field</p>}
        </div>
    );
};

export default TextArea;