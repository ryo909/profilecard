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
        <article className="notebook-card" data-template={card.layout}>
          <div className="tape tape-top" aria-hidden="true" />
          <div className="tape tape-side" aria-hidden="true" />
          <div className="card-grid-lines" aria-hidden="true" />
          {card.layout === "conversation" && <ConversationCard card={card} initial={initial} />}
          {card.layout === "clean" && <CleanProfileCard card={card} initial={initial} />}
          {card.layout === "collage" && <StickyCollageCard card={card} initial={initial} />}
          {card.layout === "classic" && <NotebookClassicCard card={card} initial={initial} />}
        </article>
      </div>
    </div>
  );
});

export default CardPreview;

function ProfilePhoto({ card, initial }: { card: CardData; initial: string }) {
  return (
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
  );
}

function NameBlock({ card }: { card: CardData }) {
  return (
    <div className="name-block">
      <span className="type-badge">{getParticipantLabel(card.participantType)}</span>
      <h2>{card.name || "お名前"}</h2>
      <p>{card.affiliation || "所属・立場"}</p>
      <div className="supplement-chip">
        {getSupplementLabel(card.participantType)}：{card.supplement || "未入力"}
      </div>
    </div>
  );
}

function CardTags({ tags }: { tags: string[] }) {
  return (
    <footer className="card-tags" aria-label="選択済みタグ">
      {tags.map((tag, index) => (
        <span className="card-tag" data-tone={index % 3} key={tag}>
          {tag}
        </span>
      ))}
    </footer>
  );
}

function NotebookClassicCard({ card, initial }: { card: CardData; initial: string }) {
  return (
    <>
      <header className="card-top">
        <ProfilePhoto card={card} initial={initial} />
        <NameBlock card={card} />
      </header>
      <section className="memo-block talk-block featured-talk">
        <span className="card-label is-primary">話しかけてほしい話題</span>
        <p>{card.topics || "おすすめのカフェや本の話"}</p>
      </section>
      <section className="memo-grid">
        <MemoBlock label="ひとことで言うと" value={card.tagline} fallback="入力するとここに表示されます。" />
        <MemoBlock label="最近ハマっていること" value={card.interest} fallback="カフェ巡り、読書、散歩" />
      </section>
      <CardTags tags={card.tags} />
    </>
  );
}

function ConversationCard({ card, initial }: { card: CardData; initial: string }) {
  return (
    <>
      <header className="conversation-top">
        <NameBlock card={card} />
        <ProfilePhoto card={card} initial={initial} />
      </header>
      <section className="talk-bubble">
        <span className="card-label is-primary">話しかけてほしい話題</span>
        <p>{card.topics || "おすすめのカフェや本の話"}</p>
      </section>
      <section className="conversation-notes">
        <MemoBlock label="最近ハマっていること" value={card.interest} fallback="休日のカフェ巡り" />
        <MemoBlock label="ひとことで言うと" value={card.tagline} fallback="好奇心旺盛な行動派！" />
      </section>
      <CardTags tags={card.tags} />
    </>
  );
}

function CleanProfileCard({ card, initial }: { card: CardData; initial: string }) {
  return (
    <>
      <header className="clean-top">
        <ProfilePhoto card={card} initial={initial} />
        <NameBlock card={card} />
      </header>
      <section className="clean-list">
        <MemoBlock label="話しかけてほしい話題" value={card.topics} fallback="おすすめのカフェや本の話" primary />
        <MemoBlock label="最近ハマっていること" value={card.interest} fallback="休日のカフェ巡り" />
        <MemoBlock label="ひとことで言うと" value={card.tagline} fallback="好奇心旺盛な行動派！" />
      </section>
      <CardTags tags={card.tags} />
    </>
  );
}

function StickyCollageCard({ card, initial }: { card: CardData; initial: string }) {
  return (
    <>
      <header className="collage-top">
        <ProfilePhoto card={card} initial={initial} />
        <NameBlock card={card} />
      </header>
      <section className="collage-notes">
        <MemoBlock label="話しかけてほしい話題" value={card.topics} fallback="おすすめのカフェや本の話" primary />
        <MemoBlock label="ひとことで言うと" value={card.tagline} fallback="好奇心旺盛な行動派！" />
        <MemoBlock label="最近ハマっていること" value={card.interest} fallback="休日のカフェ巡り" />
      </section>
      <CardTags tags={card.tags} />
    </>
  );
}

function MemoBlock({
  label,
  value,
  fallback,
  primary = false,
}: {
  label: string;
  value: string;
  fallback: string;
  primary?: boolean;
}) {
  return (
    <div className={primary ? "memo-block talk-block" : "memo-block"}>
      <span className={primary ? "card-label is-primary" : "card-label"}>{label}</span>
      <p>{value || fallback}</p>
    </div>
  );
}
