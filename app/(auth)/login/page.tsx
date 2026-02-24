"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { InputField, NextButton } from "@/components/FormComponents";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
const initialData = {
  email: "",
  password: "",
};
export default function Login() {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
        setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw Error(result.error);
      }

      toast.success("Welcome back!");
      router.push("/"); 
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div
        className="bg-[#FFDB58] border-b-[4px] border-black p-6"
        style={{ boxShadow: "0px 6px 0px #000000" }}
      >
        <h1 className="text-[32px] font-[900] uppercase tracking-tight text-center">
          Quiz App
        </h1>
        <p className="text-[14px] font-[800] uppercase text-center text-black/70">
          Play Quiz & Win Real Money
        </p>
      </div>

      {/* Illustration */}
      <div className="flex justify-center py-8">
        <div
          className="w-[180px] h-[180px] bg-[#A5F3FC] rounded-[20px] border-[4px] border-black overflow-hidden relative"
          style={{
            boxShadow: "8px 8px 0px #000000",
            transform: "rotate(-2deg)",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1644648479153-2a3dbee76212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Quiz Illustration"
            fill
            className="object-cover"
            sizes="180px"
          />
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-4 pb-6">
        <div
          className="bg-white rounded-[16px] p-6 border-[4px] border-black"
          style={{ boxShadow: "6px 6px 0px #000000" }}
        >
          <h2 className="text-[24px] font-[900] uppercase mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <InputField
                Icon={Mail}
                type="email"
                data={data}
                setData={setData}
                attribute="email"
                placeholder="your@email.com"
                title="Email Address"
              />
            </div>

            {/* Password */}
            <div>
              <InputField
                Icon={Mail}
                type="password"
                data={data}
                setData={setData}
                attribute="password"
                title="Password"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="bg-[#6366F1] text-white p-3 rounded-[10px] border-[3px] border-black text-center"
                style={{ boxShadow: "3px 3px 0px #000000" }}
              >
                <p className="text-[13px] font-[800] uppercase">{error}</p>
              </div>
            )}
            <NextButton disabled={loading} text={"Login →"} bgClass="bg-[#A5F3A0]" />
          </form>

          {/* Signup */}
          <div className="mt-6 text-center">
            <p className="text-[13px] font-[700] text-black/70">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-black font-[900] uppercase underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
