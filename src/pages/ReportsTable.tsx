
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useReports } from "../context/ReportsContext";

export default function ReportsTable() {
  const { reports } = useReports();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reports Table</h2>
      <div className="text-muted-foreground mb-4">
        Table of uploaded reports and basic analytics is shown below.
      </div>
      <Card className="p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Highlights</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400 italic">No reports uploaded yet.</TableCell>
              </TableRow>
            ) : (
              reports.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.fileName}</TableCell>
                  <TableCell>{r.ticker || <span className="text-gray-400">—</span>}</TableCell>
                  <TableCell className="max-w-xs truncate">{r.summary}</TableCell>
                  <TableCell>
                    <span className={
                      r.sentiment === "Positive" ? "text-green-600" :
                      r.sentiment === "Negative" ? "text-red-600" : "text-gray-500"
                    }>
                      {r.sentiment}
                    </span>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc ml-4 text-xs">
                      {r.highlights.map((hl, hi) => (
                        <li key={hi}>{hl}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
