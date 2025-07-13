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
import Profile from "./pages/Profile";
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

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  useScrollToTop();
  const location = useLocation();

  return (
    <>
    <Routes>
        <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Index />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/events" element={<Events />} />
      <Route path="/project-hunt" element={<ProjectHunt />} />
      <Route path="/startups" element={<Startups />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/paid-courses" element={<PaidCourses />} />
      <Route path="/free-courses" element={<FreeCourses />} />
      <Route path="/course-materials" element={<CourseMaterials />} />
      <Route path="/startup-schemes" element={<StartupSchemes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<StudentDashboard />} />
      <Route path="/network" element={<Network />} />
      <Route path="/youtube-shorts" element={<YouTubeShorts />} />
      <Route path="/podcasts" element={<Podcasts />} />
      <Route path="/student-discounts" element={<StudentDiscounts />} />
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
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
