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

export interface Post{
    id: number;
    title: string;
    summary: string;
    body: string;
    date: any;
    type: string;
    format: string;
    post_url: string;
    tags: string[];
    player?: VideoPlayer[] | string;
    photos?: Photo[];
    caption?: string;
    question?: string;
    answer?: string;
    source?: string;
    text?: string;
    excerpt?: string;
}

export interface VideoPlayer{
    width: number;
    embed_code: string;
}

export interface Photo{
    alt_sizes: PhotoSize[];
    original_size: PhotoSize;
    caption: string;
}

export interface PhotoSize{
    height: number;
    width: number;
    url: string;
}

export interface Response{
    blog: Blog;
    posts: Post[];
    total_posts: number;
}