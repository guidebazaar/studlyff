import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

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

  // Podcasts section removed

  return (
    <>
      {/* YouTube Shorts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="bg-red-600 text-white p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                </svg>
              </span>
              <span className="text-xl font-semibold">YouTube Shorts</span>
            </div>
            <InteractiveHoverButton
              text="Show More"
              onClick={() => navigate('/youtube-shorts')}
              className="w-48 text-lg flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
            </InteractiveHoverButton>
          </div>
          <ScrollArea className="w-full whitespace-nowrap scroll-smooth">
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
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white" style={{ aspectRatio: '9/16', minHeight: 120 }}>
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
                      <div className="flex flex-col items-start p-2 bg-gradient-to-t from-white/80 to-transparent w-full">
                        <span className="text-black text-xs font-semibold line-clamp-2 mb-1 drop-shadow-md">{short.title}</span>
                        <span className="text-black text-[10px] font-medium drop-shadow-sm">{short.creator}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Popular Blogs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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
            <InteractiveHoverButton
              text="Show More"
              onClick={() => navigate('/blogs')}
              className="w-48 text-lg flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
            </InteractiveHoverButton>
          </div>
          <ScrollArea className="w-full whitespace-nowrap scroll-smooth">
            <div className="flex space-x-8 pb-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="group cursor-pointer flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium mt-2 line-clamp-2 group-hover:text-purple-500 transition-colors text-xs md:text-sm text-black">{blog.title}</h4>
                  <div className="flex justify-between text-xs text-black">
                    <span>{blog.author}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    </>
  );
};

export default TrendingContent;
