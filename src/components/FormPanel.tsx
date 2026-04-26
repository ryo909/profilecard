import BasicInfoSection from "./BasicInfoSection";
import DesignSection from "./DesignSection";
import ImageUploadSection from "./ImageUploadSection";
import ProfileSection from "./ProfileSection";
import TagSection from "./TagSection";
import type { CardData } from "../types/card";

interface FormPanelProps {
  card: CardData;
  onChange: (card: CardData) => void;
  onReset: () => void;
}

export default function FormPanel({ card, onChange }: FormPanelProps) {
  const updateCard = <K extends keyof CardData>(key: K, value: CardData[K]) => {
    onChange({ ...card, [key]: value });
  };

  return (
    <section className="form-panel" aria-label="カード入力フォーム">
      <div className="form-panel-head">
        <span className="sticky-label">入力ノート</span>
        <p>必要な項目だけを入力すると、右のカードに反映されます。</p>
      </div>
      <BasicInfoSection card={card} onChange={onChange} updateCard={updateCard} />
      <ProfileSection card={card} updateCard={updateCard} />
      <TagSection card={card} updateCard={updateCard} />
      <ImageUploadSection card={card} onChange={onChange} />
      <DesignSection card={card} updateCard={updateCard} />
    </section>
  );
}
