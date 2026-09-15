import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IconUpload, IconFileCheck, IconX } from "@tabler/icons-react";

interface FileUploadProps {
  onChange?: (files: File[]) => void;
}

export function FileUpload({ onChange }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    setFiles((prev) => [...prev, ...arr]);
    onChange?.([...files, ...arr]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-[#18181B] ${
          dragActive
            ? "border-[#E8663D] bg-[#222328] shadow-xl shadow-black/40"
            : "border-white/[0.12] hover:border-[#E8663D]/40 hover:bg-[#1E1F24]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            dragActive ? "bg-[#E8663D]/20 text-[#E8663D]" : "bg-[#111113] text-[#9A9892]"
          }`}>
            <IconUpload size={22} />
          </div>
          <p className="mt-4 text-sm font-display font-bold text-[#F4F1EA]">
            Drop your architecture diagrams or schema docs here
          </p>
          <p className="mt-1 text-xs text-[#9A9892] max-w-sm">
            Accepts OpenAPI JSON, LangGraph diagrams, PDF blueprints, or SQL schemas (Max 50MB)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              key={`${f.name}-${i}`}
              className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] border border-white/[0.08] shadow-sm text-xs"
            >
              <div className="flex items-center gap-2 text-[#F4F1EA] font-medium truncate max-w-xs">
                <div className="w-7 h-7 rounded-lg bg-[#5B7B5B]/10 flex items-center justify-center text-[#5B7B5B] shrink-0">
                  <IconFileCheck size={16} />
                </div>
                <span className="truncate">{f.name}</span>
                <span className="text-[#6B7280] font-mono text-[10px]">
                  ({(f.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="p-1 rounded-md text-[#6B7280] hover:text-[#F4F1EA] hover:bg-white/[0.06] transition"
              >
                <IconX size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
