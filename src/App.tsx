
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import ReportsTable from "./pages/ReportsTable";
import SectorTrends from "./pages/SectorTrends";
import AnalystRatings from "./pages/AnalystRatings";
import Macros from "./pages/Macros";
import Recommendations from "./pages/Recommendations";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-100 via-white to-emerald-50">
            <AppSidebar />
            <main className="flex-1 min-h-screen flex flex-col">
              <div className="flex items-center border-b h-14 px-4">
                <SidebarTrigger />
                <span className="ml-4 text-2xl font-extrabold tracking-tight text-primary">Stock Report Analyzer AI</span>
              </div>
              <div className="flex-1 p-4 md:p-8">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/reports-table" element={<ReportsTable />} />
                  <Route path="/sector-trends" element={<SectorTrends />} />
                  <Route path="/analyst-ratings" element={<AnalystRatings />} />
                  <Route path="/macros" element={<Macros />} />
                  <Route path="/recommendations" element={<Recommendations />} />
                  <Route path="/documentation" element={<Documentation />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
