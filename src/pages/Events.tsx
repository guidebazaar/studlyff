import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, Users, FilterIcon, Sparkles, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { SplitText } from "@/components/ui/split-text";
import Spline from '@splinetool/react-spline';
import EventCarousel from "@/components/EventCarousel";

const Events = () => {
  const [city, setCity] = useState<string>("all");
  const [eventType, setEventType] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [showHostForm, setShowHostForm] = useState(false);
  const [hostedEvents, setHostedEvents] = useState([]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Startup Summit 2025",
      date: "June 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Mumbai",
      type: "startup",
      attendees: 350,
      daysLeft: 12,
      description: "Connect with tech founders and investors from across India.",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552"
    },
    {
      id: 2,
      title: "Financial Planning Workshop",
      date: "June 3, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      type: "finance",
      attendees: 120,
      daysLeft: 5,
      description: "Learn essential financial skills for students and early professionals.",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb"
    },
    {
      id: 3,
      title: "Code Wars: National Hackathon",
      date: "July 8-10, 2025",
      time: "48 hours",
      location: "Bangalore",
      type: "hackathon",
      attendees: 500,
      daysLeft: 25,
      description: "Build innovative solutions and compete for prizes worth ₹5 Lakhs.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    },
    {
      id: 4,
      title: "Future of AI: Career Paths",
      date: "June 20, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Delhi",
      type: "webinar",
      attendees: 250,
      daysLeft: 15,
      description: "Discover how AI is transforming industries and creating new opportunities.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    }
  ];

  const allEvents = [...upcomingEvents, ...hostedEvents];
  // Filter out events whose last registration date has passed (today > lastRegistrationDate)
  const today = new Date();
  const filteredEvents = allEvents.filter(event => {
    // If no lastRegistrationDate, keep the event (for default events)
    if (!event.lastRegistrationDate) return true;
    // Compare dates (ignore time)
    const regDate = new Date(event.lastRegistrationDate);
    regDate.setHours(23,59,59,999); // include the whole day
    return today <= regDate && (city === "all" || event.location === city || (city === "online" && event.location === "Online")) && (eventType === "all" || event.type === eventType);
  });

  const handleHostEvent = (formData: any) => {
    // Assign a new id and parse date/time fields
    const newEvent = {
      ...formData,
      id: Date.now(),
      attendees: 0,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop", // Placeholder or allow upload
      daysLeft: Math.max(0, Math.ceil((new Date(formData.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
      type: formData.type,
      registrationLink: formData.registrationLink,
      lastRegistrationDate: formData.lastRegistrationDate,
    };
    setHostedEvents(prev => [...prev, newEvent]);
    setShowHostForm(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Spline Animation Background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline
            scene="https://prod.spline.design/xfc5Llyw8cW1FBp7/scene.splinecode"
          />
        </Suspense>
        {/* Dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Opaque block to hide Spline watermark and logo - positioned below AIBotFab */}
      <div className="fixed bottom-0 right-0 w-48 h-48 bg-black z-50 pointer-events-none" />

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
      </div>

      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-24 pb-16 relative"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <div>
                <SplitText
                  text="Next-Gen Events"
                  className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
                  delay={50}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                  easing="easeOutCubic"
                  threshold={0.3}
                  rootMargin="-100px"
                />
                <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-2xl">
                  Discover cutting-edge hackathons, workshops, and learning opportunities across the digital frontier.
                </p>
              </div>
              <Button
                onClick={() => setShowHostForm(true)}
                className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity gap-2"
              >
                <Plus size={18} />
                Host Event
              </Button>
            </div>
          </motion.div>

          {/* Host Event Form Modal */}
          <AnimatePresence>
            {showHostForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowHostForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-black/80 border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Host New Event</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowHostForm(false)}>
                      <X size={20} />
                    </Button>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleHostEvent(Object.fromEntries(formData));
                  }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Title</label>
                      <Input name="title" placeholder="Enter event title" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <Input name="date" type="date" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time</label>
                        <Input name="time" type="time" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Last Date of Registration</label>
                      <Input name="lastRegistrationDate" type="date" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input name="location" placeholder="City or 'Online'" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type</label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white border border-white/10">
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Registration Link</label>
                      <Input name="registrationLink" placeholder="Paste registration link" type="url" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea name="description" placeholder="Describe your event" rows={3} required />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink">
                      Create Event
                    </Button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-lg bg-background/30 border border-white/10 rounded-xl p-4 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2 text-foreground/70">
                <FilterIcon size={18} className="text-brand-purple" />
                <span className="text-sm">Filter events:</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/80 backdrop-blur-md border-white/10">
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/80 backdrop-blur-md border-white/10">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* View Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Tabs defaultValue="list" className="mb-8">
              <TabsList className="bg-background/30 backdrop-blur-sm border border-white/10">
                <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white">List View</TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white">Calendar View</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-6">
                <motion.div
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.15
                      }
                    }
                  }}
                >
                  {filteredEvents.map(event => (
                    <motion.div
                      key={event.id}
                      layout
                      whileHover={{ scale: 1.02 }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      className="rounded-xl overflow-hidden bg-background/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div
                          className="md:w-1/4 h-40 md:h-auto bg-cover bg-center relative"
                          style={{ backgroundImage: `url(${event.image})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex flex-wrap justify-between gap-4">
                            <div>
                              <div className="flex items-center mb-2">
                                <div className="mr-2 px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs font-medium rounded-full uppercase tracking-wider flex items-center">
                                  <Sparkles size={12} className="mr-1" />
                                  {event.type}
                                </div>
                                <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                                  {event.daysLeft} days left
                                </div>
                              </div>

                              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-brand-purple transition-colors">{event.title}</h3>

                              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-foreground/70 mb-3">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon size={14} className="text-brand-purple" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-brand-purple" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} className="text-brand-purple" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users size={14} className="text-brand-purple" />
                                  <span>{event.attendees} attending</span>
                                </div>
                              </div>

                              <p className="text-foreground/80">{event.description}</p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <a
                                href={event.registrationLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all h-9 px-3"
                              >
                                <span className="relative z-10">Join Event</span>
                                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                              </a>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-2 mt-1"
                              // TODO: Add onClick handler for info modal or navigation
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 8h.01M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                Info
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredEvents.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold mb-2">No events found</h3>
                      <p className="text-foreground/70">Try adjusting your filters</p>
                    </motion.div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="p-8 flex flex-col items-center">
                    <Calendar
                      mode="single"
                      selected={null}
                      modifiers={{
                        event: allEvents.map(e => new Date(e.date.split(',')[1] ? e.date.split(',')[1] + ',' + e.date.split(',')[0] : e.date)),
                      }}
                      modifiersClassNames={{
                        event: "bg-brand-purple/20 text-brand-purple font-bold border border-brand-purple/40",
                      }}
                      onDayClick={date => {
                        const event = allEvents.find(e => {
                          const eventDate = new Date(e.date.split(',')[1] ? e.date.split(',')[1] + ',' + e.date.split(',')[0] : e.date);
                          return eventDate.toDateString() === date.toDateString();
                        });
                        if (event) {
                          setActiveEvent(event.id);
                        }
                      }}
                    />
                    <div className="text-center mt-8">
                      <p className="text-sm text-foreground/70">
                        Click on a highlighted date to view event details below.
                      </p>
                    </div>
                    {activeEvent && (
                      <div className="mt-8 w-full max-w-lg bg-background/80 border border-brand-purple/30 rounded-xl p-6 shadow-lg">
                        {(() => {
                          const event = allEvents.find(e => e.id === activeEvent);
                          if (!event) return null;
                          return (
                            <>
                              <h3 className="text-2xl font-bold mb-2 text-brand-purple">{event.title}</h3>
                              <div className="flex flex-wrap gap-4 text-sm mb-2">
                                <span className="flex items-center gap-1"><CalendarIcon size={16} className="text-brand-purple" />{event.date}</span>
                                <span className="flex items-center gap-1"><Clock size={16} className="text-brand-purple" />{event.time}</span>
                                <span className="flex items-center gap-1"><MapPin size={16} className="text-brand-purple" />{event.location}</span>
                                <span className="flex items-center gap-1"><Users size={16} className="text-brand-purple" />{event.attendees} attending</span>
                              </div>
                              <p className="mb-2 text-foreground/80">{event.description}</p>
                              <a
                                href={event.registrationLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 mt-2 h-9 px-3"
                              >
                                Join Event
                              </a>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Events;
