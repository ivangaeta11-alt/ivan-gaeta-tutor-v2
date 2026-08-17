import React, { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, label = "Copia", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback silenzioso in demo */
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border transition-colors ${
        copied
          ? "text-emerald-700 bg-emerald-50 border-emerald-100"
          : "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100"
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" aria-hidden />
          Copiato
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" aria-hidden />
          {label}
        </>
      )}
    </button>
  );
};

export default CopyButton;
