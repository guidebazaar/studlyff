import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Events from "./pages/Events";
import Startups from "./pages/Startups";
import Marketplace from "./pages/Marketplace";
import Internships from "./pages/Internships";
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

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Index />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/events" element={<Events />} />
      <Route path="/startups" element={<Startups />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/paid-courses" element={<PaidCourses />} />
      <Route path="/free-courses" element={<FreeCourses />} />
      <Route path="/course-materials" element={<CourseMaterials />} />
      <Route path="/startup-schemes" element={<StartupSchemes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/network" element={<Network />} />
      <Route path="/youtube-shorts" element={<YouTubeShorts />} />
      <Route path="/podcasts" element={<Podcasts />} />
      <Route path="/student-discounts" element={<StudentDiscounts />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        {!(window.location.pathname === "/login" || window.location.pathname === "/signup") && <AIBotFab />}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
