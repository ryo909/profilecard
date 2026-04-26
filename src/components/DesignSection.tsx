import { Check } from "lucide-react";
import { TEMPLATE_OPTIONS, THEMES } from "../constants/themes";
import type { CardData, ImageShape, TemplateKey, ThemeKey } from "../types/card";

interface DesignSectionProps {
  card: CardData;
  updateCard: <K extends keyof CardData>(key: K, value: CardData[K]) => void;
}

export default function DesignSection({ card, updateCard }: DesignSectionProps) {
  return (
    <section className="form-section" aria-labelledby="design-heading">
      <h2 id="design-heading">
        <span className="sticky-label">デザイン</span>
      </h2>
      <fieldset className="field-group">
        <legend>カラーテーマ</legend>
        <div className="theme-grid">
          {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => {
            const theme = THEMES[themeKey];
            const selected = card.theme === themeKey;
            return (
              <button
                type="button"
                className={selected ? "theme-button is-selected" : "theme-button"}
                key={themeKey}
                aria-pressed={selected}
                onClick={() => updateCard("theme", themeKey)}
              >
                <span className="swatch" style={{ background: theme.accent }} aria-hidden="true" />
                <span>{theme.label}</span>
                {selected && <Check size={14} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset className="field-group">
        <legend>テンプレート</legend>
        <div className="choice-grid">
          {TEMPLATE_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.value}
              className={card.layout === option.value ? "choice-button is-selected" : "choice-button"}
              aria-pressed={card.layout === option.value}
              onClick={() => updateCard("layout", option.value as TemplateKey)}
            >
              <span>{option.label}</span>
              <small>{option.description}</small>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="field-group">
        <legend>画像の形</legend>
        <div className="segmented-control" role="group" aria-label="画像の形">
          {[
            { value: "rounded", label: "角丸四角" },
            { value: "circle", label: "丸型" },
          ].map((option) => (
            <button
              type="button"
              key={option.value}
              className={card.imageShape === option.value ? "is-selected" : ""}
              aria-pressed={card.imageShape === option.value}
              onClick={() => updateCard("imageShape", option.value as ImageShape)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
