import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import JobDetail from "./pages/JobDetail";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
// Client pages
import ClientDashboard from "./pages/client/ClientDashboard";
import CreateJob from "./pages/client/CreateJob";
import ApplicantReview from "./pages/client/ApplicantReview";
import InterviewManagement from "./pages/client/InterviewManagement";
// Recruiter pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterMarketplace from "./pages/recruiter/RecruiterMarketplace";
import SubmitCandidate from "./pages/recruiter/SubmitCandidate";
import CandidateTracker from "./pages/recruiter/CandidateTracker";
import Earnings from "./pages/recruiter/Earnings";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageRecruiters from "./pages/admin/ManageRecruiters";
import ManageClients from "./pages/admin/ManageClients";
// Applicant pages
import ApplicantProfile from "./pages/applicant/ApplicantProfile";
import MyApplications from "./pages/applicant/MyApplications";
import OnlineTests from "./pages/applicant/OnlineTests";
// Interview pages
import ScheduleInterview from "./pages/interview/ScheduleInterview";
import VideoInterview from "./pages/interview/VideoInterview";
// Shared pages
import ChatRoom from "./pages/shared/ChatRoom";
import DocumentCenter from "./pages/shared/DocumentCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
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
            <Route path="/chat/:id" element={<ChatRoom />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/notifications" element={<Notifications />} />
            
            {/* Client routes */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/create-job" element={<CreateJob />} />
            <Route path="/client/review" element={<ApplicantReview />} />
            <Route path="/client/interviews" element={<InterviewManagement />} />
            
            {/* Recruiter routes */}
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/marketplace" element={<RecruiterMarketplace />} />
            <Route path="/recruiter/submit" element={<SubmitCandidate />} />
            <Route path="/recruiter/submit/:jobId" element={<SubmitCandidate />} />
            <Route path="/recruiter/candidates" element={<CandidateTracker />} />
            <Route path="/recruiter/earnings" element={<Earnings />} />
            <Route path="/recruiter/job/:id" element={<RecruiterMarketplace />} />
            <Route path="/recruiter/job/:id/candidates" element={<CandidateTracker />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/recruiters" element={<ManageRecruiters />} />
            <Route path="/admin/clients" element={<ManageClients />} />
            
            {/* Applicant routes */}
            <Route path="/applicant/profile" element={<ApplicantProfile />} />
            <Route path="/applicant/applications" element={<MyApplications />} />
            <Route path="/applicant/tests" element={<OnlineTests />} />
            <Route path="/applicant/test/:id" element={<OnlineTests />} />
            
            {/* Interview routes */}
            <Route path="/interview/schedule" element={<ScheduleInterview />} />
            <Route path="/interview/schedule/:id" element={<ScheduleInterview />} />
            <Route path="/interview/video" element={<VideoInterview />} />
            <Route path="/interview/video/:id" element={<VideoInterview />} />
            
            {/* Shared routes */}
            <Route path="/documents" element={<DocumentCenter />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
