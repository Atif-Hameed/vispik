import React, { useState } from 'react';

interface InputFieldProps {
    placeholder: string;
    type: string;
    name: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, type, name, value, onChange, error }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div className="relative w-full mt-4 py-2 flex flex-col overflow-hidden">
            <div className='flex flex-row'>
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`block py-2.5 px-0 w-full lg:text-xl text-lg bg-transparent border-0 border-b-2 appearance-none 
                    focus:outline-none focus:ring-0 dark:focus:!border-primary focus:!border-[#00BF88]
                    ${error ? '!dark:border-b-[#FF5166] !border-b-[#FF5166]' : 'dark:border-b-secondary border-b-[#707070]'}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            {error && <p className="text-[#FF5166] text-xs pl-2 pt-1 z-20 relative">Please complete this required field</p>}
            {isFocused && (
                <div className="bottom-8 left-0 h-0.5 ml-4 w-full dark:bg-primary bg-darkGreen absolute blur-[1rem]" />
            )}
        </div>
    );
};

export default InputField;