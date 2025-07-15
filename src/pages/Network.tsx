import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProfileCard from "@/components/network/UserProfileCard";
import ChatModal from "@/components/network/ChatModal";
import ChatSidebar from "@/components/network/ChatSidebar";
import NetworkFilters from "@/components/network/NetworkFilters";
import ConnectionRequests from "@/components/network/ConnectionRequests";
import { SplitText } from "@/components/ui/split-text";
import { MessageSquare, Bell, Filter, Users, UserPlus, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/lib/AuthContext';

const emptyUser = {
  id: '',
  name: '',
  profilePicture: '',
  role: '',
  school: '',
  status: '',
  tags: [],
  interests: [],
  connections: 0,
  classYear: 0,
  bio: '',
  isOnline: false,
};

// Mock connection requests
const mockConnectionRequests = [
  {
    id: 101,
    name: "Jordan Smith",
    profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    role: "Startup Founder",
    school: "Harvard University",
    mutualConnections: 12,
    timeAgo: "2 days ago"
  },
  {
    id: 102,
    name: "Sophia Rodriguez",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    role: "Marketing Manager",
    school: "Columbia University",
    mutualConnections: 8,
    timeAgo: "5 hours ago"
  },
  {
    id: 103,
    name: "Aiden Park",
    profilePicture: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face",
    role: "Software Developer",
    school: "UC San Diego",
    mutualConnections: 3,
    timeAgo: "1 week ago"
  }
];

const Network = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All Interests");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [connectionRequests, setConnectionRequests] = useState(mockConnectionRequests);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingUsers(true);
    setUserError(null);
    getDocs(collection(db, 'users'))
      .then(snapshot => {
        const userList = snapshot.docs.map(doc => ({
          ...emptyUser,
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(userList);
        setLoadingUsers(false);
      })
      .catch(err => {
        setUserError('Failed to load users.');
        setLoadingUsers(false);
      });
  }, []);

  const handleMessageClick = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
  };

  const handleConnectClick = (userId: number) => {
    // In a real app, this would send a connection request to the backend
    console.log(`Connection request sent to user ${userId}`);
  };

  const handleAcceptRequest = (requestId: number) => {
    // In a real app, this would accept the connection request in the backend
    setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
    console.log(`Connection request ${requestId} accepted`);
  };

  const handleDeclineRequest = (requestId: number) => {
    // In a real app, this would decline the connection request in the backend
    setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
    console.log(`Connection request ${requestId} declined`);
  };

  const toggleChatSidebar = () => {
    setIsChatSidebarOpen(prev => !prev);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedInterest("All Interests");
    setSelectedSkills([]);
    setSelectedStatuses([]);
    setSelectedLocations([]);
    setSelectedSchools([]);
  };

  // Filter users based on all filter criteria
  const filteredUsers = useMemo(() => {
    // If no filters/search are active, show all users
    const noFilters = !searchTerm && selectedInterest === "All Interests" && selectedSkills.length === 0 && selectedStatuses.length === 0 && selectedLocations.length === 0 && selectedSchools.length === 0;
    if (noFilters) return users;
    const safe = (val) => typeof val === 'string' ? val : '';
    return users.filter((user) => {
      // Search by name (skip if no name)
      const matchesSearch = safe(user.name).toLowerCase().includes(searchTerm.toLowerCase());
      // Filter by interest
      const matchesInterest = selectedInterest === "All Interests" ||
        (user.interests && user.interests.some(interest => interest === selectedInterest));
      // Filter by skills
      const matchesSkills = selectedSkills.length === 0 ||
        (user.tags && user.tags.some(tag => selectedSkills.includes(tag)));
      // Filter by connection status
      const matchesStatus = selectedStatuses.length === 0 ||
        selectedStatuses.includes(user.status);
      // Filter by location (mock implementation - in a real app, you'd have location data)
      const matchesLocation = selectedLocations.length === 0;
      // Filter by school (mock implementation - in a real app, you'd have school data)
      const matchesSchool = selectedSchools.length === 0 ||
        (user.school && selectedSchools.includes(user.school));
      return matchesSearch && matchesInterest && matchesSkills && matchesStatus &&
        matchesLocation && matchesSchool;
    });
  }, [users, searchTerm, selectedInterest, selectedSkills, selectedStatuses, selectedLocations, selectedSchools]);

  // Freeze background scroll when chat sidebar is open
  useEffect(() => {
    if (isChatSidebarOpen) {
      // Prevent scroll and fix body position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100vw';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll and body position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0'));
      }
    }
    return () => {
      // Cleanup on unmount
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0'));
      }
    };
  }, [isChatSidebarOpen]);

  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden${isChatSidebarOpen ? ' pointer-events-none' : ''}`}>
      {/* Overlay for blur and freeze when chat sidebar is open */}
      {isChatSidebarOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-md bg-black/30 transition-all duration-300"
          aria-hidden="true"
        />
      )}
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-purple/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-pink/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <Navbar />




      {/* Floating Chat Sidebar below Navbar */}
      <div className="fixed top-[120px] left-0 z-50 w-full flex justify-center" style={{ height: '0', pointerEvents: 'none' }}>
        <div className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${isChatSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <ChatSidebar isOpen={isChatSidebarOpen} onClose={toggleChatSidebar} />
        </div>
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <SplitText
                text="Network & Connections"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white"
                textAlign="left"
              />
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl">Connect with students, founders, and mentors in your network</p>
            </div>
            <Button
              onClick={toggleChatSidebar}
              className="rounded-full w-14 h-14 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-lg p-0 relative flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
            {/* Sidebar: Filters & Connection Requests */}
            <aside className="sticky top-28 self-start z-10 w-full flex flex-col gap-6">
              {/* Network Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl shadow-lg p-4 border border-white/10 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-brand-purple" />
                  <div className="text-2xl font-bold text-white">247</div>
                  <div className="text-xs text-white/70">Connections</div>
                </div>
                <div className="bg-white/5 rounded-2xl shadow-lg p-4 border border-white/10 text-center">
                  <Bell className="w-6 h-6 mx-auto mb-2 text-brand-pink" />
                  <div className="text-2xl font-bold text-white">{connectionRequests.length}</div>
                  <div className="text-xs text-white/70">Requests</div>
                </div>
              </div>

              {/* Connection Requests */}
              <ConnectionRequests
                requests={connectionRequests}
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
              />

              {/* Filters Card */}
              <div className="sticky top-6 h-fit w-full p-4 space-y-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/10 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-lg text-white flex items-center gap-2">
                    <Filter className="w-5 h-5 text-brand-purple" />
                    <span>Filters</span>
                  </div>
                </div>
                <NetworkFilters
                  onSearchChange={setSearchTerm}
                  onInterestChange={setSelectedInterest}
                  onSkillChange={setSelectedSkills}
                  onStatusChange={setSelectedStatuses}
                  onLocationChange={setSelectedLocations}
                  onSchoolChange={setSelectedSchools}
                  searchValue={searchTerm}
                  selectedInterest={selectedInterest}
                  selectedSkills={selectedSkills}
                  selectedStatuses={selectedStatuses}
                  selectedLocations={selectedLocations}
                  selectedSchools={selectedSchools}
                  onClearAll={clearAllFilters}
                />
              </div>
            </aside>

            {/* Main Content: User Cards */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{filteredUsers.length} People Found</span>
                  {(selectedInterest !== "All Interests" || selectedSkills.length > 0) && (
                    <Badge className="bg-brand-purple/20 text-brand-purple border border-brand-purple/40">
                      Filtered
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex rounded-full border border-brand-purple overflow-hidden">
                    <button
                      className={`px-3 py-1 text-white transition font-semibold ${viewMode === 'grid' ? 'bg-brand-purple' : 'bg-white/10'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      Grid
                    </button>
                    <button
                      className={`px-3 py-1 text-white transition font-semibold ${viewMode === 'list' ? 'bg-brand-purple' : 'bg-white/10'}`}
                      onClick={() => setViewMode('list')}
                    >
                      List
                    </button>
                  </div>
                  <select className="rounded-full px-3 py-1 border border-brand-purple bg-black text-white transition focus:ring-2 focus:ring-brand-purple ml-2">
                    <option>Sort by Relevance</option>
                    <option>Sort by Connections</option>
                    <option>Sort by Name</option>
                  </select>
                </div>
              </div>
              {loadingUsers && <div className="text-white/60 text-center">Loading users...</div>}
              {userError && <div className="text-red-400 text-center">{userError}</div>}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
                  {(filteredUsers.length > 0 ? filteredUsers : users).map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <UserProfileCard
                        user={user}
                        onMessageClick={() => handleMessageClick(user)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4 mb-16">
                  {(filteredUsers.length > 0 ? filteredUsers : users).map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="bg-gradient-to-br from-black via-gray-900 to-purple-900/30 border border-white/10 rounded-xl p-4 hover:border-brand-purple/40 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="w-16 h-16 rounded-full border-2 border-brand-purple/40 object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${user.isOnline ? "bg-green-500" : "bg-gray-500"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{user.name}</span>
                            <span className="text-xs text-white/60">{user.classYear}</span>
                          </div>
                          <p className="text-sm text-white/70 truncate">{user.bio}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {/* Chat Modal (for mobile) */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChatModal}
        user={selectedUser}
      />

      {/* Chat Sidebar (for desktop) */}
      <ChatSidebar
        isOpen={isChatSidebarOpen}
        onClose={() => setIsChatSidebarOpen(false)}
      />
    </div>
  );
};

export default Network;
