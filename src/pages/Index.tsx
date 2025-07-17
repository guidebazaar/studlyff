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
import AdGrid from "@/components/ui/AdGrid";

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
  const [openNewsIndex, setOpenNewsIndex] = useState(null);

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

  // Replace NEWS_CARDS with the provided news links and details
  const NEWS_CARDS = [
    {
      title: 'OpenAI Trademark Hints at Humanoid Robots, Smart Jewelry & More',
      summary: 'OpenAI’s new trademark application suggests a future with humanoid robots, smart jewelry, and more advanced AI-powered devices.',
      image: 'https://images.techcrunch.com/image/upload/c_fill,f_auto,g_center,h_675,w_1200/v1706988002/openai-logo-2024.jpg',
      link: 'https://us7.campaign-archive.com/?u=6507bf4e4c2df3fdbae6ef738&id=a215d4b91c',
    },
    {
      title: 'AI’s Inflection Point: Hardware Disruption',
      summary: 'AI is at a turning point, echoing the disruption once seen in the hardware industry.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', // tech/AI placeholder
      link: 'https://us7.campaign-archive.com/?u=6507bf4e4c2df3fdbae6ef738&id=e1c77fee7c',
    },
    {
      title: 'Meta Llama 2025: The Open Source AI Tsunami',
      summary: 'Meta’s Llama 2025 is making waves as open source AI reshapes the tech landscape.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // AI/opensource placeholder
      link: 'https://us7.campaign-archive.com/?u=6507bf4e4c2df3fdbae6ef738&id=f53fbb9f59',
    },
    {
      title: 'Startup News Daily Roundup',
      summary: 'YourStory’s daily roundup brings the latest updates from the startup world.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80', // startup placeholder
      link: 'https://yourstory.com/2025/07/startup-news-updates-daily-roundup-july-16-2025',
    },
    {
      title: 'National Startup Awards: Applications Open',
      summary: 'Recognizing startups driving innovation, the National Startup Awards are now open for applications.',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', // awards/innovation placeholder
      link: 'https://www.newsonair.gov.in/applications-for-national-startup-awards-open-to-recognise-startups-driving-innovation/',
    },
    {
      title: 'Military AI Contracts Awarded',
      summary: 'Anthropic, OpenAI, Google, and xAI win major military AI contracts.',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', // military/AI placeholder
      link: 'https://www.artificialintelligence-news.com/news/military-ai-contracts-awarded-to-anthropic-openai-google-and-xai/',
    },
    {
      title: 'IBM Opens Agentic AI Innovation Centre',
      summary: 'IBM launches a new Agentic AI Innovation Centre in Bengaluru to drive AI research.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', // research/AI placeholder
      link: 'https://analyticsindiamag.com/ai-news-updates/ibm-opens-agentic-ai-innovation-centre-in-bengaluru/',
    },
    {
      title: 'Google’s AI Agent Finds Security Flaw',
      summary: 'Google’s AI agent discovers a critical security flaw in SQLite.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', // security/AI placeholder
      link: 'https://analyticsindiamag.com/ai-news-updates/googles-ai-agent-finds-a-critical-security-flaw-in-sqlite/',
    },
    {
      title: 'MIT: Studying Complex Treatment Interactions',
      summary: 'MIT researchers develop new methods to study complex treatment interactions more efficiently.',
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80', // science/health placeholder
      link: 'https://news.mit.edu/2025/more-efficiently-studying-complex-treatment-interactions-0716',
    },
    {
      title: 'AI Appreciation Day: Celebrating Innovation',
      summary: 'AI Appreciation Day highlights the impact and innovation of artificial intelligence.',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', // innovation/AI placeholder
      link: 'https://timesofindia.indiatimes.com/technology/tech-news/ai-appreciation-day-celebrating-innovation-and-impact/articleshow/122569454.cms',
    },
    {
      title: 'AI Therapy: A Temporary Fix?',
      summary: 'Experts caution that AI therapy can only be a temporary fix for mental health.',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', // health/AI placeholder
      link: 'https://www.thehindu.com/sci-tech/health/ai-therapy-can-only-be-a-temporary-fix-for-mental-health-caution-experts/article69804285.ece',
    },
    {
      title: 'AI & Mental Health Tech Surge',
      summary: 'AI is driving a surge in mental health tech, especially in emerging economies.',
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80', // health/tech placeholder
      link: 'https://www.ainvest.com/news/mind-market-ai-mental-health-tech-surge-emerging-economies-2507/',
    },
    {
      title: 'Gaming Age: AI in Game Development',
      summary: 'AI is transforming game development, ushering in a new gaming age.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80', // gaming/AI placeholder
      link: 'https://itmunch.com/gaming-age-ai-transforming-game-development-2025/',
    },
    {
      title: 'AI Can Boost Salaries by 53%',
      summary: 'A Naukri report finds that AI can boost salaries by 53% across all roles, beyond job loss hysteria.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // salary/AI placeholder
      link: 'https://www.ndtvprofit.com/business/beyond-job-loss-hysteria-ai-can-boost-salaries-by-53-across-all-roles-finds-naukri-report',
    },
    {
      title: 'IIT Kharagpur: Human-Centric R&D',
      summary: 'IIT Kharagpur to focus on human-centric R&D, says director.',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', // education/innovation placeholder
      link: 'https://www.thehindu.com/news/national/west-bengal/no-need-for-more-technocrats-iit-kharagpur-to-focus-on-human-centric-rd-says-director/article69814706.ece',
    },
    {
      title: 'IIT Madras Sets New Startup Record',
      summary: 'IIT Madras sets a new record with 104 ventures in 2024-25, launching a startup every third day.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80', // startup/education placeholder
      link: 'https://www.indiatoday.in/education-today/news/story/a-startup-every-third-day-iit-madras-sets-new-record-with-104-ventures-in-2024-25-2715632-2025-04-26',
    },
    {
      title: 'AI Content Creation Platform Bags $3M',
      summary: 'Trupeer, an AI content creation platform, bags $3M in funding.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', // content/AI placeholder
      link: 'https://inc42.com/buzz/ai-content-creation-platform-trupeer-bags-3-mn/',
    },
    {
      title: 'Visual AI Tools: The Future of Marketing',
      summary: 'Visual AI tools are shaping the future of marketing and content creation.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // marketing/AI placeholder
      link: 'https://www.forbes.com/councils/forbesagencycouncil/2025/07/15/visual-ai-tools-the-future-of-marketing-content-creation/',
    },
    {
      title: 'Open Source Video Editing Workflow',
      summary: 'How to build a video editing workflow with free, open source tools.',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', // video/editing placeholder
      link: 'https://www.xda-developers.com/built-video-editing-workflow-with-free-open-source-tools/',
    },
    {
      title: 'Best Android Apps for Video Editing',
      summary: 'Top picks for the best free Android apps for video editing in 2025.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80', // android/video placeholder
      link: 'https://inews.zoombangla.com/best-android-apps-for-video-editing-free-top-picks-2025/',
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
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Black sheet to cover the background completely */}
        <div className="absolute inset-0 bg-black z-0" />
        {/* Video background and overlay text together */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="w-full max-w-3xl aspect-video flex items-center justify-center">
            <video
              src="/anima/animation.mp4"
              className="w-full h-full object-contain bg-black"
              autoPlay
              loop
              muted
              playsInline
              style={{ boxShadow: 'none', border: 'none', borderRadius: 0, background: 'black', filter: 'brightness(1) blur(3px)' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
              pointerEvents: 'none',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.span
              initial={{ fontSize: '1.5rem' }}
              animate={{ fontSize: '4.5rem' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                fontFamily: 'Lucida Handwriting, cursive',
                color: '#fff',
                textShadow: '0 4px 24px #000, 0 1.5px 6px #a259ff',
                fontWeight: 500,
                letterSpacing: 2,
                marginBottom: '-0.5rem',
                opacity: 1,
              }}
            >
              Building
            </motion.span>
            <motion.span
              initial={{ fontSize: '1.2rem' }}
              animate={{ fontSize: '3rem' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              style={{
                fontFamily: 'Lucida Handwriting, cursive',
                color: '#fff',
                textShadow: '0 4px 24px #000, 0 1.5px 6px #a259ff',
                fontWeight: 400,
                letterSpacing: 2,
                marginBottom: '-0.5rem',
                opacity: 1,
              }}
            >
              the
            </motion.span>
            <motion.span
              initial={{ fontSize: '2rem' }}
              animate={{ fontSize: '5rem' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              style={{
                fontFamily: 'Lucida Handwriting, cursive',
                color: '#fff',
                textShadow: '0 4px 24px #000, 0 1.5px 6px #a259ff',
                fontWeight: 700,
                letterSpacing: 2,
                marginTop: '0.2rem',
                opacity: 1,
              }}
            >
              Student Internet
            </motion.span>
          </div>
        </div>
      </div>
      {/* Black background moved to the farthest back for animation visibility */}
      <ContainerScroll titleComponent={<></>}>
        <div className="flex flex-col items-center justify-center h-full px-2 sm:px-4 mb-24">
          {/* Ads Grid */}
          <AdGrid />
          {/* Example feature cards or content can go here */}
          {/* Removed feature cards as per user request */}
          {/* Add more cards or content as needed */}
        </div>
      </ContainerScroll>
      {/* Single Card Carousel with all features */}
      <div className="my-8 sm:my-12 px-2 sm:px-0 mt-[120]">
        <GradientText className="text-2xl sm:text-4xl md:text-6xl font-bold mt-32 mb-10 block text-center text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">Latest News</GradientText>
        <CardCarousel
          images={NEWS_CARDS.map((card, idx) => ({
            src: card.image,
            alt: card.title,
            card,
            onClick: () => setOpenNewsIndex(idx),
          }))}
          autoplayDelay={3200}
        />
        {/* Mini modal for News */}
        {openNewsIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
            <div className="relative bg-white rounded-xl shadow-2xl w-[98vw] max-w-3xl h-[90vh] flex flex-col">
              <button
                className="absolute top-2 right-2 text-black bg-gray-200 rounded-full p-2 z-50 hover:bg-gray-300"
                onClick={() => setOpenNewsIndex(null)}
                aria-label="Close"
                style={{ position: 'absolute' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <NewsIframeWithFallback url={NEWS_CARDS[openNewsIndex].link} title={NEWS_CARDS[openNewsIndex].title} />
            </div>
          </div>
        )}
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
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[100px] opacity-60"
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
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[100px] opacity-60"
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
              left: 20 + i * 15 + "%",
              top: 30 + i * 10 + "%",
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
              width: 1.5 + Math.random() * 2.5 + "px",
              height: 1.5 + Math.random() * 2.5 + "px",
              left: 10 + Math.random() * 80 + "%",
              top: 5 + Math.random() * 80 + "%",
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
        <GradientText className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 mt-12 animate-gradient text-center">Trending Content</GradientText>
        <motion.div
          variants={sectionVariants}
          transition={{ ease: 'easeOut' }}
          className="w-full overflow-x-hidden"
        >

          <TrendingContent />
        </motion.div>
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
        transition={{ duration: 1, ease: 'easeOut' }}
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

function CollegeGallery() {
  const galleries = [
    [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1495103033382-fe343886b671?auto=format&fit=crop&w=600&q=80",
    ],
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleries.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full mx-auto flex flex-col gap-2">
      <div className="w-full aspect-[8/2]">
        <img
          src={galleries[index][0]}
          alt="College 1"
          className="w-full h-full object-cover rounded-2xl shadow-xl"
          style={{ border: '4px solid #a259ff', boxShadow: '0 0 16px 4px #a259ff88' }}
        />
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex-1 aspect-[1.5/1]">
          <img
            src={galleries[index][1]}
            alt="College 2"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
            style={{ border: '4px solid #a259ff', boxShadow: '0 0 16px 4px #a259ff88' }}
          />
        </div>
        <div className="flex-1 aspect-[1.5/1]">
          <img
            src={galleries[index][2]}
            alt="College 3"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
            style={{ border: '4px solid #a259ff', boxShadow: '0 0 16px 4px #a259ff88' }}
          />
        </div>
      </div>
    </div>
  );
}

function NewsIframeWithFallback({ url, title }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" /></svg>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to display this news here</h2>
        <p className="text-gray-600 mb-6 text-center">This news article does not allow embedding for security reasons. You can still read it in a new tab.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Open News in New Tab
        </a>
      </div>
    );
  }
  return (
    <iframe
      src={url}
      title={title}
      allowFullScreen
      className="w-full h-full rounded-xl border-0 flex-1"
      style={{ background: 'white', minHeight: 0 }}
      onError={() => setError(true)}
    />
  );
}