import type { RefObject } from "react";
import CardPreview from "./CardPreview";
import ExportActions from "./ExportActions";
import FormPanel from "./FormPanel";
import type { CardData } from "../types/card";

interface CreatorLayoutProps {
  card: CardData;
  previewRef: RefObject<HTMLDivElement>;
  onChange: (card: CardData) => void;
  onReset: () => void;
}

export default function CreatorLayout({
  card,
  previewRef,
  onChange,
  onReset,
}: CreatorLayoutProps) {
  const scrollToPreview = () => {
    document.getElementById("preview-panel")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="creator-grid">
      <FormPanel card={card} onChange={onChange} onReset={onReset} />
      <aside className="preview-panel" id="preview-panel" aria-label="カードプレビュー">
        <div className="preview-sticky">
          <div className="panel-heading">
            <span className="sticky-label">プレビュー</span>
            <p>入力内容はカードに反映されます。</p>
          </div>
          <CardPreview card={card} ref={previewRef} />
          <ExportActions targetRef={previewRef} />
        </div>
      </aside>
      <div className="mobile-action-bar" aria-label="モバイル操作">
        <button className="secondary-button" type="button" onClick={scrollToPreview}>
          プレビューを見る
        </button>
        <ExportActions targetRef={previewRef} compact />
      </div>
    </main>
  );
}
