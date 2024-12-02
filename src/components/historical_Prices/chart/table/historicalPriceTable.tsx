import React from 'react';

interface IndicatorData {
    [key: string]: number[];
}

interface Props {
    indicatorData: IndicatorData;
    activeIndicators: string[];
    next7Months: string[];
}

interface RowData {
    [key: string]: string | number;
}

const HistoricalPriceTable = () => {
    // const HistoricalPriceTable = ({ indicatorData, activeIndicators, next7Months }: Props) => {

    const headers = [
        "Days to Expiration",
        "March 26, 2007",
        "April 4, 2024",
        "Today",
    ];

    // Updated data format
    const data = [
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
        { days: 5, march26: 50.99, april4: 0.99, today: 0.99 },
    ];

    // const filteredHeaders = [
    //     "Future Months",
    //     ...headers.filter((header) => activeIndicators.includes(header)),
    // ];
    // const data: RowData[] = next7Months.map((month, index) => {
    //     const rowData: RowData = { "Future Months": month };

    //     activeIndicators.forEach((indicator) => {
    //         rowData[indicator] = indicatorData[indicator]?.[index] ?? "N/A";
    //     });

    //     return rowData;
    // });

    return (
        <div id="historicalTable" className="overflow-x-auto py-10">
            <table className="min-w-full border border-border rounded-lg dark:text-secondary text-black">
                <thead className='dark:bg-lightDark bg-white'>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="py-2 px-4 border border-border font-medium">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="dark:bg-darkBg bg-lightbg">
                            <td className="py-2 px-4 border border-border text-center">{row.days}</td>
                            <td className="py-2 px-4 border border-border text-center">{row.march26}</td>
                            <td className="py-2 px-4 border border-border text-center">{row.april4}</td>
                            <td className="py-2 px-4 border border-border text-center">{row.today}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoricalPriceTable;
