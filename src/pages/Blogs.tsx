
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, TrendingUp, Calendar } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "How I Built My First Startup in College",
    author: "Priya Sharma",
    authorType: "Student",
    date: "2024-06-10",
    readTime: "5 min read",
    category: "Entrepreneurship",
    excerpt: "My journey from idea to execution, and the lessons learned along the way.",
    views: 1250,
    isPopular: true
  },
  {
    id: 2,
    title: "The Future of AI in Education",
    author: "Dr. Rajesh Kumar",
    authorType: "Expert",
    date: "2024-06-08",
    readTime: "8 min read",
    category: "Technology",
    excerpt: "Exploring how artificial intelligence is reshaping the educational landscape.",
    views: 2100,
    isPopular: true
  },
  {
    id: 3,
    title: "Fundraising Tips for Student Entrepreneurs",
    author: "Amit Patel",
    authorType: "Founder",
    date: "2024-06-12",
    readTime: "6 min read",
    category: "Finance",
    excerpt: "Practical advice on raising funds for your startup while still in college.",
    views: 850,
    isPopular: false
  },
  {
    id: 4,
    title: "Balancing Studies and Side Projects",
    author: "Sneha Gupta",
    authorType: "Student",
    date: "2024-06-14",
    readTime: "4 min read",
    category: "Productivity",
    excerpt: "Time management strategies that actually work for busy students.",
    views: 1100,
    isPopular: false
  }
];

const Blogs = () => {
  const [activeTab, setActiveTab] = useState("newest");

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (activeTab === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.views - a.views;
    }
  });

  const getAuthorTypeColor = (type: string) => {
    switch (type) {
      case "Student":
        return "bg-blue-500/20 text-blue-400";
      case "Founder":
        return "bg-brand-purple/20 text-brand-purple";
      case "Expert":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
              Blogs
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover insights, tips, and stories from students, entrepreneurs, and industry experts.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="newest" className="data-[state=active]:bg-brand-purple">
                  <Calendar className="h-4 w-4 mr-2" />
                  Newest
                </TabsTrigger>
                <TabsTrigger value="popular" className="data-[state=active]:bg-brand-purple">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Popular
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Blogs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {sortedBlogs.map((blog) => (
              <Card key={blog.id} className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-brand-pink/20 text-brand-pink">
                      {blog.category}
                    </span>
                    {blog.isPopular && activeTab === "popular" && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">{blog.title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {blog.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getAuthorTypeColor(blog.authorType)}`}>
                        {blog.authorType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{blog.views} views</span>
                    <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
