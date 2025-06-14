
import React, { createContext, useContext, useState } from "react";

type ParsedReport = {
  summary: string;
  highlights: string[];
  sentiment: "Positive" | "Neutral" | "Negative";
  fileName: string;
  ticker: string;
};

type ReportsContextType = {
  reports: ParsedReport[];
  addReport: (report: ParsedReport) => void;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within ReportsProvider");
  return ctx;
}

export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<ParsedReport[]>([]);
  const addReport = (report: ParsedReport) => setReports(prev => [report, ...prev]);

  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
}
