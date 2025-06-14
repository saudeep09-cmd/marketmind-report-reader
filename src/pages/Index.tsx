// Stock Report Analyzer — Desktop Dashboard

import React, { useState } from "react";
import { StockReportUploader } from "@/components/StockReportUploader";
import { StockReportSummary } from "@/components/StockReportSummary";
import { StockReportAIChat } from "@/components/StockReportAIChat";
import { toast } from "@/hooks/use-toast";
import { useReports } from "../context/ReportsContext";

type ParsedReport = {
  summary: string;
  highlights: string[];
  sentiment: "Positive" | "Neutral" | "Negative";
  fileName: string;
  ticker: string;
};

const FAKE_ANALYSIS = {
  summary:
    "This quarterly report shows strong revenue growth driven by core business segments, alongside improvements in operating margins. Management emphasizes continued investments in AI and sustainability. Risks include macroeconomic uncertainty and regulatory headwinds.",
  highlights: [
    "Revenue growth accelerated to +12% YoY, beating analyst expectations.",
    "Operating margin improved by 1.5 percentage points.",
    "Significant investment announced in AI R&D.",
    "EPS guidance raised for next quarter.",
    "Management flagged potential regulatory risks in overseas markets.",
  ],
  sentiment: "Positive" as const,
};

function fakeAnalyze(file: File, ticker: string): Promise<Omit<ParsedReport, "fileName" | "ticker">> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        ...FAKE_ANALYSIS,
        summary: FAKE_ANALYSIS.summary + (ticker ? ` (Ticker: ${ticker})` : ""),
      });
    }, 1700)
  );
}

export default function Index() {
  const { reports: uploadedReports, addReport } = useReports();
  const [parsed, setParsed] = useState<ParsedReport | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileSelect(f: File, ticker: string) {
    setParsed(null);
    setLoading(true);
    try {
      const analysis = await fakeAnalyze(f, ticker);
      const record: ParsedReport = {
        ...analysis,
        fileName: f.name,
        ticker,
      };
      setParsed(record);
      addReport(record);
      toast({
        title: "Analysis complete",
        description: "Your stock report was analyzed!",
      });
    } catch (e) {
      toast({ title: "Upload error", description: "Could not analyze the report" });
    }
    setLoading(false);
  }

  // Demo: answer with a made-up response
  const answerAI = async (q: string) => {
    await new Promise(res => setTimeout(res, 900));
    if (q.toLowerCase().includes("risk"))
      return "Yes, management highlighted potential regulatory risks in overseas markets as a significant concern.";
    if (q.toLowerCase().includes("ai"))
      return "The company announced a significant investment in AI R&D this quarter.";
    return "The report focuses on revenue growth, improved margins, and a positive sentiment overall.";
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="font-extrabold text-3xl md:text-4xl mb-0 bg-clip-text text-transparent bg-gradient-to-tr from-primary to-blue-600 tracking-tight">
          Stock Report Analyzer <span className="text-primary">AI</span>
        </h1>
        <div className="text-lg text-muted-foreground mb-8">
          Instantly summarize, extract highlights &amp; ask questions about any stock report.
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <StockReportUploader onFile={handleFileSelect} loading={loading} />
            <div className="mt-12 hidden md:block">
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Recent Uploads</span>
              <div className="rounded-lg bg-slate-100 mt-2 p-3 mb-8 shadow-inner">
                <div className="flex flex-col gap-2 items-start text-sm text-gray-600">
                  {uploadedReports.length === 0 && (
                    <div className="italic text-muted-foreground">No uploads yet.</div>
                  )}
                  {uploadedReports.slice(0, 4).map((r, i) => (
                    <span key={i} className="inline-block bg-slate-200 rounded px-2 py-1">
                      {r.fileName} {r.ticker && <span className="text-xs text-blue-600">({r.ticker})</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <StockReportSummary
              summary={parsed?.summary || ""}
              highlights={parsed?.highlights || []}
              sentiment={parsed?.sentiment || "Neutral"}
              loading={loading || !parsed}
            />
            <StockReportAIChat
              onAsk={answerAI}
              disabled={loading || !parsed}
              aiEnabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
