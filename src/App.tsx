import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import JobDetail from "./pages/JobDetail";
import Notifications from "./pages/Notifications";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Placeholder routes */}
          <Route path="/my-jobs" element={<Jobs />} />
          <Route path="/job-ads" element={<Jobs />} />
          <Route path="/earnings" element={<Profile />} />
          <Route path="/seller-center" element={<Profile />} />
          <Route path="/rewards" element={<Profile />} />
          <Route path="/coupons" element={<Profile />} />
          <Route path="/coins" element={<Profile />} />
          <Route path="/saved-jobs" element={<Jobs />} />
          <Route path="/wallet" element={<Profile />} />
          <Route path="/settings/*" element={<Profile />} />
          <Route path="/help" element={<Profile />} />
          <Route path="/chat/:id" element={<Chat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
