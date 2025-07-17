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
      image: 'https://mcusercontent.com/6507bf4e4c2df3fdbae6ef738/images/396708c0-bac2-0218-7f74-a1920bed0e5c.png',
      link: 'https://us7.campaign-archive.com/?u=6507bf4e4c2df3fdbae6ef738&id=a215d4b91c',
    },
    {
      title: 'AI’s Inflection Point: Hardware Disruption',
      summary: 'AI is at a turning point, echoing the disruption once seen in the hardware industry.',
      image: 'https://www.technewsworld.com/wp-content/uploads/sites/3/2025/02/AI-processor-race.jpg', // tech/AI placeholder
      link: 'https://www.technewsworld.com/story/ais-inflection-point-echoes-of-hardware-disruption-179797.html',
    },
    {
      title: 'Meta Llama 2025: The Open Source AI Tsunami',
      summary: 'Meta’s Llama 2025 is making waves as open source AI reshapes the tech landscape.',
      image: 'https://www.pymnts.com/wp-content/uploads/2023/10/meta-AI-llama.jpg?w=620', // AI/opensource placeholder
      link: 'https://us7.campaign-archive.com/?u=6507bf4e4c2df3fdbae6ef738&id=f53fbb9f59',
    },
    {
      title: 'Startup News Daily Roundup',
      summary: 'YourStory’s daily roundup brings the latest updates from the startup world.',
      image: 'https://images.yourstory.com/cs/2/f49f80307d7911eaa66f3b309d9a28f5/Imagel84s-1730810016820.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=640&q=75', // startup placeholder
      link: 'https://yourstory.com/2025/07/startup-news-updates-daily-roundup-july-16-2025',
    },
    {
      title: 'National Startup Awards: Applications Open',
      summary: 'Recognizing startups driving innovation, the National Startup Awards are now open for applications.',
      image: 'https://www.newsonair.gov.in/wp-content/uploads/2025/07/cats-335.jpg', // awards/innovation placeholder
      link: 'https://www.newsonair.gov.in/applications-for-national-startup-awards-open-to-recognise-startups-driving-innovation/',
    },
    {
      title: 'Military AI Contracts Awarded',
      summary: 'Anthropic, OpenAI, Google, and xAI win major military AI contracts.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.gNxAupeo4cjZyNZeoO2DEwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      link: 'https://www.artificialintelligence-news.com/news/military-ai-contracts-awarded-to-anthropic-openai-google-and-xai/',
    },
    {
      title: 'IBM Opens Agentic AI Innovation Centre',
      summary: 'IBM launches a new Agentic AI Innovation Centre in Bengaluru to drive AI research.',
      image: 'https://th.bing.com/th?id=OIF.jB%2fbabbQQSQbxvXxKmWMpg&w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', // research/AI placeholder
      link: 'https://analyticsindiamag.com/ai-news-updates/ibm-opens-agentic-ai-innovation-centre-in-bengaluru/',
    },
    {
      title: 'Google’s AI Agent Finds Security Flaw',
      summary: 'Google’s AI agent discovers a critical security flaw in SQLite.',
      image: 'https://imageio.forbes.com/specials-images/imageserve/673dd9dc479e2edd547a3ddb/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds', // security/AI placeholder
      link: 'https://analyticsindiamag.com/ai-news-updates/googles-ai-agent-finds-a-critical-security-flaw-in-sqlite/',
    },
    {
      title: 'MIT: Studying Complex Treatment Interactions',
      summary: 'MIT researchers develop new methods to study complex treatment interactions more efficiently.',
      image: 'https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202507/MIT-Combinatoral-Interventions-01-press_0.jpg?itok=fzDWWLYK',
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
      image: 'data:image/webp;base64,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', // health/AI placeholder
      link: 'https://www.thehindu.com/sci-tech/health/ai-therapy-can-only-be-a-temporary-fix-for-mental-health-caution-experts/article69804285.ece',
    },
    {
      title: 'AI & Mental Health Tech Surge',
      summary: 'AI is driving a surge in mental health tech, especially in emerging economies.',
      image: 'https://th.bing.com/th/id/OIP.xXLq0CSTT2K3MztxmPCPOgHaDt?w=310&h=174&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', // health/tech placeholder
      link: 'https://www.ainvest.com/news/mind-market-ai-mental-health-tech-surge-emerging-economies-2507/',
    },
    {
      title: 'Gaming Age: AI in Game Development',
      summary: 'AI is transforming game development, ushering in a new gaming age.',
      image: 'https://newo.ai/wp-content/uploads/2024/01/ai-in-npc-behavior-and-dynamic-environments.jpg', // gaming/AI placeholder
      link: 'https://itmunch.com/gaming-age-ai-transforming-game-development-2025/',
    },
    {
      title: 'AI Can Boost Salaries by 53%',
      summary: 'A Naukri report finds that AI can boost salaries by 53% across all roles, beyond job loss hysteria.',
      image: 'https://blog.project-ai-mployed.com/wp-content/uploads/2023/11/roboit.webp', // salary/AI placeholder
      link: 'https://www.ndtvprofit.com/business/beyond-job-loss-hysteria-ai-can-boost-salaries-by-53-across-all-roles-finds-naukri-report',
    },
    {
      title: 'IIT Kharagpur: Human-Centric R&D',
      summary: 'IIT Kharagpur to focus on human-centric R&D, says director.',
      image: 'https://www.sikareducationhub.in/wp-content/uploads/2025/01/kgp_bg-1030x687.jpg', // education/innovation placeholder
      link: 'https://www.thehindu.com/news/national/west-bengal/no-need-for-more-technocrats-iit-kharagpur-to-focus-on-human-centric-rd-says-director/article69814706.ece',
    },
    {
      title: 'IIT Madras Sets New Startup Record',
      summary: 'IIT Madras sets a new record with 104 ventures in 2024-25, launching a startup every third day.',
      image: 'https://th.bing.com/th/id/OIP.jtYePlYK_4R0BYodZoMnBgHaEB?w=321&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', // startup/education placeholder
      link: 'https://www.indiatoday.in/education-today/news/story/a-startup-every-third-day-iit-madras-sets-new-record-with-104-ventures-in-2024-25-2715632-2025-04-26',
    },
    {
      title: 'AI Content Creation Platform Bags $3M',
      summary: 'Trupeer, an AI content creation platform, bags $3M in funding.',
      image: 'https://th.bing.com/th/id/OIP.GH1fjEoZ4CzJx6URShF5UQHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', // content/AI placeholder
      link: 'https://inc42.com/buzz/ai-content-creation-platform-trupeer-bags-3-mn/',
    },
    {
      title: 'Visual AI Tools: The Future of Marketing',
      summary: 'Visual AI tools are shaping the future of marketing and content creation.',
      image: 'https://th.bing.com/th/id/OIP.zI2CFd169WHX0QB-5G_sqwHaEL?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', // marketing/AI placeholder
      link: 'https://www.forbes.com/councils/forbesagencycouncil/2025/07/15/visual-ai-tools-the-future-of-marketing-content-creation/',
    },
    {
      title: 'Open Source Video Editing Workflow',
      summary: 'How to build a video editing workflow with free, open source tools.',
      image: 'data:image/webp;base64,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', // video/editing placeholder
      link: 'https://www.xda-developers.com/built-video-editing-workflow-with-free-open-source-tools/',
    },
    {
      title: 'Best Android Apps for Video Editing',
      summary: 'Top picks for the best free Android apps for video editing in 2025.',
      image: 'https://i0.wp.com/inews.zoombangla.com/wp-content/uploads/2025/07/Best-Android-Apps-for-Video-Editing-Free-Top-Picks-2025.png?resize=768%2C433&ssl=1', // android/video placeholder
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