import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(5),
});