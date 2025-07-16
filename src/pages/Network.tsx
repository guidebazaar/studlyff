import { useState, useMemo, useEffect, useCallback } from "react";
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
// import { db } from '@/lib/firebase';
// import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/lib/AuthContext';

// Add a type for user to ensure id is present
type NetworkUser = {
  id: string;
  name: string;
  profilePicture: string;
  college: string;
  year: string;
  branch: string;
  skills: string[];
  bio: string;
  isOnline: boolean;
  interests?: string[];
};

const Network = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All Interests");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [connectionView, setConnectionView] = useState('public'); // 'public' or 'connections'
  const { user: currentUser } = useAuth();
  const userId = (currentUser as any)?.id || (currentUser as any)?.uid;
  const [users, setUsers] = useState<NetworkUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0); // TODO: Replace with real unread count from backend or context
  const [connections, setConnections] = useState<string[]>([]); // user IDs
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]); // [{from, to, ...}]
  const [pendingRequests, setPendingRequests] = useState<string[]>([]); // user IDs to whom I sent requests

  useEffect(() => {
    setLoadingUsers(true);
    setUserError(null);
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
        return res.json();
      })
      .then(data => {
        console.log('Fetched users from backend:', data); // Debug log
        const userList = data.map(user => ({
          id: user._id,
          name: user.firstName || '',
          profilePicture: user.profilePicture || '',
          college: user.college || '',
          year: user.year || '',
          branch: user.branch || '',
          skills: user.skills || [],
          bio: user.bio || '',
          isOnline: user.isOnline || false,
        }));
        setUsers(userList);
        setLoadingUsers(false);
      })
      .catch(err => {
        setUserError('Failed to load users: ' + err.message);
        setLoadingUsers(false);
      });
  }, []);

  // Fetch connections and requests
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/connections/${userId}`)
      .then(res => res.json())
      .then(setConnections);
    fetch(`/api/connections/requests/${userId}`)
      .then(res => res.json())
      .then(reqs => setIncomingRequests(reqs));
  }, [userId]);

  const handleMessageClick = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
  };

  // Remove unused handleConnectClick, use inline logic with userId where needed

  // Update the logic for accepting a connection request to update the connections state
  const handleAcceptRequest = (fromUserId: string) => {
    if (!userId) return;
    fetch('/api/connections/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: fromUserId, to: userId })
    }).then(() => {
      setConnections(prev => [...prev, fromUserId]);
      setIncomingRequests(prev => prev.filter(req => req.from !== fromUserId));
    });
  };

  const handleDeclineRequest = (fromUserId: string) => {
    if (!userId) return;
    fetch('/api/connections/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: fromUserId, to: userId })
    }).then(() => {
      setIncomingRequests(prev => prev.filter(req => req.from !== fromUserId));
    });
  };

  const toggleChatSidebar = () => {
    setIsChatSidebarOpen(prev => !prev);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedInterest("All Interests");
    setSelectedSkills([]);
    setSelectedStatuses([]);
  };

  // Filter users based on all filter criteria and connectionView
  const filteredUsers = useMemo(() => {
    // Choose base list depending on connectionView
    let baseUsers: NetworkUser[];
    if (connectionView === 'connections') {
      baseUsers = users.filter(user => connections.includes(user.id));
    } else {
      baseUsers = users.filter(user => user.id !== userId && !connections.includes(user.id));
    }
    // If no filters/search are active, show all base users
    const noFilters = !searchTerm && selectedInterest === "All Interests" && selectedSkills.length === 0 && selectedStatuses.length === 0;
    if (noFilters) return baseUsers;
    const safe = (val: any) => typeof val === 'string' ? val : '';
    return baseUsers.filter((user: NetworkUser) => {
      // Search by name (skip if no name)
      const matchesSearch = safe(user.name).toLowerCase().includes(searchTerm.toLowerCase());
      // Filter by interest
      const matchesInterest = selectedInterest === "All Interests" ||
        (user.interests && user.interests.some(interest => interest === selectedInterest));
      // Filter by skills
      const matchesSkills = selectedSkills.length === 0 ||
        (user.skills && user.skills.some(skill => selectedSkills.includes(skill)));
      // Filter by connection status
      const matchesStatus = selectedStatuses.length === 0 ||
        selectedStatuses.includes(user.year); // Assuming 'year' is the status
      return matchesSearch && matchesInterest && matchesSkills && matchesStatus;
    });
  }, [users, searchTerm, selectedInterest, selectedSkills, selectedStatuses, connectionView, connections, userId]);

  // Filter users based on connectionView
  const displayedUsers = connectionView === 'connections'
    ? users.filter(user => connections.includes(user.id))
    : users.filter(user => user.id !== userId && !connections.includes(user.id));

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

  // Connection status helper
  const getConnectionStatus = useCallback((userId: string) => {
    if (connections.includes(userId)) return 'connected';
    if (pendingRequests.includes(userId)) return 'pending';
    // If incoming request, treat as 'none' for card button (handled elsewhere)
    return 'none';
  }, [connections, pendingRequests]);

  const handleConnect = (targetUserId: string) => {
    if (!userId) return;
    fetch('/api/connections/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: userId, to: targetUserId })
    }).then(() => setPendingRequests(prev => [...prev, targetUserId]));
  };

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
              {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages}
              </span>
              )}
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
            {/* Sidebar: Filters & Connection Requests */}
            <aside className="sticky top-28 self-start z-10 w-full flex flex-col gap-6">
              {/* Network Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl shadow-lg p-4 border border-white/10 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-brand-purple" />
                  <div className="text-2xl font-bold text-white">{connections.length}</div>
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
                requests={incomingRequests.map(r => ({
                  id: r.from, // string user ID
                  name: users.find(u => u.id === r.from)?.name || '',
                  profilePicture: users.find(u => u.id === r.from)?.profilePicture || '',
                  role: '', // fill as needed
                  school: '', // fill as needed
                  mutualConnections: 0, // fill as needed
                  timeAgo: '', // fill as needed
                }))}
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
                  searchValue={searchTerm}
                  selectedInterest={selectedInterest}
                  selectedSkills={selectedSkills}
                  selectedStatuses={selectedStatuses}
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
                  </div>
                  <select
                    className="rounded-full px-3 py-1 border border-brand-purple bg-black text-white transition focus:ring-2 focus:ring-brand-purple ml-2"
                    value={connectionView}
                    onChange={e => setConnectionView(e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="connections">Your Connections</option>
                  </select>
                </div>
              </div>
              {loadingUsers && <div className="text-white/60 text-center">Loading users...</div>}
              {userError && <div className="text-red-400 text-center">{userError}</div>}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
                  {filteredUsers.map((user: NetworkUser, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <UserProfileCard
                        user={user}
                        onMessageClick={() => handleMessageClick(user)}
                        getConnectionStatus={getConnectionStatus}
                        onConnect={handleConnect}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4 mb-16">
                  {(filteredUsers.length > 0 ? filteredUsers : displayedUsers).map((user: NetworkUser, index) => (
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
                            <span className="text-xs text-white/60">{user.year}</span>
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
