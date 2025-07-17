import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { SplitText } from "@/components/ui/split-text";
import { motion } from "framer-motion";
import ChatModal from '@/components/network/ChatModal';
import { AnimatePresence } from "framer-motion";

const TAGLINES = [
  "AI", "Blockchain", "Web Development", "UI/UX", "Sustainability"
];

const PROJECTS = [
  {
    title: "AI-Powered Study Buddy",
    description: "A chatbot that helps students with study planning and Q&A. Built with React, Node.js, and OpenAI APIs. Looking for frontend and AI engineers!",
    skills: ["React", "Node.js", "NLP", "OpenAI API"],
    roles: ["Frontend", "Backend", "AI Engineer"],
    teamSize: 5,
    status: "Recruiting",
    category: "ai",
    collaboration: "remote",
    college: "IIT Bombay"
  },
  {
    title: "Campus Carbon Tracker",
    description: "Track and reduce your college's carbon footprint. Join us to build a dashboard and mobile app for sustainability!",
    skills: ["Python", "Data Viz", "APIs", "Flutter"],
    roles: ["Data Scientist", "Designer", "Mobile Dev"],
    teamSize: 4,
    status: "Open",
    category: "sustainability",
    collaboration: "inperson",
    college: "IIT Delhi"
  },
  {
    title: "Decentralized Voting Platform",
    description: "A blockchain-based voting system for campus elections. Need smart contract and UI/UX talent.",
    skills: ["Solidity", "React", "Web3.js"],
    roles: ["Smart Contract Dev", "UI/UX Designer"],
    teamSize: 6,
    status: "Recruiting",
    category: "blockchain",
    collaboration: "remote",
    college: "BITS Pilani"
  },
  {
    title: "Student Marketplace",
    description: "A web app for students to buy/sell books and gadgets. Join for backend and product roles!",
    skills: ["Node.js", "MongoDB", "React"],
    roles: ["Backend", "Product Manager"],
    teamSize: 5,
    status: "Open",
    category: "webdev",
    collaboration: "remote",
    college: "IIT Madras"
  },
  {
    title: "Mental Health App",
    description: "Mobile app for student mental wellness. Looking for Flutter and content creators.",
    skills: ["Flutter", "Firebase", "Content Writing"],
    roles: ["Mobile Dev", "Content Creator"],
    teamSize: 3,
    status: "Recruiting",
    category: "ai",
    collaboration: "inperson",
    college: "IIT Kanpur"
  },
  {
    title: "Campus Events Portal",
    description: "Centralized portal for all campus events. Need fullstack and UI/UX help!",
    skills: ["React", "Node.js", "Figma"],
    roles: ["Fullstack", "UI/UX Designer"],
    teamSize: 7,
    status: "Open",
    category: "uiux",
    collaboration: "remote",
    college: "IIT Kharagpur"
  },
];

const MY_PROJECTS = [
  {
    title: "Open Source Portfolio",
    status: "In Progress",
    type: "Joined"
  },
  {
    title: "Hackathon Helper",
    status: "Completed",
    type: "Posted"
  },
  {
    title: "Eco Campus",
    status: "Recruiting",
    type: "Joined"
  },
];

const SHOWCASE = [
  { title: "Smart Attendance System", domain: "AI", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" },
  { title: "Green Campus App", domain: "Sustainability", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" },
  { title: "NFT Art Gallery", domain: "Blockchain", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { title: "Peer Learning Platform", domain: "Web Development", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { title: "Campus Connect", domain: "UI/UX", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { title: "Virtual Labs", domain: "AI", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80" },
  { title: "Eco Warriors", domain: "Sustainability", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { title: "Crypto Campus", domain: "Blockchain", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
];

const roleOptions = [
  { value: "any", label: "Any" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "pm", label: "Product Manager" },
  { value: "ai", label: "AI Engineer" },
  { value: "mobile", label: "Mobile Dev" },
  { value: "content", label: "Content Creator" },
  { value: "fullstack", label: "Fullstack" },
  { value: "backend", label: "Backend" },
  { value: "product", label: "Product Manager" },
  { value: "smartcontract", label: "Smart Contract Dev" },
  { value: "uiux", label: "UI/UX Designer" },
  { value: "datascientist", label: "Data Scientist" },
];

const categoryOptions = [
  { value: "all", label: "All" },
  { value: "ai", label: "AI" },
  { value: "blockchain", label: "Blockchain" },
  { value: "webdev", label: "Web Development" },
  { value: "uiux", label: "UI/UX" },
  { value: "sustainability", label: "Sustainability" },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "recruiting", label: "Recruiting" },
  { value: "closed", label: "Closed" },
];

const collabOptions = [
  { value: "any", label: "Any" },
  { value: "remote", label: "Remote" },
  { value: "inperson", label: "In-Person" },
];

const collegeOptions = [
  "IIT Bombay", "IIT Delhi", "BITS Pilani", "IIT Madras", "IIT Kanpur", "IIT Kharagpur"
];

const ProjectHunt: React.FC = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postedProjects, setPostedProjects] = useState<any[]>([]);
  // Today's date for filtering
  const today = new Date();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [myProjectsFilter, setMyProjectsFilter] = useState("All");
  const [showChatModal, setShowChatModal] = useState(false);
  const [activeChatProject, setActiveChatProject] = useState<any>(null);
  const [chatUser, setChatUser] = useState(null);
  const [requestedProjects, setRequestedProjects] = useState<{ [key: string]: boolean }>({});

  // Filter state
  const [category, setCategory] = useState("all");
  const [role, setRole] = useState("any");
  const [techStack, setTechStack] = useState("");
  const [status, setStatus] = useState("all");
  const [collab, setCollab] = useState("any");
  const [college, setCollege] = useState("");

  // Simulate current user (replace with real auth in production)
  const currentUser = { id: 'user1', name: 'You' };
  // Track contribute requests: { [projectTitle]: [{id, name, status}] }
  const [contributeRequests, setContributeRequests] = useState<{ [title: string]: Array<{id: string, name: string, status: 'pending'|'accepted'|'rejected'}> }>({});
  // Track open chats: { [projectTitle]: userId[] }
  const [openChats, setOpenChats] = useState<{ [title: string]: string[] }>({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % TAGLINES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Merge posted projects with default projects
  const allProjects = [...postedProjects, ...PROJECTS];
  // Filter out projects whose last date to contribute has passed
  const activeProjects = allProjects.filter(proj => {
    if (!proj.lastDate) return true;
    const lastDate = new Date(proj.lastDate);
    lastDate.setHours(23,59,59,999);
    return today <= lastDate;
  });
  // Filtering logic
  const filteredProjects = activeProjects.filter((proj) => {
    const matchCategory = category === "all" || proj.category === category;
    const matchRole = role === "any" || (proj.roles && proj.roles.map(r => r.toLowerCase().replace(/ /g, "")).includes(role));
    const matchTech = !techStack || (proj.skills && proj.skills.join(" ").toLowerCase().includes(techStack.toLowerCase()));
    const matchStatus = status === "all" || (proj.status && proj.status.toLowerCase() === status);
    const matchCollab = collab === "any" || proj.collaboration === collab;
    const matchCollege = !college || (proj.college && proj.college.toLowerCase().includes(college.toLowerCase()));
    return matchCategory && matchRole && matchTech && matchStatus && matchCollab && matchCollege;
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="w-full py-20 px-4 bg-gradient-to-b from-brand-purple/80 to-transparent relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex-1 text-left">
            <SplitText
              text="Project Hunt"
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
              textAlign="left"
            />
            <motion.p
              className="text-lg md:text-2xl max-w-2xl mb-0 text-white/80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Discover, join, or launch real-world student tech projects. Collaborate, innovate, and build your future with peers across domains.
            </motion.p>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end mt-8 md:mt-16">
            <Button
              size="lg"
              className="text-lg px-8 py-3 font-extrabold border-2"
              style={{
                background: 'linear-gradient(90deg, #fff 0%, #f3f3ff 100%)',
                borderColor: '#a259ff',
                color: '#18181b',
                textShadow: '0 0 6px #a259ff88',
                fontWeight: 900,
                boxShadow: '0 2px 16px 0 #a259ff22',
              }}
              onClick={() => setShowPostModal(true)}
            >
              Post Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Filter & Search Section - Card Style */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8 z-10 relative">
        <Card className="bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 border border-purple-700/30 shadow-xl rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-white">Find Projects</CardTitle>
            <CardDescription className="text-white/60">Filter and search for projects that match your interests and skills.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Category/Domain</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-[#23272f] border border-input text-white">
                    <span>{categoryOptions.find(opt => opt.value === category)?.label}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-[#23272f] text-white">
                    {categoryOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Required Roles</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-[#23272f] border border-input text-white">
                    <span>{roleOptions.find(opt => opt.value === role)?.label}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-[#23272f] text-white">
                    {roleOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tech Stack</label>
                <Input value={techStack} onChange={e => setTechStack(e.target.value)} placeholder="e.g. React, Node" className="bg-[#23272f] border border-input text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-[#23272f] border border-input text-white">
                    <span>{statusOptions.find(opt => opt.value === status)?.label}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-[#23272f] text-white">
                    {statusOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Collaboration</label>
                <Select value={collab} onValueChange={setCollab}>
                  <SelectTrigger className="bg-[#23272f] border border-input text-white">
                    <span>{collabOptions.find(opt => opt.value === collab)?.label}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-[#23272f] text-white">
                    {collabOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">College</label>
                <Input value={college} onChange={e => setCollege(e.target.value)} placeholder="Search college..." className="bg-[#23272f] border border-input text-white" />
              </div>
              <div className="md:col-span-3 flex justify-end mt-2">
                <Button className="w-full md:w-auto" type="button">Search</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Real-time Project Feed */}
      <section className="w-full max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Live Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 border border-purple-700/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold text-white group-hover:text-brand-purple transition-colors">{proj.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-2 text-sm">{proj.description}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  {proj.skills.map((s: string) => (
                    <span key={s} className="bg-brand-pink/20 text-brand-pink px-2 py-1 rounded">{s}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  {proj.roles.map((r: string) => (
                    <span key={r} className="bg-brand-purple/20 text-brand-purple px-2 py-1 rounded">{r}</span>
                  ))}
                </div>
                <span className="text-sm text-white/60">Team: {proj.teamSize}+</span>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end">
                <button
                  className={`px-6 py-2 font-bold rounded-full shadow transition-all text-base ${requestedProjects[proj.title] ? 'bg-orange-500 text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                  style={{ minWidth: 120 }}
                  onClick={() => {
                    if (!requestedProjects[proj.title]) {
                      setRequestedProjects(prev => ({ ...prev, [proj.title]: true }));
                    }
                  }}
                  disabled={!!requestedProjects[proj.title]}
                >
                  {requestedProjects[proj.title] ? 'Requested' : 'Contribute'}
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* My Projects Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">My Projects</h2>
          <div className="flex gap-2">
            {['All', 'Joined', 'Posted'].map(f => (
              <Button key={f} size="sm" variant={myProjectsFilter === f ? 'default' : 'outline'} onClick={() => setMyProjectsFilter(f)}>{f}</Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MY_PROJECTS.filter(p => myProjectsFilter === 'All' || p.type === myProjectsFilter).map((proj, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 border border-purple-700/30 rounded-2xl shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <span className="font-semibold text-white">{proj.title}</span>
                <span className={`text-xs px-2 py-1 rounded ${proj.status === 'In Progress' ? 'bg-yellow-400/20 text-yellow-400' : proj.status === 'Completed' ? 'bg-green-400/20 text-green-400' : 'bg-brand-purple/20 text-brand-purple'} font-bold`}>{proj.status}</span>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span className="text-xs text-white/60">{proj.type}</span>
                {/* If current user is owner, show requests */}
                {contributeRequests[proj.title]?.length > 0 && (
                  <div className="mt-2">
                    <div className="font-semibold text-white mb-1">Contribute Requests:</div>
                    {contributeRequests[proj.title].map((req, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1">
                        <span className="text-white/80">{req.name}</span>
                        {req.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => {
                              setContributeRequests(prev => ({
                                ...prev,
                                [proj.title]: prev[proj.title].map(r => r.id === req.id ? { ...r, status: 'accepted' } : r)
                              }));
                              setOpenChats(prev => ({
                                ...prev,
                                [proj.title]: [...(prev[proj.title] || []), req.id]
                              }));
                            }}>Accept</Button>
                            <Button size="sm" variant="outline" onClick={() => {
                              setContributeRequests(prev => ({
                                ...prev,
                                [proj.title]: prev[proj.title].map(r => r.id === req.id ? { ...r, status: 'rejected' } : r)
                              }));
                            }}>Reject</Button>
                          </>
                        )}
                        {req.status === 'accepted' && (
                          <Button size="sm" variant="secondary" onClick={() => setShowChatModal(true)}>Chat</Button>
                        )}
                        {req.status === 'rejected' && (
                          <span className="text-red-400 text-xs">Rejected</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-row items-center justify-between">
                <Button size="sm" variant="outline" onClick={() => { setActiveChatProject(proj); setShowChatModal(true); }}>Chat</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Project Showcase Wall */}
      <section className="w-full max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Project Showcase Wall</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SHOWCASE.map((item, i) => (
            <Card key={i} className="bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 border border-purple-700/30 rounded-2xl flex flex-col items-center justify-center p-6 shadow-md">
              <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded-full mb-2 border-2 border-brand-purple/40" />
              <span className="font-semibold text-white mb-1">{item.title}</span>
              <span className="text-xs text-brand-purple bg-brand-purple/10 px-2 py-1 rounded-full">{item.domain}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Post Project Modal (polished) */}
      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black/80 border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Post a New Project</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowPostModal(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </Button>
              </div>
              <form
                className="flex flex-col gap-4"
                onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const title = formData.get('title') as string;
                  const description = formData.get('description') as string;
                  const techStack = formData.get('techStack') as string;
                  const roles = formData.get('roles') as string;
                  const duration = formData.get('duration') as string;
                  const links = formData.get('links') as string;
                  const lastDate = formData.get('lastDate') as string;
                  // Add new project to postedProjects
                  setPostedProjects(prev => [{
                    title,
                    description,
                    skills: techStack.split(',').map(s => s.trim()).filter(Boolean),
                    roles: roles.split(',').map(s => s.trim()).filter(Boolean),
                    teamSize: 1,
                    status: 'Open',
                    category: 'webdev', // Default or add a select if needed
                    collaboration: 'remote', // Default or add a select if needed
                    college: '',
                    duration,
                    links,
                    lastDate,
                  }, ...prev]);
                  setShowPostModal(false);
                  form.reset();
                }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Project Title</label>
                  <Input name="title" placeholder="Project Title" className="bg-[#18181b] border border-input text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Short Description</label>
                  <Input name="description" placeholder="Short Description" className="bg-[#18181b] border border-input text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                  <Input name="techStack" placeholder="e.g. React, Node, Solidity" className="bg-[#18181b] border border-input text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Required Roles (comma separated)</label>
                  <Input name="roles" placeholder="e.g. Frontend, Backend, Designer" className="bg-[#18181b] border border-input text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expected Duration</label>
                  <Input name="duration" placeholder="e.g. 3 months" className="bg-[#18181b] border border-input text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Date to Contribute</label>
                  <Input name="lastDate" type="date" className="bg-[#18181b] border border-input text-white" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Optional: Media/Links</label>
                  <Input name="links" placeholder="GitHub, Figma, etc." className="bg-[#18181b] border border-input text-white" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink mt-2">Submit Project</Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal (placeholder) */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        {selectedProject && (
          <div className="bg-[#23272f] p-8 rounded-2xl max-w-lg w-full mx-auto">
            <h3 className="text-2xl font-bold mb-2 text-center">{selectedProject.title}</h3>
            <p className="mb-2 text-white/80 text-center">{selectedProject.description}</p>
            <div className="mb-2 flex flex-wrap gap-2 justify-center">
              <span className="font-semibold">Skills:</span> {selectedProject.skills.join(", ")}
            </div>
            <div className="mb-2 flex flex-wrap gap-2 justify-center">
              <span className="font-semibold">Roles:</span> {selectedProject.roles.join(", ")}
            </div>
            <div className="mb-2 text-center">
              <span className="font-semibold">Team Size:</span> {selectedProject.teamSize}+
            </div>
            <div className="mb-2 text-center">
              <span className="font-semibold">Status:</span> {selectedProject.status}
            </div>
            <Button className="mt-2 w-full">Request to Contribute</Button>
          </div>
        )}
      </Dialog>

      {/* Chat Modal Placeholder */}
      {showChatModal && (
        <ChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          user={chatUser || { id: 1, name: activeChatProject?.title || 'Project Owner', profilePicture: '/placeholder.svg', isOnline: true }}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProjectHunt; 