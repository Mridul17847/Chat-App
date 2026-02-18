import React from "react";
import { useState } from "react";
import { MessageSquare, User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Mail } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div
        className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br
       from-base-100 via-base-100 to-base-200 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4 group">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 shadow-lg">
                <MessageSquare
                  className="size-7 text-primary animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-base-content/60 text-sm font-medium">
                  Get started with your free account today
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-6 text-primary/70" />
                </div>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="input input-bordered w-full pl-10 bg-base-50 focus:bg-base-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-6 text-primary/70" />
                </div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input input-bordered w-full pl-10 bg-base-50 focus:bg-base-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-6 text-primary/70" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="input input-bordered w-full pl-10 pr-12 bg-base-50 focus:bg-base-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-primary/70" />
                  ) : (
                    <Eye className="size-5 text-primary/70" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-white font-semibold py-3 transition-all duration-200 mt-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign in link */}
          <div className="text-center pt-4">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link link-primary font-semibold hover:link-secondary transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}

      <AuthImagePattern
        title="Join our Community"
        subtitle="Connect with friends and the world around you."
      />
    </div>
  );
};

export default SignUpPage;
