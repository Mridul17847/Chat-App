import React, { useState } from "react";
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password) return;
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div
        className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br
       from-base-100 via-base-100 to-base-200 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
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
                  Sign In
                </h1>
                <p className="text-base-content/60 text-sm font-medium">
                  Welcome back — please enter your details to continue
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-base-content/60 hover:text-primary transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="text-center pt-4">
            <p className="text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary font-semibold hover:link-secondary transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Welcome back"
        subtitle="Good to see you again — connect with your friends."
      />
    </div>
  );
};

export default LoginPage;
