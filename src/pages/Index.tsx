import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingContent from "@/components/TrendingContent";
import EventCarousel from "@/components/EventCarousel";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import StatsSection from "@/components/StatsSection";
import StudentDiscountPreview from "@/components/StudentDiscountPreview";
import StarBorder from '@/components/ui/StarBorder';
import Aurora from '../Aurora';
import RollingGallery from '../RollingGallery';
import ContainerScroll from "@/components/ui/ContainerScroll";
import { GradientText } from "@/components/ui/GradientText";
import { CardCarousel } from "@/components/ui/CardCarousel";

const FEATURES = [
  {
    title: 'Smart Finance Tools',
    description: 'Plan, track, and optimize your finances with calculators, planners, and more.',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=600&h=900&fit=crop',
    bg: 'from-purple-500 to-pink-400',
  },
  {
    title: 'Events & Networking',
    description: 'Join events, connect with peers, and grow your professional network.',
    image: 'https://images.unsplash.com/photo-1506665531195-37a89d6b3095?q=80&w=600&h=900&fit=crop',
    bg: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Startup Ecosystem',
    description: 'Discover internships, startup jobs, and entrepreneurial resources.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&h=900&fit=crop',
    bg: 'from-green-500 to-lime-400',
  },
  {
    title: 'Scholarships & Courses',
    description: 'Access curated scholarships, free and paid courses, and learning materials.',
    image: 'https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=600&h=900&fit=crop',
    bg: 'from-yellow-500 to-orange-400',
  },
  {
    title: 'Student Discounts',
    description: 'Unlock exclusive student discounts and offers from top brands.',
    image: 'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=600&h=900&fit=crop',
    bg: 'from-pink-500 to-red-400',
  },
  {
    title: 'AI Study Assistant',
    description: 'Get instant help with your studies using our AI-powered assistant.',
    image: 'https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=600&h=900&fit=crop',
    bg: 'from-indigo-500 to-purple-400',
  },
  {
    title: 'Marketplace',
    description: 'Buy and sell study materials, gadgets, and more with fellow students.',
    image: 'https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=600&h=900&fit=crop',
    bg: 'from-orange-500 to-yellow-400',
  },
  {
    title: 'Podcasts & Blogs',
    description: 'Stay inspired and informed with curated podcasts and blogs.',
    image: 'https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=600&h=900&fit=crop',
    bg: 'from-pink-500 to-purple-400',
  },
  {
    title: 'YouTube Shorts',
    description: 'Learn on the go with bite-sized educational videos.',
    image: 'https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=600&h=900&fit=crop',
    bg: 'from-blue-500 to-indigo-400',
  },
  {
    title: 'Community Q&A',
    description: 'Ask questions and get answers from the student community.',
    image: 'https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=600&h=900&fit=crop',
    bg: 'from-green-500 to-teal-400',
  },
];

function FeatureGallery() {
  return (
    <RollingGallery
      autoplay={true}
      pauseOnHover={true}
      images={FEATURES.map(f => f.image)}
    />
  );
}

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax effects for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      }
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Define news cards for the carousel
  const NEWS_CARDS = [
    {
      title: 'AI Revolutionizes Student Learning',
      summary: 'New AI-powered tools are helping students personalize their study plans and improve outcomes across universities.',
      image: 'https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=600&h=900&fit=crop',
      link: '#',
    },
    {
      title: 'Top 5 Tech Internships for 2024',
      summary: 'Explore the most sought-after tech internships this year and tips to land your dream role in the industry.',
      image: 'https://images.unsplash.com/photo-1506665531195-37a89d6b3095?q=80&w=600&h=900&fit=crop',
      link: '#',
    },
    {
      title: 'Student Startups Breaking Barriers',
      summary: 'Meet the student-led startups making waves in sustainability, fintech, and edtech across the country.',
      image: 'https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=600&h=900&fit=crop',
      link: '#',
    },
    {
      title: 'Scholarships Open for 2024',
      summary: 'A new wave of scholarships is now available for students in tech, business, and the arts. Apply before the deadline!',
      image: 'https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=600&h=900&fit=crop',
      link: '#',
    },
    {
      title: 'Remote Learning: What Works?',
      summary: 'Universities share their best practices for effective remote and hybrid learning in the post-pandemic era.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&h=900&fit=crop',
      link: '#',
    },
    {
      title: 'Women in Tech: Breaking the Glass Ceiling',
      summary: 'Celebrating the achievements and journeys of women leaders in technology and how they inspire the next generation.',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=600&h=900&fit=crop',
      link: '#',
    },
    {
      title: 'Campus Events Go Hybrid',
      summary: 'Colleges are hosting more hybrid events, combining in-person and virtual experiences for greater reach and impact.',
      image: 'https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=600&h=900&fit=crop',
      link: '#',
    },
    {
      title: 'Green Tech on Campus',
      summary: 'Student groups are leading the way in campus sustainability with new green tech initiatives and eco-friendly projects.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
      link: '#',
    },
    {
      title: 'Career Fairs Go Digital',
      summary: 'Virtual career fairs are connecting students with top employers, offering new opportunities for remote internships and jobs.',
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80',
      link: '#',
    },
    {
      title: 'Mental Health Matters',
      summary: 'Colleges are expanding mental health resources and peer support programs to help students thrive.',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      link: '#',
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen text-white overflow-x-hidden"
    >
      {/* Navbar - Now visible at the top */}
      <div className="relative w-full z-50">
        <Navbar />
      </div>

      {/* Hero Section with Video Background */}
      <div className="relative w-full h-[900px] flex items-start justify-center overflow-hidden">
        {/* Black sheet to cover the background completely */}
        <div className="absolute inset-0 bg-black z-0" />
        {/* Video background */}
        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center z-10 pointer-events-none">
          <div className="w-full max-w-2xl aspect-video" style={{ marginTop: '200px' }}>
            <video
              src="/anima/animation.mp4"
              className="w-full h-full object-contain bg-black"
              autoPlay
              loop
              muted
              playsInline
              style={{ boxShadow: 'none', border: 'none', borderRadius: 0, background: 'black' }}
            />
          </div>
        </div>
      </div>
      {/* Black background moved to the farthest back for animation visibility */}
      <ContainerScroll titleComponent={<></>}>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg md:text-2xl text-center max-w-2xl mx-auto mb-4">
            Scroll to explore our interactive features, tools, and resources designed for students.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Example feature cards or content can go here */}
            <div className="bg-white/10 rounded-xl p-6 min-w-[200px] max-w-xs text-white shadow-lg">
              <h3 className="font-semibold text-xl mb-2">Smart Finance Tools</h3>
              <p>Plan, track, and optimize your finances with calculators, planners, and more.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 min-w-[200px] max-w-xs text-white shadow-lg">
              <h3 className="font-semibold text-xl mb-2">Events & Networking</h3>
              <p>Join events, connect with peers, and grow your professional network.</p>
            </div>
            {/* Add more cards or content as needed */}
          </div>
        </div>
      </ContainerScroll>
      {/* Single Card Carousel with all features */}
      <div className="my-12">
        <GradientText className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">Latest News</GradientText>
        <CardCarousel
          images={NEWS_CARDS.map(card => ({ src: card.image, alt: card.title, card }))}
          autoplayDelay={3200}
        />
      </div>
      {/* Enhanced Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Grid pattern with animation */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />

        {/* Animated border lines */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
              "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
              "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
              "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
              "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
              "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
              "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
              "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
              "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Enhanced animated glow spots with parallax */}
        <motion.div
          style={{ y: glowY1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
              "radial-gradient(circle, rgba(255, 77, 160, 0.3), transparent)",
              "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            background: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          style={{ y: glowY2 }}
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
              "radial-gradient(circle, rgba(209, 58, 255, 0.3), transparent)",
              "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
            ],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            background: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }
          }}
        />

        {/* Additional floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Cosmic planet arc and floating stars background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Soft floating stars */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 shadow-lg"
            style={{
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${5 + Math.random() * 80}%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, -10 - Math.random() * 20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={sectionVariants}
        className="relative z-10 w-full overflow-x-hidden"
      >
        {/* Features Rolling Gallery */}
        <motion.div
          variants={sectionVariants}
          transition={{ ease: 'easeOut' }}
          className="w-full overflow-x-hidden"
        >

          {/* Separator after NewsTicker */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="container mx-auto px-4 py-8"
          >
          </motion.div>

          {/* Separator after EventCarousel */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="container mx-auto px-4 py-8"
          >
          </motion.div>

          <TrendingContent />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <StudentDiscountPreview />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Timeline />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      >
        <StatsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>

      {/* Hide Spline watermark with CSS */}
      <style>{`
        .spline-watermark, .spline-watermark__container, [class*='watermark'] {
          display: none !important;
        }
      `}</style>
    </motion.div>
  );
};

export default Index;
