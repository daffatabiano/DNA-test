interface Maintype {
    children: React.ReactNode;
    className?: string;
}

interface Article {
    source: { id: string | null; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface ApiResponse {
    status: string | number;
    totalResults: number;
    articles: Article[];
}
