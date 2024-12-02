import React, { ReactNode } from "react";

const Section = ({ children, className, }: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div className={` w-full xl:px-32 lg:px-16 md:px-20 px-5 relative ${className || ""}`}>
            {children}
        </div>
    );
};

export default Section;