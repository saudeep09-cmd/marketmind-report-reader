
import React from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const macroData = [
  { date: "Q1'23", GDP: 2.9, CPI: 6.2 },
  { date: "Q2'23", GDP: 2.4, CPI: 5.6 },
  { date: "Q3'23", GDP: 2.1, CPI: 4.2 },
  { date: "Q4'23", GDP: 2.0, CPI: 3.1 },
];

export default function Macros() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Macro Analysis</h2>
      <div className="text-muted-foreground mb-4">
        Macroeconomic charts and commentary are visualized below.
      </div>
      <Card className="p-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={macroData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="GDP" stroke="#34d399" name="GDP (%)" />
            <Line type="monotone" dataKey="CPI" stroke="#2563eb" name="CPI (%)" />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-xs text-muted-foreground mt-2">
          Data: Example US GDP and Consumer Price Index (CPI)
        </div>
      </Card>
    </div>
  );
}
