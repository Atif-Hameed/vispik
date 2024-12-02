import React from 'react'
import { newsData } from './data'
import NewsCard from './newsCard'
import { useTheme } from "next-themes";

type Props = {}

const NewsFeed = (props: Props) => {
    const { theme } = useTheme();

    return (
        <section className={`dark:bg-bg bg-white p-5 w-full dark:border-2 dark:border-[#2e353a] dark:border-t-0 
            ${(theme as string) === 'dark' && "dataSolutionShadow"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-4">
                {newsData.map((news, index) => (
                    <NewsCard
                        key={index}
                        image={news.img}
                        date={news.date}
                        title={news.tilte}
                        category={news.category}
                    />
                ))}
            </div>
        </section>
    )
}

export default NewsFeed