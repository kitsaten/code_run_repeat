export interface BlogPostPreview {
    title: string;
    excerpt: string;
    tag: string;
    slug?: string;
    date?: string;
}

export interface BlogPost extends BlogPostPreview {
    slug: string;
    date: string;
    content: string;
    tags: string[];
}
