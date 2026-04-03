import { z } from "zod";

export const ProjectFrontmatterSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string(),
    cover_image: z.string().min(1, "Cover image is required"),
    client: z.string(),
    role: z.string(),
    tags: z.array(z.string()),
});

export type ValidatedProjectMetadata = z.infer<typeof ProjectFrontmatterSchema>;
