import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Globe, FileUp, FileText, Upload, FileCheck2, FileSearch, X, User, Mail, GraduationCap, Calendar, School, Sparkles, Folder, Award, UserCog, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/ui/split-text';
import { useAuth } from '@/lib/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Lenis from 'lenis';

const API_URL = 'http://localhost:5000/api/profile';

interface EditProfileData {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  education: string;
  branch: string;
  year: string;
  university: string;
  college: string;
  city: string;
  phoneNumber: string;
  linkedin: string;
  github: string;
  website: string;
  profilePicture: string;
  skills: string;
  interests: string;
  careerGoals: string;
  dateOfBirth: string;
  resumeFiles: string[];
  projectFiles: string[];
  certificationFiles: string[];
}

export default function StudentProfileDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<EditProfileData>({
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    education: '',
    branch: '',
    year: '',
    university: '',
    college: '',
    city: '',
    phoneNumber: '',
    linkedin: '',
    github: '',
    website: '',
    profilePicture: '',
    skills: '',
    interests: '',
    careerGoals: '',
    dateOfBirth: '',
    resumeFiles: [],
    projectFiles: [],
    certificationFiles: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // Stepper state moved to top level
  const [step, setStep] = useState(0);
  const steps = [
    'Basic Info',
    'Contact & Social',
    'Education & Skills',
    'Profile & Preferences',
    'Uploads',
  ];
  const [saving, setSaving] = useState(false);

  // Demo data for posted projects/startups (fallback)
  const postedItems = [
    {
      type: 'Startup',
      title: 'AI EdTech Platform',
      applicants: [
        { name: 'Alice Johnson', resume: 'alice_resume.pdf', summary: 'AI/ML Intern, 2 years exp.', status: 'pending' },
        { name: 'Bob Smith', resume: 'bob_resume.pdf', summary: 'Fullstack Dev, 1 year exp.', status: 'pending' },
      ],
    },
    {
      type: 'Project',
      title: 'Smart Resume Builder',
      applicants: [
        { name: 'Charlie Brown', resume: 'charlie_resume.pdf', summary: 'UI/UX Designer, 3 years exp.', status: 'pending' },
      ],
    },
  ];

  // Fetch profile from backend
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`${API_URL}/${user.uid}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  // Open edit modal with prefilled data
  const handleEdit = () => {
    setEditData({
      displayName: profile?.name || user.displayName || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || user.email || '',
      bio: profile?.bio || '',
      education: profile?.education || '',
      branch: profile?.branch || '',
      year: profile?.year || '',
      university: profile?.university || '',
      college: profile?.college || '',
      city: profile?.city || '',
      phoneNumber: profile?.phoneNumber || '',
      linkedin: profile?.linkedinUrl || '',
      github: profile?.githubUrl || '',
      website: profile?.portfolioUrl || '',
      profilePicture: profile?.profilePicture || '',
      skills: Array.isArray(profile?.skills) ? profile.skills.join(', ') : (profile?.skills || ''),
      interests: Array.isArray(profile?.interests) ? profile.interests.join(', ') : (profile?.interests || ''),
      careerGoals: profile?.careerGoals || '',
      dateOfBirth: profile?.dateOfBirth || '',
      resumeFiles: profile?.resumeFiles || [],
      projectFiles: profile?.projectFiles || [],
      certificationFiles: profile?.certificationFiles || [],
    });
    setEditOpen(true);
  };

  // Save profile to backend
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      name: editData.displayName,
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
      bio: editData.bio,
      education: editData.education,
      branch: editData.branch,
      year: editData.year,
      university: editData.university,
      college: editData.college,
      city: editData.city,
      phoneNumber: editData.phoneNumber,
      linkedinUrl: editData.linkedin,
      githubUrl: editData.github,
      portfolioUrl: editData.website,
      profilePicture: editData.profilePicture,
      skills: editData.skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: editData.interests.split(',').map(s => s.trim()).filter(Boolean),
      careerGoals: editData.careerGoals,
      dateOfBirth: editData.dateOfBirth,
      resumeFiles: editData.resumeFiles,
      projectFiles: editData.projectFiles,
      certificationFiles: editData.certificationFiles,
    };
    const res = await fetch(`${API_URL}/${user.uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) {
      setProfile(await res.json());
      setEditOpen(false);
    } else {
      alert('Failed to save profile. Make sure data is under 15KB.');
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  // Helper function to save step data
  const saveStepData = async (stepData) => {
    if (!user) return;
    await fetch(`${API_URL}/${user.uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stepData),
    });
    // Refetch profile after save
    fetch(`${API_URL}/${user.uid}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setProfile(data));
  };

  // Stepper navigation with save after each step
  const handleNextStep = async () => {
    if (step === 0) {
      // Step 1: Basic Info
      await saveStepData({
        name: editData.displayName,
        year: editData.year,
        college: editData.university,
        branch: editData.education,
        city: editData.city,
      });
    } else if (step === 1) {
      // Step 2: About
      await saveStepData({
        bio: editData.bio,
      });
    } else if (step === 2) {
      // Step 3: Skills & Achievements
      await saveStepData({
        skills: editData.skills.split(',').map(s => s.trim()).filter(Boolean),
      });
    } else if (step === 3) {
      // Step 4: Links & Uploads
      await saveStepData({
        linkedinUrl: editData.linkedin,
        githubUrl: editData.github,
        portfolioUrl: editData.website,
      });
    } else if (step === 4) {
      // Step 5: Uploads
      await saveStepData({
        resumeFiles: editData.resumeFiles,
        projectFiles: editData.projectFiles,
        certificationFiles: editData.certificationFiles,
      });
    }
    setStep(s => Math.min(steps.length - 1, s + 1));
  };
  const handleBackStep = () => {
    setStep(s => Math.max(0, s - 1));
  };

  if (loading) return <div className="text-white p-8">Loading...</div>;
  if (!user) return <div className="text-white p-8">Please log in.</div>;

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden bg-black">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none" />
      {/* Dashboard Heading */}
      <header className="w-full px-4 sm:px-10 pt-8 pb-4 flex justify-between items-center border-b border-[#a259ff] bg-black/90 backdrop-blur-xl rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <SplitText
            text="DASHBOARD"
            className="text-5xl font-extrabold bg-gradient-to-r from-brand-purple via-brand-pink to-white bg-clip-text text-transparent tracking-wide drop-shadow-lg uppercase"
            delay={80}
            animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
            easing="easeOutCubic"
            threshold={0.3}
            rootMargin="-100px"
            textAlign="center"
          />
        </motion.div>
        <button
          className="text-white text-2xl font-bold hover:text-[#a259ff] transition drop-shadow-lg"
          onClick={() => window.history.back()}
          title="Go Back"
        >
          <X className="w-8 h-8" />
        </button>
      </header>
      {/* Main Dashboard Section */}
      <section className="w-full min-h-[90vh] px-0 sm:px-4 pt-10">
        <div className="rounded-3xl bg-black backdrop-blur-xl shadow-[0_0_32px_4px_#a259ff55] border border-white p-0 md:p-8 mx-0 w-full">
          {/* Profile Card */}
          <div className="flex flex-col lg:flex-row items-center gap-10 bg-gradient-to-br from-black via-[#23272f] to-[#2d1a4a] rounded-2xl shadow-2xl p-10 mb-12 border border-[#a259ff] hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-[#a259ff] hover:outline-[#ff7eb3] hover:shadow-[0_0_24px_4px_#a259ff99,0_0_48px_8px_#ff7eb399] backdrop-blur-2xl w-full">
            <div className="relative">
              <img src={profile?.profilePicture || 'https://placehold.co/120x120/A855F7/FFFFFF?text=User'} alt="Profile" className="h-36 w-36 rounded-full border-4 border-[#a259ff] bg-[#23272f] object-cover shadow-2xl" />
              <span className="absolute bottom-2 right-2 bg-[#ff7eb3] text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg animate-pulse">{profile?.year || ''}</span>
            </div>
            <div className="flex-1 flex flex-col gap-3 items-center lg:items-start w-full">
              <SplitText
                text={profile?.name || user.displayName || 'No Name'}
                className="text-2xl font-extrabold bg-gradient-to-r from-brand-purple via-brand-pink to-white bg-clip-text text-transparent drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] tracking-wide"
                delay={80}
                animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                easing="easeOutCubic"
                threshold={0.3}
                rootMargin="-100px"
                textAlign="center"
              />
              <span className="text-lg text-white font-extrabold drop-shadow-[0_0_4px_#fff,0_0_8px_#a259ff]">{profile?.email || user.email}</span>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2 items-center w-full justify-start">
                <span className="bg-[#a259ff]/20 text-[#a259ff] px-4 py-1 rounded-full text-sm font-extrabold shadow">{profile?.city}</span>
                <span className="bg-[#ff7eb3]/20 text-[#ff7eb3] px-4 py-1 rounded-full text-sm font-extrabold shadow">DOB: {profile?.dateOfBirth}</span>
                <span className="bg-[#a259ff]/20 text-[#a259ff] px-4 py-1 rounded-full text-sm font-extrabold shadow">Phone: {profile?.phoneNumber}</span>
              </div>
              {profile?.bio && (
                <div className="mt-4 w-full max-w-xs lg:max-w-sm">
                  <p className="text-white font-semibold bg-[#23272f]/80 rounded-xl px-4 py-2 border border-[#a259ff]/40 shadow-inner text-sm text-center">
                    {profile.bio || 'This is a temporary bio. Update your profile to add your own bio!'}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Responsive Info Grid - 3 columns on xl, 2 on md, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
            {/* Contact & Social */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-7 flex flex-col items-center border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-3 flex items-center gap-2">Contact & Social</h3>
              <div className="w-full flex justify-center my-3">
                <div className="h-[1.5px] w-2/3 bg-gradient-to-r from-[#a259ff] via-[#ff7eb3] to-white rounded-full" />
              </div>
              <div className="flex items-end gap-10 mt-2 px-4 py-4 rounded-xl bg-black/30 backdrop-blur-md shadow-lg border border-[#a259ff]/30">
                {/* LinkedIn */}
                <div className="flex flex-col items-center group">
                    <a
                      href={profile?.linkedinUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                      className={`relative z-10 transition-transform duration-200 ${profile?.linkedinUrl ? 'hover:scale-125 hover:drop-shadow-[0_0_8px_#a259ff] hover:text-[#a259ff] cursor-pointer' : 'text-white/30 cursor-not-allowed'}`}
                      tabIndex={profile?.linkedinUrl ? 0 : -1}
                      onClick={e => { if (!profile?.linkedinUrl) e.preventDefault(); }}
                    >
                      <Linkedin className="w-9 h-9" />
                    </a>
                  <span className={`mt-2 text-xs font-semibold tracking-wide uppercase ${profile?.linkedinUrl ? 'text-[#a259ff]' : 'text-white/40'}`}>LinkedIn</span>
                </div>
                {/* GitHub */}
                <div className="flex flex-col items-center group">
                    <a
                      href={profile?.githubUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      aria-label="GitHub"
                      className={`relative z-10 transition-transform duration-200 ${profile?.githubUrl ? 'hover:scale-125 hover:drop-shadow-[0_0_8px_#a259ff] hover:text-[#a259ff] cursor-pointer' : 'text-white/30 cursor-not-allowed'}`}
                      tabIndex={profile?.githubUrl ? 0 : -1}
                      onClick={e => { if (!profile?.githubUrl) e.preventDefault(); }}
                    >
                      <Github className="w-9 h-9" />
                    </a>
                  <span className={`mt-2 text-xs font-semibold tracking-wide uppercase ${profile?.githubUrl ? 'text-[#a259ff]' : 'text-white/40'}`}>GitHub</span>
                </div>
                {/* Website */}
                <div className="flex flex-col items-center group">
                    <a
                      href={profile?.portfolioUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Website"
                      aria-label="Website"
                    className={`relative z-10 transition-transform duration-200 ${profile?.portfolioUrl ? 'hover:scale-125 hover:drop-shadow-[0_0_8px_#ff7eb3] hover:text-[#ff7eb3] cursor-pointer' : 'text-white/30 cursor-not-allowed'}`}
                      tabIndex={profile?.portfolioUrl ? 0 : -1}
                      onClick={e => { if (!profile?.portfolioUrl) e.preventDefault(); }}
                    >
                      <Globe className="w-9 h-9" />
                    </a>
                  <span className={`mt-2 text-xs font-semibold tracking-wide uppercase ${profile?.portfolioUrl ? 'text-[#ff7eb3]' : 'text-white/40'}`}>Website</span>
                </div>
              </div>
            </div>
            {/* Education */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-7 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-3 flex items-center gap-2">Education</h3>
              <div className="mb-2 text-white/90 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-[#a259ff]" /><span className="font-semibold">Branch:</span> {profile?.branch}</div>
              <div className="mb-2 text-white/90 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#a259ff]" /><span className="font-semibold">Year:</span> {profile?.year}</div>
              <div className="mb-2 text-white/90 flex items-center gap-2"><School className="w-5 h-5 text-[#a259ff]" /><span className="font-semibold">University:</span> {profile?.university}</div>
            </div>
            {/* Skills */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-7 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-3 flex items-center gap-2">Skills</h3>
              {Array.isArray(profile?.skills) && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-3 mt-1">
                  {profile.skills.map((skill, idx) => (
                    <span key={idx} className="bg-[#ff7eb3]/20 text-[#ff7eb3] px-4 py-1 rounded-full text-sm font-semibold border border-[#ff7eb3]/40 shadow-sm">{skill}</span>
                  ))}
                </div>
              ) : <span className="text-white/60">None</span>}
            </div>
            {/* Projects */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-7 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-3 flex items-center gap-2">Projects</h3>
              {Array.isArray(profile?.projectFiles) && profile.projectFiles.length > 0 ? (
                <ul className="space-y-2">
                  {profile.projectFiles.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#ff7eb3]" />
                      <a href={file.url || file} target="_blank" rel="noopener noreferrer" className="text-white/90 underline">{file.name || file}</a>
                    </li>
                  ))}
                </ul>
              ) : <span className="text-white/60">No projects uploaded.</span>}
            </div>
            {/* Certifications */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-7 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-3 flex items-center gap-2">Certifications</h3>
              {Array.isArray(profile?.certificationFiles) && profile.certificationFiles.length > 0 ? (
                <ul className="space-y-2">
                  {profile.certificationFiles.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#ff7eb3]" />
                      <a href={file.url || file} target="_blank" rel="noopener noreferrer" className="text-white/90 underline">{file.name || file}</a>
                    </li>
                  ))}
                </ul>
              ) : <span className="text-white/60">No certifications uploaded.</span>}
            </div>
            {/* Resume */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-7 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-3 flex items-center gap-2">Resume</h3>
              {Array.isArray(profile?.resumeFiles) && profile.resumeFiles.length > 0 ? (
                <ul className="space-y-2">
                  {profile.resumeFiles.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#ff7eb3]" />
                      <a href={file.url || file} target="_blank" rel="noopener noreferrer" className="text-white/90 underline">{file.name || file}</a>
                    </li>
                  ))}
                </ul>
              ) : <span className="text-white/60">No resume uploaded.</span>}
            </div>
            {/* Profile & Preferences */}
            <div className="rounded-2xl bg-[#18181b] shadow-md p-7 border border-white hover:border-[#ff7eb3] transition-all duration-300 outline outline-2 outline-white hover:outline-[#ff7eb3] hover:shadow-[0_0_16px_2px_#a259ff99,0_0_32px_4px_#ff7eb399]">
              <h3 className="text-xl font-extrabold text-white drop-shadow-[0_0_8px_#fff,0_0_16px_#a259ff] mb-3 flex items-center gap-2">Profile & Preferences</h3>
              <div className="text-white/90 mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-[#a259ff]" /> <span>Bio:</span> {profile?.bio}</div>
              <div className="text-white/90 flex items-center gap-2"><Target className="w-5 h-5 text-[#ff7eb3]" /> <span>Career Goals:</span> {profile?.careerGoals}</div>
            </div>
          </div>
        </div>
      </section>
      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
          <form
            onSubmit={handleSave}
            onKeyDown={e => {
              const target = e.target as HTMLElement;
              // Only prevent Enter if not in textarea
              if (
                e.key === 'Enter' &&
                !(target instanceof HTMLTextAreaElement)
              ) {
                e.preventDefault();
              }
            }}
            className="bg-[#18181b] neon-border rounded-2xl shadow-2xl p-16 w-full max-w-6xl relative z-50 space-y-14"
          >
            <button type="button" onClick={() => !saving && setEditOpen(false)} className="absolute top-8 right-8 text-white/80 hover:text-[#a259ff] p-4 rounded-full transition" disabled={saving}><X className="w-8 h-8" /></button>
            <h2 className="text-white text-4xl font-extrabold mb-12 text-center tracking-wide">Edit Profile</h2>
            {saving && (
              <div className="flex justify-center items-center mb-6">
                <span className="text-[#a259ff] text-xl font-bold animate-pulse">Saving your details...</span>
              </div>
            )}
            {/* Stepper logic */}
            <div className="flex items-center justify-center gap-12 mb-12">
              {steps.map((label, idx) => (
                <div key={label} className={`flex flex-col items-center ${idx === step ? 'text-[#a259ff] font-extrabold' : 'text-white/60 font-bold'}`}> 
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-extrabold border-4 ${idx === step ? 'border-[#a259ff] bg-[#a259ff22]' : 'border-white/30 bg-[#23272f]'}`}>{idx + 1}</div>
                  <span className="text-base mt-3 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
            {/* Step 1: Basic Info */}
            {step === 0 && (
              <div className="space-y-10">
                <h3 className="text-white/90 text-2xl font-extrabold mb-6 border-b-2 border-[#a259ff44] pb-4 tracking-wide">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">First Name</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="First Name" value={editData.firstName} onChange={e => setEditData({ ...editData, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Last Name</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Last Name" value={editData.lastName} onChange={e => setEditData({ ...editData, lastName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Date of Birth</label>
                    <input type="date" className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" value={editData.dateOfBirth} onChange={e => setEditData({ ...editData, dateOfBirth: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Phone Number</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Phone Number" value={editData.phoneNumber} onChange={e => setEditData({ ...editData, phoneNumber: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">City</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="City" value={editData.city} onChange={e => setEditData({ ...editData, city: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
            {/* Step 2: Contact & Social */}
            {step === 1 && (
              <div className="space-y-10">
                <h3 className="text-white/90 text-2xl font-extrabold mb-6 border-b-2 border-[#a259ff44] pb-4 tracking-wide">Contact & Social</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Email</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Email" value={editData.email} readOnly />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">LinkedIn</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="LinkedIn" value={editData.linkedin} onChange={e => setEditData({ ...editData, linkedin: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">GitHub</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="GitHub" value={editData.github} onChange={e => setEditData({ ...editData, github: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Website/Portfolio</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Website/Portfolio" value={editData.website} onChange={e => setEditData({ ...editData, website: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Profile Picture URL</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Profile Picture URL" value={editData.profilePicture} onChange={e => setEditData({ ...editData, profilePicture: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
            {/* Step 3: Education & Skills */}
            {step === 2 && (
              <div className="space-y-10">
                <h3 className="text-white/90 text-2xl font-extrabold mb-6 border-b-2 border-[#a259ff44] pb-4 tracking-wide">Education & Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Branch</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Branch" value={editData.branch} onChange={e => setEditData({ ...editData, branch: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Year</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Year" value={editData.year} onChange={e => setEditData({ ...editData, year: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">University</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="University" value={editData.university} onChange={e => setEditData({ ...editData, university: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Skills (comma separated)</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Skills" value={editData.skills} onChange={e => setEditData({ ...editData, skills: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Interests (comma separated)</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Interests" value={editData.interests} onChange={e => setEditData({ ...editData, interests: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
            {/* Step 4: Profile & Preferences */}
            {step === 3 && (
              <div className="space-y-10">
                <h3 className="text-white/90 text-2xl font-extrabold mb-6 border-b-2 border-[#a259ff44] pb-4 tracking-wide">Profile & Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Bio</label>
                    <textarea className="p-4 rounded bg-[#23272f] text-white w-full min-h-[120px] font-semibold text-lg" placeholder="Bio" value={editData.bio} onChange={e => setEditData({ ...editData, bio: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Career Goals</label>
                    <input className="p-4 rounded bg-[#23272f] text-white w-full font-semibold text-lg" placeholder="Career Goals" value={editData.careerGoals} onChange={e => setEditData({ ...editData, careerGoals: e.target.value })} />
                  </div>
                </div>
              </div>
            )}
            {/* Step 5: Uploads */}
            {step === 4 && (
              <div className="space-y-10">
                <h3 className="text-white/90 text-2xl font-extrabold mb-6 border-b-2 border-[#a259ff44] pb-4 tracking-wide">Uploads</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Resume Files</label>
                    <input type="file" multiple className="block w-full text-white bg-[#23272f] rounded p-2" onChange={e => setEditData({ ...editData, resumeFiles: Array.from(e.target.files).map(f => f.name) })} />
                    {editData.resumeFiles && editData.resumeFiles.length > 0 && (
                      <ul className="mt-2 text-white/80 text-sm list-disc list-inside">
                        {editData.resumeFiles.map((file, idx) => <li key={idx}>{file}</li>)}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Project Files</label>
                    <input type="file" multiple className="block w-full text-white bg-[#23272f] rounded p-2" onChange={e => setEditData({ ...editData, projectFiles: Array.from(e.target.files).map(f => f.name) })} />
                    {editData.projectFiles && editData.projectFiles.length > 0 && (
                      <ul className="mt-2 text-white/80 text-sm list-disc list-inside">
                        {editData.projectFiles.map((file, idx) => <li key={idx}>{file}</li>)}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/90 mb-3 font-bold text-lg">Certification Files</label>
                    <input type="file" multiple className="block w-full text-white bg-[#23272f] rounded p-2" onChange={e => setEditData({ ...editData, certificationFiles: Array.from(e.target.files).map(f => f.name) })} />
                    {editData.certificationFiles && editData.certificationFiles.length > 0 && (
                      <ul className="mt-2 text-white/80 text-sm list-disc list-inside">
                        {editData.certificationFiles.map((file, idx) => <li key={idx}>{file}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-14">
              <button type="button" className="bg-[#23272f] text-white px-12 py-4 rounded font-extrabold hover:bg-[#a259ff] transition text-xl" disabled={step === 0 || saving} onClick={handleBackStep}>Back</button>
              {step < steps.length - 1 ? (
                <button type="button" className="bg-[#a259ff] text-white px-12 py-4 rounded font-extrabold hover:bg-[#7e3fff] transition text-xl" onClick={handleNextStep} disabled={saving}>Next</button>
              ) : (
                <button type="submit" className="bg-[#a259ff] text-white px-12 py-4 rounded font-extrabold hover:bg-[#7e3fff] transition text-xl" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              )}
            </div>
          </form>
        </div>
      )}
      {/* Footer Buttons */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-10 pb-10 flex flex-col sm:flex-row gap-4 mt-16">
        <button className="profile-btn flex-1 bg-white text-black font-bold rounded-2xl py-5 text-2xl flex items-center justify-center gap-2 shadow hover:scale-105 transition" onClick={handleEdit}>
          Edit Profile
        </button>
        <button className="profile-btn flex-1 bg-red-600 text-white font-extrabold rounded-2xl py-5 text-2xl flex items-center justify-center gap-2 shadow hover:scale-105 transition" onClick={handleLogout}>
          Logout
        </button>
      </footer>
    </div>
  );
} 