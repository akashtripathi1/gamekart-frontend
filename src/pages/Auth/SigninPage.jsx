import React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/store/slice/authSlice";

const SigninPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    const isInAppBrowser = /FBAN|FBAV|Instagram|Line|WebView/i.test(
      navigator.userAgent
    );
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isInAppBrowser || isStandalone) {
      toast.error(
        "Google login is not supported in this environment. Please open this page in Chrome or Safari."
      );
      return;
    }

    dispatch(loginStart());
    try {
      window.open(
        `${import.meta.env.VITE_BACKEND_URL.replace(
          /\/+$/,
          ""
        )}/api/auth/google`,
        "_self"
      );
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className={`w-full max-w-md ${isMobile ? "px-4" : "px-0"}`}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1
              className={`text-gray-900 font-semibold ${
                isMobile ? "text-2xl" : "text-3xl"
              } mb-2`}
            >
              Sign In
            </h1>
            <p className="text-gray-600 text-sm">Welcome to GameKart</p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            aria-label="Sign in with Google"
            className={`w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-3 ${
              isMobile ? "text-sm" : "text-base"
            }`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
