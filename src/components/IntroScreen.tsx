import { ArrowRight } from "lucide-react";
import CardPreview from "./CardPreview";
import type { CardData } from "../types/card";

interface IntroScreenProps {
  sample: CardData;
  onStart: () => void;
}

export default function IntroScreen({ sample, onStart }: IntroScreenProps) {
  return (
    <main className="intro-page">
      <section className="intro-copy" aria-labelledby="intro-title">
        <span className="small-label">Warm Stationery</span>
        <h1 id="intro-title">はじめましてカードメーカー</h1>
        <p>自己紹介カードを作って、画像として保存できます。</p>
        <button className="primary-button" type="button" onClick={onStart}>
          カードを作る
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </section>
      <section className="intro-sample" aria-label="サンプルカード">
        <CardPreview card={sample} isSample />
      </section>
    </main>
  );
}
