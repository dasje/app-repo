import { TypeOf, object, string } from "zod";

export type findByNameSchema = {
  mediaName: string;
};

export const findMediaByNameSchema = object({
  mediaName: string({
    required_error: "Media name is required",
  }).min(1, "Media name is required"),
});

export type MediaName = TypeOf<typeof findMediaByNameSchema>;
