/**
 * MDX Utility Placeholder.
 * This structure is ready for contentlayer or next-mdx-remote integration.
 */

export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
    // In a real scenario, use fs to read files from content/blog/*.mdx
    return [
        {
            title: "Hành trình xây dựng Code. Run. Repeat.",
            slug: "hanh-trinh-xay-dung",
            date: "2026-02-23",
            excerpt: "Chia sẻ về lý do và công nghệ đằng sau dự án này.",
            content: "Nội dung bài viết đang được cập nhật...",
            tags: ["Nextjs", "Project"],
        }
    ];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllPosts();
    return posts.find(p => p.slug === slug) || null;
}
