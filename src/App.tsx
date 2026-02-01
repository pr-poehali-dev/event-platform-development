
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profiles from "./pages/Profiles";
import ForAgencies from "./pages/ForAgencies";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ArtistProfile from "./pages/ArtistProfile";
import Messages from "./pages/Messages";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/agencies" element={<ForAgencies />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<ArtistProfile />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/reviews" element={<Reviews />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;