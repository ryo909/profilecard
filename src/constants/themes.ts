import type { ThemeKey } from "../types/card";

export const THEMES: Record<
  ThemeKey,
  {
    label: string;
    accent: string;
    accentDeep: string;
    soft: string;
    sticky: string;
    chip: string;
  }
> = {
  sage: {
    label: "セージ",
    accent: "#6F8F5C",
    accentDeep: "#49633F",
    soft: "#CFE2D0",
    sticky: "#F7D8B5",
    chip: "#DCE8D6",
  },
  mint: {
    label: "ミント",
    accent: "#5F927F",
    accentDeep: "#386858",
    soft: "#D7EAE2",
    sticky: "#F3D8B7",
    chip: "#D7EAE2",
  },
  apricot: {
    label: "アプリコット",
    accent: "#C8794A",
    accentDeep: "#895136",
    soft: "#F4D7BD",
    sticky: "#F8DFB1",
    chip: "#F7D8B5",
  },
  lavender: {
    label: "ラベンダー",
    accent: "#7B789D",
    accentDeep: "#555273",
    soft: "#DEDBEC",
    sticky: "#F2D5B8",
    chip: "#E8E4F0",
  },
};

export const TEMPLATE_OPTIONS = [
  {
    value: "classic",
    label: "ノートクラシック",
    description: "基本のノート風",
  },
  {
    value: "conversation",
    label: "会話きっかけ型",
    description: "話題を大きく表示",
  },
  {
    value: "clean",
    label: "すっきりプロフィール型",
    description: "社員向けに整える",
  },
  {
    value: "collage",
    label: "付箋コラージュ型",
    description: "少し楽しい印象",
  },
] as const;
