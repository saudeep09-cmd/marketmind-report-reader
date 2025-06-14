
import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { TrendingUp, TrendingDown, MinusCircle } from "lucide-react";

const recs = [
  { ticker: "AAPL", action: "Buy", reason: "Strong earnings, positive momentum." },
  { ticker: "TSLA", action: "Hold", reason: "Solid performance, but valuation is high." },
  { ticker: "ZM", action: "Sell", reason: "Slowing growth, increasing competition." },
];

const actionIcon = (action: string) => {
  if (action === "Buy") return <TrendingUp className="inline text-green-500 mr-1" />;
  if (action === "Sell") return <TrendingDown className="inline text-red-500 mr-1" />;
  return <MinusCircle className="inline text-gray-400 mr-1" />;
};

export default function Recommendations() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Top Stock Recommendations</h2>
      <div className="text-muted-foreground mb-4">
        Buy/Hold/Sell recommendations and justifications are shown below.
      </div>
      <Card className="p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Rationale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recs.map((rec, i) => (
              <TableRow key={i}>
                <TableCell>{rec.ticker}</TableCell>
                <TableCell>
                  {actionIcon(rec.action)}
                  <span className={
                    rec.action === "Buy" ? "text-green-600 font-semibold" :
                    rec.action === "Sell" ? "text-red-600 font-semibold" :
                    "text-gray-500"
                  }>
                    {rec.action}
                  </span>
                </TableCell>
                <TableCell>{rec.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
