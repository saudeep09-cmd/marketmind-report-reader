
import React from "react";
import { Card } from "@/components/ui/card";

export default function Documentation() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
      <div className="text-muted-foreground mb-4">
        Transparency, data sources, and methods are documented here.
      </div>
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-2">What is Stock Report Analyzer AI?</h3>
        <ul className="mb-4 list-disc pl-6 text-sm">
          <li>Summarizes, analyzes, and compares uploaded financial/stock reports.</li>
          <li>Includes sector &amp; macro trend analysis, analyst ratings, and recommendations.</li>
          <li>User files are private — all analysis is done client-side for this demo.</li>
        </ul>
        <h4 className="font-semibold mb-1">Disclaimer</h4>
        <p className="text-xs">
          This app is for demonstration only. It does not offer investment advice. Data is simulated or summarized and not for trading purposes.
        </p>
      </Card>
    </div>
  );
}
