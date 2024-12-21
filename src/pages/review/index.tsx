import {useEffect, useState} from "react";
import axios from "axios";
import Article from "@/components/article";
import {FaRegPenToSquare} from "react-icons/fa6";
import Link from "next/link";

const Page = () => {
    const [articles, setArticles] = useState<Article[] | null>(null)

    useEffect(() => {
        (async () => {
            const {data} = await axios.get("/api/article/list")

            setArticles(data);
        })()
    }, []);

    return <div className="flex flex-col items-center">
        {articles && articles.map(article => (
            <Article {...article} key={article.id}/>
        ))}
        <Link href="/review/write"
            className="fixed bottom-10 right-20 border-2 border-gray-600 rounded-full p-3 cursor-pointer hover:text-gray-500 hover:border-gray-500">
            <FaRegPenToSquare className="w-6 h-6"/>
        </Link>
    </div>
}

export default Page;