import { Check } from "lucide-react";
import { TAG_OPTIONS } from "../constants/tags";
import type { CardData } from "../types/card";

interface TagSectionProps {
  card: CardData;
  updateCard: <K extends keyof CardData>(key: K, value: CardData[K]) => void;
}

export default function TagSection({ card, updateCard }: TagSectionProps) {
  const tagLimitReached = card.tags.length >= 3;

  const toggleTag = (tag: string) => {
    if (card.tags.includes(tag)) {
      updateCard(
        "tags",
        card.tags.filter((selected) => selected !== tag),
      );
      return;
    }

    if (tagLimitReached) {
      return;
    }

    updateCard("tags", [...card.tags, tag]);
  };

  return (
    <section className="form-section" aria-labelledby="tag-heading">
      <div className="section-title-row">
        <h2 id="tag-heading">
          <span className="sticky-label">タグ・画像</span>
        </h2>
        <span className="counter">{card.tags.length}/3</span>
      </div>
      <p className="field-note">タグは最大3つまで選べます。</p>
      <div className="tag-grid" role="group" aria-label="タグ候補">
        {TAG_OPTIONS.map((tag) => {
          const selected = card.tags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              className={selected ? "tag-option is-selected" : "tag-option"}
              aria-pressed={selected}
              aria-disabled={!selected && tagLimitReached}
              onClick={() => toggleTag(tag)}
            >
              {selected && <Check size={13} aria-hidden="true" />}
              {tag}
            </button>
          );
        })}
      </div>
      {tagLimitReached && (
        <p className="field-note warning-text">別のタグを選ぶ場合は、選択済みタグを解除してください。</p>
      )}
    </section>
  );
}
