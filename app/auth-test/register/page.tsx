"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Loader2, ArrowLeft } from "lucide-react";
import { AuthInput } from "@/components/AuthInput";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  
  const [formData, setFormData] = useState<RegisterForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onInitiateRegister = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to send OTP");
      }

      toast.success("OTP sent to your email!");
      setFormData(data); 
      setStep("OTP");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {

      const verifyRes = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: otp }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.message || "Invalid OTP");

      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const registerResponseData = await registerRes.json();
      if (!registerRes.ok) throw new Error(registerResponseData.message || "Registration failed");

      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
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
        
        {/* --- HEADER --- */}
        <div className="text-center space-y-2 relative">
           {/* Back Button Logic */}
           {step === "OTP" ? (
             <div 
               onClick={() => setStep("FORM")} 
               className="absolute top-0 left-0 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
             >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
             </div>
           ) : (
             <div className="absolute top-0 left-0 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                <span className="text-xl">←</span>
             </div>
           )}
           
          <h1 className="text-3xl font-bold text-gray-900">
            {step === "FORM" ? "Create an account ✏️" : "Verify Email 📧"}
          </h1>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            {step === "FORM" 
              ? "Please enter your username, email address and password." 
              : `We sent a 6-digit code to ${formData?.email}. Enter it below.`}
          </p>
        </div>

        {/* --- STEP 1: REGISTRATION FORM --- */}
        {step === "FORM" && (
          <>
            <form onSubmit={handleSubmit(onInitiateRegister)} className="space-y-5">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex justify-center items-center"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign up"}
              </button>
            </form>

            {/* Divider & Social Login */}
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
          </>
        )}

        {/* --- STEP 2: OTP FORM --- */}
        {step === "OTP" && (
          <form onSubmit={onVerifyAndRegister} className="space-y-6">
            <div className="flex flex-col space-y-2">
               <input
                 type="text"
                 value={otp}
                 onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                 placeholder="123456"
                 className="w-full text-center text-3xl tracking-widest py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-colors"
                 maxLength={6}
                 autoFocus
               />
               <p className="text-center text-xs text-gray-400">Enter the 6-digit code</p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify & Create Account"}
            </button>
            
            <p className="text-center text-sm text-gray-500">
               Didn&apos;t receive code?{" "}
               <button 
                 type="button" 
                 onClick={() => formData && onInitiateRegister(formData)}
                 className="text-blue-600 font-bold hover:underline"
               >
                 Resend
               </button>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}