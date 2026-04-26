import { ArrowRight } from "lucide-react";
import { TEMPLATE_OPTIONS } from "../constants/themes";
import type { TemplateKey } from "../types/card";

interface IntroScreenProps {
  onStart: (template?: TemplateKey) => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <main className="intro-page">
      <section className="intro-copy" aria-labelledby="intro-title">
        <span className="small-label">Warm Stationery</span>
        <h1 id="intro-title">はじめましてカードメーカー</h1>
        <p>自己紹介カードを作って、画像として保存できます。</p>
        <button className="primary-button" type="button" onClick={() => onStart("classic")}>
          カードを作る
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </section>
      <section className="intro-templates" aria-labelledby="template-heading">
        <div className="template-heading-row">
          <span className="sticky-label" id="template-heading">
            テンプレート
          </span>
          <p>デザインを選んで始められます。</p>
        </div>
        <div className="template-sample-grid">
          {TEMPLATE_OPTIONS.map((template) => (
            <button
              className="template-sample-card"
              type="button"
              key={template.value}
              onClick={() => onStart(template.value as TemplateKey)}
            >
              <TemplateThumbnail template={template.value as TemplateKey} />
              <span className="template-sample-title">{template.label}</span>
              <span className="template-sample-description">{template.description}</span>
              <span className="template-sample-action">このデザインで始める</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function TemplateThumbnail({ template }: { template: TemplateKey }) {
  return (
    <span className="template-thumb" data-template={template} aria-hidden="true">
      <span className="thumb-photo" />
      <span className="thumb-name" />
      <span className="thumb-line thumb-line-short" />
      <span className="thumb-topic" />
      <span className="thumb-note thumb-note-a" />
      <span className="thumb-note thumb-note-b" />
      <span className="thumb-tags">
        <i />
        <i />
        <i />
      </span>
    </span>
  );
}
