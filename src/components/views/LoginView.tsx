"use client";
import { signIn } from "next-auth/react";

const LoginView = () => {
  return (
    <div className="w-full pt-8 text-center">
      <button
        onClick={() => signIn("google")}
        type="button"
        className="primary"
      >
        Login
      </button>
    </div>
  );
};

export default LoginView;
