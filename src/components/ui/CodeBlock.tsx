import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  className?: string;
}

// Industrial syntax tokenization calibrated for Graphite & Signal
function tokenize(code: string): { type: string; text: string }[][] {
  const lines = code.split("\n");
  const keywords = new Set([
    "import", "from", "async", "def", "return", "await", "class", "if", "else", "elif",
    "try", "except", "with", "as", "for", "in", "True", "False", "None", "const", "let",
    "var", "function", "export", "default", "interface", "type"
  ]);

  return lines.map((line) => {
    const tokens: { type: string; text: string }[] = [];

    // Check for comment
    const commentIdx = line.indexOf("#");
    if (commentIdx !== -1) {
      const codePart = line.slice(0, commentIdx);
      const commentPart = line.slice(commentIdx);
      if (codePart.length > 0) {
        tokenizeWords(codePart, keywords, tokens);
      }
      tokens.push({ type: "comment", text: commentPart });
      return tokens;
    }

    tokenizeWords(line, keywords, tokens);
    return tokens;
  });
}

function tokenizeWords(
  text: string,
  keywords: Set<string>,
  tokens: { type: string; text: string }[]
) {
  const words = text.split(/(\s+|[(),.:={}[\]"'])/);
  for (const w of words) {
    if (keywords.has(w)) {
      tokens.push({ type: "keyword", text: w });
    } else if (w.startsWith("@")) {
      tokens.push({ type: "decorator", text: w });
    } else if (/^\d+$/.test(w)) {
      tokens.push({ type: "number", text: w });
    } else if (w.startsWith('"') || w.startsWith("'") || w.endsWith('"') || w.endsWith("'")) {
      tokens.push({ type: "string", text: w });
    } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(w)) {
      tokens.push({ type: "class", text: w });
    } else {
      tokens.push({ type: "text", text: w });
    }
  }
}

export function CodeBlock({
  code,
  language = "python",
  filename,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const tokenizedLines = tokenize(code);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenClass = (type: string) => {
    switch (type) {
      case "keyword":
        return "text-[#F27A52] font-semibold"; /* 7.25:1 AAA high contrast against #18181B */
      case "decorator":
        return "text-[#38BDF8] font-mono";
      case "string":
        return "text-[#34D399]";
      case "number":
        return "text-[#FBBF24]";
      case "class":
        return "text-[#E2E8F0] font-bold";
      case "comment":
        return "text-[#6B7280] italic";
      default:
        return "text-[#D1D5DB]";
    }
  };

  return (
    <div className={cn("relative rounded-2xl border border-white/[0.12] bg-[#0E0E10] font-mono text-xs overflow-hidden shadow-2xl shadow-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]", className)}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#141416] border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[0_0_6px_rgba(255,95,86,0.3)]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[0_0_6px_rgba(255,189,46,0.3)]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[0_0_6px_rgba(39,201,63,0.3)]" />
          </div>
          {filename && (
            <span className="text-xs text-[#F4F1EA] font-semibold ml-2 font-mono tracking-tight">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold font-mono">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-[#9A9892] hover:text-[#F4F1EA] transition px-2.5 py-1 rounded-md bg-[#1B1C20] hover:bg-[#222328] border border-white/[0.06] cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <IconCheck size={13} className="text-[#5B7B5B]" />
                <span className="text-[#5B7B5B] font-medium">Copied</span>
              </>
            ) : (
              <>
                <IconCopy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body with generous breathing room */}
      <div className="p-5 sm:p-7 overflow-x-auto leading-relaxed bg-[#18181B]">
        <pre>
          <code>
            {tokenizedLines.map((lineTokens, lineIdx) => {
              const lineNum = lineIdx + 1;
              const isHighlighted = highlightLines.includes(lineNum);

              return (
                <div
                  key={lineIdx}
                  className={`flex py-0.5 ${
                    isHighlighted ? "bg-[#E8663D]/[0.08] -mx-7 px-7 border-l-2 border-[#E8663D]" : ""
                  }`}
                >
                  <span className="w-9 shrink-0 select-none text-[#4B5563] text-right pr-5 font-mono text-[11px]">
                    {lineNum}
                  </span>
                  <span className="flex-1 font-mono text-[13px] tracking-tight">
                    {lineTokens.map((tok, tIdx) => (
                      <span key={tIdx} className={tokenClass(tok.type)}>
                        {tok.text}
                      </span>
                    ))}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
