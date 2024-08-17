import {useEffect, useState} from "react";
import axios from "axios";
import Article from "@/components/article";

const Feed = () => {
    const [articles, setArticles] = useState<Article[] | null>(null)

    useEffect(() => {
        (async () => {
            const {data} = await axios.get("/api/article/list")

            setArticles(data);
        })()
    }, []);

    return <div className="flex flex-col items-center">
        {articles && articles.map(article => (
            <Article {...article} key = {article.id}/>
        ))}
    </div>
}

export default Feed;