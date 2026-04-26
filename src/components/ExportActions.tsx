import { Download, ExternalLink } from "lucide-react";
import { toPng } from "html-to-image";
import type { RefObject } from "react";
import { useState } from "react";

interface ExportActionsProps {
  targetRef: RefObject<HTMLDivElement>;
  compact?: boolean;
}

export default function ExportActions({ targetRef, compact = false }: ExportActionsProps) {
  const [status, setStatus] = useState("");
  const [lastImageUrl, setLastImageUrl] = useState("");

  const waitForImages = async (target: HTMLElement) => {
    const images = Array.from(target.querySelectorAll("img"));
    await Promise.all(
      images.map((image) => {
        if (image.complete && image.naturalWidth > 0) return Promise.resolve();
        return image.decode().catch(() => undefined);
      }),
    );
  };

  const exportImage = async () => {
    if (!targetRef.current) return;

    setStatus("画像を生成しています。");
    try {
      await waitForImages(targetRef.current);
      const rect = targetRef.current.getBoundingClientRect();
      const pixelRatio = Math.max(2, 1080 / rect.width);
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio,
        backgroundColor: "transparent",
      });
      const date = new Date();
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const link = document.createElement("a");
      link.download = `hajimemashite-card_${y}${m}${d}.png`;
      link.href = dataUrl;
      link.click();
      setLastImageUrl(dataUrl);
      setStatus("PNGを生成しました。");
    } catch (error) {
      console.error(error);
      setStatus("画像の生成に失敗しました。少し時間を置いて再度お試しください。");
    }
  };

  const openPreview = () => {
    if (lastImageUrl) {
      window.open(lastImageUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={compact ? "export-actions is-compact" : "export-actions"}>
      <button className="primary-button export-button" type="button" onClick={exportImage}>
        <Download size={18} aria-hidden="true" />
        画像として保存
      </button>
      {!compact && lastImageUrl && (
        <button className="secondary-button" type="button" onClick={openPreview}>
          <ExternalLink size={16} aria-hidden="true" />
          生成画像を開く
        </button>
      )}
      {!compact && status && <p className="field-note" role="status">{status}</p>}
    </div>
  );
}
