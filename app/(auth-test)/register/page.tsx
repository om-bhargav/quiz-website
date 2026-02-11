"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { AuthInput } from "@/components/AuthInput";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      toast.success("Account created! Redirecting...");
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/complete-profile", 
      });
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
           <div className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
              <span className="text-xl">←</span>
           </div>
           
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account ✏️
          </h1>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Please enter your username, email address and password. If you forget it, then you have to do forgot password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <AuthInput
            icon={User}
            placeholder="Username"
            error={errors.username?.message}
            {...register("username")}
          />
          <AuthInput
            icon={Mail}
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />
          <AuthInput
            icon={Lock}
            isPassword
            placeholder="Password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-center space-x-2 py-2">
            <input
              type="checkbox"
              id="remember"
              className="w-5 h-5 border-2 border-blue-600 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-700 font-medium">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign up"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/complete-profile" })}
          className="w-full py-4 border border-gray-200 rounded-2xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-6 h-6"
            alt="Google"
          />
          <span className="text-gray-700 font-semibold">Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}