
import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const analystData = [
  { analyst: "Morgan Stanley", ticker: "AAPL", rating: "Buy", target: 205 },
  { analyst: "Goldman Sachs", ticker: "TSLA", rating: "Neutral", target: 178 },
  { analyst: "BofA Securities", ticker: "MSFT", rating: "Buy", target: 325 },
  { analyst: "JP Morgan", ticker: "AMZN", rating: "Hold", target: 157 },
];

export default function AnalystRatings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Analyst Ratings</h2>
      <div className="text-muted-foreground mb-4">
        Analyst ratings and comparisons are summarized below.
      </div>
      <Card className="p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Analyst</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Target Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analystData.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.analyst}</TableCell>
                <TableCell>{r.ticker}</TableCell>
                <TableCell>
                  <span className={
                    r.rating === "Buy" ? "text-green-600 font-semibold" :
                    r.rating === "Sell" ? "text-red-600 font-semibold" :
                    "text-gray-500"
                  }>
                    {r.rating}
                  </span>
                </TableCell>
                <TableCell>${r.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
