import { useRef, useState } from "react";
import AppHeader from "./components/AppHeader";
import CreatorLayout from "./components/CreatorLayout";
import IntroScreen from "./components/IntroScreen";
import type { CardData } from "./types/card";
import type { TemplateKey } from "./types/card";
import { INITIAL_TAGS } from "./constants/tags";

const initialCard: CardData = {
  name: "山田 花子",
  affiliation: "人事部 採用チーム",
  participantType: "employee",
  supplement: "入社2年目",
  tagline: "好奇心旺盛な行動派！",
  interest: "休日のカフェ巡りと、韓国ドラマを見ること",
  topics: "おすすめのカフェ / 旅行 / 映画",
  tags: INITIAL_TAGS,
  imageDataUrl: null,
  imageName: "",
  theme: "sage",
  layout: "classic",
  imageShape: "rounded",
};

export default function App() {
  const [mode, setMode] = useState<"intro" | "creator">("intro");
  const [card, setCard] = useState<CardData>(initialCard);
  const previewRef = useRef<HTMLDivElement>(null);

  const resetCard = () => {
    setCard(initialCard);
  };

  const startCreator = (template: TemplateKey = "classic") => {
    setCard({ ...card, layout: template });
    setMode("creator");
  };

  return (
    <div className="app-shell">
      <AppHeader
        isCreator={mode === "creator"}
        onHome={() => setMode("intro")}
        onReset={resetCard}
      />
      {mode === "intro" ? (
        <IntroScreen onStart={startCreator} />
      ) : (
        <CreatorLayout
          card={card}
          previewRef={previewRef}
          onChange={setCard}
          onReset={resetCard}
        />
      )}
    </div>
  );
}
