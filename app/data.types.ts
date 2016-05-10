//Work around missing ES6 module support in localforage
declare var require: any;
export const localforage:LocalForage = require("localforage");

export class Blog {
    constructor(name?:string) {
        this.name = name;
    }

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