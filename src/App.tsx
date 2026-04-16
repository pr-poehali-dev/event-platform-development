
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
import News from "./pages/News";
import Rating from "./pages/Rating";
import Orders from "./pages/Orders";
import CalendarPage from "./pages/CalendarPage";
import NewsArticle from "./pages/NewsArticle";
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
          <Route path="/dashboard/rating" element={<Rating />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/calendar" element={<CalendarPage />} />
          <Route path="/dashboard/news" element={<News />} />
          <Route path="/dashboard/news/:id" element={<NewsArticle />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;