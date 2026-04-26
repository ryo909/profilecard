import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import type { CardData } from "../types/card";

interface ImageUploadSectionProps {
  card: CardData;
  updateCard: <K extends keyof CardData>(key: K, value: CardData[K]) => void;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUploadSection({ card, updateCard }: ImageUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleFile = (file: File | undefined) => {
    setError("");
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("JPG / PNG / WebP の画像を選んでください。");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("画像サイズは5MBまでを目安にしてください。");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateCard("imageDataUrl", String(reader.result));
      updateCard("imageName", file.name);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    updateCard("imageDataUrl", null);
    updateCard("imageName", "");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="form-section" aria-labelledby="image-heading">
      <h2 id="image-heading">
        <span className="sticky-label">カード画像</span>
      </h2>
      <p className="field-note">画像はこの端末内でプレビューされます。サーバーには保存されません。</p>
      <div className="upload-box">
        <div className="upload-thumb" data-shape={card.imageShape}>
          {card.imageDataUrl ? (
            <img src={card.imageDataUrl} alt="アップロードしたカード画像のプレビュー" />
          ) : (
            <ImagePlus size={32} aria-hidden="true" />
          )}
        </div>
        <div className="upload-controls">
          <input
            ref={inputRef}
            className="visually-hidden"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
          <button className="secondary-button" type="button" onClick={openPicker}>
            <Upload size={16} aria-hidden="true" />
            {card.imageDataUrl ? "画像を変更" : "画像を追加"}
          </button>
          {card.imageDataUrl && (
            <button className="secondary-button danger-button" type="button" onClick={removeImage}>
              <Trash2 size={16} aria-hidden="true" />
              画像を削除
            </button>
          )}
          {card.imageName && <span className="file-name">{card.imageName}</span>}
        </div>
      </div>
      {error && <p className="field-note warning-text">{error}</p>}
    </section>
  );
}
