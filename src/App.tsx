import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginForm } from "./components/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import SoundCloud from "./pages/SoundCloud";
import YouTube from "./pages/YouTube";
import Instagram from "./pages/Instagram";
import Spotify from "./pages/Spotify";
import Visualizer from "./pages/Visualizer";
import Settings from "./pages/Settings";
import DealFlow from "./pages/DealFlow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginForm />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="soundcloud" element={<SoundCloud />} />
          <Route path="youtube" element={<YouTube />} />
          <Route path="instagram" element={<Instagram />} />
          <Route path="spotify" element={<Spotify />} />
          <Route path="dealflow" element={<DealFlow />} />
          <Route path="visualizer" element={<Visualizer />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AuthenticatedApp />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
