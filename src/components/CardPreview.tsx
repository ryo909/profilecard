import { forwardRef, type CSSProperties } from "react";
import { NotebookPen } from "lucide-react";
import { THEMES } from "../constants/themes";
import { getParticipantLabel, getSupplementLabel } from "./BasicInfoSection";
import type { CardData } from "../types/card";

interface CardPreviewProps {
  card: CardData;
  isSample?: boolean;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(function CardPreview(
  { card, isSample = false },
  ref,
) {
  const theme = THEMES[card.theme];
  const initial = card.name.replace(/\s/g, "").slice(0, 1) || "H";
  const style = {
    "--theme-accent": theme.accent,
    "--theme-deep": theme.accentDeep,
    "--theme-soft": theme.soft,
    "--theme-sticky": theme.sticky,
    "--theme-chip": theme.chip,
  } as CSSProperties;

  return (
    <div className={isSample ? "card-scale is-sample" : "card-scale"}>
      <div className="export-card-shell" ref={ref} style={style}>
        <article className="notebook-card" data-layout={card.layout}>
          <div className="tape tape-top" aria-hidden="true" />
          <div className="tape tape-side" aria-hidden="true" />
          <div className="card-grid-lines" aria-hidden="true" />

          <header className="card-top">
            <div className="profile-photo" data-shape={card.imageShape}>
              {card.imageDataUrl ? (
                <img src={card.imageDataUrl} alt="" />
              ) : (
                <div className="photo-placeholder" aria-label="画像なしのイニシャル表示">
                  <span>{initial}</span>
                  <NotebookPen size={22} aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="name-block">
              <span className="type-badge">{getParticipantLabel(card.participantType)}</span>
              <h2>{card.name || "お名前"}</h2>
              <p>{card.affiliation || "所属・立場"}</p>
              <div className="supplement-chip">
                {getSupplementLabel(card.participantType)}：{card.supplement || "未入力"}
              </div>
            </div>
          </header>

          <section className="memo-block talk-block featured-talk">
            <span className="card-label is-primary">話しかけてほしい話題</span>
            <p>{card.topics || "おすすめのカフェや本の話"}</p>
          </section>
          <section className="memo-grid">
            <div className="memo-block">
              <span className="card-label">ひとことで言うと</span>
              <p>{card.tagline || "入力するとここに表示されます。"}</p>
            </div>
            <div className="memo-block">
              <span className="card-label">最近ハマっていること</span>
              <p>{card.interest || "カフェ巡り、読書、散歩"}</p>
            </div>
          </section>

          <footer className="card-tags" aria-label="選択済みタグ">
            {card.tags.map((tag, index) => (
              <span className="card-tag" data-tone={index % 3} key={tag}>
                {tag}
              </span>
            ))}
          </footer>
        </article>
      </div>
    </div>
  );
});

export default CardPreview;
