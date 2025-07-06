import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const YouTubeShorts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'Finance', 'Entrepreneurship', 'Study Tips', 'Career'];

  const allShorts = [
    {
      id: 1,
      title: "How to Land Your First Tech Internship",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      views: "125K",
      creator: "Tech Career Tips",
      category: "Tech"
    },
    {
      id: 2,
      title: "5 Financial Hacks Every Student Should Know",
      thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
      views: "89K",
      creator: "Student Finance",
      category: "Finance"
    },
    {
      id: 3,
      title: "Day in the Life of a Student Entrepreneur",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      views: "210K",
      creator: "StartupLife",
      category: "Entrepreneurship"
    },
    {
      id: 4,
      title: "Quick Tips for Better Productivity",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      views: "67K",
      creator: "ProductivityPro",
      category: "Study Tips"
    },
    {
      id: 5,
      title: "Best Study Techniques for Exams",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      views: "156K",
      creator: "StudySmart",
      category: "Study Tips"
    },
    {
      id: 6,
      title: "Building Your First Startup",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      views: "92K",
      creator: "Startup Guru",
      category: "Entrepreneurship"
    },
    {
      id: 7,
      title: "Interview Tips That Actually Work",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      views: "178K",
      creator: "Career Coach",
      category: "Career"
    },
    {
      id: 8,
      title: "Coding Bootcamp vs University",
      thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0",
      views: "234K",
      creator: "Tech Education",
      category: "Tech"
    }
  ];

  const filteredShorts = allShorts.filter(short => {
    const matchesSearch = short.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         short.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || short.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
              YouTube Shorts
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Discover viral short-form content to boost your learning
            </p>
          </motion.div>

          {/* Search and Filter - Updated to match Finance page style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 md:space-y-8 w-full overflow-x-hidden mb-8"
          >
            {/* Search Bar - Prominent */}
            <div className="relative max-w-2xl mx-auto px-4 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 shadow-lg border border-purple-500/30 w-full">
                <div className="relative w-full">
                  <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <Input
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 w-full text-white focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-700/50 mx-4 w-[calc(100%-2rem)] max-w-none">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Filter className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
                <span className="font-semibold text-white text-sm md:text-base">Categories</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 
                      "bg-gradient-to-r from-brand-purple to-brand-pink text-white" : 
                      "border-gray-600 text-gray-300 hover:border-purple-400 transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm min-h-[44px] w-full bg-gray-800/50 hover:bg-gray-700/50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Videos Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredShorts.map((short, index) => (
              <motion.div
                key={short.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card border-none overflow-hidden group cursor-pointer">
                  <div className="relative">
                    <img
                      src={short.thumbnail}
                      alt={short.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded">
                      {short.views} views
                    </div>
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs py-1 px-2 rounded">
                      {short.category}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-pink transition-all duration-300 line-clamp-2 mb-2">
                      {short.title}
                    </h3>
                    <p className="text-sm text-white/60">{short.creator}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredShorts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/70 text-lg">No videos found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default YouTubeShorts;
