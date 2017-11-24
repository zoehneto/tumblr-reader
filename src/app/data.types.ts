export const config: any = require('../assets/config/config.json');

export class Settings {
    lastUpdated: Date;
    updatedInDays: number;
    blogs: Blog[];
    constructor(date?: Date) {
        this.lastUpdated = date ? date : new Date();
        this.updatedInDays = 0;
        this.blogs = [];
    }
}

/* tslint:disable:variable-name */
export class Blog {
    name: string;
    description: string;
    title: string;
    updated: Date;
    url: string;
    posts: number;
    constructor(name: string) {
        this.name = name;
    }
}

export class Post {
    id: number;
    title: string;
    description?: string;
    summary: string;
    body: string;
    date: Date;
    type: string;
    format: string;
    post_url: string;
    tags: string[];
    player?: VideoPlayer[] | string;
    photos?: Photo[];
    audio_url?: string;
    artist?: string;
    album?: string;
    track_name?: string;
    year?: string;
    album_art?: string;
    caption?: string;
    question?: string;
    answer?: string;
    source?: string;
    text?: string;
    excerpt?: string;
    note_count: number;
    notes?: Note[];
    replies: Note[];
    reblogs: Note[];
    likes: number;
    asking_url?: string;
    asking_name?: string;
    dialogue?: Dialogue;
    publisher?: string;
    source_url?: string;
    reblogged_from_name?: string;
    reblogged_from_url?: string;
}

export interface Dialogue {
    label: string;
    phrase: string;
}

export interface VideoPlayer {
    width: number;
    embed_code: string;
}

export class Photo {
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

export interface ResponseWrapper {
    meta: Meta;
    response: Response;
}

export interface Meta {
    status: number;
    msg: string;
}

export interface Response {
    blog: Blog;
    posts: Post[];
    total_posts: number;
}
/* tslint:enable:variable-name */
