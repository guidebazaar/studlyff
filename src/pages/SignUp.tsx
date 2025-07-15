import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import barba from '@barba/core';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Sparkles, Shield, Users } from "lucide-react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

  const handleSignUp = async (e: React.FormEvent) => {
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

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Account created successfully! Welcome aboard!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google!");
      setTimeout(() => navigate("/home"), 1200);
    } catch (error: any) {
      toast.error(error.message || "Google sign up failed");
    }
  };

  // Remove unused variants and animation configs
  // Barba.js handles page transitions

  // Barba.js can be initialized globally, but for extra smoothness, you can trigger a fade on card mount

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "url('/bg1') center center / 140% 140% no-repeat, #0a001a",
        backgroundSize: '140% 140%',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      {/* ...side animation removed, only card remains... */}
      <motion.div
        className="w-full flex items-center justify-center p-4 md:p-12"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.div
          className="w-full max-w-3xl flex flex-col md:flex-row shadow-xl"
          style={{
            background: 'rgba(10, 0, 30, 0.92)',
            borderRadius: '1.5rem',
            boxShadow: '0 0 0 0.5px #a259ff, 0 0 16px 4px #a259ff44',
            border: '0.15px solid #a259ff',
            backdropFilter: 'blur(8px)',
            minHeight: 'auto',
            overflow: 'visible',
          }}
        >
          {/* Left branding/info column */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 bg-gradient-to-br from-[#a259ff22] to-transparent rounded-l-[1.5rem] border-r border-[#a259ff44]">
            <Link to="/home" className="mb-3">
              <img src="/logo3.png" alt="Guide Bazaar Logo" className="h-12" />
            </Link>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-3 text-center">
              Create your account
            </h2>
            <p className="text-sm bg-gradient-to-r from-white/80 to-gray-300 bg-clip-text text-transparent text-center max-w-xs">
              Join the student marketplace for opportunities, discounts, and more. <br />
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium gradient-text hover:opacity-80 transition-opacity"
              >
                Login
              </Link>
            </p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-purple-300 text-xs">
                <Sparkles className="w-5 h-5" />
                <span>Exclusive student deals</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300 text-xs">
                <Shield className="w-5 h-5" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300 text-xs">
                <Users className="w-5 h-5" />
                <span>Community driven</span>
              </div>
            </div>
          </div>
          {/* Right form column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 py-8 md:px-10 md:py-12">
            <div className="md:hidden text-center mb-6">
              <Link to="/home" className="inline-block mb-2">
                <img src="/logo3.png" alt="Guide Bazaar Logo" className="h-10 mx-auto" />
              </Link>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                Create your account
              </h2>
              <p className="mt-1 text-sm bg-gradient-to-r from-white/80 to-gray-300 bg-clip-text text-transparent">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium gradient-text hover:opacity-80 transition-opacity"
                >
                  Login
                </Link>
              </p>
            </div>
            <form
              className="space-y-6"
              onSubmit={handleSignUp}
            >
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                  <User className="w-4 h-4 text-white" />
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
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                  <Mail className="w-4 h-4 text-white" />
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
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                  <Lock className="w-4 h-4 text-white" />
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
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="flex items-center gap-2 bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                  <Lock className="w-4 h-4 text-white" />
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
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked as boolean })
                  }
                />
                <Label htmlFor="agreeTerms" className="ml-2 text-sm bg-gradient-to-r from-white/90 to-gray-200 bg-clip-text text-transparent">
                  I agree to the{' '}
                  <Link to="#" className="font-medium gradient-text hover:opacity-80">
                    terms and conditions
                  </Link>
                </Label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full h-12 btn-primary text-lg font-semibold group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>

              <div>
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
                    onClick={handleGoogleSignUp}
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
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>

      {/* ...side animation removed, only card remains... */}
    </div>
  );
};

export default SignUp;
