import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PreOrderSuccess from "./pages/PreOrderSuccess";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Unsubscribe from "./pages/Unsubscribe";
import About from "./pages/About";
import Founder from "./pages/Founder";
import { hasFounder } from "./lib/site";

const queryClient = new QueryClient();

/** The route table. Also rendered at build time (src/entry-server.tsx) to produce static HTML. */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    {hasFounder() && <Route path="/founder" element={<Founder />} />}
    <Route path="/pre-order" element={<Navigate to="/" replace />} />
    <Route path="/pre-order/success" element={<PreOrderSuccess />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
    <Route path="/unsubscribe" element={<Unsubscribe />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
