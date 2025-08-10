import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TrackPage } from "./pages/TrackPage";
import Life from "./pages/Life";
import Teachings from "./pages/Teachings";
import Legacy from "./pages/Legacy";
import Engage from "./pages/Engage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/track/:trackSlug" element={<TrackPage />} />
          <Route path="/life" element={<Life />} />
          <Route path="/teachings" element={<Teachings />} />
          <Route path="/legacy" element={<Legacy />} />
          <Route path="/engage" element={<Engage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
