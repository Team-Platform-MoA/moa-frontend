import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "@/hooks/useOnboarding";
import { HomeProvider } from "@/hooks/useHome";
import { ReportProvider } from "@/hooks/useReport";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Call from "./pages/Call";
import Postbox from "./pages/Postbox";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OnboardingProvider>
      <HomeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/call" element={<Call />} />
              <Route path="/postbox" element={<Postbox />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HomeProvider>
    </OnboardingProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
