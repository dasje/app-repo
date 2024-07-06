import { TypeOf, object, string } from "zod";

export type findByNameSchema = {
  mediaName: string;
};

export type OMDBResSchema = {
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Poster?: string;
  Production?: string;
  Rated?: string;
  Ratings?: { Source: string; value: string }[];
  Released?: string;
  Response?: string;
  Runtime?: string;
  Title?: string;
  Type?: string;
  Website?: string;
  Writer?: string;
  Year?: string;
  imdbID?: string;
  imdbRating?: string;
  imdbVotes?: string;
};

export const findMediaByNameSchema = object({
  mediaName: string({
    required_error: "Media name is required",
  }).min(1, "Media name is required"),
});

export type MediaName = TypeOf<typeof findMediaByNameSchema>;
