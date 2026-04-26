import type { CardData } from "../types/card";

interface ProfileSectionProps {
  card: CardData;
  updateCard: <K extends keyof CardData>(key: K, value: CardData[K]) => void;
}

const counters = {
  tagline: 60,
  interest: 70,
  topics: 70,
} as const;

export default function ProfileSection({ card, updateCard }: ProfileSectionProps) {
  return (
    <section className="form-section" aria-labelledby="profile-heading">
      <h2 id="profile-heading">
        <span className="sticky-label">自己紹介を入力</span>
      </h2>
      <TextAreaField
        id="tagline"
        label="ひとことで言うと"
        value={card.tagline}
        placeholder="例：人見知りですが、慣れるとよく話します"
        limit={counters.tagline}
        onChange={(value) => updateCard("tagline", value)}
      />
      <TextAreaField
        id="interest"
        label="最近ハマっていること"
        value={card.interest}
        placeholder="例：カフェ巡り、読書、散歩"
        limit={counters.interest}
        onChange={(value) => updateCard("interest", value)}
      />
      <TextAreaField
        id="topics"
        label="話しかけてほしい話題"
        value={card.topics}
        placeholder="例：おすすめのカフェや本の話"
        limit={counters.topics}
        onChange={(value) => updateCard("topics", value)}
      />
    </section>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  limit: number;
  onChange: (value: string) => void;
}

function TextAreaField({
  id,
  label,
  value,
  placeholder,
  limit,
  onChange,
}: TextAreaFieldProps) {
  const isLong = value.length > limit;

  return (
    <div className="field-group">
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
        <span className={isLong ? "counter is-warning" : "counter"}>
          {value.length}/{limit}
        </span>
      </div>
      <textarea
        id={id}
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={isLong ? `${id}-warning` : undefined}
      />
      {isLong && (
        <p className="field-note warning-text" id={`${id}-warning`}>
          少し長めです。カード上で折り返して表示されます。
        </p>
      )}
    </div>
  );
}
