import React from 'react';

type StatHeadingProps = {
    title: string;
};

const StatHeading: React.FC<StatHeadingProps> = ({ title }) => {
    return (
        <div>
            <div className="border-l-4 lg:w-36 w-36 dark:border-primary border-darkGreen rounded bg-white dark:bg-lightDark lg:py-4 py-3 pl-4 text-lg font-semibold lg:text-xl text-black dark:text-secondary">
                {title}
            </div>
        </div>
    );
};

export default StatHeading;
