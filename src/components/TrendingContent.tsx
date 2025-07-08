import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";

const TrendingContent = () => {
  const navigate = useNavigate();

  // Sample data
  const [youtubeShorts] = useState([
    {
      id: 1,
      title: "How to Land Your First Tech Internship",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      views: "125K",
      creator: "Tech Career Tips"
    },
    {
      id: 2,
      title: "5 Financial Hacks Every Student Should Know",
      thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
      views: "89K",
      creator: "Student Finance"
    },
    {
      id: 3,
      title: "Day in the Life of a Student Entrepreneur",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      views: "210K",
      creator: "StartupLife"
    },
    {
      id: 4,
      title: "Quick Tips for Better Productivity",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      views: "67K",
      creator: "ProductivityPro"
    },
    {
      id: 5,
      title: "Best Study Techniques for Exams",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      views: "156K",
      creator: "StudySmart"
    }
  ]);

  const [blogs] = useState([
    {
      id: 1,
      title: "Building Your Personal Brand While in College",
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721",
      readTime: "3 min read",
      author: "Emma Johnson"
    },
    {
      id: 2,
      title: "Top 10 SaaS Tools with Student Discounts",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      readTime: "5 min read",
      author: "Tech Student Hub"
    },
    {
      id: 3,
      title: "How I Started Investing with Just ₹500",
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938",
      readTime: "4 min read",
      author: "Finance First"
    },
    {
      id: 4,
      title: "Mastering Time Management in College",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      readTime: "6 min read",
      author: "Study Guru"
    },
    {
      id: 5,
      title: "Side Hustles for College Students",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      readTime: "4 min read",
      author: "Hustle Hub"
    }
  ]);

  const [podcasts] = useState([
    {
      id: 1,
      title: "Navigating College and Career Decisions",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
      duration: "15:24",
      host: "Career Connect"
    },
    {
      id: 2,
      title: "Student Entrepreneurs: Success Stories",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
      duration: "22:10",
      host: "Startup Stories"
    },
    {
      id: 3,
      title: "Decoding Financial Independence",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
      duration: "18:45",
      host: "Money Matters"
    },
    {
      id: 4,
      title: "Building Mental Resilience",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
      duration: "28:15",
      host: "Mind Matters"
    },
    {
      id: 5,
      title: "The Future of Work",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      duration: "19:30",
      host: "Future Focus"
    }
  ]);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trending Content</h2>
        <p className="text-lg text-center text-muted-foreground mb-12">Stay updated with the latest and most popular content</p>

        <div className="space-y-16">
          {/* YouTube Shorts Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="bg-red-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                  </svg>
                </span>
                <span className="text-xl font-semibold">YouTube Shorts</span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/youtube-shorts')}
                className="flex items-center gap-2"
              >
                Show More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-8 pb-4">
                {youtubeShorts.concat([
                  {
                    id: 6,
                    title: "How to Ace Technical Interviews",
                    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
                    views: "98K",
                    creator: "Career Launch"
                  },
                  {
                    id: 7,
                    title: "Scholarships You Shouldn't Miss",
                    thumbnail: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
                    views: "112K",
                    creator: "Edu Guide"
                  },
                  {
                    id: 8,
                    title: "Balancing Studies & Side Hustles",
                    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
                    views: "76K",
                    creator: "Student Life"
                  }
                ]).map((short) => (
                  <div key={short.id} className="group cursor-pointer flex-shrink-0 w-[72px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] flex flex-col items-center">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black" style={{ aspectRatio: '9/16', minHeight: 120 }}>
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        style={{ aspectRatio: '9/16' }}
                      />
                      {/* Overlay for YouTube Shorts style */}
                      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none">
                        <div className="flex justify-end p-1">
                          <span className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">{short.views} views</span>
                        </div>
                        <div className="flex flex-col items-start p-2 bg-gradient-to-t from-black/70 to-transparent w-full">
                          <span className="text-white text-xs font-semibold line-clamp-2 mb-1 drop-shadow-md">{short.title}</span>
                          <span className="text-white text-[10px] font-medium drop-shadow-sm">{short.creator}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Popular Blogs Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </span>
                <span className="text-xl font-semibold">Popular Blogs</span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/blogs')}
                className="flex items-center gap-2"
              >
                Show More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-8 pb-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="group cursor-pointer flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-medium mt-2 line-clamp-2 group-hover:text-purple-500 transition-colors text-xs md:text-sm">{blog.title}</h4>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{blog.author}</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Highlighted Podcast Clips Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="bg-purple-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 0 0-12 0v12h12V8z" />
                    <path d="M6 18v-2a6 6 0 0 1 12 0v2" />
                  </svg>
                </span>
                <span className="text-xl font-semibold">Highlighted Podcast Clips</span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/podcasts')}
                className="flex items-center gap-2"
              >
                Show More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-8 pb-4">
                {podcasts.map((podcast) => (
                  <div key={podcast.id} className="group cursor-pointer flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={podcast.image}
                        alt={podcast.title}
                        className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <button className="bg-white rounded-full p-2 mr-2 hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 00.5.866l3 1.732a1 1 0 001.5-.866V6.268a1 1 0 00-1.5-.866l-3 1.732z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="text-white text-xs">{podcast.duration}</span>
                      </div>
                    </div>
                    <h4 className="font-medium mt-2 line-clamp-2 group-hover:text-purple-500 transition-colors text-xs md:text-sm">{podcast.title}</h4>
                    <p className="text-xs text-muted-foreground">{podcast.host}</p>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingContent;
