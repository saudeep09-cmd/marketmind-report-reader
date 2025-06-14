
import React, { useRef, useState } from "react";
import { Upload, File, FileSearch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onFile: (file: File, ticker: string) => void;
  loading: boolean;
};

export function StockReportUploader({ onFile, loading }: Props) {
  const [fileName, setFileName] = useState("");
  const [tickerInput, setTickerInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f) {
      setFileName(f.name);
      onFile(f, tickerInput.trim().toUpperCase());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFileName(f.name);
      onFile(f, tickerInput.trim().toUpperCase());
    }
  };

  return (
    <Card className={`mb-4 p-4 shadow-xl bg-white bg-opacity-90 border-2 ${dragActive ? "border-blue-400" : "border-transparent"}`}>
      <CardContent>
        <div
          onDragOver={e => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 min-h-[120px] transition-colors ${
            dragActive ? "bg-blue-100 border-blue-400" : "bg-slate-50"
          }`}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
          onClick={() => !loading && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.txt,.csv,.docx"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
          <Upload size={32} className="mb-2 text-primary" />
          <span className="font-medium text-lg">
            {fileName ? (
              <>
                <File size={18} className="inline mr-2 text-muted-foreground" />
                {fileName}
              </>
            ) : (
              <>Drag &amp; drop your stock report, or click to upload</>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <FileSearch size={20} className="text-muted-foreground" />
          <Input
            placeholder="Enter stock ticker (optional, e.g. AAPL)"
            value={tickerInput}
            onChange={e => setTickerInput(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
            maxLength={8}
            className="w-48"
            disabled={loading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
