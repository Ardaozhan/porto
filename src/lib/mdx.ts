import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectFrontmatterSchema, ValidatedProjectMetadata } from "./zod-schemas";

const contentDirectory = path.join(process.cwd(), "content", "projects");

export interface Project {
    slug: string;
    metadata: ValidatedProjectMetadata;
    content: string;
}

export function getProjectBySlug(slug: string): Project {
    try {
        const realSlug = slug.replace(/\.mdx$/, "");
        const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            throw new Error(`MDX file not found for slug: ${realSlug}`);
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Zod validation runs server-side during the MDX parsing phase.
        // If a project is missing a required property (like title or cover_image), parsing fails here preventing deployment.
        const metadata = ProjectFrontmatterSchema.parse(data);

        return { slug: realSlug, metadata, content };
    } catch (error) {
        console.error(`Error processing MDX file for slug ${slug}:`, error);
        throw error;
    }
}

export function getAllProjects(): Project[] {
    if (!fs.existsSync(contentDirectory)) return [];

    const files = fs.readdirSync(contentDirectory);

    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => getProjectBySlug(file))
        .sort((a, b) => (new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1));
}
