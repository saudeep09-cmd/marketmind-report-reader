
import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { sector: "Tech", growth: 12 },
  { sector: "Healthcare", growth: 8 },
  { sector: "Finance", growth: 2 },
  { sector: "Consumer", growth: 6 },
  { sector: "Energy", growth: -2 },
];

export default function SectorTrends() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Sector Trends</h2>
      <div className="text-muted-foreground mb-4">
        Charts and insights about sector trends are visualized below.
      </div>
      <Card className="p-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="growth" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-xs text-muted-foreground mt-2">
          Data: Example sector YoY growth (%)
        </div>
      </Card>
    </div>
  );
}
