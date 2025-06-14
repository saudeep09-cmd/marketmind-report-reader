
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  summary: string;
  highlights: string[];
  sentiment: "Positive" | "Neutral" | "Negative";
  loading: boolean;
};

export function StockReportSummary({ summary, highlights, sentiment, loading }: Props) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case "Positive": return "text-green-600";
      case "Negative": return "text-red-600";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Card className="shadow-lg bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <CardContent className="p-5">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Executive Summary</span>
          <h2 className="text-lg font-semibold mb-2 mt-2">Summary</h2>
          {loading ? (
            <div className="animate-pulse h-20 bg-slate-200 rounded-lg" />
          ) : (
            <p className="text-base">{summary}</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <CardContent className="p-5">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Report Highlights</span>
          <h2 className="text-lg font-semibold mb-2 mt-2">Key Points</h2>
          {loading ? (
            <div className="animate-pulse h-20 bg-slate-200 rounded-lg" />
          ) : (
            <ul className="list-disc ml-6 text-base space-y-1">
              {highlights.map((hl, i) => (
                <li key={i}>{hl}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <CardContent className="p-5">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Sentiment</span>
          <h2 className="text-lg font-semibold mb-2 mt-2">Overall Tone</h2>
          {loading ? (
            <div className="animate-pulse h-12 w-1/2 bg-slate-200 rounded-lg" />
          ) : (
            <div className="text-lg font-semibold mt-4">
              <span className={getSentimentColor()}>{sentiment}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
