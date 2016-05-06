export class Blog {
    name: string;
    description: string;
    title: string;
    updated: number;
    url: string;
    posts: number;
}

export class Post{
    id: number;
    title: string;
    summary: string;
    body: string;
    date: string;
    type: string;
    format: string;
    post_url: string;
    tags: string[];
}

export class Response{
    blog: Blog;
    posts: Post[];
}