import { RotateCcw } from "lucide-react";

interface AppHeaderProps {
  isCreator: boolean;
  onHome: () => void;
  onReset: () => void;
}

export default function AppHeader({ isCreator, onHome, onReset }: AppHeaderProps) {
  return (
    <header className="app-header">
      <button className="brand-button" type="button" onClick={onHome}>
        <span className="brand-mark" aria-hidden="true" />
        <span>はじめましてカードメーカー</span>
      </button>
      {isCreator && (
        <button className="secondary-button compact-button" type="button" onClick={onReset}>
          <RotateCcw size={16} aria-hidden="true" />
          入力内容をリセット
        </button>
      )}
    </header>
  );
}
