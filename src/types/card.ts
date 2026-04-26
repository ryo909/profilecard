export type ParticipantType = "student" | "employee" | "other";
export type ThemeKey = "sage" | "mint" | "apricot" | "lavender";
export type LayoutKey = "photo" | "info";
export type ImageShape = "rounded" | "circle";

export interface CardData {
  name: string;
  affiliation: string;
  participantType: ParticipantType;
  supplement: string;
  tagline: string;
  interest: string;
  topics: string;
  tags: string[];
  imageDataUrl: string | null;
  imageName: string;
  theme: ThemeKey;
  layout: LayoutKey;
  imageShape: ImageShape;
}
