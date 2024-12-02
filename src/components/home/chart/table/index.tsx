import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface IndicatorData {
  [key: string]: number[];
}

interface Props {
  indicatorData: IndicatorData;
  activeIndicators: string[];
  nextMonths: string[];
}

interface RowData {
  [key: string]: string | number;
}

const VolatilityTable = ({
  indicatorData,
  activeIndicators,
  nextMonths,
}: Props) => {
  const { theme } = useTheme();
  const headers = [
    "Future Months",
    "VIX Index",
    "Last",
    "Open",
    "High",
    "Low",
    "Previous Close",
    "VIX1D Index",
    "VIX9D Index",
    "VIX3M Index",
    "VIX6M Index",
    "HV10",
    "HV20",
    "HV30",
  ];

  const filteredHeaders = [
    "Future Months",
    ...headers.filter((header) => activeIndicators.includes(header)),
  ];
  const data: RowData[] = nextMonths.map((month, index) => {
    const rowData: RowData = { "Future Months": month };

    activeIndicators.forEach((indicator) => {
      rowData[indicator] = indicatorData[indicator]?.[index] ?? "N/A";
    });

    return rowData;
  });

  return (
    <section id="table" className="pt-12">
      <div className="flex justify-center items-center border border-border">
        <h2 className="py-3.5 text-center text-lg font-medium sticky top-0 z-10 bg-white dark:bg-lightDark">
          Volatility Price
        </h2>
      </div>
      <div className={`overflow-x-auto relative ${theme === "dark" ? "customScrollbar" : "customScrollbarLight"}`}>
        <table className="min-w-full border border-border rounded-lg dark:text-secondary text-black relative">
          <thead className="dark:bg-lightDark bg-white relative">
            <tr>
              <th className="py-2.5 px-4 text-lg border border-border font-medium whitespace-nowrap sticky left-0 z-20 bg-white dark:bg-lightDark">
                Future Months
              </th>
              {filteredHeaders.length > 1 &&
                filteredHeaders.slice(1).map((header, index) => (
                  <th
                    key={index}
                    className="py-2 px-4 border border-border text-sm xxl:text-base font-medium whitespace-nowrap sticky top-0 z-10 bg-white dark:bg-lightDark"
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="dark:bg-darkBg bg-lightbg">
                <td className="py-4 px-4 border border-border text-center sticky left-0 z-10 bg-white dark:bg-lightDark">
                  {row["Future Months"]}
                </td>
                {filteredHeaders.length > 1
                  ? filteredHeaders.slice(1).map((header, idx) => (
                    <td
                      key={idx}
                      className="py-4 px-4 border text-sm xxl:text-base border-border text-center min-w-24"
                    >
                      {row[header] !== undefined ? row[header] : "N/A"}
                    </td>
                  ))
                  : index === 0 && (
                    <td
                      colSpan={filteredHeaders.length}
                      rowSpan={data.length}
                      className="py-4 px-4 border border-border text-center text-bg dark:text-secondary"
                    >
                      No indicators selected
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative pt-4 pb-2 flex justify-end">
        <Link
          href="/www.vixspike.com"
          className="dark:text-[#78817F] text-[#969696]"
        >
          www.vixspike.com
        </Link>
      </div>
    </section>
  );
};

export default VolatilityTable;
