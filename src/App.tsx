import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Events from "./pages/Events";
import Startups from "./pages/Startups";
import Marketplace from "./pages/Marketplace";
import Blogs from "./pages/Blogs";
import Scholarships from "./pages/Scholarships";
import Courses from "./pages/Courses";
import PaidCourses from "./pages/PaidCourses";
import FreeCourses from "./pages/FreeCourses";
import CourseMaterials from "./pages/CourseMaterials";
import StartupSchemes from "./pages/StartupSchemes";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";
import YouTubeShorts from "./pages/YouTubeShorts";
import Podcasts from "./pages/Podcasts";
import StudentDiscounts from "./pages/StudentDiscounts";
import AIBotFab from "@/components/ui/AIBotFab";
import Landing from "./pages/Landing";
import { TwentyFirstToolbar } from "@21st-extension/toolbar-react";
import { ReactPlugin } from "@21st-extension/react";
import ProjectHunt from "./pages/ProjectHunt";
import StudentDashboard from "./pages/StudentDashboard";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { Navigate } from "react-router-dom";
import Studverse from "./pages/Studverse";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a loading spinner
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppContent: React.FC = () => {
  useScrollToTop();
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected routes */}
        <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/project-hunt" element={<ProtectedRoute><ProjectHunt /></ProtectedRoute>} />
        <Route path="/startups" element={<ProtectedRoute><Startups /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/scholarships" element={<ProtectedRoute><Scholarships /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/paid-courses" element={<ProtectedRoute><PaidCourses /></ProtectedRoute>} />
        <Route path="/free-courses" element={<ProtectedRoute><FreeCourses /></ProtectedRoute>} />
        <Route path="/course-materials" element={<ProtectedRoute><CourseMaterials /></ProtectedRoute>} />
        <Route path="/startup-schemes" element={<ProtectedRoute><StartupSchemes /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
        <Route path="/youtube-shorts" element={<ProtectedRoute><YouTubeShorts /></ProtectedRoute>} />
        <Route path="/podcasts" element={<ProtectedRoute><Podcasts /></ProtectedRoute>} />
        <Route path="/student-discounts" element={<ProtectedRoute><StudentDiscounts /></ProtectedRoute>} />
        <Route path="/studverse" element={<ProtectedRoute><Studverse /></ProtectedRoute>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Only show AIBotFab on allowed pages */}
      {!(location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/") && <AIBotFab />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* 21st.dev Toolbar (only in dev mode, handled by the package) */}
        <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
