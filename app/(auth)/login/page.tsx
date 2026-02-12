"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/FormComponents";
import {motion} from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useGoBack } from "@/components/useGoBack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { NextButton } from "@/components/FormComponents";
const phaseVariants = {
  phase2: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  phase3: {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  },
};
export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const goBack = useGoBack();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push("/home"); 
      }
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full mx-auto max-w-md w-full flex items-start justify-start">
      <motion.div
        key="phase1"
        variants={phaseVariants.phase3}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex-1 flex h-full flex-col rounded-lg justify-between"
      >

        <form className="flex h-full flex-1 justify-between flex-col">
          <div className="px-6 pt-8 pb-4 space-y-8">
            {/* Back + Progress */}
            <div className="flex items-center gap-4">
              <ArrowLeft
                className="w-6 h-6 cursor-pointer"
                onClick={goBack}
              />
            </div>
              <motion.div
                key="phase1"
                variants={phaseVariants.phase2}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-1 h-full flex flex-col"
              >
                {/* Heading */}
                <div className="space-y-5">
                  <h1 className="text-3xl font-bold">Hello There 👋</h1>
                </div>

                {/* Form Fields */}
                <div className="space-y-8 pt-4">
                  <InputField
                    title={"Email"}
                    type="email"
                    attribute="email"
                    data={data}
                    setData={setData}
                    placeholder="Email"
                  />
                  <InputField
                    title={"Password"}
                    attribute="password"
                    type="password"
                    data={data}
                    setData={setData}
                    placeholder="Password"
                  />
                  <div className="flex gap-2 items-center">
                  <Checkbox/>
                  <Label className="flex-1 w-full">Remember Me</Label>
                  </div>
                  <Separator/>
                  <div className="flex items-center justify-center">
                <Link href={"/forgot-password"}>
                  <Button className="text-md" variant={"link"}>Forgot Password?</Button>
                </Link>
                  </div>
                  
                  
                </div>
              </motion.div>
          </div>
          {/* Bottom Button */}
          <div className="p-6">
              <NextButton text={"Sign In"} disabled={loading} onClick={handleSubmit} />
          </div>
        </form>
        {/* <div className="mx-5">
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <GoogleButton />

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div> */}
      </motion.div>
    </div>
  );
}

