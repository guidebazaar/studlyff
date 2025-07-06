
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Sparkles, Shield, Users } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!formData.agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    toast.success("Account created successfully! Welcome aboard!");
    console.log("Sign up with:", formData);

    setTimeout(() => navigate("/"), 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign Up Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <Link to="/" className="text-2xl font-bold gradient-text inline-block mb-2">
              Guide Bazaar
            </Link>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Create your account
            </h2>
            <p className="mt-2 text-sm bg-gradient-to-r from-white/80 to-gray-300 bg-clip-text text-transparent">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium gradient-text hover:opacity-80 transition-opacity"
              >
                Login
              </Link>
            </p>
          </motion.div>

          <motion.form
            className="space-y-6"
            onSubmit={handleSignUp}
            variants={itemVariants}
          >
            <motion.div variants={itemVariants}>
              <Label htmlFor="name" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                <User className="w-4 h-4 text-white/70" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-2 h-12 glass-card border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="email" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                <Mail className="w-4 h-4 text-white/70" />
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 h-12 glass-card border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="password" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                <Lock className="w-4 h-4 text-white/70" />
                Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="h-12 glass-card border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 pr-12"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="confirmPassword" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                <Lock className="w-4 h-4 text-white/70" />
                Confirm Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="h-12 glass-card border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 pr-12"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center"
              variants={itemVariants}
            >
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeTerms: checked as boolean })
                }
              />
              <Label htmlFor="agreeTerms" className="ml-2 text-sm bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                I agree to the{" "}
                <Link to="#" className="font-medium gradient-text hover:opacity-80">
                  terms and conditions
                </Link>
              </Label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full h-12 btn-primary text-lg font-semibold group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600" />
                <span className="px-2 bg-black bg-gradient-to-r from-white/80 to-gray-300 bg-clip-text text-transparent whitespace-nowrap">
                  Or sign up with
                </span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 btn-secondary hover:scale-105 transition-transform"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 btn-secondary hover:scale-105 transition-transform"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Right Side - Information & Animation */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
            variants={orbitVariants}
            animate="animate"
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute top-0 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2"
                variants={pulseVariants}
                animate="animate"
              />
              <motion.div
                className="absolute top-1/2 right-0 w-3 h-3 bg-white/80 rounded-full -translate-y-1/2"
                variants={pulseVariants}
                animate="animate"
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-0 left-1/2 w-5 h-5 bg-white/60 rounded-full -translate-x-1/2"
                variants={pulseVariants}
                animate="animate"
                transition={{ delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 left-0 w-2 h-2 bg-white/90 rounded-full -translate-y-1/2"
                variants={pulseVariants}
                animate="animate"
                transition={{ delay: 1.5 }}
              />
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-10 h-10" />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold mb-6 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Start Your Journey Today
          </motion.h1>

          <motion.p
            className="text-xl mb-8 text-center opacity-90 max-w-md"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Join thousands of students building their future through finance, events, and networking.
          </motion.p>

          <motion.div
            className="space-y-4 w-full max-w-sm"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Shield className="w-6 h-6" />
              <span>Access Premium Content</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Users className="w-6 h-6" />
              <span>Learn from Experts</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
              <span>Track Your Progress</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
