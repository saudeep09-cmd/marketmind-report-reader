
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

type Props = {
  aiEnabled?: boolean;
  onAsk: (question: string) => Promise<string>;
  disabled: boolean;
};

export function StockReportAIChat({ aiEnabled = false, onAsk, disabled }: Props) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    setMessages((arr) => [...arr, { role: "user", text: input }]);
    setLoading(true);
    setInput("");
    try {
      const aiText = await onAsk(input);
      setMessages((arr) => [...arr, { role: "ai", text: aiText }]);
    } catch (e) {
      setMessages((arr) => [...arr, { role: "ai", text: "Sorry, I couldn't answer that." }]);
    }
    setLoading(false);
  };

  return (
    <Card className="mt-8 mb-2 shadow-xl bg-slate-50/80 border-2 border-slate-100">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="text-blue-500" size={20} />
          <span className="font-medium text-lg">Ask anything about this report</span>
        </div>
        <div className="min-h-24 max-h-56 overflow-y-auto pb-3">
          {messages.length === 0 && (
            <div className="text-muted-foreground text-sm italic mb-2">No questions yet. Try “Is there any major risk mentioned?”</div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-2 whitespace-pre-wrap ${
                m.role === "user" ? "text-right text-base font-medium" : "text-blue-900 bg-blue-50  px-4 py-2 rounded-lg text-left"
              }`}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="italic text-gray-400 text-left">Thinking…</div>
          )}
        </div>
        <form className="flex gap-2 mt-4" onSubmit={handleSend}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a question about this report"
            disabled={disabled || loading}
            className="flex-1"
          />
          <Button type="submit" disabled={disabled || loading || !input.trim()}>Ask</Button>
        </form>
        {!aiEnabled && (
          <div className="text-xs text-gray-400 mt-2">
            <span>
              (AI Q&amp;A demo only shows static responses. For real AI, integrate an API key.)
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
