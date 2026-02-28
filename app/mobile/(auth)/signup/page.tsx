"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { InputField, NextButton } from "@/components/FormComponents";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { EMAIL_PATTERN } from "@/lib/constants";
const initialData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
};
interface InitialDataStructure {
  name: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
}
export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [data, setData] = useState<any>(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fields = Object.keys(data);
      for (let field of fields) {
        if (!data[field]) {
          throw Error("Please Fill All the required Fields");
        }
      }
      if(!EMAIL_PATTERN.test(data.email)){
        throw Error("Email Doesn't Match the provided pattern!");
      }
      if (data.phone.length !== 10) {
        throw Error("Phone number must be 10 digits!");
      }

      if (data.password.length < 6) {
        throw Error("Password must be at least 6 characters!");
      }
      setError("");
      const request = await fetch("/api/auth/otp/send",{method:"POST",body:JSON.stringify({email:data.email})});
      const response = await request.json();
      if(!response.success){
        throw Error(response.message);
      }else{
        toast.success(response.message);
      }
      setStep("otp");
    } catch (error: any) {
      setError(error.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (otp.length !== 6) {
      setError("Please enter 6-digit OTP!");
      return;
    }
    try{

      const request = await fetch("/api/auth/otp/verify",{method:"POST",body:JSON.stringify({email:data.email,code:otp})});
      const response = await request.json();
      if(!response.success){
        throw Error(response.message);
      }
      const userRequest = await fetch("/api/auth/register",{method:"POST",body:JSON.stringify(data)});
      const userResponse = await userRequest.json();
      if(!userResponse.success){
        throw Error(userResponse.message);
      }
      // localStorage.setItem("isLoggedIn", "true");
      // localStorage.setItem("userName", name);
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw Error(result.error);
      }
      router.push("/mobile");
    }catch(error: any){
      setError(error.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div
        className="bg-[#A78BFA] border-b-[4px] border-black p-6"
        style={{ boxShadow: "0px 6px 0px #000000" }}
      >
        <h1 className="text-[32px] font-[900] uppercase tracking-tight text-center">
          Join Now
        </h1>
        <p className="text-[14px] font-[800] uppercase text-center text-black/70">
          Create Account & Start Winning
        </p>
      </div>

      {/* Illustration */}
      {step === "signup" && (
        <div className="flex justify-center py-6">
          <div
            className="w-[160px] h-[160px] bg-[#A5F3FC] rounded-[20px] border-[4px] border-black overflow-hidden relative"
            style={{
              boxShadow: "8px 8px 0px #000000",
              transform: "rotate(2deg)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1754300681803-61eadeb79d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Winner Illustration"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>
      )}

      {/* Form */}
      <div className="mt-5 flex-1 px-4 pb-6">
        <div
          className="bg-white rounded-[16px] p-6 border-[4px] border-black"
          style={{ boxShadow: "6px 6px 0px #000000" }}
        >
          {step === "signup" ? (
            <>
              <h2 className="text-[24px] font-[900] uppercase mb-6 text-center">
                Sign Up
              </h2>

              <form onSubmit={handleSignup} className="space-y-4">
                {/* Name */}
                <InputField
                  Icon={User}
                  data={data}
                  setData={setData}
                  attribute={"name"}
                  placeholder="Enter your name"
                  title="Full Name"
                />

                {/* Email */}
                <InputField
                  Icon={Mail}
                  type="email"
                  data={data}
                  setData={setData}
                  attribute="email"
                  placeholder="your@email.com"
                  title="Email Address"
                />

                {/* Phone */}
                <InputField
                  Icon={Phone}
                  type="tel"
                  data={data}
                  attribute="phone"
                  setData={setData}
                  placeholder="9876543210"
                  title="Phone Number"
                />

                {/* Gender */}
                <div>
                  <label className="text-xs font-bold uppercase mb-2 block">
                    Gender
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg flex justify-between"
                    >
                      {data.gender || "Select Gender"}
                      <ChevronDown className="w-5 h-5" />
                    </button>

                    {showGenderDropdown && (
                      <div className="absolute overflow-hidden top-full mt-2 w-full bg-white border-2 border-black rounded-lg z-10">
                        {["Male", "Female", "Other"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setData({ ...data, gender: g });
                              setShowGenderDropdown(false);
                            }}
                            className="w-full p-3 text-left hover:bg-[#A78BFA]"
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <InputField
                      Icon={Lock}
                      type={"password"}
                      attribute="password"
                      data={data}
                      setData={setData}
                      title="Password"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-bold">{error}</p>
                )}

                <NextButton
                  text={"Continue →"}
                  bgClass="bg-[#A78BFA]"
                  disabled={loading}
                  //  className="w-full bg-[#A78BFA] py-4 border-4 border-black rounded-xl font-black uppercase"
                />
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link href="/mobile/login" className="font-bold underline">
                    Login
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-black text-center mb-4">
                Verify OTP
              </h2>

              <form onSubmit={handleOtpVerification} className="space-y-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full py-4 text-2xl text-center border-2 border-black rounded-lg tracking-widest"
                  maxLength={6}
                />

                {error && (
                  <p className="text-red-500 text-sm font-bold text-center">{error}</p>
                )}
                <NextButton
                  text={"Verify & Continue 🎉"}
                  bgClass="bg-[#A5F3A0]"
                  disabled={loading}
                  //  className="w-full bg-[#A78BFA] py-4 border-4 border-black rounded-xl font-black uppercase"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
