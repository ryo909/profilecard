import type { CardData, ParticipantType } from "../types/card";

interface BasicInfoSectionProps {
  card: CardData;
  onChange: (card: CardData) => void;
  updateCard: <K extends keyof CardData>(key: K, value: CardData[K]) => void;
}

const participantOptions: Array<{ value: ParticipantType; label: string }> = [
  { value: "student", label: "学生" },
  { value: "employee", label: "社員" },
  { value: "other", label: "その他" },
];

const supplementMeta: Record<
  ParticipantType,
  { label: string; placeholder: string; sample: string }
> = {
  student: {
    label: "学年",
    placeholder: "例：大学3年 / 26卒 / 修士1年",
    sample: "大学3年",
  },
  employee: {
    label: "勤務年数",
    placeholder: "例：1年目 / 2年目 / 中途入社半年",
    sample: "入社2年目",
  },
  other: {
    label: "補足",
    placeholder: "例：業務委託 / 外部パートナー",
    sample: "外部パートナー",
  },
};

export function getParticipantLabel(type: ParticipantType) {
  return participantOptions.find((option) => option.value === type)?.label ?? "社員";
}

export function getSupplementLabel(type: ParticipantType) {
  return supplementMeta[type].label;
}

export default function BasicInfoSection({
  card,
  onChange,
  updateCard,
}: BasicInfoSectionProps) {
  const supplement = supplementMeta[card.participantType];

  const handleParticipantChange = (participantType: ParticipantType) => {
    onChange({
      ...card,
      participantType,
      supplement: supplementMeta[participantType].sample,
    });
  };

  return (
    <section className="form-section" aria-labelledby="basic-heading">
      <h2 id="basic-heading">
        <span className="sticky-label">基本情報を入力</span>
      </h2>
      <div className="field-group">
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          value={card.name}
          placeholder="例：田中 太郎"
          onChange={(event) => updateCard("name", event.target.value)}
        />
      </div>
      <div className="field-group">
        <label htmlFor="affiliation">所属・立場</label>
        <input
          id="affiliation"
          type="text"
          value={card.affiliation}
          placeholder="例：営業部 / 採用チーム / インターン"
          onChange={(event) => updateCard("affiliation", event.target.value)}
        />
      </div>
      <fieldset className="field-group">
        <legend>区分</legend>
        <div className="segmented-control" role="group" aria-label="区分">
          {participantOptions.map((option) => (
            <button
              className={option.value === card.participantType ? "is-selected" : ""}
              type="button"
              key={option.value}
              aria-pressed={option.value === card.participantType}
              onClick={() => handleParticipantChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="field-group">
        <label htmlFor="supplement">{supplement.label}</label>
        <input
          id="supplement"
          type="text"
          value={card.supplement}
          placeholder={supplement.placeholder}
          onChange={(event) => updateCard("supplement", event.target.value)}
        />
      </div>
    </section>
  );
}
