// Work around missing ES6 module support in localforage
export const localforage: LocalForage = require('localforage');
export const config: any = require('./config/config.json');

export class Blog {
    name: string;
    description: string;
    title: string;
    updated: number;
    url: string;
    posts: number;
    constructor(name?: string) {
        this.name = name;
    }
}

export interface Post {
    id: number;
    title: string;
    summary: string;
    body: string;
    date: Date;
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
    note_count: number;
    notes: Note[];
    replies: Note[];
    reblogs: Note[];
    likes: number;
}

export interface VideoPlayer {
    width: number;
    embed_code: string;
}

export interface Photo {
    alt_sizes: PhotoSize[];
    original_size: PhotoSize;
    caption: string;
}

export interface PhotoSize {
    height: number;
    width: number;
    url: string;
}

export interface Note {
    blog_name: string;
    blog_url: string;
    post_id: string;
    reblog_parent_blog_name?: string;
    reply_text?: string;
    added_text?: string;
    type: 'reblog' | 'like' | 'reply' | 'posted';
}

export interface Response {
    blog: Blog;
    posts: Post[];
    total_posts: number;
}
